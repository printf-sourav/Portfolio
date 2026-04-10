export const profile = {
  name: 'Sourav Kumar Sahu',
  handle: 'printf-sourav',
  githubUrl: 'https://github.com/printf-sourav',
  linkedInUrl: 'https://www.linkedin.com/in/sourav-kumar-sahu-ab7003209/',
  email: 'lcs.souravkrsahu@gmail.com',
  location: 'Bangalore, Karnataka, India',
  tagline: 'Full Stack Developer',
  roles: [
    'Full Stack Developer',
    'TypeScript Builder',
    'JavaScript Enthusiast',
    'Open Source Contributor',
    'Problem Solver',
    'Security Learner'
  ],
  stats: [
    { count: 10, label: 'Public Repos' },
    { count: 2, label: 'Live Demos' },
    { count: 3, label: 'Primary Languages' }
  ]
};

export const projects = [
  {
    title: 'Online Coaching Management',
    category: 'Full Stack / Management',
    description: 'A coaching management platform for organising students, batches, and everyday operational workflows.',
    tech: ['JavaScript', 'React', 'Node.js'],
    icon: 'bi-journal-check',
    repoUrl: 'https://github.com/printf-sourav/Online-Coaching-Management'
  },
  {
    title: 'MediSync',
    category: 'TypeScript / Showcase',
    description: 'A TypeScript-based showcase project focused on modern UI structure and presentation flow.',
    tech: ['TypeScript', 'React', 'UI'],
    icon: 'bi-easel2',
    repoUrl: 'https://github.com/printf-sourav/MediSync'
  },
  {
    title: 'ShoeShop Management System',
    category: 'Full Stack / Management',
    description: 'A management system for handling shoe shop operations including inventory and workflow management.',
    tech: ['JavaScript', 'React', 'Management'],
    icon: 'bi-shop',
    repoUrl: 'https://github.com/printf-sourav/ShoeShop-management-system'
  },
  {
    title: 'SecSphere',
    category: 'Security / Web App',
    description: 'A security-focused web app built and deployed for practical protection-oriented workflows.',
    tech: ['JavaScript', 'Security', 'Web'],
    icon: 'bi-shield-lock',
    repoUrl: 'https://github.com/printf-sourav/SecSphere',
    demoUrl: 'https://sec-sphere.vercel.app'
  },
  {
    title: 'CSV DC ENV',
    category: 'Python / Data Utility',
    description: 'A Python project for working with CSV data and simple data-cleaning or conversion tasks.',
    tech: ['Python', 'CSV', 'Data Processing'],
    icon: 'bi-filetype-csv',
    repoUrl: 'https://github.com/printf-sourav/CSV_DC_ENV'
  },
  {
    title: 'QuickFile',
    category: 'TypeScript / Productivity',
    description: 'A file-focused product with a live deployment for quickly organising and handling files.',
    tech: ['TypeScript', 'Productivity', 'Files'],
    icon: 'bi-file-earmark-zip',
    repoUrl: 'https://github.com/printf-sourav/QuickFile',
    demoUrl: 'https://quick-file.vercel.app'
  },
  {
    title: 'Youtube Backend Clone',
    category: 'Backend / API',
    description: 'A JavaScript backend clone inspired by YouTube-style API structure and content handling.',
    tech: ['JavaScript', 'Node.js', 'API'],
    icon: 'bi-play-btn',
    repoUrl: 'https://github.com/printf-sourav/Youtube-backend-clone'
  }
];

export const contactLinks = {
  github: profile.githubUrl,
  linkedIn: profile.linkedInUrl,
  email: `mailto:${profile.email}`
};
