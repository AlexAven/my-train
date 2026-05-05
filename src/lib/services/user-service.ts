import mongoose from 'mongoose';
import { notFound } from 'next/navigation';

import connectToDatabase from '@/lib/db/mongodb';
import getRedisClient from '@/lib/db/redis';
import { escapeRegex } from '../utils/escape-regex';
import User from '@/models/user';

import { UserClient } from '@/types';

const CACHE_USERS_ALL = 'cache:users:all';
const CACHE_KEY_USER = (id: string) => `cache:user:${id}`;
const CACHE_TTL_ALL_SECONDS = 60;
const CACHE_TTL_SEARCH_SECONDS = 30;
const CACHE_TTL_USER_SECONDS = 30;

const getAllUsers = async () => {
  const redis = await getRedisClient();
  const cached = await redis.get(CACHE_USERS_ALL);

  if (cached) {
    const users = JSON.parse(cached);

    return users;
  }

  await connectToDatabase();

  const users = await User.find().lean().sort({ createdAt: -1 });

  await redis.set(CACHE_USERS_ALL, JSON.stringify(users), {
    EX: CACHE_TTL_ALL_SECONDS,
  });

  return users;
};

const searchUsersByName = async (query: string) => {
  const normalizedQuery = query.toLowerCase().trim();

  const cacheKey = `cache:users:search:${normalizedQuery}`;

  const redis = await getRedisClient();
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  await connectToDatabase();

  const safeQuery = escapeRegex(normalizedQuery);

  const users = await User.find({
    name: { $regex: safeQuery, $options: 'i' },
  })
    .lean()
    .sort({ createdAt: -1 });

  await redis.set(cacheKey, JSON.stringify(users), {
    EX: CACHE_TTL_SEARCH_SECONDS,
  });

  return users;
};

const getUserById = async (id: string) => {
  const redis = await getRedisClient();

  const cachedUser = await redis.get(CACHE_KEY_USER(id));

  if (cachedUser) {
    return JSON.parse(cachedUser);
  }

  const cachedAll = await redis.get(CACHE_USERS_ALL);

  if (cachedAll) {
    const users = JSON.parse(cachedAll);
    const selectedtUser = users.find((user: UserClient) => user._id === id);

    if (selectedtUser) {
      await redis.set(CACHE_KEY_USER(id), JSON.stringify(selectedtUser), {
        EX: CACHE_TTL_USER_SECONDS
      });

      return selectedtUser;
    }
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }
  
  await connectToDatabase();

  const user = await User.findById(id).lean();

  if (!user) return null;

  await redis.set(CACHE_KEY_USER(id), JSON.stringify(user), {
    EX: CACHE_TTL_USER_SECONDS,
  });

  return user;
};

export { getAllUsers, searchUsersByName, getUserById };
