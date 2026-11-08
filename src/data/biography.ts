// Content approved by Jon 2026-11-06. Facts come from his resume and cert PDFs; never add duties or numbers.

export const intro = [
  'I retired from the U.S. Army in 2026 after 22 years as a Signal Corps communications technician. I kept networks running for hundreds of users on 7 tactical deployments to the Middle East and in garrison, and trained Soldiers along the way, including three years as a Drill Sergeant.',
  "In 2026 I earned Security+, completed Era Academy's full-stack bootcamp, and worked as a Desktop Analyst at Memorial Health System of Southwest Oklahoma. Now I'm a Software Developer Apprentice at ERA Solutions, where I build websites with the dev team and teach MySQL.",
];

export type Role = {
  when: string;
  title: string;
  org: string;
  tag?: string;
  current?: boolean;
  duties: string[];
  tools?: string[];
  certIssuer?: string; // shows that issuer's certs (from `certs`) as chips on this stop
  sub?: Omit<Role, 'sub' | 'org'>;
};

export const career: Role[] = [
  {
    when: 'Sept 2026 – now',
    title: 'Software Developer Apprentice',
    org: 'ERA Solutions LLC',
    current: true,
    duties: [
      "Teach MySQL through ERA's learning platform over Microsoft Teams.",
      'Build websites with the development team.',
      'Work with Vet Solutions 4 Life at Fort Sill to bring in students for CoITB-certified programs.',
    ],
  },
  {
    when: 'May – Aug 2026',
    title: 'Desktop Analyst',
    org: 'Memorial Health System of Southwest Oklahoma',
    duties: [
      'Troubleshot accounts and logins, and desktop and laptop hardware and software.',
      'Worked the Windows 25H2 rollout, VPN, VoIP, and imaging.',
      'Supported air and humidity monitoring for surgery.',
      'One of about seven analysts covering several sites.',
    ],
    tools: ['Active Directory', 'ServiceNow', 'NinjaOne'],
  },
  {
    when: 'Feb – Jul 2026',
    title: 'Full Stack Bootcamp',
    org: 'Era Academy',
    certIssuer: 'CoITB',
    duties: ['Completed the full-stack web development program.'],
  },
  {
    when: 'Jan 2026',
    title: 'CompTIA Security+ (SY0-701)',
    org: 'CompTIA',
    duties: ['Earned the certification; valid through January 2029.'],
  },
  {
    when: '2004 – 2026',
    title: 'IT & Network Support Supervisor / Senior Communications Technician',
    org: 'U.S. Army · 25H Signal Corps',
    tag: 'Active Secret clearance',
    duties: [
      'Ran networks for hundreds of users on 7 tactical deployments to the Middle East and in garrison.',
      'Kept systems in line with STIG and DoD policy.',
      'Handled Tier I and II help desk support and equipment accountability.',
      'Led teams of 10 to 30 and trained junior Soldiers.',
    ],
    sub: {
      when: '2016 – 2019',
      title: 'Drill Sergeant / Technical Training Lead',
      duties: ['Trained more than 2,000 trainees.'],
    },
  },
  {
    when: 'Coursework',
    title: 'Central Texas College',
    org: 'College coursework',
    duties: [],
  },
];

export type Cert = {
  slug: string;
  title: string;
  issuer: string;
  issued: string;
  expires?: string;
  number?: string;
  image?: string; // rendered from the PDF in inspiration/; absent = text-only card
  verify?: { label: string; code: string; url: string };
  badge?: string; // public Credly badge URL
};

export const certs: Cert[] = [
  {
    slug: 'secplus',
    title: 'CompTIA Security+ ce',
    issuer: 'CompTIA · SY0-701',
    issued: 'Jan 19, 2026',
    expires: 'Jan 19, 2029',
    image: '/certs/secplus.webp',
    verify: {
      label: 'Verification code',
      code: '3181fa2073234c82a5805f7eb2d56918',
      url: 'https://verify.comptia.org',
    },
    badge: 'https://www.credly.com/badges/8364fa35-763c-46f5-8f0b-7df35346c9c9/public_url',
  },
  { slug: 'coitb-html-css', title: 'Certified HTML/CSS Web Designer', issuer: 'CoITB', issued: 'Mar 7, 2026', expires: 'Mar 7, 2029', number: '6846', image: '/certs/coitb-html-css.webp' },
  { slug: 'coitb-javascript', title: 'Certified JavaScript Professional Developer', issuer: 'CoITB', issued: 'Apr 11, 2026', expires: 'Apr 11, 2029', number: '6920', image: '/certs/coitb-javascript.webp' },
  { slug: 'coitb-react', title: 'Certified ReactJS Framework Developer', issuer: 'CoITB', issued: 'May 16, 2026', expires: 'May 16, 2029', number: '7044', image: '/certs/coitb-react.webp' },
  { slug: 'coitb-mysql', title: 'Certified MySQL Backend Developer', issuer: 'CoITB', issued: 'Jun 13, 2026', expires: 'Jun 13, 2029', number: '7123', image: '/certs/coitb-mysql.webp' },
  { slug: 'coitb-python', title: 'CoITB Professional Python Developer', issuer: 'CoITB', issued: 'Jul 25, 2026', expires: 'Jul 25, 2029', number: '7248', image: '/certs/coitb-python.webp' },
  { slug: 'era-academy', title: 'Full Stack Bootcamp', issuer: 'Era Academy', issued: 'Completed Jul 2026' },
];

// Home, below the first screen. Approved by Jon 2026-11-08; don't add numbers he hasn't given.
export const stats = [
  { value: '22 years', label: 'Army IT' },
  { value: '2,000+', label: 'Soldiers trained' },
  { value: '6', label: 'Certifications in 2026' },
];

export const stack = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML/CSS'] },
  { group: 'Frameworks', items: ['React', 'Next.js', 'Tailwind CSS', 'Vite'] },
  { group: 'Data & tools', items: ['MySQL', 'Git/GitHub', 'Vercel', 'Square API'] },
  { group: 'Networks & security', items: ['TCP/IP', 'VLANs', 'VPN', 'Active Directory', 'STIG compliance'] },
];
