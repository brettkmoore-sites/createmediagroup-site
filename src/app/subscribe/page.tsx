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
    'Start your Create Church Media subscription. Unlimited graphic design for churches, one flat monthly fee.',
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
          One flat monthly fee. Unlimited graphic design requests and
          revisions, same designer every time.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20 lg:mt-24">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
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
                Billed monthly through Stripe. Cancel any time. Every file is
                yours to keep.
              </p>

              <div className="mt-8">
                <a
                  href="/api/checkout"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--color-cta)] px-6 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-[var(--color-cta-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <span>Subscribe now</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>

              <p className="mt-4 text-sm text-neutral-500">
                Have a referral code? Enter it at checkout for $300 off, every
                month, for as long as you subscribe.
              </p>
            </div>
          </FadeIn>

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
          </FadeIn>
        </div>
      </Container>
    </>
  )
}
