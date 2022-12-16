import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import styles from "../styles/Home.module.scss";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

export default function HomePage(props: any) {
  const { t } = useTranslation();
  return (
    <div className={`${styles.home} container`}>
      <div>
        <h1>{t("heading")}</h1>
        <input
          type="text"
          name="search"
          id="search"
          placeholder={t("search_placeholder")!}
        />
      </div>
    </div>
  );
}
