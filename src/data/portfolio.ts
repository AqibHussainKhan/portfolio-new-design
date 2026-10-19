import medicoreCover from "../assets/medicore-poster.svg";
import labCover from "../assets/lab-poster.svg";
import portfolioCover from "../assets/portfolio-poster.svg";
import sliderCover from "../assets/slider-poster.svg";

export const contactEmail = "aqib.n2742@gmail.com";
export const githubUrl = "https://github.com/AqibHussainKhan";
export type ViewerProfile = "aqib" | "recruiter" | "developer" | "explorer";
export type ProjectFilter = "all" | "react" | "javascript" | "design";
export type SkillCategory = "frontend" | "data" | "motion" | "tools";
export type SectionId = "home" | "story" | "skills" | "originals" | "contact";

export const profileNames: Record<ViewerProfile, string> = {
  aqib: "Meet Aqib",
  recruiter: "Recruiter",
  developer: "Developer",
  explorer: "Explorer",
};
export const profileKickers: Record<ViewerProfile, string> = {
  aqib: "THE PERSON. THE PROJECTS. THE POSSIBILITIES.",
  recruiter: "THE WORK. THE SKILLS. THE NEXT OPPORTUNITY.",
  developer: "THE CODE. THE CURIOSITY. THE CRAFT.",
  explorer: "THE PERSON. THE PROJECTS. THE POSSIBILITIES.",
};
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  color: string;
  label: string;
  categories: ProjectFilter[];
  tech: string[];
  description: string;
  features: string[];
  search: string;
  /** The publicly hosted website URL. Leave unset until its address is known. */
  liveUrl?: string;
  /** Optional direct link to this project's source repository. */
  sourceUrl?: string;
}
export const projects: Project[] = [
  {
    id: "medicore",
    liveUrl: "https://medicore-hms-aqib.blonddeer16.chatgpt.site/",
    sourceUrl: "https://github.com/AqibHussainKhan/hospital-management-system.",
    title: "MediCore",
    subtitle: "Hospital Management System",
    cover: medicoreCover,
    color: "#103b3a",
    label: "THE OPERATIONS SERIES",
    categories: ["react", "design"],
    tech: ["React", "TypeScript", "Supabase"],
    description:
      "A hospital management project bringing patient records and everyday operations into one organized interface. Built around clear navigation, useful dashboards and practical record management.",
    features: [
      "Patient records with search, detail, edit and delete flows.",
      "Hospital operations and dashboard sections.",
      "Authentication flows and a responsive sidebar experience.",
    ],
    search:
      "hospital patients medical healthcare dashboard operations auth supabase typescript",
  },
  {
    id: "lab",
    liveUrl: "https://aqibhussainkhan.github.io/gutham-lab-portal/",
    sourceUrl: "https://github.com/AqibHussainKhan/gutham-lab-portal",
    title: "Lab IDs",
    subtitle: "Lab Records Dashboard",
    cover: labCover,
    color: "#302747",
    label: "THE RECORDS SERIES",
    categories: ["javascript", "design"],
    tech: ["HTML", "Tailwind CSS", "JavaScript", "Local storage"],
    description:
      "A light, glass-inspired dashboard project for lab records. The focus is a clear working space, dynamic entries and browser-based saving that keeps everyday records close at hand.",
    features: [
      "A glass-inspired interface with a focus on readability.",
      "Dynamic lab record entry and organization.",
      "Local storage for records within the same browser.",
    ],
    search:
      "gutham glass glassy laboratory lab records ids local storage dashboard",
  },
  {
    id: "portfolio",
    // "The Portfolio" demo automatically links to this very site in Projects.tsx.

    title: "The Portfolio",
    subtitle: "A Developer, In Episodes",
    cover: portfolioCover,
    color: "#602331",
    label: "THE PERSONAL SERIES",
    categories: ["javascript", "react", "design"],
    tech: ["React", "TypeScript", "CSS"],
    description:
      "The experience you are exploring right now: a cinematic React portfolio that turns a developer introduction into a collection of stories, tools and original work.",
    features: [
      "Viewing profiles with different starting points.",
      "Searchable projects, filters and a saved project list.",
      "A chapter-based story player and motion preferences.",
    ],
    search:
      "personal profile portfolio netflix cinematic website responsive animation vite react typescript",
  },
  {
    id: "slider",
    // Add the Slide Stories hosted URL here when available.

    title: "Slide Stories",
    subtitle: "An Interactive JavaScript Slider",
    cover: sliderCover,
    color: "#332451",
    label: "THE INTERACTION SERIES",
    categories: ["javascript"],
    tech: ["HTML", "CSS", "JavaScript"],
    description:
      "A focused JavaScript slider project exploring how images, headings and descriptions move together. A small interaction with a simple goal: make moving through content feel natural.",
    features: [
      "Synchronized slide images, titles and descriptions.",
      "Next and previous navigation through slide content.",
      "A focused exercise in DOM updates and interface behavior.",
    ],
    search: "carousel slides images slider interaction dom javascript",
  },
];
export const projectFilters: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "react", label: "React" },
  { id: "javascript", label: "JavaScript" },
  { id: "design", label: "Design & UI" },
];
export interface Skill {
  name: string;
  symbol: string;
  description: string;
  color: string;
}
export const skillTabs: {
  id: SkillCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "frontend",
    label: "FRONTEND",
    description: "The visible side of the web",
  },
  {
    id: "data",
    label: "DATA & AUTH",
    description: "Connecting the moving parts",
  },
  {
    id: "motion",
    label: "MOTION",
    description: "Giving interfaces a little life",
  },
  { id: "tools", label: "TOOLS", description: "From local code to the web" },
];
export const skills: Record<SkillCategory, { intro: string; items: Skill[] }> =
  {
    frontend: {
      intro: "From the first layout to the final interaction.",
      items: [
        {
          name: "HTML",
          symbol: "</>",
          description: "Semantic structure",
          color: "#f19472",
        },
        {
          name: "CSS",
          symbol: "#",
          description: "Responsive layouts",
          color: "#87b2ef",
        },
        {
          name: "JavaScript",
          symbol: "JS",
          description: "Interactive experiences",
          color: "#e3c969",
        },
        {
          name: "React",
          symbol: "R",
          description: "Component-based interfaces",
          color: "#81c3d7",
        },
        {
          name: "TypeScript",
          symbol: "TS",
          description: "Typed application code",
          color: "#81a8e5",
        },
        {
          name: "Tailwind CSS",
          symbol: "≈",
          description: "Utility-first styling",
          color: "#7acbd3",
        },
      ],
    },
    data: {
      intro: "Making the interface work with the data behind it.",
      items: [
        {
          name: "Supabase",
          symbol: "S",
          description: "Database & authentication",
          color: "#91c6a5",
        },
        {
          name: "Local storage",
          symbol: "{ }",
          description: "Browser-based persistence",
          color: "#b29bd1",
        },
        {
          name: "Forms & records",
          symbol: "+",
          description: "Create, edit and organize",
          color: "#d696ad",
        },
        {
          name: "Auth flows",
          symbol: "↗",
          description: "Sign-in and recovery screens",
          color: "#a99ad5",
        },
      ],
    },
    motion: {
      intro: "A little movement, with a clear purpose.",
      items: [
        {
          name: "CSS transitions",
          symbol: "↝",
          description: "Smooth interface states",
          color: "#d395c0",
        },
        {
          name: "CSS animation",
          symbol: "✦",
          description: "Keyframes & reveal effects",
          color: "#b2a0e0",
        },
        {
          name: "Framer Motion",
          symbol: "M",
          description: "Motion in React interfaces",
          color: "#e08d9f",
        },
        {
          name: "Interaction design",
          symbol: "↗",
          description: "Feedback, focus & flow",
          color: "#8cb9d0",
        },
      ],
    },
    tools: {
      intro: "The everyday tools behind the build.",
      items: [
        {
          name: "Git",
          symbol: "G",
          description: "Version control",
          color: "#dc8a78",
        },
        {
          name: "GitHub",
          symbol: "GH",
          description: "Source & collaboration",
          color: "#bfaecb",
        },
        {
          name: "VS Code",
          symbol: "</>",
          description: "A place to build",
          color: "#86b3d6",
        },
        {
          name: "Browser DevTools",
          symbol: "⌘",
          description: "Inspect, debug & refine",
          color: "#b0bb96",
        },
      ],
    },
  };
