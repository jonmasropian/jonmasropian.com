'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { links } from '@/data/site';
import MotionToggle from './MotionToggle';

export default function SiteFooter() {
  // Segment, not usePathname(): Vercel's ISR render of / reports the path as /index.
  if (useSelectedLayoutSegment() === null) return null; // home carries these links in its GitHub strip
  const item = 'transition-colors hover:text-ink';
  return (
    <footer className="relative mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-2 px-5 py-6 font-mono text-xs tracking-[0.06em] text-dim md:px-16">
      <span className="w-full md:mr-auto md:w-auto">© {new Date().getFullYear()} Jon Masropian</span>
      <a className={item} href={`mailto:${links.email}`}>
        {links.email}
      </a>
      <MotionToggle className={`${item}`} />
      <Link className={item} href="/under-the-hood">
        Under the hood
      </Link>
      <a className={item} href={links.resume} target="_blank" rel="noreferrer">
        Résumé (PDF)
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a className={item} href={links.github} target="_blank" rel="noreferrer">
        GitHub
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a className={item} href={links.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </footer>
  );
}
