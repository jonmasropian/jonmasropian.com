'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import type { FieldErrors } from '@/lib/contact';
import { links } from '@/data/site';

type Status = { kind: 'idle' | 'sending' } | { kind: 'sent'; email: string } | { kind: 'error'; text: string };

const field =
  'mt-2 w-full rounded-xl border border-hairline bg-ground/70 px-4 py-3 text-ink transition-colors placeholder:text-dim/70 hover:border-dim/60 focus:border-signal focus:outline-none aria-[invalid=true]:border-crimson';
const label = 'font-mono text-xs tracking-[0.08em] text-dim uppercase';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<FieldErrors>({});

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form));
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
        form.reset();
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
      <div role="status" className="rounded-[18px] border border-hairline bg-ground/70 p-8">
        <p className="text-2xl font-medium text-ink">Sent.</p>
        <p className="mt-2 text-muted">
          I&apos;ll reply to you at <span className="text-ink">{status.email}</span>.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: 'idle' })}
          className="mt-6 font-mono text-xs tracking-[0.08em] text-signal uppercase hover:text-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  const err = (k: keyof FieldErrors) =>
    errors[k] && (
      <p id={`${k}-error`} className="mt-2 text-sm text-alert">
        {errors[k]}
      </p>
    );
  const a11y = (k: keyof FieldErrors) => ({
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  });

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Name</span>
          <input name="name" autoComplete="name" required maxLength={100} className={field} {...a11y('name')} />
          {err('name')}
        </label>
        <label className="block">
          <span className={label}>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} className={field} {...a11y('email')} />
          {err('email')}
        </label>
      </div>
      <label className="block">
        <span className={label}>Message</span>
        <textarea name="message" required rows={7} maxLength={5000} className={`${field} resize-y`} {...a11y('message')} />
        {err('message')}
      </label>

      {/* honeypot: hidden from people and screen readers, filled by bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
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

      <button type="submit" disabled={status.kind === 'sending'} className="pill gap-2 disabled:cursor-wait disabled:opacity-70">
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
