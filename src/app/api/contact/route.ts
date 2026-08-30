import { NextResponse } from 'next/server'

import { siteConfig } from '@/lib/site-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Payload = {
  name?: string
  // The footer + contact-block forms send first/last separately; the full
  // /contact form still sends a single `name`. We reconcile both below.
  firstName?: string
  lastName?: string
  email?: string
  church?: string
  location?: string
  message?: string
  // Where the signup came from (e.g. the footer quick-capture), included in
  // Emily's signup email.
  source?: string
  // Honeypot. Real users never fill this.
  company?: string
}

function clean(value: unknown, max = 2000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/**
 * Wait list intake.
 *
 * Emails the signup to Emily via Resend, which reads its secrets from env
 * (RESEND_API_KEY, WAITLIST_TO/FROM). If Resend is not configured or the
 * send fails, we return a non-OK status so the client can fall back to a
 * plain mailto rather than silently losing a lead.
 */
export async function POST(req: Request): Promise<NextResponse> {
  let body: Payload
  try {
    body = (await req.json()) as Payload
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  // Drop bots that trip the honeypot, but look successful to them.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true })
  }

  const firstName = clean(body.firstName, 80)
  const lastName = clean(body.lastName, 80)
  // Prefer an explicit single name; otherwise compose it from first + last.
  const name = clean(body.name, 120) || [firstName, lastName].filter(Boolean).join(' ')
  const email = clean(body.email, 200)
  const church = clean(body.church, 200)
  const location = clean(body.location, 200)
  const message = clean(body.message, 4000)
  const source = clean(body.source, 80)

  // A valid email is the only hard requirement. The full /contact form also
  // collects a name; the footer quick-capture sends email only.
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  const to = process.env.WAITLIST_TO || siteConfig.email
  const from =
    process.env.WAITLIST_FROM || `Create Church Media <noreply@${siteConfig.domain}>`
  const who = name || email
  const subject = `[CCM wait list] New signup: ${who}${church ? ` from ${church}` : ''}${
    source ? ` (${source})` : ''
  }`
  const text = [
    'New wait list signup',
    '',
    `Name: ${name || '(not provided)'}`,
    `Email: ${email}`,
    `Church: ${church || '(not provided)'}`,
    `Location: ${location || '(not provided)'}`,
    `Source: ${source || '(not provided)'}`,
    '',
    'What they are looking for:',
    message || '(none provided)',
  ].join('\n')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text }),
    })
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
