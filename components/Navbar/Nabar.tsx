import Theme from "../Theme/Theme";
import { NewsifyLogo } from "../utils/icons/NewsifyLogo";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <h3>
          <span>Newsify</span>
          <NewsifyLogo />
        </h3>
        <Theme />
      </nav>
    </>
  );
};

export default Navbar;
