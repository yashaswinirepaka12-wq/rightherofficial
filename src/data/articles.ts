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
  {
    slug: "student-privacy-and-school-phone-access",
    title: "Understanding the Boundaries of Student Privacy and School Access to Phone Information",
    excerpt:
      "Smartphones are part of every step of a student's routine — but where should schools draw the line between safety, discipline, and privacy?",
    category: "Women's Rights",
    tags: ["Privacy", "Student Rights", "Schools", "Digital"],
    image: article2,
    date: "June 16, 2026",
    readTime: "6 min read",
    author: "The RightHer Editors",
    featured: true,
    content: [
      {
        type: "p",
        text: "In today's digital age, smartphones have become an essential part of students' lives. These devices have a place in every step of their routines, from communicating with loved ones to capturing memories. However, when it comes to schools accessing information on these devices, the lines between safety, discipline, and privacy can start to blur. Understanding the limits of what schools can and cannot do regarding student phone information is crucial for students, parents, and educators alike to ensure the privacy of the student and the integrity of the school.",
      },
      { type: "h2", text: "Why Schools Might Want Access to Student Phone Information" },
      {
        type: "p",
        text: "Schools often face challenges related to student safety and discipline. Accessing phone information can help address issues such as:",
      },
      {
        type: "ul",
        items: [
          "Bullying or harassment: Certain digital messages or social media posts can sometimes involve harmful behavior, leading to further investigation by school officials.",
          "Cheating during exams: Phones can be used to share answers or access unauthorized information, which directly violates many schools' policies.",
          "Threats or safety concerns: Certain messages or images may indicate potential risks to students or staff.",
        ],
      },
      {
        type: "p",
        text: "While these reasons are valid, schools must balance their responsibility to maintain a safe environment with respecting students' privacy rights.",
      },
      { type: "h2", text: "Legal Framework Governing School Access" },
      {
        type: "p",
        text: "The rules about school access to student phone information vary by country and state, but some common principles apply:",
      },
      {
        type: "ul",
        items: [
          "Reasonable suspicion: Schools generally need a valid reason to search a student's phone, such as suspicion of rule-breaking or safety threats.",
          "Scope of search: Searches should be limited to relevant information and not be overly intrusive.",
          "Consent: In some cases, schools require parental consent before accessing a student's device.",
          "Riley v. California: In this case, the court ruled that it was unlawful for law enforcement to seize the digital contents of a phone without a warrant.",
        ],
      },
      { type: "h2", text: "Practical Examples of School Phone Searches" },
      {
        type: "p",
        text: "A high school receives reports of cyberbullying targeting a student. The administration asks the student to unlock their phone to review messages related to the incident. Since there is reasonable suspicion, this search is generally considered lawful.",
      },
      {
        type: "p",
        text: "During an exam, a teacher notices a student using their phone suspiciously. The teacher asks to see the phone, and upon viewing, finds evidence of cheating. This search is limited to the exam context and is justified, as the student has violated school policy.",
      },
      { type: "h2", text: "How Students and Parents Can Protect Privacy" },
      {
        type: "p",
        text: "Students and parents can take steps to understand and protect their rights:",
      },
      {
        type: "ul",
        items: [
          "Know the school's policy: Review the student handbook or school guidelines on phone use and searches.",
          "Ask for clarification: If a phone search is requested, ask about the reason and scope.",
          "Request parental involvement: Parents should be informed and involved when possible.",
          "Use privacy settings: Limit access to sensitive apps or data.",
          "Keep backups: Regularly back up important data to avoid loss during searches.",
        ],
      },
      { type: "h2", text: "Balancing Safety and Privacy in a Digital World" },
      {
        type: "p",
        text: "Schools face the challenge of keeping students safe while respecting their privacy. Clear policies, legal guidelines, and mutual respect can help navigate this balance. Understanding the boundaries of phone access ensures that students' rights are protected without compromising school safety.",
      },
      {
        type: "p",
        text: "Students and parents should stay informed about their rights and school policies. When concerns arise, addressing them calmly and clearly can lead to better outcomes for everyone involved.",
      },
    ],
  },
];

