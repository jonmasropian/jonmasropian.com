import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';

// `featured` = full-width row (image left, text right on lg) so one project alone still reads as a page.
export default function ProjectCard({ project: p, featured }: { project: Project; featured?: boolean }) {
  const link =
    'tap inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.08em] uppercase transition-colors';
  return (
    <article
      className={`panel flex flex-col overflow-hidden rounded-[18px] ${featured ? 'lg:flex-row' : ''}`}
    >
      <div
        className={`relative aspect-[16/10] shrink-0 overflow-hidden border-b border-hairline ${featured ? 'lg:aspect-auto lg:w-[56%] lg:border-r lg:border-b-0' : ''}`}
      >
        <Image
          src={p.image}
          alt={`${p.title} home page`}
          fill
          sizes={featured ? '(min-width: 1024px) 56vw, 100vw' : '(min-width: 1024px) 45vw, 100vw'}
          className="object-cover object-top"
        />
      </div>

      <div className={`flex flex-1 flex-col p-5 lg:p-7 ${featured ? 'lg:justify-center lg:p-10' : ''}`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h2 className={`font-medium text-ink ${featured ? 'text-3xl lg:text-4xl' : 'text-2xl'}`}>{p.title}</h2>
          {p.status && (
            <span className="rounded-full border border-crimson/50 px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-ink/80 uppercase">
              {p.status}
            </span>
          )}
        </div>
        <p className="mt-3 max-w-[60ch] leading-relaxed text-muted">{p.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
          {p.stack.map((s) => (
            <li key={s} className="rounded-full border border-hairline px-3 py-1 font-mono text-xs text-dim">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-6 pt-1 lg:mt-auto lg:pt-6">
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className={`${link} text-signal hover:text-ink`}>
              Live site <ArrowUpRight aria-hidden size={14} strokeWidth={1.75} />
              <span className="sr-only"> for {p.title} (opens in a new tab)</span>
            </a>
          )}
          <a href={p.code} target="_blank" rel="noreferrer" className={`${link} text-dim hover:text-ink`}>
            Code <ArrowUpRight aria-hidden size={14} strokeWidth={1.75} />
            <span className="sr-only"> for {p.title} (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
