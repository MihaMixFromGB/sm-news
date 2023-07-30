import { UIItem } from "./ui-items.interface";

export interface News {
  id: number;
  date: string;
  title: string;
  body: NewsBody;
}

export interface NewsDto {
  id: number;
  date: string;
  title: string;
  body: string;
}

export type NewsBody = Array<UIItem>;
