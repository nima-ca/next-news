import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "home"])),
    },
  };
};

export default function Home(props: any) {
  const { t } = useTranslation();
  return (
    <div>
      greeting: {t("common:greet")}
      search: {t("home:search")}
    </div>
  );
}
