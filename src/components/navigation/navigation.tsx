import Link from 'next/link';

import styles from './navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <Link href="/" className={styles.navLink}>
        Главная
      </Link>
      <Link href="/todo" className={styles.navLink}>
        TODO
      </Link>
      <Link href="/users" className={styles.navLink}>
        Пользователи
      </Link>
    </nav>
  );
};

export default Navigation;
