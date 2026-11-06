import { NextResponse } from 'next/server';
import { rateLimited, validateContact } from '@/lib/contact';
import { links } from '@/data/site';

// POST { name, email, message, company? } -> 200 { ok } | 400 { error, fields } | 429 | 502 | 503
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  // honeypot: real visitors never see the "company" field; bots fill it. Pretend success.
  if (body && typeof body === 'object' && 'company' in body && body.company) {
    return NextResponse.json({ ok: true });
  }

  const v = validateContact(body);
  if ('errors' in v) {
    return NextResponse.json({ error: 'Some fields need fixing.', fields: v.errors }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (rateLimited(ip, Date.now())) {
    return NextResponse.json({ error: 'Too many messages. Try again in 10 minutes.' }, { status: 429 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('contact: RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Email is not set up yet.' }, { status: 503 });
  }

  const { name, email, message } = v.data;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Jon Masropian Portfolio <portfolio@jonmasropian.com>', // domain verified in Resend 2026-11-06
      to: [links.email],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
    }),
  }).catch(() => null);

  if (!res?.ok) {
    console.error('contact: Resend failed', res?.status, await res?.text().catch(() => ''));
    return NextResponse.json({ error: 'The email service failed.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
