import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'

import { siteConfig } from '@/lib/site-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Stripe webhook. Emails Emily when a subscriber signs up or cancels, via
 * Resend, using the same RESEND_API_KEY already set in Vercel for the wait
 * list and contact forms.
 *
 * ENV VARS EMILY NEEDS TO SET IN VERCEL:
 * - STRIPE_WEBHOOK_SECRET — after adding the endpoint below in the Stripe
 *   dashboard, Stripe generates a "Signing secret" (starts with whsec_).
 *   Copy that into Vercel. Requests without a valid signature are rejected.
 * - STRIPE_SECRET_KEY — already required by /api/checkout and
 *   /api/customer-portal. Used here to look up the customer's email, since
 *   the subscription event payload only carries the customer id.
 * - RESEND_API_KEY — already set for the wait list; reused here.
 *
 * SETUP EMILY STILL NEEDS TO DO IN STRIPE:
 * Dashboard -> Developers -> Webhooks -> Add endpoint ->
 * https://createchurchmedia.com/api/webhooks/stripe
 * Select events: customer.subscription.created, customer.subscription.deleted
 */

type StripeEvent = {
  type: string
  data: { object: { customer?: string } }
}

const SIGNATURE_TOLERANCE_SECONDS = 300

function verifySignature(payload: string, header: string, secret: string): boolean {
  const parts = Object.fromEntries(
    header.split(',').map((part) => {
      const [key, value] = part.split('=')
      return [key, value]
    }),
  )
  const timestamp = parts.t
  const signature = parts.v1
  if (!timestamp || !signature) return false

  const age = Math.abs(Date.now() / 1000 - Number(timestamp))
  if (!Number.isFinite(age) || age > SIGNATURE_TOLERANCE_SECONDS) return false

  const expected = createHmac('sha256', secret)
    .update(`${timestamp}.${payload}`)
    .digest('hex')

  const expectedBuf = Buffer.from(expected, 'hex')
  const signatureBuf = Buffer.from(signature, 'hex')
  if (expectedBuf.length !== signatureBuf.length) return false

  return timingSafeEqual(expectedBuf, signatureBuf)
}

async function lookupCustomerEmail(customerId: string, secretKey: string): Promise<string> {
  try {
    const res = await fetch(`https://api.stripe.com/v1/customers/${encodeURIComponent(customerId)}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    })
    const data = (await res.json()) as { email?: string }
    return res.ok && data.email ? data.email : customerId
  } catch {
    return customerId
  }
}

async function notifyEmily(subject: string, text: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const to = process.env.WAITLIST_TO || siteConfig.email
  const from =
    process.env.WAITLIST_FROM || `Create Church Media <noreply@${siteConfig.domain}>`

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], subject, text }),
    })
  } catch {
    // Best-effort. A failed notification email should not fail the webhook.
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const secretKey = process.env.STRIPE_SECRET_KEY
  const signatureHeader = req.headers.get('stripe-signature')

  if (!webhookSecret || !signatureHeader) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  const payload = await req.text()

  if (!verifySignature(payload, signatureHeader, webhookSecret)) {
    return NextResponse.json({ ok: false, error: 'invalid_signature' }, { status: 400 })
  }

  let event: StripeEvent
  try {
    event = JSON.parse(payload) as StripeEvent
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_payload' }, { status: 400 })
  }

  const customerId = event.data?.object?.customer

  if (event.type === 'customer.subscription.created' && customerId) {
    const email = secretKey ? await lookupCustomerEmail(customerId, secretKey) : customerId
    await notifyEmily(
      '[CCM] New subscriber',
      `New subscriber: ${email} just signed up for the CCM Monthly Subscription.`,
    )
  } else if (event.type === 'customer.subscription.deleted' && customerId) {
    const email = secretKey ? await lookupCustomerEmail(customerId, secretKey) : customerId
    await notifyEmily(
      '[CCM] Subscriber canceled',
      `Subscriber canceled: ${email} has canceled the CCM Monthly Subscription.`,
    )
  }

  return NextResponse.json({ ok: true })
}
