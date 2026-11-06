export const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/biography', label: 'Biography' },
  { href: '/cyber-lab', label: 'Cyber Lab' },
  { href: '/contact', label: 'Contact' },
] as const;

export const links = {
  email: 'jon.masropian@gmail.com',
  github: 'https://github.com/jonmasropian',
  linkedin: 'https://www.linkedin.com/in/jon-masropian-9607223a7/',
  resume: '/Jon-Masropian-Resume.pdf', // no-phone copy; source + builder in inspiration/resume/
} as const;
