import { UserClient } from '@/types';

const API_USERS_URL = '/api/users';

const fetchUsers = async (): Promise<UserClient[]> => {
  const res = await fetch(API_USERS_URL);

  if (!res.ok) {
    throw new Error(`Ошибка загрузки пользователей: ${res.status}`);
  }

  return res.json();
};

export { fetchUsers };
