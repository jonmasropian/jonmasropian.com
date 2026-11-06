import Image from 'next/image';
import type { CSSProperties } from 'react';

// Rim light traced from the matte itself: a sideways-shifted copy of the cut-out minus the cut-out leaves a
// thin band just OUTSIDE one outline, so it never covers the photo (Jon's call, 2026-11-06).
// Crimson outside the left edge, cobalt outside the right, per the direction contract.
const BLEED = 12; // px of room past the photo's box: the right arm touches its edge, so the glow needs space
const rim = (shift: number, color: string): CSSProperties => ({
  background: color,
  maskImage: 'url(/portrait-cutout.webp), url(/portrait-cutout.webp)',
  maskSize: `calc(100% - ${2 * BLEED}px) 100%`,
  maskRepeat: 'no-repeat',
  maskPosition: `${BLEED + shift}px 0, ${BLEED}px 0`,
  maskComposite: 'subtract',
  WebkitMaskComposite: 'source-out',
});

export default function Portrait({ className }: { className?: string }) {
  return (
    <div className={`relative aspect-[605/1000] ${className ?? ''}`}>
      {/* the bottom fade lives on a box wider than the photo, so it doesn't clip the side glow */}
      <div
        className="absolute inset-y-0 [mask-image:linear-gradient(#000_70%,transparent_96%)]"
        style={{ left: -BLEED, right: -BLEED }}
      >
        <div className="absolute inset-y-0" style={{ left: BLEED, right: BLEED }}>
          <Image
            src="/portrait-cutout.webp"
            alt="Jon Masropian"
            fill
            priority
            sizes="(min-width: 1024px) 30vw, 60vw"
            className="object-contain brightness-[0.82] contrast-[1.08]"
          />
        </div>
        {/* blur sits on a wrapper: on the masked layer itself it would run before the mask */}
        <div aria-hidden className="absolute inset-0 mix-blend-screen blur-[1.5px]">
          <div className="absolute inset-0" style={rim(-6, 'rgb(211 24 22 / 0.9)')} />
          <div className="absolute inset-0" style={rim(6, 'rgb(70 140 255 / 0.9)')} />
        </div>
      </div>
    </div>
  );
}
