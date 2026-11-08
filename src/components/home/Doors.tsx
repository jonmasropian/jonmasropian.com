'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { resetTilt, tilt } from '@/lib/tilt';

const doors = [
  { href: '/projects', title: 'Projects', line: "What I've built" },
  { href: '/biography', title: 'Biography', line: 'From Army Signal Corps to software' },
  { href: '/under-the-hood', title: 'Under the hood', line: "My site's API, live" },
  { href: '/contact', title: 'Contact', line: 'Send me a message' },
];

export default function Doors({ className }: { className?: string }) {
  return (
    <nav aria-label="Sections" className={className}>
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-[18px]">
        {doors.map((d) => (
          <li key={d.href}>
            <Link href={d.href} onPointerMove={tilt} onPointerLeave={resetTilt} className="glass door group">
              <ArrowUpRight
                aria-hidden
                strokeWidth={1.5}
                className="absolute top-4 right-4 size-5 text-dim transition-[color,translate] duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink lg:top-5 lg:right-5"
              />
              <span className="block text-lg font-medium text-ink lg:text-2xl">{d.title}</span>
              <span className="mt-1 block text-sm leading-snug text-muted lg:text-[15px]">{d.line}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
