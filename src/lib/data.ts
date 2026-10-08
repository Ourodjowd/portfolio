export const PROFILE = {
  name: "OURO-DJOW Dimitri",
  role: "Full Stack Developer.",
  email: "ourodjowd3@gmail.com",
  phone: "+91 908 104 8626",
  phoneHref: "tel:+919081048626",
  location: "Rajkot, GUJARAT, India, 360003",
  resumeSummary: "Collaborative with a strong spirit of service, visionary, artistic and Inquisitive to understand the ’why’ of ideas. Experience in team environments, dependable follow-through and sound idea presentation.",
  github: "https://github.com/Ourodjowd",
  linkedin: "https://www.linkedin.com/in/dimitri-ouro-djow-76b51226a/",
  resumePath: "/resume.pdf",
};

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Certifications", href: "#certifications" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const SKILL_GROUPS = [
  {
    family: "Languages",
    skills: [
      { symbol: "Py", name: "Python" },
      { symbol: "Js", name: "JavaScript" },
      { symbol: "C", name: "C/C++" },
      { symbol: "Sq", name: "SQL" },
      { symbol: "Ht", name: "HTML" },
      { symbol: "Cs", name: "CSS" },
    ],
  },
  {
    family: "Tools & Frameworks",
    skills: [
      { symbol: "Nd", name: "Node.js" },
      { symbol: "Tf", name: "TensorFlow" },
      { symbol: "Sk", name: "scikit-learn" },
      { symbol: "Pb", name: "Power BI" },
      { symbol: "Mo", name: "Microsoft Office" },
    ],
  }
];

export const EXPERIENCE = [
  {
    type: "experience",
    year: "September 2024",
    title: "IMAGE Segmentation in Medical Imaging",
    place: "Research Experience",
    detail: "Use K-Means for the dataset preprocessing. Using the CNN for classification."
  },
  {
    type: "experience",
    year: "June 2023 - 2024",
    title: "Coordinator",
    place: "Robotic Club",
    detail: "Member of the robotic club."
  },
];

export const EDUCATION = [
  {
    type: "education",
    year: "Oct 2022 - Mar 2026",
    title: "B.Sc. Computer Engineering-AI",
    place: "Marwadi University",
    detail: "Department of Computer Engineering-AI. Cumulative GPA: 8/10."
  }
];

export const PROJECTS = [
  {
    id: "p1",
    index: "01",
    title: "Ranking_CV",
    kicker: "Automated CV ranking",
    description: "Developed an automated CV ranking system that parses applicant resumes and ranks them based on job description requirements. Applied LP techniques to extract key features and compute similarity scores for fair candidate evaluation.",
    features: ["Parses applicant resumes", "Computes similarity scores"],
    tech: ["Python", "Machine Learning", "Scikit-learn", "NLP"],
    github: "#",
    illustration: "/projects/ranking_cv.jpg"
  },
  {
    id: "p2",
    index: "02",
    title: "MCQ Generator",
    kicker: "AI question generator",
    description: "Created an AI-powered multiple-choice question generator from input text or documents. Designed to assist educators by generating meaningful questions and distractors using NLP-based summarisation and keyword extraction.",
    features: ["Generates meaningful questions", "Extracts keywords & summarises"],
    tech: ["Python", "NLP", "Transformers", "NLTK", "Streamlit"],
    github: "#",
    illustration: "/projects/mcq_generator.jpg"
  },
  {
    id: "p3",
    index: "03",
    title: "Smart Terminal",
    kicker: "Intelligent terminal interface",
    description: "Designed an intelligent terminal interface that assists users with commands, suggests optimisations, and automates repetitive shell tasks. Integrated AI to provide explanations of commands and error debugging in real-time.",
    features: ["Suggests optimisations", "Automates shell tasks", "Provides AI explanations"],
    tech: ["Python", "Bash", "OpenAI API", "Shell Scripting"],
    github: "#",
    illustration: "/projects/smart_terminal.jpg"
  },
  {
    id: "p4",
    index: "04",
    title: "Student Attendance System Using QR Code",
    kicker: "Secure attendance management",
    description: "Developed a secure and efficient attendance management system where students scan unique QR codes to record their presence. Implemented real-time verification, automated data logging, and analytics features to reduce manual errors and save administrative time. Enhanced system reliability with role-based access and a clean dashboard for monitoring attendance trends.",
    features: ["Real-time verification", "Automated data logging", "Role-based access", "Clean dashboard"],
    tech: ["Python", "Node.js"],
    github: "#",
    illustration: "/projects/qr_attendance.jpg"
  }
];

export const CERTIFICATIONS = [
  { title: "Network Addressing and Basic Troubleshooting", issuer: "CISCO" },
  { title: "Data Analytics Essentials", issuer: "CISCO" },
  { title: "Network Support and Security", issuer: "CISCO" },
  { title: "Networking Basics", issuer: "CISCO" },
  { title: "Certificate in Python", issuer: "Coursera" },
  { title: "Certificate in C and C++", issuer: "CISCO" },
  { title: "Design Thinking for Innovation", issuer: "Coursera" },
];

export const ACHIEVEMENTS = [
  {
    label: "Competition",
    caption: "Participate in Flipkart Grid 5.0",
    detail: "Academic achievements (July 2023)",
    number: "5.0",
    logo: "Flipkart"
  }
];