export const episodes = [
  {
    id: "story" as const,
    number: "01",
    title: "The full story",
    subtitle: "The person behind the pixels",
    color: "violet",
  },
  {
    id: "skills" as const,
    number: "02",
    title: "My toolkit",
    subtitle: "The tools that make it happen",
    color: "blue",
  },
  {
    id: "originals" as const,
    number: "03",
    title: "The originals",
    subtitle: "Ideas turned into interfaces",
    color: "red",
  },
  {
    id: "contact" as const,
    number: "04",
    title: "What's next?",
    subtitle: "A good project starts with hello",
    color: "gold",
  },
];
export const episodeOrders: Record<ViewerProfile, string[]> = {
  aqib: ["story", "skills", "originals", "contact"],
  recruiter: ["originals", "skills", "story", "contact"],
  developer: ["skills", "originals", "story", "contact"],
  explorer: ["story", "skills", "originals", "contact"],
};
export const searchSections: {
  title: string;
  detail: string;
  id: SectionId;
  symbol: string;
  search: string;
}[] = [
  {
    title: "The full story",
    detail: "Meet Aqib, the person behind the projects",
    id: "story",
    symbol: "01",
    search: "about biography aqib person developer",
  },
  {
    title: "My toolkit",
    detail: "Frontend, data, motion and everyday tools",
    id: "skills",
    symbol: "02",
    search:
      "skills html css javascript react typescript tailwind supabase git github",
  },
  {
    title: "The originals",
    detail: "Browse the complete project collection",
    id: "originals",
    symbol: "03",
    search: "all projects work websites",
  },
  {
    title: "Let's build something",
    detail: contactEmail,
    id: "contact",
    symbol: "04",
    search: "contact hire email opportunity hello",
  },
];
export const storyChapters = [
  {
    eyebrow: "CHAPTER 01 · THE PERSON",
    title: "HI, I’M AQIB.",
    text: "A curious builder from Pakistan, turning ideas into websites and useful digital experiences.",
    image: true,
    contact: false,
  },
  {
    eyebrow: "CHAPTER 02 · THE CRAFT",
    title: "SMALL DETAILS.\nBETTER EXPERIENCES.",
    text: "I work across responsive layouts, React interfaces, dashboards and the interactions that make them feel right.",
    image: false,
    contact: false,
  },
  {
    eyebrow: "CHAPTER 03 · THE WORK",
    title: "IDEAS,\nMADE REAL.",
    text: "From MediCore to lab records and this very portfolio, every project is another chance to build, learn and refine.",
    image: false,
    contact: false,
  },
  {
    eyebrow: "CHAPTER 04 · WHAT’S NEXT",
    title: "THE NEXT CHAPTER\nCOULD BE OURS.",
    text: "Have an idea, a project or an opportunity? Let’s talk about what we can build.",
    image: false,
    contact: true,
  },
];
