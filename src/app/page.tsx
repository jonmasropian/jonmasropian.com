import Link from 'next/link';
import Doors from '@/components/home/Doors';
import GithubStrip from '@/components/home/GithubStrip';
import Portrait from '@/components/home/Portrait';
import { certs, stack, stats } from '@/data/biography';

export const revalidate = 600; // GitHub strip refresh

const TAGLINE = '22 years running Army networks. Now I write software and teach MySQL.';
const credly = certs.find((c) => c.slug === 'secplus')?.badge;
const credLink = 'tap block w-fit text-signal underline decoration-signal/40 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink sm:inline';

// Horizon layout: the video's wave sits at 59% of the viewport (see Backdrop). On lg+ every piece is
// placed against that line; below lg it becomes a short stack.
export default function HomePage() {
  return (
    <>
      <section className="relative mx-auto flex max-w-[1440px] flex-col px-5 pt-24 pb-6 lg:block lg:h-dvh lg:min-h-[640px] lg:px-16 lg:pt-0 lg:pb-0">
        <h1 className="font-display text-[21.5vw] leading-[0.84] font-extrabold tracking-[-0.01em] uppercase lg:absolute lg:bottom-[39%] lg:left-16 lg:text-[min(15vw,25dvh)]">
          Jon
          <span className="block text-dim lg:[mask-image:linear-gradient(#000_74%,rgb(0_0_0/0.35))]">Masropian</span>
        </h1>

        <div className="motion-safe:animate-[fade-in_300ms_ease-out] backing relative z-10 mt-5 mb-6 lg:absolute lg:mb-0 lg:top-[63%] lg:left-[4.25rem] lg:mt-0">
          <p className="max-w-[34ch] text-lg leading-snug font-light text-muted lg:max-w-none lg:text-[clamp(1.125rem,2.4dvh,1.375rem)]">
            {TAGLINE}
          </p>
          <p className="mt-3 font-mono text-xs leading-relaxed tracking-[0.06em] text-ink uppercase lg:mt-[0.9dvh] lg:leading-4">
            <a className={credLink} href={credly} target="_blank" rel="noreferrer">
              CompTIA Security+
              <span className="sr-only"> badge on Credly (opens in a new tab)</span>
            </a>
            <span aria-hidden className="hidden text-dim sm:inline"> · </span>
            <span className="block whitespace-nowrap sm:inline">Active Secret clearance</span>
            <span aria-hidden className="hidden text-dim sm:inline"> · </span>
            <Link className={`${credLink} whitespace-nowrap`} href="/biography#certifications">
              5 CoITB developer certs
            </Link>
          </p>
        </div>

        <Portrait className="mx-auto -mt-2 h-[44svh] lg:absolute lg:right-[9%] lg:bottom-[41%] lg:mx-0 lg:mt-0 lg:h-[47dvh]" />

        <Doors className="relative -mt-10 lg:absolute lg:inset-x-16 lg:top-[72%] lg:mt-0" />

        <GithubStrip className="mt-8 lg:absolute lg:inset-x-16 lg:bottom-[3.5%] lg:mt-0" />
      </section>

      {/* ground veil fades in over the horizon so the text never sits on the bright wave; the offset
          shadow carries it under the footer without adding scroll height (shadows don't count as overflow) */}
      <section
        aria-labelledby="record"
        className="bg-[linear-gradient(to_bottom,transparent,rgb(3_3_6/0.9)_8rem)] pt-24 pb-20 shadow-[0_12rem_0_rgb(3_3_6/0.9)] md:pt-32 md:pb-28"
      >
        <div className="mx-auto max-w-[1440px] px-5 lg:px-16">
          <h2 id="record" className="font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.9] font-extrabold uppercase">
            Record and stack
          </h2>
          <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <dl className="divide-y divide-hairline self-start border-y border-hairline">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between gap-6 py-5">
                  <dt className="text-muted">{s.label}</dt>
                  <dd className="order-first font-mono text-[clamp(2rem,4vw,2.75rem)] leading-none text-ink tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
            <dl className="panel grid grid-cols-2 gap-x-6 gap-y-7 rounded-[18px] p-5 sm:gap-x-10 lg:p-7">
              {stack.map((g) => (
                <div key={g.group}>
                  <dt className="font-mono text-xs tracking-[0.08em] text-dim uppercase">{g.group}</dt>
                  <dd className="mt-2">
                    <ul className="leading-relaxed text-ink/90">
                      {g.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
