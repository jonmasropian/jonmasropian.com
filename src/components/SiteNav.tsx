'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/site';

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-16 md:py-8"
      >
        <Link
          href="/"
          className="font-mono text-[13px] tracking-[0.14em] text-ink uppercase hover:text-signal"
        >
          Jon Masropian
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            if (href === '/contact') {
              return (
                <li key={href}>
                  <Link href={href} aria-current={active ? 'page' : undefined} className="pill">
                    {label}
                  </Link>
                </li>
              );
            }
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className="relative py-1 text-[15px] text-muted transition-colors hover:text-ink aria-[current=page]:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-crimson after:transition-transform after:duration-300 after:ease-out-expo hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 grid size-11 place-items-center text-ink md:hidden"
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[76px] bottom-0 bg-ground/95 backdrop-blur-md md:hidden"
      >
        <ul className="flex flex-col px-5 pt-6">
          {navLinks.map(({ href, label }) => (
            <li key={href} className="border-b border-hairline">
              <Link
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className="block py-5 font-display text-4xl font-extrabold text-muted uppercase aria-[current=page]:text-ink"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
