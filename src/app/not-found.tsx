import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page not found' };

// Same shell as the inner pages (PageHeading spacing); nav, footer and dimmed backdrop come from the root layout.
export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-28 pb-24 md:px-16 md:pt-44">
      <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] font-extrabold text-balance uppercase">
        Page not found
      </h1>
      <p className="mt-8 max-w-[60ch] text-lg text-muted">There&apos;s nothing at this address. The link may be old or mistyped.</p>
      <Link
        href="/"
        className="tap mt-8 inline-flex items-center rounded-full border border-hairline px-5 py-2.5 font-mono text-xs tracking-[0.08em] text-signal uppercase transition-colors hover:border-signal/60 hover:text-ink"
      >
        Back to home
      </Link>
    </section>
  );
}
