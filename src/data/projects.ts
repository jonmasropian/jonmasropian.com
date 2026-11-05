// Copy approved by Jon 2026-11-04. Order = strength: team/company work first, class work last.
export type Project = {
  slug: string;
  title: string;
  status?: string;
  summary: string;
  stack: string[];
  image: string;
  live: string | null; // null hides the Live site button
  code: string;
};

export const projects: Project[] = [
  {
    slug: 'warriors-blood-coffee',
    title: 'Warriors Blood Coffee',
    status: 'In progress · Team project',
    summary:
      "An online store for a small coffee company, built with a team of five. I built the lower sections of the home page, started the About Us layout, and wired most of the checkout so orders go through the company's Square account.",
    stack: ['React', 'Vite', 'Square', 'Vercel'],
    image: '/projects/wbc.webp',
    live: 'https://warriors-blood-coffee.vercel.app',
    code: 'https://github.com/joshuasilvazero-source/warriors-blood-coffee-silva',
  },
  {
    slug: 'the-beans-place',
    title: "The Bean's Place",
    summary:
      'A coffee shop website built to practice React: reusable components, page sections with animation, and an interactive map.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Leaflet'],
    image: '/projects/beans.webp',
    live: 'https://the-beans-place-masropian.vercel.app',
    code: 'https://github.com/jonmasropian/the-beans-place-masropian',
  },
  {
    slug: 'barbershop-cut-and-snip',
    title: 'Barbershop Cut & Snip',
    status: 'Class project',
    summary:
      'A barbershop website from my JavaScript course. The main feature is a booking calendar, written in plain JavaScript with no libraries, where customers pick a day and time for an appointment.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    image: '/projects/barber.webp',
    live: 'https://barbershop-cut-and-snip.vercel.app',
    code: 'https://github.com/jonmasropian/Barbershop-Cut-and-Snip',
  },
];
