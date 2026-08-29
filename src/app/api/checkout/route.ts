import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// The recurring Price for the $997/mo CCM Monthly Subscription, created in
// Stripe (live mode). Not a secret, safe to keep in source.
const PRICE_ID = 'price_1U9uhrFv2iaRvQLl1iOr7hGl'

/**
 * Starts a Stripe Checkout session for the CCM monthly subscription and
 * sends the browser straight to Stripe's hosted checkout page. A plain
 * <a href="/api/checkout"> works with no client JS required.
 *
 * allow_promotion_codes lets a subscriber type CCM697 for $300 off, forever.
 *
 * Requires STRIPE_SECRET_KEY in the environment. That key is never
 * committed to the repo; it lives only in Vercel project env vars.
 */
export async function GET(req) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  const origin = new URL(req.url).origin

  const params = new URLSearchParams()
  params.set('mode', 'subscription')
  params.set('line_items[0][price]', PRICE_ID)
  params.set('line_items[0][quantity]', '1')
  params.set('allow_promotion_codes', 'true')
  params.set('success_url', `${origin}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`)
  params.set('cancel_url', `${origin}/subscribe`)

  try {
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const data = await res.json()

    if (!res.ok || !data.url) {
      return NextResponse.json({ ok: false, error: 'stripe_error' }, { status: 502 })
    }

    return NextResponse.redirect(data.url, { status: 303 })
  } catch {
    return NextResponse.json({ ok: false, error: 'stripe_error' }, { status: 502 })
  }
}
