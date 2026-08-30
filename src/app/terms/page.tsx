import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { siteConfig } from '@/lib/site-config'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description:
    'What the Create Church Media subscription includes, how billing works, and how to cancel.',
  path: '/terms',
})

const LAST_UPDATED = 'August 29, 2026'

export default function TermsPage() {
  return (
    <>
      <PageIntro eyebrow="Terms" title="Terms of Service.">
        <p>Straightforward terms for a straightforward subscription. Last updated {LAST_UPDATED}.</p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20 lg:mt-24">
        <FadeIn className="mx-auto max-w-3xl">
          <div className="prose-blog">
            <p>
              These are the terms for the Create Church Media monthly
              subscription. If anything here is unclear, email Emily at{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{' '}
              before you subscribe and she will walk you through it.
            </p>

            <h2>What the subscription includes</h2>
            <p>
              The CCM Monthly Subscription is unlimited graphic design
              services for your church: sermon series, announcement
              graphics, social media, logos and branding, print and
              signage, and more. You send requests, Emily designs them, and
              revisions are included until you are happy with the result.
              Same-day rush requests are available when you flag the
              urgency.
            </p>
            <p>
              &ldquo;Unlimited&rdquo; means unlimited requests and
              revisions inside a single, shared queue with one designer.
              It is not a guarantee of unlimited simultaneous projects or
              instant turnaround. Emily works through requests in the order
              they come in, prioritizing flagged rush work.
            </p>

            <h2>Price and billing</h2>
            <p>
              The subscription is ${siteConfig.pricing.monthly} a month,
              billed monthly through Stripe, or ${siteConfig.pricing.annual}{' '}
              billed as a single annual prepay. Billing starts on the day you
              subscribe and renews on that same date each month (or each
              year, on the annual plan) until you cancel.
            </p>

            <h2>Month to month, cancel any time</h2>
            <p>
              The monthly plan is month-to-month. There is no long-term
              contract. You can cancel at any time through the subscriber
              portal (linked from your confirmation email and the
              subscribe page) or by emailing Emily. Canceling stops future
              billing; it does not retroactively refund the current billing
              period.
            </p>
            <p>
              The annual plan is a 12-month prepay in exchange for the
              discounted rate. If you need to cancel an annual plan early,
              email Emily directly and she will work out a fair resolution
              with you.
            </p>

            <h2>Refunds</h2>
            <p>
              Because design work is time and effort already spent, we do
              not offer refunds for completed months of service. If you
              cancel, you keep access through the end of the period you
              already paid for, and billing simply stops after that. If
              something about your experience did not meet expectations,
              email Emily first. She would rather make it right than have
              you leave unhappy.
            </p>

            <h2>File ownership</h2>
            <p>
              Everything designed for you under your subscription belongs
              to you: final files and source files both. If you ever
              cancel, you keep everything already delivered.
            </p>

            <h2>Fair use</h2>
            <p>
              This subscription is built around one designer working
              through one queue at a time for a reasonable number of
              churches. Emily reserves the right to pause new requests or
              discuss a different arrangement if usage patterns are clearly
              outside normal use for a single church's design needs.
            </p>

            <h2>Changes to these terms</h2>
            <p>
              If these terms change in a meaningful way, we will update the
              date at the top of this page and, for active subscribers,
              send a heads up by email.
            </p>

            <h2>Questions</h2>
            <p>
              Email Emily directly at{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{' '}
              with any question about your subscription, billing, or these
              terms.
            </p>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
