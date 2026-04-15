import { createClient, type RedisClientType } from 'redis';

declare global {
  var redisClient: RedisClientType | undefined;
}

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error('Определи переменную REDIS_URL в файле .env.local');
}

const getRedisClient = async (): Promise<RedisClientType> => {
  if (globalThis.redisClient && globalThis.redisClient.isOpen) {
    return globalThis.redisClient;
  }

  const client: RedisClientType = createClient({ url: REDIS_URL });

  client.on('error', (err) => {
    console.error('Redis: ошибка соединения:', err);
  });

  await client.connect();

  globalThis.redisClient = client;

  return client;
};

export default getRedisClient;
