// users/page.tsx
import UsersList from '@/components/users-list/users-list';
import SearchBar from '@/components/search-bar/search-bar';
import { getAllUsers, searchUsersByName } from '@/lib/services/user-service';

import styles from './page.module.css';

type UsersPageProps = {
  searchParams: Promise<{ search?: string }>;
};

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const { search } = await searchParams;

  const users = search?.trim() ? await searchUsersByName(search) : await getAllUsers();

  return (
    <section className={styles.content}>
      <h2 className={styles.title}>Пользователи</h2>
      <SearchBar />
      <div className={styles.list}>
        <UsersList users={users} />
      </div>
    </section>
  );
};

export default UsersPage;
