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
  featured?: boolean;
}

export const articles: Article[] = [
  {
    slug: "your-period-wont-wait",
    title: "Your Period Won't Wait — And Your Rights Shouldn't Either",
    excerpt:
      "Menstrual equity isn't a luxury, it's a right. A look at why access to products and policy still matters for every student.",
    category: "Women's Rights",
    tags: ["Menstrual Equity", "Policy", "Schools"],
    image: article1,
    date: "May 28, 2026",
    readTime: "6 min read",
    featured: true,
  },
  {
    slug: "why-civic-engagement-matters",
    title: "Why Civic Engagement Matters for Teens",
    excerpt:
      "You don't have to be 18 to make change. Here's how showing up — locally and loudly — shapes the world you'll inherit.",
    category: "Civic Engagement",
    tags: ["Voting", "Advocacy", "Community"],
    image: article2,
    date: "May 14, 2026",
    readTime: "5 min read",
  },
  {
    slug: "finding-your-voice-as-an-introvert",
    title: "Finding Your Voice as an Introvert",
    excerpt:
      "Leadership doesn't always look loud. A quiet girl's guide to speaking up without losing yourself.",
    category: "Leadership",
    tags: ["Confidence", "Public Speaking", "Self"],
    image: article3,
    date: "April 30, 2026",
    readTime: "4 min read",
  },
  {
    slug: "educational-equity-starts-with-awareness",
    title: "Educational Equity Starts With Awareness",
    excerpt:
      "Equal schools aren't the same as equitable ones. Understanding the gap is the first step to closing it.",
    category: "Educational Equity",
    tags: ["Schools", "Equity", "Awareness"],
    image: article4,
    date: "April 16, 2026",
    readTime: "7 min read",
  },
];
