import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";
import article4 from "@/assets/article-4.jpg";

export type Category =
  | "Educational Equity"
  | "Mental Health"
  | "Civic Engagement"
  | "Women's Rights"
  | "Leadership";

export const categories: Category[] = [
  "Educational Equity",
  "Mental Health",
  "Civic Engagement",
  "Women's Rights",
  "Leadership",
];

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  tags: string[];
  image: string;
  date: string;
  readTime: string;
  author?: string;
  content: string[];
  featured?: boolean;
}


export const articles: Article[] = [

];
