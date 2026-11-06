import type { Metadata } from 'next';
import Terminal from '@/components/cyber-lab/Terminal';
import { session } from '@/data/cyberLab';

export const metadata: Metadata = {
  title: 'Cyber Lab',
  description: 'A PostgreSQL session against a database of Jon Masropian’s own career.',
};

export default function Page() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-28 pb-24 md:px-16 md:pt-44">
      <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] font-extrabold uppercase">
        Cyber Lab
      </h1>
      <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-muted md:mt-10">
        A PostgreSQL session against a database of my own career. It&apos;s a recording, not a live connection.
      </p>
      <div className="mt-10 md:mt-14">
        <Terminal session={session} />
      </div>
    </section>
  );
}
