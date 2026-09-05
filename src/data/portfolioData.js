export const portfolioData = {
  personal: {
    name: "Piyush",
    role: "< FULL-STACK DEVELOPER />",
    description: "Building modern full-stack applications with MERN, AI and real-world engineering concepts.",
    location: "Ghaziabad, India",
    stats: [
      { label: "LeetCode Problems", value: "75+" },
      { label: "Full-Stack Development", value: "MERN" },
      { label: "AI-Integrated Applications", value: "AI" }
    ],
    aboutText: {
      heading: "Signal Received",
      p1: "Final-year Information Technology student and Full-Stack Developer specializing in the MERN stack and AI-integrated web applications.",
      p2: "I build production-style applications using React.js, Next.js, Node.js, Express.js and MongoDB, with practical experience in real-time systems, AI/LLM integration and payment processing.",
      p3: "My work combines frontend engineering, backend architecture, database design, API development, AI integration and deployment."
    }
  },
  experience: [
    {
      company: "KODBUD",
      role: "Web Development Intern",
      program: "Tech-Driven Internship Program",
      programStatus: "AICTE approved",
      startDate: "September 05, 2026",
      endDate: "October 05, 2026",
      duration: "4 Weeks",
      status: "UPCOMING MISSION",
      description: "Selected for a Web Development Internship at KODBUD under its Tech-Driven Internship Program. The internship provides hands-on exposure in web development and opportunities to contribute to assigned tasks and projects under mentorship.",
      objectives: [
        "Hands-on exposure in web development",
        "Contribution to assigned tasks and projects",
        "Work under mentorship",
        "Performance evaluation",
        "Practical development experience"
      ],
      completion: [
        "Upon successful completion, an Internship Completion Certificate will be awarded.",
        "An additional Letter of Recommendation may be provided based on performance and engagement."
      ],
      technologies: [],
      achievements: []
    }
  ],
  projects: [
    {
      id: "hireai",
      title: "HireAI",
      subtitle: "AI-Powered Job Portal",
      stack: ["Next.js", "Node.js", "Express.js", "MongoDB", "Google Gemini API", "JWT", "Git"],
      description: "Built a full-stack job portal where the Gemini API auto-matches candidates to job listings based on skills and experience.",
      features: [
        "AI candidate-job matching",
        "Resume parser",
        "Skill extraction",
        "Education extraction",
        "Project extraction",
        "Match score generation",
        "RAG-style retrieval workflow",
        "JWT + bcrypt authentication",
        "Recruiter/candidate roles",
        "Vercel frontend",
        "Render API"
      ],
      githubUrl: "",
      liveUrl: ""
    },
    {
      id: "bloodtwin",
      title: "BloodTwin",
      subtitle: "Real-Time Blood Donation Platform",
      stack: ["React.js", "Node.js", "Express.js", "Socket.io", "Google Gemini SDK", "MongoDB", "Git"],
      description: "Built a real-time platform connecting requesters, hospitals, blood banks and donors.",
      features: [
        "MongoDB 2dsphere geospatial queries",
        "Radius-based donor matching",
        "5 km → 10 km → 25 km search",
        "Gemini AI donor eligibility screening",
        "Socket.io real-time notifications",
        "Firebase Cloud Messaging fallback",
        "Optimistic locking",
        "Prevention of concurrent over-allocation"
      ],
      githubUrl: "",
      liveUrl: ""
    },
    {
      id: "shopease",
      title: "ShopEase",
      subtitle: "Full-Stack E-Commerce Platform",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe", "Razorpay", "JWT", "Git"],
      description: "Built a full-featured MERN e-commerce platform with product catalog, cart and checkout.",
      features: [
        "Product catalog",
        "Cart",
        "Checkout",
        "Stripe integration",
        "Razorpay integration",
        "Webhook-based order verification",
        "JWT authentication",
        "Customer/admin roles",
        "Admin panel",
        "Product management",
        "Order management"
      ],
      githubUrl: "",
      liveUrl: ""
    }
  ],
  skills: {
    frontend: ["React.js", "Next.js", "Redux", "Tailwind CSS", "Bootstrap", "Recharts", "HTML5", "CSS3"],
    backend: ["Node.js", "Express.js", "REST API Design", "JWT Authentication", "Socket.io"],
    languages: ["JavaScript (ES6+)", "TypeScript (basics)", "Python", "SQL"],
    database: ["MongoDB", "MongoDB Geospatial / 2dsphere", "MySQL", "Redis (basics)"],
    ai: ["Google Gemini API/SDK", "Retrieval-Augmented Generation (RAG)", "Prompt Engineering", "n8n Workflow Automation"],
    payments: ["Stripe", "Razorpay", "Webhook-based Integration"],
    tools: ["Git", "GitHub", "Postman", "VS Code", "Vercel", "Render", "Firebase"]
  },
  education: [
    {
      id: "btech",
      institution: "ABES Engineering College",
      degree: "B.Tech — Information Technology",
      period: "2023 – 2027",
      location: "Ghaziabad, Uttar Pradesh, India"
    },
    {
      id: "12th",
      institution: "Bright Way Inter College",
      degree: "Higher Secondary Education (12th)",
      period: "2021 – 2022",
      location: "Lucknow, Uttar Pradesh, India"
    }
  ],
  certifications: [
    {
      id: "claude",
      title: "Claude with the Anthropic API",
      issuer: "Anthropic",
      date: "March 2026"
    },
    {
      id: "deloitte",
      title: "Data Analytics Job Simulation",
      issuer: "Deloitte × Forage",
      date: "March 2026"
    },
    {
      id: "ibm-cloud",
      title: "Cloud Computing Fundamentals",
      issuer: "IBM SkillsBuild",
      date: "2026"
    },
    {
      id: "ibm-python",
      title: "Python 101 for Data Science",
      issuer: "IBM / Cognitive Class",
      date: "December 2024"
    },
    {
      id: "tcs-esg",
      title: "ESG Job Simulation",
      issuer: "TCS × Forage",
      date: "December 2024"
    }
  ],
  contact: {
    heading: "Let's Build Something Together",
    subheading: "Have an idea, opportunity, or project? Let's connect.",
    email: "piyushyadav2242005@gmail.com",
    phone: "+91-6393535706",
    location: "Ghaziabad, India",
    socials: {
      github: "",
      linkedin: "",
      email: "mailto:piyushyadav2242005@gmail.com"
    }
  }
};
