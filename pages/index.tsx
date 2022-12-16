import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import styles from "../styles/Home.module.scss";
import { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { Loading } from "../components/utils/icons/Loading";
import { News } from "../components/interfaces/News";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      apiKey: process.env.API_SECRET,
      locale,
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

const baseUrl = "https://newsapi.org/v2/everything?";

export default function HomePage(props: any) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("bitcoin");

  const [data, setData] = useState<News | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(
        baseUrl +
          new URLSearchParams({
            q: search,
            pageSize: "10",
            page: "1",
            language: props.locale ?? "en",
          }),
        {
          headers: {
            Authorization: props.apiKey,
          },
        }
      );
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search != "") fetchData();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className={`${styles.home} container`}>
      <div>
        <h1>{t("heading")}</h1>
        <input
          type="text"
          name="search"
          id="search"
          value={search}
          placeholder={t("search_placeholder")!}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.cardContainer}>
        {isLoading && !error && <Loading />}
        {(search == "" || !data?.articles || data.articles.length == 0) &&
          !isLoading &&
          t("not_found")}
        {!isLoading &&
          !error &&
          search != "" &&
          data!.articles.map((article, index) => (
            <Card
              key={index}
              date={article.publishedAt}
              title={article.title}
              description={article.description}
              url={article.url}
              img={article.urlToImage}
              source={article.source.name}
            />
          ))}

        {error && <p>{error.message}</p>}
      </div>
    </div>
  );
}
