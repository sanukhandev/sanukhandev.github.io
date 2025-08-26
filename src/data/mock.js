// Updated mock data based on the latest LinkedIn profile of Sanu Khan.
//
// This file follows the structure of the original mock.js used in the
// portfolio site.  It updates the hero tagline, about section, adds more
// comprehensive certifications, extends the blog list and populates
// testimonials from LinkedIn recommendations.

export const mockData = {
  // Hero section updated to reflect current tagline and expertise
  hero: {
    title: "Hi, I'm Sanu Khan ⚡",
    subtitle:
      "Tech Lead & full-stack builder shipping secure multi-tenant platforms and AI-powered apps — React/Angular • Node/NestJS • Java/Spring • Laravel/Django • DevOps • Web3. Based in Dubai 🇦🇪.",
    stats: {
      // years of experience reflects freelance work since 2011
      experience: "14+",
      projects: "150+",
      clients: "50+",
    },
  },

  // About section rewritten to summarise current roles and past experience
  about: {
    description:
      "I’m Sanu Khan — a seasoned full‑stack developer and tech lead with over a decade of experience building secure and scalable applications. As Lead Tech Analyst at techcarrot and former Full‑Stack Developer for Al‑Futtaim Enterprise IT, I’ve delivered solutions across Java, JavaScript, PHP, Python, Angular, React, Spring Boot, Django and Laravel. My journey spans research & development engineering to freelance web projects and network engineering, and I love mentoring teams and breaking down complex concepts.",
    currentLearning:
      "Currently deepening my skills in Web3 development, smart contracts with Solidity, and AI‑driven productivity tools while sharpening cybersecurity expertise and building LLM‑powered chat interfaces.",
    currentFocus:
      "Architecting multitenant SaaS platforms and building interactive, gamified learning applications using NestJS, Flutter, Angular, and Firebase. Focused on delivering secure, scalable systems with premium user experience.",
    funFact:
      "I can debug faster with Lo‑Fi beats and shawarma. Don’t ask me how — it just works.",
    skills: [
      { name: "JavaScript / TypeScript", level: 95 },
      { name: "React / Angular", level: 90 },
      { name: "Node.js / NestJS", level: 88 },
      { name: "PHP / Laravel", level: 85 },
      { name: "Java / Spring / Spring Boot", level: 85 },
      { name: "Python / Django", level: 80 },
      { name: "DevOps / CI‑CD", level: 80 },
      { name: "Docker / Kubernetes / Serverless", level: 75 },
      { name: "MongoDB / PostgreSQL / MySQL", level: 75 },
      { name: "Cloud (Azure / AWS)", level: 70 },
      { name: "Solidity / Web3", level: 60 },
    ],
  },

  // Services offered remain unchanged from the original site
  services: [
    {
      icon: "Code",
      title: "Web Development",
      description:
        "Full‑stack web applications using modern frameworks and technologies.",
      technologies: ["PHP", "Laravel", "React", "Node.js", "TypeScript"],
      projectsCount: "50+",
    },
    {
      icon: "Smartphone",
      title: "Mobile Development",
      description:
        "Cross‑platform mobile apps with Flutter and native performance.",
      technologies: ["Flutter", "Dart", "React Native", "iOS", "Android"],
      projectsCount: "25+",
    },
    {
      icon: "Database",
      title: "Backend & APIs",
      description:
        "Scalable backend systems and RESTful API development.",
      technologies: ["Node.js", "Express", "NestJS", "MongoDB", "MySQL"],
      projectsCount: "40+",
    },
    {
      icon: "Shield",
      title: "Security & Blockchain",
      description:
        "Cybersecurity research and blockchain application development.",
      technologies: [
        "Web3",
        "Smart Contracts",
        "Security Audit",
        "Encryption",
      ],
      projectsCount: "15+",
    },
    {
      icon: "Search",
      title: "CMS Development",
      description:
        "Custom content management systems and e‑commerce solutions.",
      technologies: ["WordPress", "Drupal", "Magento", "Custom CMS"],
      projectsCount: "35+",
    },
  ],

  // Tech stack icons retained from original
  techStack: [
    { name: "JavaScript", icon: "⚡", color: "#F7DF1E" },
    { name: "React", icon: "⚛️", color: "#61DAFB" },
    { name: "Node.js", icon: "🟢", color: "#339933" },
    { name: "PHP", icon: "🐘", color: "#777BB4" },
    { name: "Python", icon: "🐍", color: "#3776AB" },
    { name: "Java", icon: "☕", color: "#ED8B00" },
    { name: "Flutter", icon: "🎯", color: "#02569B" },
    { name: "MongoDB", icon: "🍃", color: "#47A248" },
    { name: "MySQL", icon: "🐬", color: "#4479A1" },
    { name: "Docker", icon: "🐳", color: "#2496ED" },
    { name: "AWS", icon: "☁️", color: "#FF9900" },
    { name: "Git", icon: "📦", color: "#F05032" },
  ],

  // Blogs extended to include all recent publications from LinkedIn
  blogs: [
    {
      title:
        "JavaScript Proxy Explained: Powerful Tips for Dynamic Object Handling",
      platform: "Dev.to",
      date: "Jul 7, 2025",
      description:
        "Learn how to use JavaScript's Proxy object to intercept and control object behaviour. Includes real‑world use cases like validation, logging, access control, and reactivity.",
      url: "#",
      tags: ["JavaScript", "Proxy", "Advanced"],
    },
    {
      title:
        "Creating a Merge Sort Array Prototype for Nested Objects, Strings, and Numbers in JavaScript",
      platform: "Dev.to",
      date: "Jun 18, 2025",
      description:
        "Extend JavaScript's Array prototype with a powerful and flexible merge sort function that supports nested objects, strings and numbers.",
      url: "#",
      tags: ["JavaScript", "Algorithms", "Data Structures"],
    },
    {
      title:
        "Why Project Euler Might Be the Most Powerful DSA Trainer You're Not Using Yet",
      platform: "Dev.to",
      date: "Jun 17, 2025",
      description:
        "Project Euler's mathematical puzzles offer an unbeatable way to build problem‑solving muscles. Discover how tackling these problems can supercharge your algorithmic thinking.",
      url: "#",
      tags: ["Problem Solving", "DSA", "Training"],
    },
    {
      title:
        "How Warp Terminal Saved Me from a Git Disaster (With Just One Prompt)",
      platform: "Dev.to",
      date: "May 8, 2025",
      description:
        "When Git rebasing goes wrong, Warp Terminal can be your smartest ally. Here's how it helped reset my branch in seconds.",
      url: "#",
      tags: ["Git", "Terminal", "Productivity"],
    },
    {
      title:
        "Building a Cost‑Effective Full‑Stack SaaS Platform: A Practical Guide for Small to Mid‑Size IT Startups",
      platform: "Dev.to",
      date: "Apr 22, 2025",
      description:
        "Walk through a pragmatic full‑stack architecture for launching a multi‑tenant SaaS platform using a blend of modern and battle‑tested technologies. Strike the perfect balance between performance, maintainability and cost.",
      url: "#",
      tags: ["SaaS", "Architecture", "Full‑Stack"],
    },
    {
      title:
        "Unravelling P vs NP: How This Unsolved Problem Influences the Future of AI with Quantum Computing",
      platform: "Dev.to",
      date: "Jun 20, 2024",
      description:
        "Explore how the P vs NP problem could unlock the next level of AI capabilities and why quantum computing adds a new dimension to this fundamental question.",
      url: "#",
      tags: ["AI", "Computer Science", "Quantum Computing"],
    },
    {
      title:
        "A Comprehensive Guide to Big O Notation and Efficient Coding Practices with Examples",
      platform: "Dev.to",
      date: "Jun 19, 2024",
      description:
        "Dive into algorithm analysis and learn how to evaluate time and space complexity using detailed JavaScript examples and the knapsack problem as a case study.",
      url: "#",
      tags: ["Algorithms", "Big O", "JavaScript"],
    },
    {
      title:
        "The Sliding Window Technique: A Powerful Algorithm for JavaScript Developers",
      platform: "Dev.to",
      date: "Apr 11, 2023",
      description:
        "One of the most useful techniques for solving problems involving arrays or strings. Learn how the sliding window technique works and use it to solve real‑world problems.",
      url: "#",
      tags: ["JavaScript", "Algorithms", "Problem Solving"],
    },
  ],

  // Comprehensive certifications pulled from LinkedIn
  certifications: [
    {
      title: "Introduction to Cyber security",
      issuer: "Simplilearn",
      date: "Apr 2023",
      credentialId: "MycyWRDvWyb",
      logo: "🔐",
      url: "#",
    },
    {
      title: "Problem solving (intermediate)",
      issuer: "HackerRank",
      date: "Feb 2022",
      credentialId: "56d29c99f14d",
      logo: "💻",
      url: "#",
    },
    {
      title: "React (Basic)",
      issuer: "HackerRank",
      date: "Feb 2022",
      credentialId: "81d2dee86295",
      logo: "💻",
      url: "#",
    },
    {
      title: "SQL (Intermediate)",
      issuer: "HackerRank",
      date: "Feb 2022",
      credentialId: "0568be8a2030",
      logo: "💻",
      url: "#",
    },
    {
      title: "Python (Basic)",
      issuer: "HackerRank",
      date: "Jan 2022",
      credentialId: "8124d504fd5d",
      logo: "💻",
      url: "#",
    },
    {
      title:
        "React – The Complete Guide (incl Hooks, React Router, Redux)",
      issuer: "Udemy",
      date: "Jan 2022",
      credentialId: "UC-119237dc-9851-489c-8f06-313fca17fdc1",
      logo: "🎓",
      url: "#",
    },
    {
      title: "JavaScript (Intermediate)",
      issuer: "HackerRank",
      date: "Dec 2021",
      credentialId: "99869ac75e82",
      logo: "💻",
      url: "#",
    },
    {
      title: "Java (Basic)",
      issuer: "HackerRank",
      date: "Dec 2020",
      credentialId: "04f1ab57c9fd",
      logo: "💻",
      url: "#",
    },
  ],

  // Featured projects unchanged from the original dataset
  projects: {
    featured: [
      {
        title: "LMS Infinity",
        description:
          "An interactive and scalable Learning Management System built for multi‑tenant SaaS environments. Features include gamified learning paths, real‑time progress tracking, and role‑based access.",
        category: "fullstack",
        technologies: [
          "NestJS",
          "Angular",
          "PostgreSQL",
          "Firebase",
          "Docker",
        ],
        status: "in‑progress",
        year: "2025",
      },
      {
        title: "NeuroCRM AI",
        description:
          "An AI‑powered, agentic CRM platform designed to automate customer interactions, lead scoring, and sales workflows. Features include an intelligent AI assistant, email summarisation, conversation tracking, and dynamic workflow triggers.",
        category: "fullstack",
        technologies: [
          "React",
          "NestJS",
          "PostgreSQL",
          "OpenAI API",
          "Redis",
        ],
        status: "in‑progress",
        year: "2025",
      },
      {
        title: "MedLab CRM",
        description:
          "Complete laboratory management system with patient tracking, test management, and reporting.",
        category: "fullstack",
        technologies: ["NestJS", "Angular", "PostgreSQL", "Flutter"],
        status: "in‑progress",
        year: "2024",
      },
      {
        title: "E‑Commerce Platform",
        description:
          "Scalable multi‑vendor marketplace with advanced analytics and payment integration.",
        category: "web",
        technologies: ["Laravel", "Vue.js", "MySQL", "Redis"],
        status: "completed",
        year: "2023",
      },
      {
        title: "Real Estate ERP",
        description:
          "Comprehensive property management system with CRM, inventory, and financial modules.",
        category: "fullstack",
        technologies: ["PHP", "React", "MySQL", "Docker"],
        status: "completed",
        year: "2023",
      },
      {
        title: "Social Network App",
        description:
          "Feature‑rich social networking platform with real‑time messaging and content sharing.",
        category: "fullstack",
        technologies: [
          "Node.js",
          "React Native",
          "MongoDB",
          "Socket.io",
        ],
        status: "completed",
        year: "2022",
      },
      {
        title: "Crypto Trading Bot",
        description:
          "Automated cryptocurrency trading system with advanced algorithms and risk management.",
        category: "web",
        technologies: ["Python", "FastAPI", "PostgreSQL", "Redis"],
        status: "completed",
        year: "2022",
      },
    ],
  },

  // Testimonials compiled from LinkedIn recommendations
  testimonials: [
    {
      rating: 5,
      text:
        "Sanu consistently delivers high‑quality solutions and has been an invaluable asset to our team. His professionalism and technical expertise inspire confidence and exceed client expectations.",
      author: "Simarpreet Kaur",
      position: "Key Accounts Manager",
      company: "Al‑Futtaim / techcarrot",
    },
    {
      rating: 5,
      text:
        "Sanu has a deep understanding of full‑stack technologies and strong problem‑solving skills. He resolved inconsistencies in our legacy applications and proved an asset to the development team.",
      author: "Manav Kaushal",
      position: "Java Full Stack Lead",
      company: "Al‑Futtaim / techcarrot",
    },
    {
      rating: 5,
      text:
        "As my mentor for two years, Sanu helped me rapidly improve my HTML, CSS and JavaScript skills. His patience, collaborative approach and leadership created a positive learning environment.",
      author: "Suraj Ks Kizhakkedath",
      position: "Senior Front‑End Developer",
      company: "techcarrot",
    },
  ],

  // Contact details unchanged
  contact: {
    location: "Dubai,United Arab Emirates",
    email: "khan.sanukhan@outlook.com",
    phone: "+971-563-860-850",
    social: {
      github: "https://github.com/sanukhandev",
      linkedin: "https://linkedin.com/in/sanukhandev",
    },
  },
};
