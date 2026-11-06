// Shared by the /api/contact route (trust boundary) and its tests.
export type ContactInput = { name: string; email: string; message: string };
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(body: unknown): { data: ContactInput } | { errors: FieldErrors } {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  // newlines stripped from name: it goes into the email subject
  const name = str(b.name).replace(/[\r\n]+/g, ' ');
  const email = str(b.email);
  const message = str(b.message);

  const errors: FieldErrors = {};
  if (!name) errors.name = 'Enter your name.';
  else if (name.length > 100) errors.name = 'Keep your name under 100 characters.';
  if (!EMAIL.test(email) || email.length > 200) errors.email = 'Enter a valid email so I can reply.';
  if (message.length < 10) errors.message = 'Write at least 10 characters.';
  else if (message.length > 5000) errors.message = 'Keep it under 5,000 characters.';

  return Object.keys(errors).length ? { errors } : { data: { name, email, message } };
}

// shortcut: in-memory, so each serverless instance counts separately; move to Upstash/Vercel KV if spam shows up
const hits = new Map<string, number[]>();
export const LIMIT = 3;
export const WINDOW_MS = 10 * 60_000;

export function rateLimited(key: string, now: number): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(key, recent);
    return true;
  }
  hits.set(key, [...recent, now]);
  return false;
}
