'use client';

import { useEffect, useState } from 'react';
import { MOTION_EVENT, isPaused, setPaused } from '@/lib/motion';

// Pause/play for the looping background video. Hidden when the OS already asks for reduced motion.
export default function MotionToggle({ className }: { className?: string }) {
  const [state, setState] = useState<'hidden' | 'playing' | 'paused'>('hidden');

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setState(mq.matches ? 'hidden' : isPaused() ? 'paused' : 'playing');
    sync();
    mq.addEventListener('change', sync);
    window.addEventListener(MOTION_EVENT, sync);
    return () => {
      mq.removeEventListener('change', sync);
      window.removeEventListener(MOTION_EVENT, sync);
    };
  }, []);

  if (state === 'hidden') return null;
  return (
    <button
      type="button"
      aria-pressed={state === 'paused'}
      onClick={() => setPaused(state === 'playing')}
      className={className}
    >
      {state === 'paused' ? 'Play background' : 'Pause background'}
    </button>
  );
}
