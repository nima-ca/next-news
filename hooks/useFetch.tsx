import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { NewsItem } from "../components/interfaces/News";

const baseUrl = "https://newsapi.org/v2/everything?";
enum changeType {
  byPageNumber,
  byQuery,
}

const pageSize = "9";
const useFetch = (
  query: string,
  pageNumber: string,
  locale: string,
  apiKey: string
) => {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (type: changeType) => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(
        baseUrl +
          new URLSearchParams({
            q: query,
            pageSize,
            page: pageNumber,
            language: locale ?? "en",
          }),
        {
          headers: {
            Authorization: apiKey,
          },
        }
      );
      const data = await response.json();
      if (data.status == "error") throw new Error(data.message);
      setArticles((prev) =>
        type === changeType.byPageNumber
          ? [...prev, ...data.articles]
          : data.articles
      );
      setHasMore(data.totalResults > +pageNumber * +pageSize);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query == "") return;
      fetchData(changeType.byQuery);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    if (pageNumber == "1") return;
    fetchData(changeType.byPageNumber);
  }, [pageNumber]);

  return { articles, isLoading, error, hasMore };
};

export default useFetch;
