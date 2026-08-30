import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const RETURN_URL = 'https://www.createchurchmedia.com'

/**
 * Sends a subscriber to Stripe's hosted Billing Portal, where they can
 * update their card, view invoices, or cancel without emailing Emily.
 *
 * Resolves the Stripe customer one of three ways:
 * - ?customer_id=... — a known Stripe customer id, used directly.
 * - ?email=... — typed into the "manage your subscription" form on
 *   /subscribe, looked up via the Stripe API.
 * - ?session_id=... — the Checkout Session id Stripe appends to the
 *   /subscribe/success redirect. Used right after checkout.
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

  if (!secretKey) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 })
  }

  const { searchParams } = new URL(req.url)
  const customerIdParam = searchParams.get('customer_id')
  const email = searchParams.get('email')
  const sessionId = searchParams.get('session_id')

  if (!customerIdParam && !email && !sessionId) {
    return NextResponse.json(
      { error: 'Provide a customer_id or email query parameter' },
      { status: 400 },
    )
  }

  const stripeGet = (path: string) =>
    fetch(`https://api.stripe.com/v1${path}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    })

  try {
    let customerId: string | undefined = customerIdParam ?? undefined

    if (!customerId && email) {
      const res = await stripeGet(`/customers?email=${encodeURIComponent(email)}&limit=1`)
      const data = (await res.json()) as { data?: { id: string }[] }
      if (res.ok) customerId = data.data?.[0]?.id
    } else if (!customerId && sessionId) {
      const res = await stripeGet(`/checkout/sessions/${encodeURIComponent(sessionId)}`)
      const data = (await res.json()) as { customer?: string }
      if (res.ok) customerId = data.customer
    }

    if (!customerId) {
      return NextResponse.json({ error: 'No matching Stripe customer found' }, { status: 404 })
    }

    const params = new URLSearchParams()
    params.set('customer', customerId)
    params.set('return_url', RETURN_URL)

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
      return NextResponse.json({ error: 'Failed to create billing portal session' }, { status: 502 })
    }

    return NextResponse.redirect(portalData.url, { status: 303 })
  } catch {
    return NextResponse.json({ error: 'Unexpected error creating billing portal session' }, {
      status: 500,
    })
  }
}
