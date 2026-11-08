// Visitor's choice to pause the background video and CSS loops (WCAG 2.2.2). Shared by Backdrop and MotionToggle.
const KEY = 'background-paused';
export const MOTION_EVENT = 'background-motion';

export function isPaused(): boolean {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false; // storage blocked: default to playing
  }
}

export function setPaused(paused: boolean) {
  try {
    localStorage.setItem(KEY, paused ? '1' : '0');
  } catch {}
  window.dispatchEvent(new Event(MOTION_EVENT));
}
