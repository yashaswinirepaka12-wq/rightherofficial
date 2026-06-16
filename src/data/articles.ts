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

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "sources"; items: string[] };

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
  content: ContentBlock[];
  featured?: boolean;
}

export const articles: Article[] = [
  {
    slug: "your-period-wont-wait",
    title: "Your Period Won't Wait — And Your Rights Shouldn't Either",
    excerpt:
      "When students have to ask permission to meet basic bodily needs, it can feel less like school and more like a place where control matters more than comfort or health.",
    category: "Women's Rights",
    tags: ["Menstrual Equity", "Policy", "Schools", "Title IX"],
    image: article1,
    date: "June 16, 2026",
    readTime: "6 min read",
    author: "The RightHer Editors",
    featured: true,
    content: [
      {
        type: "p",
        text: "You're sitting in math class, and suddenly feel something wet in your pants. You realize you're on your period. However, when you go up to ask your teacher to use the restroom, they tell you that you cannot go until a guy from your class gets back. This might seem like a small problem, but it's about more than just waiting to use the bathroom. It causes stress, shame, and fear of public embarrassment. When students have to ask permission to meet basic bodily needs, it can feel less like a school and more like a place where control matters more than comfort or health.",
      },
      { type: "h2", text: "The Reality of Bathroom Restrictions" },
      {
        type: "p",
        text: "In most schools, students are restricted in terms of using the bathroom. For example, they have times when no student is allowed into the bathrooms, usually around the start or end of classes.",
      },
      {
        type: "p",
        text: "This is called the 10/10 rule, where no students can use the bathroom for the first 10 minutes of class and the last 10 minutes of class. In addition, they only allow one student at a time outside the classroom, often with physical or digital passes that are checked at the bathroom.",
      },
      {
        type: "p",
        text: "Like the ones listed here, there are so many rules that are used in terms of using the bathroom at schools, making it harder for students to take care of their own basic needs.",
      },
      {
        type: "p",
        text: "Schools often focus so much on keeping students in class that they forget that health needs don't always fit into strict schedules. When students can't leave class quickly, it can make managing their period stressful and embarrassing, especially if products aren't easily available. Delays can lead to anxiety, missed class time, and sometimes even health issues if products can't be changed when needed. In addition, menstrual products are not kept in the stalls in many schools, forcing students to go to the nurse for a pad or tampon, taking time away from class.",
      },
      { type: "h2", text: "Legal Framework" },
      { type: "p", text: "Here is some legislation that relates to this issue:" },
      {
        type: "ul",
        items: [
          "Title IX is a federal law that says schools cannot treat students unfairly based on sex. Even if bathroom rules are written the same for everyone, the real question is whether they affect girls differently in practice (US Department of Education).",
          "The 14th Amendment says that everyone deserves equal protection under the law. If a school policy ends up putting one group of students at a disadvantage, it's worth asking whether that policy is truly equal (Cornell Law School).",
        ],
      },
      { type: "h2", text: "The Reasoning Behind These Rules" },
      {
        type: "p",
        text: "Schools say that bathroom policies focus on safety, preventing vandalism, or keeping students in class. These are valid reasons. However, schools focus heavily on these issues and end up ignoring the health of students, especially female students.",
      },
      { type: "h2", text: "What You Can Do" },
      {
        type: "ul",
        items: [
          "Know the policy: Look up your school's official bathroom policy in the student handbook. Check if there are any exceptions for medical needs and emergencies. Understand the rules before challenging them.",
          "Advocate for yourself. Explain to a teacher that menstrual needs can be urgent and unpredictable, and ask whether exceptions can be made in emergencies.",
          "Use the power of democracy. Start respectful conversations in student government. Propose keeping menstrual products available in bathrooms, and push for flexible bathroom policies in emergencies.",
        ],
      },
      {
        type: "p",
        text: "Protecting your rights isn't just outright rebellion. Sometimes, it lies in self-advocacy and the ability to push for policies that work for the majority. Stay informed, and speak up for yourself and your peers.",
      },
      {
        type: "sources",
        items: [
          "\"Title IX of the Education Amendments of 1972.\" U.S. Department of Education — www2.ed.gov/about/offices/list/ocr/docs/tix_dis.html",
          "\"Fourteenth Amendment.\" Legal Information Institute, Cornell Law School — www.law.cornell.edu/constitution/amendmentxiv",
          "American Civil Liberties Union. \"Menstrual Equity in Schools.\" — www.aclu.org",
          "UNICEF. \"Guidance on Menstrual Health and Hygiene.\" — www.unicef.org",
          "National Women's Law Center. \"Period Poverty and Students.\" — nwlc.org",
          "Centers for Disease Control and Prevention. \"School Health Policies and Practices Study.\" — www.cdc.gov",
          "National Education Association. \"Student Rights and School Policies.\" — www.nea.org",
        ],
      },
    ],
  },
];
