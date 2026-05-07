import UserCard from '../user-card/user-card';

import styles from './user-list.module.css';

import { UserClient } from '@/types';

type UsersListProps = {
  users: Array<UserClient>;
};

const UsersList = ({ users }: UsersListProps) => {
  return (
    <ul className={styles.list}>
      {users.map((user) => {
        return (
          <li key={user._id}>
            <UserCard user={user} />
          </li>
        );
      })}
    </ul>
  );
};

export default UsersList;
