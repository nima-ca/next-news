import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

export default function Home(props: any) {
  const { t } = useTranslation();
  const themeCtx = useContext(ThemeContext);
  return (
    <div>
      <button onClick={themeCtx.setAppTheme}>change theme</button>
      <p>theme: {themeCtx.theme}</p>
      greeting: {t("greet")}
      search: {t("search")}
    </div>
  );
}
