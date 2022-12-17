import { useRouter } from "next/router";
import Theme from "../Theme/Theme";
import { NewsifyLogo } from "../utils/icons/NewsifyLogo";
import styles from "./Navbar.module.scss";

const Navbar = (props: any) => {
  const router = useRouter();
  return (
    <nav className={styles.navbar}>
      <h3>
        <span>Newsify</span>
        <NewsifyLogo />
      </h3>
      <div>
        <select
          onChange={(e) => router.push(`/`, `/`, { locale: e.target.value })}
          className={styles.lang}
          name="lang"
          id="lang"
          value={router.locale}
        >
          <option value="en">
            <span>English</span>
          </option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
        <Theme />
      </div>
    </nav>
  );
};

export default Navbar;
