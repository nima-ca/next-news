import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Moon } from "../utils/icons/Moon";
import { Sun } from "../utils/icons/Sun";
import styles from "./Theme.module.scss";
const Theme = () => {
  const themeCtx = useContext(ThemeContext);
  return (
    <span className={styles.colorMode}>
      <input onChange={themeCtx.setAppTheme} type="checkbox" id="colorMode" />
      <label htmlFor="colorMode">
        {themeCtx.theme == "dark" && <Moon />}
        {themeCtx.theme == "light" && <Sun />}
      </label>
    </span>
  );
};

export default Theme;
