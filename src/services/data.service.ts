import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getProfileData() {
    return {
      name: "Rohith Kumar Saravanan",
      title: "Full-Stack Developer | AI & Cloud Enthusiast",
      resumeUrl: "./RohithKumarSaravanan.pdf",
      profilePicUrl: "./profile.jpeg",
      socialLinks: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/srohithkumar/", iconClass: "fab fa-linkedin-in" },
        { name: "GitHub", url: "https://github.com/CodeWithRohith", iconClass: "fab fa-github" },
        { name: "Email", url: "mailto:rohithkumar.s@unb.ca", iconClass: "fas fa-envelope" },
        { name: "Medium", url: "https://rohithkumars.medium.com/", iconClass: "fab fa-medium" }
      ],
      about: [
        "I'm a creative Full-Stack Developer with three years of experience at Infosys, specializing in scalable applications and AI/ML integration. My recent Master's in Computer Science from the University of New Brunswick has deepened my expertise in software engineering and machine learning.",
        "Passionate about clean code, system design, and cutting-edge tech, I thrive on building efficient, high-performing software solutions. Welcome to my digital workspace!"
      ]
    };
  }

  getJourneyData() {
    return [
      { 
        id: "bmo", 
        title: "Full Stack Developer", 
        institution: "BMO Bank of Montreal", 
        date: "July 2025 - Present", 
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/BMO_Logo.svg/375px-BMO_Logo.svg.png", 
        description: "Developing responsive frontends with Angular and building scalable backend services with NestJS.",
        icon: "fas fa-building-columns"
      },
      { 
        id: "unb", 
        title: "Master's in Computer Science", 
        institution: "University of New Brunswick", 
        date: "Sept 2023 - May 2025", 
        logoUrl: "./unb_logo.png",
        description: "Specialized in advanced software development, cybersecurity, and data analysis. Achieved a CGPA of 4.1/4.3.",
        icon: "fas fa-graduation-cap"
      },
      { 
        id: "infosys", 
        title: "Digital Specialist Engineer", 
        institution: "Infosys", 
        date: "Sept 2020 - Aug 2023", 
        logoUrl: "./logo.svg",
        description: "Led full-stack development for a warehouse management system, built a real-time CPQ system on Azure, and developed AI-powered Flask APIs.",
        icon: "fas fa-briefcase"
      },
      {
        id: "jntua",
        title: "Bachelor's in CS & Systems Engineering",
        institution: "JNTU Anantapur - India",
        date: "Aug 2016 - May 2020", 
        logoUrl: "https://www.jntua.ac.in/wp-content/uploads/2020/01/cropped-logo-1.png",
        description: "Built a solid foundation in software engineering, algorithms, and system architecture.",
        icon: "fas fa-user-graduate"
      }
    ];
  }

  getSkillsData() {
    return [
      { 
        category: 'Frontend',
        skills: [
          { name: "Angular", icon: "fab fa-angular", color: "text-red-500" },
          { name: "TypeScript", icon: "devicon-typescript-plain", color: "text-blue-500" },
          { name: "JavaScript", icon: "fab fa-js-square", color: "text-yellow-400" },
          { name: "HTML5", icon: "fab fa-html5", color: "text-orange-500" },
          { name: "CSS3 & Tailwind", icon: "fab fa-css3-alt", color: "text-blue-500" },
        ]
      },
      {
        category: 'Backend',
        skills: [
          { name: ".NET Core", icon: "devicon-dotnetcore-plain", color: "text-purple-500" },
          { name: "Node.js", icon: "fab fa-node-js", color: "text-green-500" },
          { name: "Python", icon: "fab fa-python", color: "text-blue-400" },
          { name: "Flask", icon: "devicon-flask-original", color: "text-gray-400" },
          { name: "C#", icon: "devicon-csharp-plain", color: "text-purple-400" },
        ]
      },
      {
        category: 'Databases',
        skills: [
          { name: "PostgreSQL", icon: "devicon-postgresql-plain", color: "text-indigo-500" },
          { name: "SQL Server", icon: "devicon-microsoftsqlserver-plain", color: "text-red-600" },
          { name: "MySQL", icon: "devicon-mysql-plain", color: "text-sky-600" },
        ]
      },
      {
        category: 'DevOps & Cloud',
        skills: [
          { name: "Microsoft Azure", icon: "fab fa-windows", color: "text-sky-500" },
          { name: "AWS", icon: "fab fa-aws", color: "text-orange-500" },
          { name: "Docker", icon: "fab fa-docker", color: "text-blue-600" },
          { name: "Git", icon: "fab fa-git-alt", color: "text-orange-600" },
        ]
      },
      {
        category: 'Other',
        skills: [
          { name: "Machine Learning", icon: "fas fa-brain", color: "text-pink-500" },
          { name: "REST APIs", icon: "fas fa-network-wired", color: "text-amber-500" },
        ]
      }
    ];
  }

  getProjectsData() {
    return [
      { 
        title: "Emotion Recognition in Poems (BERT)", 
        description: "Fine-tuned BERT on a Kaggle Poem Dataset to classify emotions, achieving high accuracy in understanding figurative language.", 
        tags: ["NLP", "BERT", "Python", "PyTorch"], 
        repoUrl: "https://github.com/CodeWithRohith/Recognizing-Emotions-in-Poems-using-BERT",
        liveDemoUrl: "https://codewithrohith.github.io/poem",
        icon: "fa-solid fa-feather"
      },
      { 
        title: "Mobile Adware Detection (ML)", 
        description: "Built a mobile adware detection system using XGBoost and Random Forest, integrated into a Flask-based API for mobile security.", 
        tags: ["Machine Learning", "Flask", "XGBoost"], 
        repoUrl: "https://github.com/CodeWithRohith/Classification-of-Mobile-Adware-Variants-Using-Machine-Learning-Techniques",
        icon: "fa-solid fa-shield-virus"
      },
      { 
        title: "Task Management System", 
        description: "Developed a web-based task management system with authentication and task tracking using ASP.NET Core and SQL Server.", 
        tags: [".NET", "SQL Server", "C#", "Angular"],
        repoUrl: null,
        liveDemoUrl: null,
        icon: "fa-solid fa-list-check"
      },
      { 
        title: "Secure File Sharing System", 
        description: "Created a secure file-sharing platform with AES encryption and JWT for authentication, using Flask and SQLite.", 
        tags: ["Security", "Flask", "AES", "Crypto"], 
        repoUrl: null,
        liveDemoUrl: null,
        icon: "fa-solid fa-file-shield"
      }
    ];
  }
  
  getContactData() {
    return {
      email: "rohithkumar.s@unb.ca",
      location: "Fredericton, NB, Canada"
    };
  }

  getPortfolioContextForAI(): string {
    const profile = this.getProfileData();
    const journey = this.getJourneyData();
    const skills = this.getSkillsData();
    const projects = this.getProjectsData();

    const context = `
      Rohith Kumar Saravanan's Portfolio Information:

      About Rohith:
      - Name: ${profile.name}
      - Title: ${profile.title}
      - Summary: ${profile.about.join(' ')}

      Professional and Academic Journey (most recent first):
      ${journey.map(item => `- ${item.title} at ${item.institution} (${item.date}). Description: ${item.description}`).join('\n')}

      Technical Skills:
      ${skills.map(category => `- ${category.category}: ${category.skills.map(skill => skill.name).join(', ')}`).join('\n')}

      Key Projects:
      ${projects.map(proj => `- Project: ${proj.title}. Description: ${proj.description}. Technologies: ${proj.tags.join(', ')}.`).join('\n')}
    `;
    return context;
  }
}