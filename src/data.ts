// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE.
//  Everything marked TODO is placeholder until the resume is in.
// ─────────────────────────────────────────────────────────────

export type LogEntry = {
  kind: 'work' | 'edu'
  from: string
  to: string
  org: string
  role: string
  where?: string
  url?: string
  points: string[]
}

export type Project = {
  name: string
  year: string
  blurb: string
  tags: string[]
  url?: string
  repo?: string
}

export const site = {
  first: 'YASH',
  last: 'TODO', // TODO surname from resume
  role: 'Software Engineer', // TODO
  location: 'TODO, India', // TODO
  timezone: 'Asia/Kolkata', // TODO confirm
  status: 'Open to new roles', // TODO
  email: 'hello@example.com', // TODO
  resumeUrl: '/resume.pdf', // drop the PDF in /public
  socials: [
    { label: 'GitHub', url: 'https://github.com/' }, // TODO
    { label: 'LinkedIn', url: 'https://linkedin.com/' }, // TODO
    { label: 'X', url: 'https://x.com/' }, // TODO
  ],
  manifesto:
    'I build software that feels fast, looks deliberate and survives contact with real users. I like the messy middle between design and engineering, where an idea has to become a system someone can trust.', // TODO
}

export const log: LogEntry[] = [
  {
    kind: 'work',
    from: '2025',
    to: 'NOW',
    org: 'Company One', // TODO
    role: 'Software Engineer',
    where: 'Remote',
    points: [
      'TODO: the biggest thing you shipped, with a number attached.',
      'TODO: a system you owned end to end.',
      'TODO: something you improved for the team.',
    ],
  },
  {
    kind: 'work',
    from: '2024',
    to: '2025',
    org: 'Company Two', // TODO
    role: 'Software Engineering Intern',
    where: 'City',
    points: ['TODO: what you built.', 'TODO: what it changed.'],
  },
  {
    kind: 'edu',
    from: '2021',
    to: '2025',
    org: 'University Name', // TODO
    role: 'B.Tech, Computer Science',
    points: ['TODO: GPA, honours, clubs, anything worth bragging about.'],
  },
]

export const projects: Project[] = [
  {
    name: 'Project Alpha', // TODO
    year: '2026',
    blurb: 'TODO: one sentence on what it does and why it is interesting.',
    tags: ['TypeScript', 'React', 'Postgres'],
    url: '#',
    repo: '#',
  },
  {
    name: 'Project Beta',
    year: '2025',
    blurb: 'TODO: one sentence on what it does and why it is interesting.',
    tags: ['Python', 'FastAPI', 'ML'],
    repo: '#',
  },
  {
    name: 'Project Gamma',
    year: '2025',
    blurb: 'TODO: one sentence on what it does and why it is interesting.',
    tags: ['Go', 'gRPC', 'Docker'],
    repo: '#',
  },
  {
    name: 'Project Delta',
    year: '2024',
    blurb: 'TODO: one sentence on what it does and why it is interesting.',
    tags: ['Next.js', 'Tailwind', 'Vercel'],
    url: '#',
  },
]

export const stack: Record<string, string[]> = {
  languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'], // TODO
  frontend: ['React', 'Next.js', 'Svelte', 'CSS', 'GSAP'],
  backend: ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis'],
  tooling: ['Git', 'Docker', 'AWS', 'Vercel', 'Linux'],
}
