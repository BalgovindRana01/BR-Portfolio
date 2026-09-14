export type Project = {
  number: string;
  url: string;
  demoUrl?: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  domain: string;
  technologies: string[];
  accent: string;
};

export const portfolio = {
  name: "Balgovind Rana",
  shortName: "BR.",
  role: "Computer Science × Full-Stack Development",
  location: "India",
  email: "rbalgovind21@gmail.com",
  phone: "8147776404",
  currentFocus: "FurniVerse",
  focus: "Full-stack development",
  profileDetails: [
    { label: "Currently building", value: "FurniVerse" },
    { label: "Open to", value: "Collaboration + new ideas" },
    { label: "Ask me about", value: "Full-stack development" },
    { label: "Public work", value: "4 repositories + live demo" },
  ],
  social: {
    github: "https://github.com/BalgovindRana01",
    linkedin: "https://www.linkedin.com/in/balgovind-rana-engineering-student/",
  },
  stats: [
    { value: "04", label: "Selected projects" },
    { value: "10+", label: "Technologies" },
    { value: "XX", label: "Certifications" },
    { value: "∞", label: "Curiosity" },
  ],
  skills: [
    { name: "C / C++", group: "Foundations" },
    { name: "C#", group: "Interactive" },
    { name: "Java", group: "Backend" },
    { name: "Python", group: "Data" },
    { name: "JavaScript", group: "Frontend" },
    { name: "TypeScript", group: "Frontend" },
    { name: "React", group: "Interface" },
    { name: "Next.js", group: "Web" },
    { name: "Node.js", group: "Backend" },
    { name: "Express", group: "Backend" },
    { name: "Django / FastAPI", group: "Python web" },
    { name: "HTML / CSS", group: "Web" },
    { name: "Tailwind CSS", group: "Interface" },
    { name: "SQL / MySQL", group: "Query" },
    { name: "MongoDB", group: "Document" },
    { name: "PostgreSQL", group: "Relational" },
    { name: "AWS / Azure", group: "Cloud" },
    { name: "Firebase", group: "Platform" },
    { name: "Netlify / Vercel", group: "Deploy" },
    { name: "Docker", group: "Ship" },
    { name: "Git / GitHub", group: "Collaborate" },
    { name: "Unity", group: "3D" },
    { name: "Blender", group: "Model" },
    { name: "NumPy / Pandas", group: "Analyze" },
    { name: "Power BI", group: "Visualize" },
    { name: "Figma", group: "Design" },
  ],
  projects: [
    {
      number: "01",
      url: "https://github.com/BalgovindRana01/Ecommerce-Store",
      demoUrl: "https://leafy-chimera-452142.netlify.app/",
      title: "Ecommerce Store",
      subtitle: "Full-stack commerce platform",
      description: "A TypeScript storefront for browsing and buying everyday goods, from groceries to lifestyle products.",
      role: "Full-stack / Web application",
      domain: "Digital commerce",
      technologies: ["TypeScript", "React", "E-commerce", "Web"],
      accent: "commerce",
    },
    {
      number: "02",
      url: "https://github.com/BalgovindRana01/UnityMain-Menu",
      title: "Unity Main Menu",
      subtitle: "Game interface and HUD system",
      description: "A user-friendly Unity interface with a main menu, gameplay HUD, achievements, settings, and win or game-over panels.",
      role: "Game UI / Interaction",
      domain: "Interactive systems",
      technologies: ["C#", "Unity", "Game UI", "HUD"],
      accent: "unity",
    },
    {
      number: "03",
      url: "https://github.com/BalgovindRana01/Dodgy-Maze-Game",
      title: "Dodgy Maze",
      subtitle: "3D Unity obstacle-avoidance game",
      description: "A maze game where players collect coins, avoid obstacles, track their score, and race toward the finish line.",
      role: "Game development / Systems",
      domain: "3D interaction",
      technologies: ["C#", "Unity", "Gameplay", "3D"],
      accent: "maze",
    },
    {
      number: "04",
      url: "https://github.com/BalgovindRana01/student-voice-assistant",
      title: "Student Voice Assistant",
      subtitle: "JavaScript voice interaction experiment",
      description: "An early JavaScript project exploring voice-driven interaction and a more natural way to access student-focused help.",
      role: "JavaScript / Prototype",
      domain: "Voice interaction",
      technologies: ["JavaScript", "Voice UI", "Web APIs"],
      accent: "voice",
    },
  ] satisfies Project[],
  timeline: [
    { phase: "01", title: "Education", detail: "Building strong Computer Science foundations and learning how software behaves underneath the interface.", year: "NOW", tag: "FOUNDATIONS", outcome: "Think in systems", tools: "C / C++ · Java · Python" },
    { phase: "02", title: "Projects", detail: "Turning ideas into working products across commerce, voice interaction, game UI, and 3D gameplay.", year: "ACTIVE", tag: "BUILDING", outcome: "Ship useful things", tools: "React · TypeScript · Unity" },
    { phase: "03", title: "FurniVerse", detail: "A current full-stack focus: collaborating, experimenting, and shaping a product from concept to experience.", year: "CURRENT", tag: "IN PROGRESS", outcome: "Build with others", tools: "Full-stack · Web · Product" },
    { phase: "04", title: "Future", detail: "More scale, stronger systems, and new opportunities to work with people solving interesting problems.", year: "AHEAD", tag: "OPEN CHANNEL", outcome: "Keep evolving", tools: "Cloud · Data · AI" },
  ],
};

export type Portfolio = typeof portfolio;