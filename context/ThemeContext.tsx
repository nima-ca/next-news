import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  theme: "",
  setAppTheme: () => {},
});

export const ThemeProvider = (props: any) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    const isBrowserInDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const themeState =
      localTheme != "" ? localTheme : isBrowserInDarkMode ? "dark" : "light";
    setTheme(themeState!);
    if (
      themeState == "dark" &&
      !document.documentElement.classList.contains("dark-mode")
    ) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", themeState);
    }
  }, []);

  const setAppTheme = () => {
    const targetTheme = theme == "dark" ? "light" : "dark";
    setTheme(targetTheme);
    localStorage.setItem("theme", targetTheme);
    targetTheme == "dark" &&
      document.documentElement.classList.add("dark-mode");
    targetTheme == "light" &&
      document.documentElement.classList.remove("dark-mode");
  };

  return (
    <ThemeContext.Provider value={{ theme, setAppTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
