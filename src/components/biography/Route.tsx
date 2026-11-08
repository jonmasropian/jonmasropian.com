'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Role } from '@/data/biography';
import { MOTION_EVENT, isPaused } from '@/lib/motion';

export type Stop = Omit<Role, 'sub' | 'certIssuer'> & { sub?: boolean; chips?: { label: string; items: string[] } };

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const still = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.hasAttribute('data-paused') || isPaused();

const chip = 'rounded-full border border-hairline px-3 py-1 font-mono text-xs text-dim';

// Career as a route: each stop is a disclosure (WAI-ARIA APG). Duties start open on desktop; on phones only the
// current stop is open. Until hydration that phone default comes from CSS (scripting-enabled media query), so the
// server HTML holds every duty, no-JS visitors see them all, and nothing collapses after load.
export default function Route({ stops }: { stops: Stop[] }) {
  const uid = useId();
  const list = useRef<HTMLOListElement>(null);
  const [wide, setWide] = useState<boolean | null>(null);
  const [picked, setPicked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const mq = matchMedia('(min-width: 768px)');
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Draw the route once, when it first scrolls into view. Opacity never starts below 0.15.
  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (still()) return;
      ol.querySelectorAll(':scope > li').forEach((li, i) => {
        // segment i draws toward stop i+1; that stop lands 80ms before its segment ends
        const t = { duration: 250, delay: i === 0 ? 0 : (i - 1) * 300 + 270, easing: EASE, fill: 'backwards' as const };
        li.querySelector('[data-hop]')?.animate([{ opacity: 0.15, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], t);
        li.querySelector('[data-dot]')?.animate([{ opacity: 0.15 }, { opacity: 1 }], t);
        li.querySelector('[data-seg]')?.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { ...t, duration: 350, delay: i * 300 });
      });
    });
    io.observe(ol);
    const pause = () => isPaused() && ol.getAnimations({ subtree: true }).forEach((a) => a.finish());
    window.addEventListener(MOTION_EVENT, pause);
    return () => {
      io.disconnect();
      window.removeEventListener(MOTION_EVENT, pause);
    };
  }, []);

  function toggle(i: number, open: boolean, panelId: string) {
    setPicked((p) => ({ ...p, [i]: !open }));
    if (!open && !still()) document.getElementById(panelId)?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: EASE });
  }

  return (
    <ol ref={list} className="mt-10 md:mt-14">
      {stops.map((s, i) => {
        const id = `${uid}-${i}`;
        // null = not hydrated yet: CSS decides
        const open = picked[i] ?? (wide === null ? null : wide || !!s.current);
        const shown = open ?? true;
        return (
          <li key={s.title} className="relative pb-8 pl-[30px] last:pb-0 md:pb-10 md:pl-0 md:last:pb-0">
            <span
              data-dot
              aria-hidden
              className={`absolute left-[5px] -translate-x-1/2 rounded-full border md:left-[13.5rem] ${s.sub ? 'top-[0.65rem] size-[7px]' : 'top-[0.55rem] size-[11px]'} ${s.current ? 'border-crimson bg-crimson' : 'border-dim bg-ground'}`}
            />
            {i < stops.length - 1 && (
              <span
                data-seg
                aria-hidden
                className="absolute top-[calc(0.55rem+11px)] -bottom-[0.55rem] left-[5px] w-px origin-top bg-dim/45 md:left-[13.5rem]"
              />
            )}
            <button
              type="button"
              data-hop
              aria-expanded={shown}
              aria-controls={id}
              onClick={() => toggle(i, open ?? !!(wide || s.current), id)}
              className="group relative grid w-full cursor-pointer gap-0.5 py-0.5 pr-7 text-left md:grid-cols-[11rem_1fr] md:items-start md:gap-x-20"
            >
              <span className={`font-mono text-xs leading-normal tracking-[0.08em] uppercase tabular-nums md:pt-1 ${s.current ? 'text-ink' : 'text-dim'}`}>
                {s.when}
              </span>
              <span>
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span
                    className={`leading-[1.3] font-medium text-balance text-ink transition-colors duration-150 group-hover:text-signal ${s.sub ? 'text-[1.0625rem] md:text-lg' : 'text-xl md:text-2xl'}`}
                  >
                    {s.title}
                  </span>
                  {s.tag && (
                    <span className="rounded-full border border-crimson/50 px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-ink/80 uppercase">
                      {s.tag}
                    </span>
                  )}
                </span>
                <span className="block text-dim">{s.org}</span>
              </span>
              <ChevronDown
                aria-hidden
                size={14}
                strokeWidth={1.5}
                className={`absolute top-[30px] right-0 text-dim transition-transform duration-200 ease-out-expo md:top-2.5 ${open === null ? (s.current ? 'rotate-180' : 'md:rotate-180') : open ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              id={id}
              hidden={open === false}
              className={`pt-3 md:pl-64 ${open === null && !s.current ? 'max-md:[@media(scripting:enabled)]:hidden' : ''}`}
            >
              <ul className="max-w-[68ch] space-y-1.5 leading-relaxed text-muted">
                {s.duties.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              {s.chips && (
                <>
                  <p className="mt-3.5 font-mono text-xs tracking-[0.08em] text-dim uppercase">{s.chips.label}</p>
                  <ul className="mt-1.5 flex flex-wrap gap-2">
                    {s.chips.items.map((c) => (
                      <li key={c} className={chip}>
                        {c}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {s.tools && (
                <ul className="mt-3.5 flex flex-wrap gap-2" aria-label="Tools">
                  {s.tools.map((t) => (
                    <li key={t} className={chip}>
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
