'use client';

import { useEffect, useState } from 'react';

import UserCard from '../user-card/user-card';
import { UserClient } from '@/types';

const UsersList = () => {
  const [users, setUsers] = useState<UserClient[]>([]);

  useEffect(() => {
    const getUsersList = async (): Promise<void> => {
      const res = await fetch('api/users');

      if (!res.ok) {
        throw new Error('Ошибка загрузки');
      }

      const list = await res.json();

      setUsers(list);
    };

    getUsersList();
  }, []);

  return (
    <ul>
      {users.map((user, index) => {
        return (
          <li key={index + 1}>
            <UserCard user={user} />
          </li>
        );
      })}
    </ul>
  );
};

export default UsersList;
