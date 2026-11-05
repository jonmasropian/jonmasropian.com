import type { PointerEvent } from 'react';

const MAX_TILT = 8; // degrees; more than this reads as a gimmick

// Pointer handlers for `.glass` elements: write CSS vars only, so tilting never re-renders React.
export function tilt(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty('--rx', `${(0.5 - y) * MAX_TILT}deg`);
  el.style.setProperty('--ry', `${(x - 0.5) * MAX_TILT}deg`);
  el.style.setProperty('--mx', `${x * 100}%`);
  el.style.setProperty('--my', `${y * 100}%`);
}

export function resetTilt(e: PointerEvent<HTMLElement>) {
  e.currentTarget.style.setProperty('--rx', '0deg');
  e.currentTarget.style.setProperty('--ry', '0deg');
}
