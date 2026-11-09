import type { Metadata } from 'next';
import { FileDown } from 'lucide-react';
import CertCard from '@/components/biography/CertCard';
import Route, { type Stop } from '@/components/biography/Route';
import { links } from '@/data/site';
import { career, certs, intro } from '@/data/biography';

export const metadata: Metadata = {
  title: 'Biography',
  description: 'Jon Masropian: 22 years running Army networks, now a Software Developer Apprentice. Career and certifications.',
};

const h2 = 'font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.9] font-extrabold uppercase';

// Oldest first. Entries without duties (college coursework) are plain stops with nothing to expand.
const stops: Stop[] = [...career]
  .reverse()
  .flatMap(({ sub, certIssuer, ...r }) => {
    const earned = certs.filter((c) => c.issuer === certIssuer).map((c) => c.title);
    const stop: Stop = certIssuer
      ? { ...r, org: `${r.org} · ${earned.length} ${certIssuer} developer certifications`, chips: { label: certIssuer, items: earned } }
      : r;
    return sub ? [stop, { ...sub, org: r.org.split(' · ')[0], sub: true }] : [stop];
  });

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
        className="tap mt-8 inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-2.5 font-mono text-xs tracking-[0.08em] text-signal uppercase transition-colors hover:border-signal/60 hover:text-ink"
      >
        <FileDown aria-hidden size={15} strokeWidth={1.75} />
        Résumé (PDF)
        <span className="sr-only">(opens in a new tab)</span>
      </a>

      <h2 className={`mt-24 md:mt-32 ${h2}`}>Career</h2>
      <Route stops={stops} />

      <h2 id="certifications" className={`mt-24 scroll-mt-8 md:mt-32 ${h2}`}>Certifications</h2>
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
