import type { Metadata } from 'next';
import { FileDown } from 'lucide-react';
import CertCard from '@/components/biography/CertCard';
import { links } from '@/data/site';
import { career, certs, intro, type Role } from '@/data/biography';

export const metadata: Metadata = {
  title: 'Biography',
  description: 'Jon Masropian: 22 years running Army networks, now a Software Developer Apprentice. Career and certifications.',
};

const h2 = 'font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.9] font-extrabold uppercase';

function Duties({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="mt-3 max-w-[68ch] space-y-1.5 leading-relaxed text-muted">
      {items.map((d) => (
        <li key={d}>{d}</li>
      ))}
    </ul>
  );
}

function Entry({ role: r }: { role: Role }) {
  return (
    <li className="relative grid gap-x-10 gap-y-1 pb-12 pl-7 last:pb-0 md:grid-cols-[11rem_1fr] md:pl-0">
      {/* node on the rail; the current role is lit */}
      <span
        aria-hidden
        className={`absolute top-[0.45rem] left-0 size-[9px] -translate-x-1/2 rounded-full border md:left-[13.5rem] ${r.current ? 'border-signal bg-signal shadow-[0_2px_10px_rgb(90_160_255/0.6)]' : 'border-dim bg-ground'}`}
      />
      <p className={`pt-0.5 font-mono text-xs tracking-[0.08em] uppercase tabular-nums ${r.current ? 'text-signal' : 'text-dim'}`}>
        {r.when}
      </p>
      <div className="md:pl-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3 className="text-xl font-medium text-balance text-ink md:text-2xl">{r.title}</h3>
          {r.tag && (
            <span className="rounded-full border border-crimson/50 px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-ink/80 uppercase">
              {r.tag}
            </span>
          )}
        </div>
        <p className="mt-1 text-dim">{r.org}</p>
        <Duties items={r.duties} />
        {r.tools && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools">
            {r.tools.map((t) => (
              <li key={t} className="rounded-full border border-hairline px-3 py-1 font-mono text-xs text-dim">
                {t}
              </li>
            ))}
          </ul>
        )}
        {r.sub && (
          <div className="mt-6 border-l border-hairline pl-5">
            <p className="font-mono text-xs tracking-[0.08em] text-dim uppercase tabular-nums">{r.sub.when}</p>
            <h4 className="mt-1 text-lg font-medium text-ink">{r.sub.title}</h4>
            <Duties items={r.sub.duties} />
          </div>
        )}
      </div>
    </li>
  );
}

export default function Page() {
  const [featured, ...rest] = certs;
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-28 pb-24 md:px-16 md:pt-44">
      <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] font-extrabold uppercase">
        Biography
      </h1>

      <div className="mt-10 max-w-[65ch] space-y-5 text-lg leading-relaxed text-ink/90 md:mt-14 md:text-xl">
        {intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <a
        href={links.resume}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-2.5 font-mono text-xs tracking-[0.08em] text-signal uppercase transition-colors hover:border-signal/60 hover:text-ink"
      >
        <FileDown aria-hidden size={15} strokeWidth={1.75} />
        Résumé (PDF)
        <span className="sr-only">(opens in a new tab)</span>
      </a>

      <h2 className={`mt-24 md:mt-32 ${h2}`}>Career</h2>
      <ol className="relative mt-10 md:mt-14">
        {/* the rail */}
        <span aria-hidden className="absolute top-2 bottom-2 left-0 w-px bg-hairline md:left-[13.5rem]" />
        {career.map((r) => (
          <Entry key={r.title} role={r} />
        ))}
      </ol>

      <h2 className={`mt-24 md:mt-32 ${h2}`}>Certifications</h2>
      <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <div className="md:col-span-2 lg:col-span-3">
          <CertCard cert={featured} featured />
        </div>
        {rest.map((c) => (
          <CertCard key={c.slug} cert={c} />
        ))}
      </div>
    </section>
  );
}
