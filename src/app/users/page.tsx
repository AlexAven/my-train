import UsersList from '@/components/users-list/users-list';

import styles from './page.module.css';

const UsersPage = () => {
  return (
    <section className={styles.content}>
      <h2 className={styles.title}>Пользователи</h2>
      <div className={styles.list}>
        <UsersList />
      </div>
    </section>
  );
};

export default UsersPage;
