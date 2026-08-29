import { NextResponse } from 'next/server'

import { siteConfig } from '@/lib/site-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Payload = {
  firstName?: string
  lastName?: string
  email?: string
  churchDomain?: string
  referralCode?: string
  // Which CTA the signup came from (header, footer, case-study:<slug>, etc).
  source?: string
  // Honeypot. Real users never fill this.
  company?: string
}

function clean(value: unknown, max = 2000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/**
 * Wait-list intake for the shared modal.
 *
 * Primary path: emails Emily via Resend (RESEND_API_KEY, WAITLIST_TO,
 * WAITLIST_FROM), matching the documented behavior in site-config.ts
 * ("Emily gets an email alert, and she reaches out personally").
 *
 * Secondary, best-effort path: if WAITLIST_SHEET_WEBHOOK_URL is set, also
 * appends a row to the CCM Wait List Signups Google Sheet via an Apps Script
 * web app. If that webhook is unset or slow/down, the signup still emails
 * Emily and the request still succeeds for the user. See
 * _handoff/google-sheets-waitlist-setup-2026-06-15.md for the Apps Script
 * setup steps.
 *
 * 2026-08-29: restored the Resend send. A prior edit made the Sheet webhook
 * a hard requirement (503 not_configured whenever WAITLIST_SHEET_WEBHOOK_URL
 * was unset), which silently broke every "Join the wait list" submission on
 * the live site since that env var was never set in Vercel. This brings the
 * endpoint back in line with the original handoff doc and with the sibling
 * /api/contact route, which never dropped the Resend path.
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
  const email = clean(body.email, 200)
  const churchDomain = clean(body.churchDomain, 200)
  const referralCode = clean(body.referralCode, 80)
  const source = clean(body.source, 120) || 'unknown'
  const timestamp = new Date().toISOString()

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 })
  }

  if (!churchDomain) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 })
  }

  const record = {
    firstName,
    lastName,
    email,
    churchDomain,
    referralCode,
    source,
    timestamp,
  }

  // Best-effort Google Sheet row. Never blocks or fails the request.
  const webhookUrl = process.env.WAITLIST_SHEET_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      })
    } catch {
      // Sheet logging is a nice-to-have. Keep going to the email send below.
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  const to = process.env.WAITLIST_TO || siteConfig.email
  const from =
    process.env.WAITLIST_FROM || `Create Church Media <noreply@${siteConfig.domain}>`
  const who = [firstName, lastName].filter(Boolean).join(' ') || email
  const subject = `[CCM wait list] New signup: ${who}${source ? ` (${source})` : ''}`
  const text = [
    'New wait list signup',
    '',
    `Name: ${who}`,
    `Email: ${email}`,
    `Church domain: ${churchDomain}`,
    `Referral code: ${referralCode || '(none)'}`,
    `Source: ${source}`,
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
