import type { Metadata } from 'next';
import TryIt from '@/components/api/TryIt';

export const metadata: Metadata = {
  title: 'Under the Hood',
  description: "Documentation for this site's own API routes, with live requests.",
};

const code = 'font-mono text-[13px] text-ink';

type Endpoint = {
  method: 'GET' | 'POST';
  path: string;
  summary: string;
  request?: string;
  responses: [string, string][];
  tryBody?: object;
  tryNote: string;
};

const endpoints: Endpoint[] = [
  {
    method: 'GET',
    path: '/api/github',
    summary:
      'Recent activity from my GitHub: when I last committed, to which repo, and how often in the last 30 days. It powers the live strip on the home page. GitHub is asked at most every 10 minutes, so visitors never use up its rate limit.',
    responses: [
      ['200', '{ activity: { repo, isPrivate, lastAt, count30d, unit } | null, cachedSeconds }'],
    ],
    tryNote: 'Sends a real request and shows the real response.',
  },
  {
    method: 'POST',
    path: '/api/contact',
    summary:
      'The contact form. It checks every field on the server, drops bot submissions caught by a hidden field, limits each visitor to 3 messages per 10 minutes, and sends the message to my inbox through Resend.',
    request: '{ name: string, email: string, message: string }',
    responses: [
      ['200', '{ ok: true }'],
      ['400', '{ error, fields: { name?, email?, message? } }'],
      ['429', '{ error }  more than 3 messages in 10 minutes'],
      ['502', '{ error }  the email service failed'],
    ],
    tryBody: {},
    tryNote: 'Sends an empty message on purpose, so you see the real validation errors. No email is sent.',
  },
];

export default function Page() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-28 pb-24 md:px-16 md:pt-44">
      <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] font-extrabold uppercase">
        Under the Hood
      </h1>
      <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-muted md:mt-10">
        This site runs on Next.js with two API routes of its own. Here is what each one does, and a button to call it.
      </p>

      <div className="mt-14 max-w-[56rem] divide-y divide-hairline border-y border-hairline md:mt-20">
        {endpoints.map((e) => (
          <article key={e.path} className="py-10 md:py-12">
            <h2 className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-md border px-2 py-0.5 font-mono text-xs tracking-[0.08em] ${e.method === 'GET' ? 'border-signal/50 text-signal' : 'border-crimson/60 text-alert'}`}
              >
                {e.method}
              </span>
              <span className="font-mono text-xl text-ink md:text-2xl">{e.path}</span>
            </h2>
            <p className="mt-4 max-w-[68ch] leading-relaxed text-muted">{e.summary}</p>

            <dl className="mt-6 space-y-3 text-sm">
              {e.request && (
                <div className="grid gap-1 sm:grid-cols-[6rem_1fr]">
                  <dt className="font-mono text-xs tracking-[0.08em] text-dim uppercase">Body</dt>
                  <dd className={code}>{e.request}</dd>
                </div>
              )}
              {e.responses.map(([status, shape]) => (
                <div key={status} className="grid gap-1 sm:grid-cols-[6rem_1fr]">
                  <dt className="font-mono text-xs tracking-[0.08em] text-dim tabular-nums">{status}</dt>
                  <dd className={`${code} break-words`}>{shape}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <p className="mb-3 text-sm text-dim">{e.tryNote}</p>
              <TryIt method={e.method} path={e.path} body={e.tryBody} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
