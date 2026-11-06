import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectCard from '@/components/projects/ProjectCard';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: "Websites and apps Jon Masropian has built, with live links and code.",
};

export default function ProjectsPage() {
  const [first, ...rest] = projects;
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-28 pb-24 md:px-16 md:pt-44">
      <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] font-extrabold uppercase">
        Projects
      </h1>

      <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-2 lg:gap-6">
        <div className="lg:col-span-2">
          <ProjectCard project={first} featured />
        </div>
        {rest.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <p className="mt-14 max-w-[60ch] text-muted">
        At ERA Solutions I also build backend systems for company clients, including a learning
        platform and a document-processing app. That work is private.
      </p>
      <p className="mt-4 max-w-[60ch] text-muted">
        This site is one too: it has its own API, documented with live requests on{' '}
        <Link href="/under-the-hood" className="text-signal underline hover:text-ink">
          Under the hood
        </Link>
        .
      </p>
    </section>
  );
}
