import { User, Code, Clock, Mail, Home } from "lucide-react";

export const sections = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Code },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "contact", label: "Contact", icon: Mail },
];

export const techStack = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "Git",
  "PHP",
  "Laravel",
  "Dart",
  "CSS3",
  "Haskell",
  "HTML5",
  "C",
  "AssemblyScript",
  "Netlify",
  "GithubPages",
  "Firebase",
  "Angular",
  "Flask",
  "Flutter",
  "React Native",
  "Yarn",
  "JavaFX",
  "Express.js",
  "SASS",
  "SQLite",
  "Prisma",
  "PlanetScale",
  "Postgres",
  "MariaDB",
  "MySQL",
  "MongoDB",
  "NumPy",
  "Matplotlib",
  "Pandas",
  "scikit-learn",
  "Notion",
];

export const projects = [
  {
    title: "Job Quest",
    description:
      "Built a full-stack job board using PHP and Laravel with secure authentication, job search and filter features, and employer functionalities. Designed a responsive UI with Tailwind CSS and Breadcrumbs Navigation for an improved user experience.",
    tech: [
      "React",
      "TypeScript",
      "PHP",
      "Laravel",
      "MySQL",
      "Tailwind CSS",
      "JavaScript",
      "Postman",
      "Adminer",
      "Blade",
    ],
    link: "https://github.com",
    year: "2024"
  },
  {
    title: "FlowAPI",
    description:
      "Designed a Visual Workflow Editor for APIs using Next.js, enabling users to visually build, test, and manage API workflows through a no-code interface with configurable nodes, real-time testing, and project management features.",
    tech: [
      "Next.js",
      "React Flow",
      "Tailwind CSS",
      "shadcn/ui",
      "Next.js API routes",
      "Server Actions",
      "Supabase",
      "Neon PostgreSQL",
      "NextAuth.js",
      "Supabase Auth",
    ],
    link: "https://github.com",
    year: "2025"
  },
  {
    title: "Twitter Sentiment Analysis using NLP",
    description:
      "Performed Twitter sentiment analysis using NLP on 31,962 labeled tweets to detect hate speech, achieving classification of racist/sexist vs. non-offensive content through preprocessing, EDA, and machine learning models.",
    tech: [
      "Python",
      "Sklearn",
      "NLTK",
      "Pandas",
      "Seaborn",
      "Matplotlib",
      "Numpy",
    ],
    link: "https://github.com",
    year: "2023"
  },
  {
    title: "VaultGuard",
    description:
      "Developed a comprehensive Password Manager using Python that securely stores and manages passwords with an user-friendly interface. Uses SHA-256 hashing for password security and SQLite for database storage. Features user registration, login, password storage, and generation. Employs strong encryption and hashed passwords for enhanced security",
    tech: ["Python", "Tkinter", "SQLite", "SHA-256", "Hashing", "Encryption"],
    link: "https://github.com",
    year: "2022"
  },
];

export const timeline = [
  {
    year: "Jan,2025 - present",
    role: "Juniot Product/Software Development Intern",
    company: "Modular Solutions",
    location: "Calgary, AB",
    description:
      "Delivered AI-driven, full-stack solutions to streamline workflows and boost development efficiency.",
    achievements: [
      "Engineered an AI-driven documentation system using Python and LLMs, automating the transformation of source code into structured guides, reducing manual documentation effort by 80% and improving onboarding efficiency for internal product designers and clients.",
      "Designed and implemented over 50+ complex insurance rules in JavaScript for the company’s proprietary rules and rating engine, enhancing pricing accuracy and reducing policy configuration time by 40%.",
      "Developed reusable backend services in C#/.NET and modular React UI components, reducing redundant development effort by significant amount and accelerating feature delivery cycles by 25%.",
      "Applied Domain-Driven Design (DDD) principles to improve software architecture, reducing technical debt and increasing development efficiency, contributing to a 15% improvement in sprint velocity and smoother cross-team collaboration.",
    ],
    technologies: [
      "React",
      "Node.js",
      "Docker",
      "PostgreSQL",
      "TypeScript",
      "JavaScript",
      "C#",
      ".NET",
      "Git",
    ],
  },
  {
    year: "July,2024 - Aug,2024",
    role: "Software Engineering Intern",
    company: "Carasti",
    location: "Dubai, UAE",
    description:
      "Enhanced app efficiency and engagement through UI, backend, and API improvements.",
    achievements: [
      "Implemented 10+ UI/UX enhancements, resulting in a 20% increase in user engagement based on app analytics.",
      "Layed a key role in maintaining backend systems with Laravel, ensuring seamless app integration.",
      "Developed and integrated RESTful APIs to enhance communication between mobile and backend services.",
      "Optimized 10+ MySQL queries, cutting down query execution time by 30%. Collaborated with senior developers and team members, demonstrating strong teamwork and communication skills.",
    ],
    technologies: ["Laravel", "PhP", "Flutter", "Dart", "MySQL", "Git"],
  },
];
