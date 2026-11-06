import Doors from '@/components/home/Doors';
import GithubStrip from '@/components/home/GithubStrip';
import Portrait from '@/components/home/Portrait';
import TypedLine from '@/components/home/TypedLine';

export const revalidate = 600; // GitHub strip refresh

const TYPED = '22 years running Army networks. Now I write software and teach MySQL.';

// Horizon layout: the video's wave sits at 59% of the viewport (see Backdrop). On lg+ every piece is
// placed against that line; below lg it becomes a short stack.
export default function HomePage() {
  return (
    <section className="relative mx-auto flex max-w-[1440px] flex-col px-5 pt-24 pb-6 lg:block lg:h-dvh lg:min-h-[640px] lg:px-16 lg:pt-0 lg:pb-0">
      <h1 className="font-display text-[21.5vw] leading-[0.84] font-extrabold tracking-[-0.01em] uppercase lg:absolute lg:bottom-[39%] lg:left-16 lg:text-[min(15vw,25dvh)]">
        Jon
        <span className="block text-dim lg:[mask-image:linear-gradient(#000_74%,rgb(0_0_0/0.35))]">Masropian</span>
      </h1>

      <TypedLine
        text={TYPED}
        className="mt-5 max-w-[34ch] text-lg leading-snug font-light text-muted lg:absolute lg:top-[63.5%] lg:left-[4.25rem] lg:mt-0 lg:max-w-none lg:text-[clamp(1.125rem,2.4dvh,1.375rem)]"
      />

      <Portrait className="mx-auto -mt-2 h-[44svh] lg:absolute lg:right-[9%] lg:bottom-[41%] lg:mx-0 lg:mt-0 lg:h-[47dvh]" />

      <Doors className="relative -mt-10 lg:absolute lg:inset-x-16 lg:top-[71%] lg:mt-0" />

      <GithubStrip className="mt-8 lg:absolute lg:inset-x-16 lg:bottom-[3.5%] lg:mt-0" />
    </section>
  );
}
