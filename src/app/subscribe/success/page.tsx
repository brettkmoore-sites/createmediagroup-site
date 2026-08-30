import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { siteConfig } from '@/lib/site-config'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Subscription confirmed',
  description: 'Your Create Church Media subscription is confirmed.',
  path: '/subscribe/success',
})

type SearchParams = { session_id?: string }

export default async function SubscribeSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { session_id: sessionId } = await searchParams

  return (
    <>
      <PageIntro eyebrow="Subscribed" title="You're in.">
        <p>
          Thanks for subscribing. Emily will be in touch within 24 hours to
          get you set up.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20 lg:mt-24">
        <FadeIn>
          <div className="max-w-xl rounded-3xl bg-neutral-50 p-8 ring-1 ring-inset ring-neutral-900/5">
            <p className="text-base leading-7 text-neutral-600">
              Questions in the meantime? Email Emily directly at{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
              >
                {siteConfig.email}
              </a>
              .
            </p>

            {sessionId ? (
              <p className="mt-6 border-t border-neutral-200 pt-6 text-base leading-7 text-neutral-600">
                <a
                  href={`/api/customer-portal?session_id=${encodeURIComponent(sessionId)}`}
                  className="font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
                >
                  Manage your subscription
                </a>{' '}
                to update your card, view invoices, or cancel any time.
              </p>
            ) : null}
          </div>

          <p className="mt-8 max-w-xl text-base text-neutral-600">
            <a
              href="/"
              className="font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
            >
              Back to the homepage
            </a>
          </p>
        </FadeIn>
      </Container>
    </>
  )
}
