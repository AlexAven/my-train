import UsersList from '@/components/users-list/users-list';
import { getAllUsers } from '@/lib/services/user-service';

import styles from './page.module.css';

const UsersPage = async () => {
  const users = await getAllUsers();

  return (
    <section className={styles.content}>
      <h2 className={styles.title}>Пользователи</h2>
      <div className={styles.list}>
        <UsersList users={users} />
      </div>
    </section>
  );
};

export default UsersPage;
