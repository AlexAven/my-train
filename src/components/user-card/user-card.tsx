import Link from 'next/link';

import styles from './user-card.module.css';
import { UserClient } from '@/types';

type UserCardProps = {
  user: UserClient;
};

const UserCard = ({ user }: UserCardProps) => {
  const { name, email, _id: id } = user;

  return (
    <Link href={`/users/${id}`} className={styles.wrapper}>
      <div>
        <div className={styles.title}>{name}</div>
        <div className={styles.sub}>{email}</div>
      </div>
      <span aria-hidden>&rang;</span>
    </Link>
  );
};

export default UserCard;
