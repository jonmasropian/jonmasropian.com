import Image from 'next/image';

// Rim light comes from the matte itself: a colour wash clipped to the cut-out (mask = same image),
// crimson from the left and cobalt from the right, per the direction contract.
export default function Portrait({ className }: { className?: string }) {
  const mask = { maskImage: 'url(/portrait-cutout.webp)', maskSize: '100% 100%' } as const;
  return (
    <div
      className={`aspect-[605/1000] [mask-image:linear-gradient(#000_70%,transparent_96%)] ${className ?? ''}`}
    >
      <div className="relative h-full w-full">
        <Image
          src="/portrait-cutout.webp"
          alt="Jon Masropian"
          fill
          priority
          sizes="(min-width: 1024px) 30vw, 60vw"
          className="object-contain brightness-[0.82] contrast-[1.08]"
        />
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-screen"
          style={{
            ...mask,
            background:
              'linear-gradient(90deg, rgb(211 24 22 / 0.7) 0%, rgb(211 24 22 / 0.22) 8%, transparent 16%, transparent 81%, rgb(2 82 172 / 0.35) 91%, rgb(2 82 172 / 0.8) 100%)',
          }}
        />
      </div>
    </div>
  );
}
