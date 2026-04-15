import styles from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Мой Сайт. Все права защищены.</p>
    </footer>
  );
};

export default Footer;
