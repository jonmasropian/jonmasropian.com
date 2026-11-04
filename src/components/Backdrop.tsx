'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Lives in the root layout so the loop never restarts between pages; inner pages just dim it.
export default function Backdrop() {
  const home = usePathname() === '/';
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (!v) return;
      if (mq.matches) v.pause();
      else v.play().catch(() => {}); // autoplay can be refused (low-power mode); the poster stays
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <video
        ref={video}
        className="h-full w-full object-cover object-bottom"
        poster="/video/horizon-poster.webp"
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/video/horizon-854.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/video/horizon-1280.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-ground transition-opacity duration-700 ease-out-expo"
        style={{ opacity: home ? 0 : 0.72 }}
      />
    </div>
  );
}
