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
    author: "The RightHer Editors",
    featured: true,
    content: [
      "Every month, millions of students miss school because they can't access period products. That isn't a personal failing — it's a policy failure, and one we can actually fix.",
      "Menstrual equity means recognizing that periods are a basic biological reality, not a luxury expense. When schools stock pads and tampons the way they stock toilet paper and soap, students stop having to choose between dignity and showing up to class.",
      "A handful of states have already passed laws requiring free products in public school bathrooms. The results are clear: better attendance, less stigma, and students who feel seen by the institutions meant to support them.",
      "If your school doesn't have a policy yet, you have more power than you think. Talk to your student government. Email your principal. Bring it up at a school board meeting. Change tends to start with one person refusing to treat the status quo as inevitable.",
    ],
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
    author: "The RightHer Editors",
    content: [
      "Civic engagement isn't reserved for adults with voter registration cards. Some of the most consequential movements in history have been led by teenagers — and the decisions being made right now will shape your adult life more than anyone else's.",
      "Start local. City council meetings, school board races, and county elections decide things like what your school teaches, which neighborhoods get funded, and how police interact with students. They're also where your voice carries the most weight.",
      "You can pre-register to vote in most states at 16 or 17. You can intern for a campaign, write to your representatives, or organize a forum at your school. None of these require waiting for a birthday.",
      "Showing up matters even when you can't yet cast a ballot. Policymakers track who pays attention — and they remember the young people who will be voting in two years.",
    ],
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
    author: "The RightHer Editors",
    content: [
      "Pop culture loves a loud leader — the one who commands a room and never runs out of things to say. But a lot of the best leaders we know are the ones who listen first and speak with intention.",
      "Being an introvert isn't a weakness to overcome. It's a different operating system. You probably notice details others miss, think before you speak, and form deep one-on-one relationships that build real trust.",
      "If speaking up in groups feels hard, start smaller. Write the email. Send the DM. Talk to one person before the meeting so you have an ally in the room. Confidence is a muscle, and small reps count.",
      "Your voice doesn't have to be the loudest to matter. It just has to be yours.",
    ],
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
    author: "The RightHer Editors",
    content: [
      "Equality says every student gets the same thing. Equity says every student gets what they need. The difference sounds small, but it shapes everything about how schools work.",
      "Two schools can have the same official curriculum and still produce wildly different outcomes — because funding, class sizes, counselor access, and AP offerings aren't distributed evenly. ZIP code still predicts opportunity in ways it shouldn't.",
      "Awareness is the first step, but not the last. Once you see the gap, the next question is what to do about it: mentoring younger students, advocating for fairer funding formulas, or simply refusing to accept that some kids deserve less.",
      "Educational equity is a long project. But it's one your generation is uniquely positioned to push forward.",
    ],
  },

];
