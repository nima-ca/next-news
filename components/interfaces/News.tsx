export interface News {
  articles: NewsItem[];
  status: string;
  message?: string;
  totalResults?: number;
}

export interface NewsItem {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
