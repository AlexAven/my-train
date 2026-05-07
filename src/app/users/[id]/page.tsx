import { notFound } from 'next/navigation';

import { getUserById } from '@/lib/services/user-service';
import formatPhone from '@/lib/utils/format-phone';
import BackButton from '@/components/back-button/back-button';
import formatDate from '@/lib/utils/format-date';

import { UserClient } from '@/types';

import styles from './page.module.css';

type UserPageProps = {
  params: Promise<{ id: string }>;
};

const UserPage = async ({ params }: UserPageProps) => {
  const { id } = await params;
  const user: UserClient = await getUserById(id);

  if (!user) notFound();

  const { name, email, phone, createdAt, updatedAt } = user;
  const created = new Date(createdAt);
  const updated = new Date(updatedAt);
  const isEdited = updated.getTime() !== created.getTime();

  return (
    <section>
      <h1 className={styles.title}>Данные пользователя</h1>
      <div>
        <h3>{name}</h3>
        <div>
          <p className={styles.contacts}>
            <span className={styles.caption}>Email: </span>
            {email}
          </p>
          <p className={styles.contacts}>
            <span className={styles.caption}>Тел.: </span>
            {formatPhone(phone)}
          </p>
          <p className={styles.contacts}>
            <span className={styles.caption}>Создан: </span>
            {formatDate(created)}
          </p>
          {isEdited && (
            <p className={styles.contacts}>
              <span className={styles.caption}>Изменен: </span>
              {formatDate(updated, true)}
            </p>
          )}
        </div>
      </div>
      <BackButton />
    </section>
  );
};

export default UserPage;
