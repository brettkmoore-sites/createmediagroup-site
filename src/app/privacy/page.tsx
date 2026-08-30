import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { siteConfig } from '@/lib/site-config'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'What Create Church Media collects, why, and how to reach Emily with questions.',
  path: '/privacy',
})

const LAST_UPDATED = 'August 29, 2026'

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="Privacy" title="Privacy Policy.">
        <p>Plain language, no fine print games. Last updated {LAST_UPDATED}.</p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20 lg:mt-24">
        <FadeIn className="mx-auto max-w-3xl">
          <div className="prose-blog">
            <p>
              This page covers what information Create Church Media collects
              when you visit this site or subscribe, why we collect it, and
              who to talk to if you have questions. If anything here is
              unclear, email Emily directly at{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{' '}
              and she will answer you personally.
            </p>

            <h2>What we collect</h2>
            <p>
              When you join the wait list, reach out through the contact
              form, or subscribe, we collect the information you give us
              directly:
            </p>
            <ul>
              <li>Your name and email address</li>
              <li>Your church name and website or domain</li>
              <li>Any message details you send with a request</li>
              <li>
                Payment information, if you subscribe. This is collected and
                stored by Stripe, our payment processor. We never see or
                store your card number.
              </li>
            </ul>
            <p>
              We also collect basic, standard analytics on site visits
              (pages viewed, general location, device type) so we can see
              what is working. Nothing in that data identifies you
              personally unless you have also submitted a form.
            </p>

            <h2>How we use it</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Respond to your wait list signup or contact request</li>
              <li>
                Set up and manage your subscription, including billing and
                invoicing through Stripe
              </li>
              <li>
                Email you about your subscription: onboarding, project
                updates, receipts, and the occasional check-in
              </li>
              <li>Improve this site and how we communicate with churches</li>
            </ul>
            <p>
              We do not sell your information. We do not share it with
              anyone outside the tools we use to run this business (Stripe
              for payments, Resend for email delivery), and only to the
              extent needed to make those tools work.
            </p>

            <h2>Payment processing</h2>
            <p>
              All payments are handled by Stripe. Stripe is PCI-compliant
              and handles your card details directly. We receive
              confirmation that a payment succeeded and basic billing
              details (like your email and subscription status), but your
              full card number never touches our systems. Stripe has its
              own privacy policy covering how it handles payment data, at{' '}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                stripe.com/privacy
              </a>
              .
            </p>

            <h2>Email communication</h2>
            <p>
              If you subscribe, we use your email to communicate about your
              subscription: onboarding, design requests, billing receipts,
              and updates. If you join the wait list, we use your email to
              follow up about a spot opening. You can ask to be removed from
              any of this at any time by emailing Emily directly.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep your information for as long as you are a subscriber
              or an active lead, and for a reasonable period after in case
              you come back or have a billing question. If you would like
              your information deleted sooner, email Emily and she will take
              care of it.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask, at any time, to see what information we have
              about you, to correct it, or to have it deleted. Just email{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              If this policy changes in a meaningful way, we will update the
              date at the top of this page. Continuing to use the site or
              subscription after a change means you accept the update.
            </p>

            <h2>Questions</h2>
            <p>
              This is a small, one-person design business. If anything here
              raises a question, just email Emily at{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{' '}
              and you will hear back from her, not a support queue.
            </p>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
