import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <nav className={styles.footer}>
      <a href="#">
        © All Rights reserved for <span>Newsify</span>
      </a>
    </nav>
  );
};

export default Footer;
