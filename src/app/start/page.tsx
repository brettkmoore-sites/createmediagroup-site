import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { EmilyAvatar } from '@/components/EmilyAvatar'
import { Border } from '@/components/Border'
import { buildMetadata } from '@/lib/seo'

// noindex: this page is shared privately by Emily, not meant for public discovery
export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Get Started',
    description: 'Start your Create Church Media subscription.',
    path: '/start',
  }),
  robots: { index: false, follow: false },
}

export default function StartPage() {
  return (
    <>
      {/* Header */}
      <section aria-label="Get started">
        <Container className="mt-12 sm:mt-16">
          <FadeIn className="max-w-2xl">
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-cta)]">
              You&rsquo;re in
            </p>
            <h1 className="mt-4 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
              Ready to get started? Pick your plan.
            </h1>
            <p className="mt-6 text-lg text-neutral-600">
              Both plans give you the same access, same designer, same turnaround.
              The annual plan saves you $1,994 compared to paying month to month.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Pricing cards */}
      <section aria-label="Pricing" className="mt-14 sm:mt-18">
        <Container>
          <FadeInStagger faster className="grid grid-cols-1 gap-8 lg:grid-cols-2">

            {/* Monthly */}
            <FadeIn className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-neutral-200">
              <p className="font-display text-sm font-semibold uppercase tracking-wider text-neutral-500">
                Monthly
              </p>
              <p className="mt-6 flex items-baseline gap-x-2">
                <span className="font-display text-6xl font-semibold tracking-tight text-neutral-950">
                  $997
                </span>
                <span className="text-base text-neutral-500">/month</span>
              </p>
              <p className="mt-4 text-base text-neutral-600">
                Cancel any time. No long-term commitment.
              </p>
              <a
                href="/api/checkout"
                className="mt-8 block w-full rounded-md bg-neutral-950 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Subscribe monthly
              </a>
            </FadeIn>

            {/* Annual */}
            <FadeIn className="rounded-3xl bg-neutral-950 p-10 text-white shadow-xl ring-1 ring-neutral-900">
              <p className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-cta)]">
                Annual &mdash; 2 months free
              </p>
              <p className="mt-6 flex items-baseline gap-x-2">
                <span className="font-display text-6xl font-semibold tracking-tight text-white">
                  $9,970
                </span>
                <span className="text-base text-neutral-400">/year</span>
              </p>
              <p className="mt-4 text-base text-neutral-300">
                Billed as one payment, under $10,000. You save $1,994.
              </p>
              <a
                href="/api/checkout?plan=annual"
                className="mt-8 block w-full rounded-md bg-[var(--color-cta)] px-6 py-4 text-center text-sm font-semibold text-neutral-950 transition hover:brightness-110"
              >
                Subscribe annually
              </a>
            </FadeIn>

          </FadeInStagger>
        </Container>
      </section>

      {/* Emily trust block */}
      <section aria-label="About Emily" className="mt-20 sm:mt-28 mb-24 sm:mb-32">
        <Container>
          <Border className="pt-12">
            <FadeIn className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <EmilyAvatar size={72} />
              <div>
                <p className="font-display text-lg font-semibold text-neutral-950">
                  Every project comes to me directly.
                </p>
                <p className="mt-2 max-w-xl text-base leading-7 text-neutral-600">
                  Same designer, same access, same turnaround every time. Once
                  you&rsquo;re subscribed I&rsquo;ll follow up with next steps so
                  we can hit the ground running.
                </p>
                <p className="mt-3 text-sm text-neutral-500">
                  Any questions?{' '}
                  <a
                    href="mailto:emily@createchurchmedia.com"
                    className="font-medium text-neutral-950 underline underline-offset-2 hover:text-neutral-600"
                  >
                    Email me directly.
                  </a>
                </p>
              </div>
            </FadeIn>
          </Border>
        </Container>
      </section>
    </>
  )
}
