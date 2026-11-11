// All page content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Juan Bedoya",
  fullName: "Juan Esteban Bedoya Vasquez",
  role: "Backend and AI engineer",
  company: "Sua Eco",
  location: "Pereira, Colombia",
  email: "juanbedoya3918@gmail.com",
  github: "https://github.com/juancho391",
  // Optional. Leave empty to keep the phone number off the public page.
  phone: "",
};

// One agent request, before and after the rework at Sua Eco.
export const race = {
  playbackSpeed: 20,
  lanes: [
    {
      id: "before",
      label: "before",
      seconds: 120,
      steps: ["request", "slow queries", "no cache", "full memory", "answer"],
    },
    {
      id: "now",
      label: "now",
      seconds: 5,
      steps: ["request", "tuned queries", "cache", "lean memory", "answer"],
    },
  ],
} as const;

export const work = [
  {
    title: "Untangled architecture",
    line: "Found duplicated logic and tight coupling, then redrew the boundaries.",
  },
  {
    title: "Faster agents",
    line: "Tuned queries, added caching and trimmed agent memory: two minutes became five seconds.",
  },
  {
    title: "Observability pipelines",
    line: "Interactions, agent decisions and product metrics, recorded for analytics and training.",
  },
  {
    title: "CI/CD to GCP",
    line: "GitHub Actions workflows that deploy every change to Google Cloud.",
  },
];

export const caseStudy = {
  steps: [
    "58,000 leaf images",
    "clean and analyse",
    "fine-tune EfficientNet",
    "evaluate",
    "serve over an API",
    "the agent calls it",
  ],
  figures: [
    { value: 58000, suffix: "", label: "images in the dataset" },
    { value: 5, suffix: "", label: "classes the model tells apart" },
    { value: 89, suffix: "%", label: "F1 score" },
    { value: 88, suffix: "%", label: "precision" },
  ],
};

export type ProjectKind = "backend" | "ai" | "infra" | "web";

// SAMPLE ENTRIES. Replace with real projects (add a `href` to link one out).
export const projects: {
  name: string;
  kind: ProjectKind;
  what: string;
  stack: string;
  href?: string;
}[] = [
  {
    name: "Agent tool server",
    kind: "ai",
    what: "An MCP server exposing tools to agents.",
    stack: "Python, FastMCP",
  },
  {
    name: "Orders API",
    kind: "backend",
    what: "A REST API with auth and caching.",
    stack: "FastAPI, PostgreSQL, Redis",
  },
  {
    name: "Image classifier service",
    kind: "ai",
    what: "A fine-tuned vision model behind an API.",
    stack: "EfficientNet, FastAPI, Docker",
  },
  {
    name: "Deploy pipeline",
    kind: "infra",
    what: "Containers shipped on every merge.",
    stack: "GitHub Actions, Docker, GCP",
  },
  {
    name: "Realtime dashboard",
    kind: "web",
    what: "A Next.js front end over NestJS.",
    stack: "Next.js, NestJS, MongoDB",
  },
];

export const stack: { area: string; tools: string[] }[] = [
  { area: "Backend", tools: ["Python", "Django", "FastAPI", "NestJS", "Express", "FastMCP"] },
  { area: "Front end", tools: ["JavaScript", "React", "Next.js", "Tailwind CSS"] },
  { area: "Data", tools: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { area: "Infra", tools: ["Docker", "Linux", "Ubuntu", "Arch", "Omarchy", "GCP", "AWS", "GitHub Actions"] },
  { area: "AI tooling", tools: ["MCP servers", "OpenCode", "Skills", "Spec-driven development"] },
];

// Page sections, in order. Used by the nav, the command palette and the shell.
export const sections = [
  { id: "work", label: "Work" },
  { id: "case", label: "Classifier" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "shell", label: "Shell" },
  { id: "contact", label: "Contact" },
] as const;

export const background = [
  { label: "Based in", value: "Pereira, Colombia" },
  { label: "Studying", value: "Systems engineering, Universidad Libre, final semester" },
  { label: "Also trained in", value: "Cybersecurity, a MinTIC bootcamp" },
  { label: "Speaks", value: "Spanish, native. English, B1" },
];
