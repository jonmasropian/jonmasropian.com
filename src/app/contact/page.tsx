import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import { links } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send Jon Masropian a message, or reach him by email or LinkedIn.',
};

const direct = [
  { label: 'Email', value: links.email, href: `mailto:${links.email}` },
  { label: 'LinkedIn', value: 'jon-masropian', href: links.linkedin, external: true },
  { label: 'GitHub', value: 'jonmasropian', href: links.github, external: true },
  { label: 'Résumé', value: 'PDF, 1 page', href: links.resume, external: true },
];

export default function Page() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-28 pb-24 md:px-16 md:pt-44">
      <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] font-extrabold uppercase">Contact</h1>

      <div className="mt-10 grid gap-14 md:mt-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
        <div className="max-w-[46rem]">
          <p className="mb-10 max-w-[60ch] text-lg leading-relaxed text-muted">
            Hiring, a project, or a question about the work: send a message and it lands in my inbox.
          </p>
          <ContactForm />
        </div>

        <ul className="space-y-6 lg:pt-2">
          {direct.map((d) => (
            <li key={d.label}>
              <p className="font-mono text-xs tracking-[0.08em] text-dim uppercase">{d.label}</p>
              <a
                href={d.href}
                {...(d.external && { target: '_blank', rel: 'noreferrer' })}
                className="tap mt-1 inline-flex items-center gap-1.5 text-ink transition-colors hover:text-signal"
              >
                {d.value}
                {d.external && <ArrowUpRight aria-hidden size={15} strokeWidth={1.75} />}
                {d.external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
