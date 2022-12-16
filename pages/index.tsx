import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import styles from "../styles/Home.module.scss";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Card from "../components/Card/Card";
import { Loading } from "../components/utils/icons/Loading";
import useFetch from "../hooks/useFetch";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      apiKey: process.env.API_SECRET,
      locale,
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

export default function HomePage(props: any) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("bitcoin");
  const [pageNumber, setPageNumber] = useState(1);
  const { articles, error, isLoading, hasMore } = useFetch(
    search,
    `${pageNumber}`,
    props.locale ?? "en",
    props.apiKey
  );

  const isSearchEmpty = search == "";

  const changeSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPageNumber(1);
  };

  const observer = useRef<any>();
  const lastArticle = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((curr) => curr + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

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
          onChange={changeSearchHandler}
        />
      </div>
      <div className={styles.cardContainer}>
        {(isSearchEmpty || articles.length == 0) && !isLoading && (
          <p>{t("not_found")}</p>
        )}
        {!error &&
          !isSearchEmpty &&
          articles.map((article, index) => (
            <div
              key={index}
              ref={index + 1 === articles.length ? lastArticle : null}
            >
              <Card
                date={article.publishedAt}
                title={article.title}
                description={article.description}
                url={article.url}
                img={article.urlToImage}
                source={article.source.name}
              />
            </div>
          ))}
      </div>
      {isLoading && !error && <Loading />}
    </div>
  );
}
