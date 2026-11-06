'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import type { FieldErrors } from '@/lib/contact';
import { links } from '@/data/site';

type Status = { kind: 'idle' | 'sending' } | { kind: 'sent'; email: string } | { kind: 'error'; text: string };

// resting border at dim/65 clears 3:1 non-text contrast on the ground; focus keeps the global ring
const field =
  'mt-2 w-full rounded-xl border border-dim/65 bg-ground/70 px-4 py-3 text-ink transition-colors hover:border-dim focus:border-signal aria-[invalid=true]:border-alert';
const label = 'font-mono text-xs tracking-[0.08em] text-dim uppercase';
const ORDER = ['name', 'email', 'message'] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const form = useRef<HTMLFormElement>(null);
  const sent = useRef<HTMLDivElement>(null);

  // move focus to what changed, so keyboard and screen-reader users hear the result
  useEffect(() => {
    if (status.kind === 'sent') sent.current?.focus();
  }, [status.kind]);
  useEffect(() => {
    const first = ORDER.find((k) => errors[k]);
    if (first) form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [errors]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === 'sending') return;
    const f = e.currentTarget;
    const body = Object.fromEntries(new FormData(f));
    setStatus({ kind: 'sending' });
    setErrors({});
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ kind: 'sent', email: String(body.email) });
        f.reset();
      } else if (res.status === 400 && json.fields) {
        setErrors(json.fields);
        setStatus({ kind: 'idle' });
      } else {
        setStatus({ kind: 'error', text: res.status === 429 ? json.error : "That didn't send." });
      }
    } catch {
      setStatus({ kind: 'error', text: "That didn't send." });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div ref={sent} tabIndex={-1} className="rounded-[18px] border border-hairline bg-ground/70 p-8">
        <p className="text-2xl font-medium text-ink">Sent.</p>
        <p className="mt-2 text-muted">
          I&apos;ll reply to you at <span className="text-ink">{status.email}</span>.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: 'idle' })}
          className="-mx-2 mt-4 px-2 py-3 font-mono text-xs tracking-[0.08em] text-signal uppercase hover:text-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  const input = (k: (typeof ORDER)[number]) => ({
    id: `contact-${k}`,
    name: k,
    required: true,
    className: field,
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `contact-${k}-error` : undefined,
  });
  const err = (k: keyof FieldErrors) =>
    errors[k] && (
      <p id={`contact-${k}-error`} className="mt-2 text-sm text-alert">
        {errors[k]}
      </p>
    );

  return (
    <form ref={form} onSubmit={submit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={label}>Name</label>
          <input autoComplete="name" maxLength={100} {...input('name')} />
          {err('name')}
        </div>
        <div>
          <label htmlFor="contact-email" className={label}>Email</label>
          <input type="email" autoComplete="email" maxLength={200} {...input('email')} />
          {err('email')}
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className={label}>Message</label>
        <textarea rows={7} maxLength={5000} {...input('message')} className={`${field} resize-y`} />
        {err('message')}
      </div>

      {/* honeypot: inert keeps it away from keyboards and screen readers; bots still fill it */}
      <div inert className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.kind === 'error' && (
        <p role="alert" className="text-alert">
          {status.text} Email me directly at{' '}
          <a href={`mailto:${links.email}`} className="text-ink underline">
            {links.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        aria-disabled={status.kind === 'sending'}
        className="pill gap-2 aria-disabled:cursor-wait aria-disabled:opacity-70"
      >
        {status.kind === 'sending' ? (
          <>
            <LoaderCircle aria-hidden size={16} className="animate-spin" /> Sending
          </>
        ) : (
          <>
            Send message <ArrowRight aria-hidden size={16} strokeWidth={1.75} />
          </>
        )}
      </button>
    </form>
  );
}
