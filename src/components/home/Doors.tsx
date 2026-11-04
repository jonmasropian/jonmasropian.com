'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { PointerEvent } from 'react';

const doors = [
  { href: '/projects', title: 'Projects', line: "What I've built" },
  { href: '/biography', title: 'Biography', line: 'From Army Signal Corps to software' },
  { href: '/cyber-lab', title: 'Cyber Lab', line: 'Watch a PostgreSQL session run' },
  { href: '/contact', title: 'Contact', line: 'Send me a message' },
];

const MAX_TILT = 8; // degrees; more than this reads as a gimmick

function tilt(e: PointerEvent<HTMLAnchorElement>) {
  if (e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty('--rx', `${(0.5 - y) * MAX_TILT}deg`);
  el.style.setProperty('--ry', `${(x - 0.5) * MAX_TILT}deg`);
  el.style.setProperty('--mx', `${x * 100}%`);
  el.style.setProperty('--my', `${y * 100}%`);
}

function reset(e: PointerEvent<HTMLAnchorElement>) {
  const s = e.currentTarget.style;
  s.setProperty('--rx', '0deg');
  s.setProperty('--ry', '0deg');
}

export default function Doors({ className }: { className?: string }) {
  return (
    <nav aria-label="Sections" className={className}>
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-[18px]">
        {doors.map((d) => (
          <li key={d.href}>
            <Link href={d.href} onPointerMove={tilt} onPointerLeave={reset} className="door group">
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
