import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Sends a subscriber to Stripe's hosted Billing Portal, where they can
 * update their card, view invoices, or cancel without emailing Emily.
 *
 * Resolves the Stripe customer one of two ways:
 * - ?session_id=... — the Checkout Session id Stripe appends to the
 *   /subscribe/success redirect. Used right after checkout.
 * - ?email=... — typed into the "manage your subscription" form on
 *   /subscribe, for a subscriber returning later without a session id.
 *
 * ENV VARS EMILY NEEDS TO SET IN VERCEL:
 * - STRIPE_SECRET_KEY (already required by /api/checkout)
 *
 * ALSO REQUIRED: the Stripe Customer Portal must be turned on once, in the
 * Stripe dashboard under Settings -> Billing -> Customer portal. Until
 * that's enabled, Stripe rejects billing_portal/sessions requests.
 */
export async function GET(req: Request): Promise<NextResponse> {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const origin = new URL(req.url).origin

  if (!secretKey) {
    return NextResponse.redirect(`${origin}/subscribe?portal=not_configured`, {
      status: 303,
    })
  }

  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')
  const email = searchParams.get('email')

  const stripeGet = (path: string) =>
    fetch(`https://api.stripe.com/v1${path}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    })

  try {
    let customerId: string | undefined

    if (sessionId) {
      const res = await stripeGet(`/checkout/sessions/${encodeURIComponent(sessionId)}`)
      const data = (await res.json()) as { customer?: string }
      if (res.ok) customerId = data.customer
    } else if (email) {
      const res = await stripeGet(`/customers?email=${encodeURIComponent(email)}&limit=1`)
      const data = (await res.json()) as { data?: { id: string }[] }
      if (res.ok) customerId = data.data?.[0]?.id
    }

    if (!customerId) {
      return NextResponse.redirect(`${origin}/subscribe?portal=not_found`, {
        status: 303,
      })
    }

    const params = new URLSearchParams()
    params.set('customer', customerId)
    params.set('return_url', `${origin}/subscribe`)

    const portalRes = await fetch('https://api.stripe.com/v1/billing_portal/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const portalData = (await portalRes.json()) as { url?: string }

    if (!portalRes.ok || !portalData.url) {
      return NextResponse.redirect(`${origin}/subscribe?portal=error`, { status: 303 })
    }

    return NextResponse.redirect(portalData.url, { status: 303 })
  } catch {
    return NextResponse.redirect(`${origin}/subscribe?portal=error`, { status: 303 })
  }
}
