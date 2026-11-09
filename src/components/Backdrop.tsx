'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { MOTION_EVENT, isPaused } from '@/lib/motion';

// Lives in the root layout so the loop never restarts between pages; inner pages just dim it.
export default function Backdrop() {
  const home = useSelectedLayoutSegment() === null; // not usePathname(): Vercel's ISR render of / reports /index
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (!v) return;
      if (mq.matches || isPaused()) return v.pause();
      // File picked here, not with <source media>: WebKit sometimes matched it before the viewport meta and gave phones the 1280 clip.
      if (!v.getAttribute('src')) v.src = matchMedia('(max-width: 768px)').matches ? '/video/horizon-854.mp4' : '/video/horizon-1280.mp4';
      v.play().catch(() => {}); // autoplay can be refused (low-power mode); the poster stays
    };
    // First play waits for the page's load event: with preload="none" the clip no longer competes with
    // fonts, JS and the LCP on phones. The poster is the clip's first frame, so the wait doesn't show.
    if (document.readyState === 'complete') sync();
    else window.addEventListener('load', sync, { once: true });
    mq.addEventListener('change', sync);
    window.addEventListener(MOTION_EVENT, sync);
    return () => {
      window.removeEventListener('load', sync);
      mq.removeEventListener('change', sync);
      window.removeEventListener(MOTION_EVENT, sync);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <video
        ref={video}
        // The clip's wave sits at 50% of the frame; 118% height, top-anchored, puts it at 59% of the viewport.
        className="h-[118%] w-full object-cover"
        poster="/video/horizon-poster.webp"
        muted
        loop
        playsInline
        preload="none"
      />
      {/* crimson light from the left (direction contract): ambient across the field, not a halo */}
      <div
        className="absolute inset-0 mix-blend-screen transition-opacity duration-700 ease-out-expo"
        style={{
          background: 'radial-gradient(50% 45% at 0% 55%, rgb(211 24 22 / 0.22), transparent 70%)',
          opacity: home ? 1 : 0.3,
        }}
      />
      <div
        className="absolute inset-0 bg-ground transition-opacity duration-700 ease-out-expo"
        style={{ opacity: home ? 0 : 0.72 }}
      />
    </div>
  );
}
