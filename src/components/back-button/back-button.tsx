'use client';

import { useRouter } from 'next/navigation';

import styles from './back-button.module.css';

const BackButton = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <button onClick={() => router.back()} className={styles.btn}>
        ← Назад
      </button>
    </div>
  );
};

export default BackButton;
