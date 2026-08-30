import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Border } from '@/components/Border'
import { EmilyAvatar } from '@/components/EmilyAvatar'
import { siteConfig } from '@/lib/site-config'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Subscribe',
  description:
    'Start your Create Church Media subscription. Unlimited graphic design for churches, monthly or annual.',
  path: '/subscribe',
})

// Standalone checkout entry point. Not linked from primary nav: the wait
// list stays the public call to action (see site-config.ts). This page is
// for churches Emily has already talked to and is ready to bill directly,
// or for anyone she sends the link to once a spot is open.
export default function SubscribePage() {
  return (
    <>
      <PageIntro eyebrow="Subscribe" title="Start your subscription.">
        <p>
          Monthly or annual, one flat fee. Unlimited graphic design requests
          and revisions, same designer every time.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20 lg:mt-24">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <FadeIn>
              <div className="rounded-3xl bg-neutral-50 p-8 ring-1 ring-inset ring-neutral-900/5">
                <p className="font-display text-sm font-semibold uppercase tracking-wider text-neutral-500">
                  Monthly
                </p>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-semibold tracking-tight text-neutral-950">
                    ${siteConfig.pricing.monthly}
                  </span>
                  <span className="text-base text-neutral-500">/ month</span>
                </p>
                <p className="mt-4 text-base leading-7 text-neutral-600">
                  Billed monthly through Stripe. Cancel any time. Every file
                  is yours to keep.
                </p>

                <div className="mt-8">
                  <a
                    href="/api/checkout"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--color-cta)] px-6 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-[var(--color-cta-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    <span>Subscribe monthly</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>

                <p className="mt-4 text-sm text-neutral-500">
                  Have a referral code? Enter{' '}
                  <span className="font-medium text-neutral-700">CCM697</span>{' '}
                  at checkout to drop to $697/month, for as long as you
                  subscribe.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="rounded-3xl bg-neutral-950 p-8 text-white ring-1 ring-inset ring-neutral-900">
                <p className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-cta)]">
                  Annual &mdash; 2 months free
                </p>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-semibold tracking-tight text-white">
                    ${siteConfig.pricing.annual.toLocaleString()}
                  </span>
                  <span className="text-base text-neutral-400">/ year</span>
                </p>
                <p className="mt-4 text-base leading-7 text-neutral-300">
                  Billed as one payment, under $10,000. Save $1,994 compared
                  to paying monthly.
                </p>

                <div className="mt-8">
                  <a
                    href="/api/checkout?plan=annual"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--color-cta)] px-6 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-[var(--color-cta-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  >
                    <span>Subscribe annually</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>

                <p className="mt-4 text-sm text-neutral-400">
                  Already the discounted tier &mdash; referral codes apply to
                  the monthly plan only.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="mb-10 max-w-md">
              <EmilyAvatar size={72} />
              <div className="mt-5 rounded-2xl bg-neutral-50 p-5 ring-1 ring-inset ring-neutral-900/5">
                <p className="text-base text-neutral-700">
                  You are subscribing directly with Emily. One designer, end
                  to end, no account managers in between.
                </p>
              </div>
            </div>

            <Border className="mt-10 pt-10">
              <h2 className="font-display text-base font-semibold text-neutral-950">
                Prefer to talk first?
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                Reach Emily directly at{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </Border>

            <Border className="mt-10 pt-10">
              <h2 className="font-display text-base font-semibold text-neutral-950">
                Already subscribed?
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                Manage your subscription, update your card, view invoices, or
                cancel any time.
              </p>
              <form
                action="/api/customer-portal"
                method="GET"
                className="mt-4 flex flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="portal-email" className="sr-only">
                  Email used at checkout
                </label>
                <input
                  id="portal-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@yourchurch.org"
                  className="w-full rounded-md border-0 px-4 py-2.5 text-sm text-neutral-950 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-950"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
                >
                  Manage subscription
                </button>
              </form>
            </Border>
          </FadeIn>
        </div>
      </Container>
    </>
  )
}
