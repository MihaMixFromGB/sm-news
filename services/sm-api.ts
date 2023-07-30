import { NewsDto, News } from "../interfaces";
import { formatDate, parseNewsBody } from "./news";

async function getNews(): Promise<News[]> {
  const res = await fetch(
    "https://app-api.sm117.ru/api/v1/contract/news_for_test/"
  );
  const data = await res.json();
  return data.map((item: NewsDto) => {
    return {
      id: item.id,
      date: formatDate(item.date),
      title: item.title,
      body: parseNewsBody(item.body),
    } as News;
  });
}

const smAPI = {
  getNews,
};

export default smAPI;
