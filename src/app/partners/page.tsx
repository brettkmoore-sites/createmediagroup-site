import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Border } from '@/components/Border'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = buildMetadata({
  title: 'Partner Program',
  description:
    'Refer a church to Create Church Media and earn 10% every month they stay subscribed. Built for pastors, church consultants, and ministry networks.',
  path: '/partners',
})

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Apply for a referral link',
    body: 'Fill out the form below. Emily reviews every application personally. Approval usually takes one business day.',
  },
  {
    step: '02',
    title: 'Share your link',
    body: 'You get a unique referral link. Share it in your newsletter, your network, or one-on-one with a church you think would benefit.',
  },
  {
    step: '03',
    title: 'Earn 10% every month',
    body: 'When a church subscribes through your link, you earn 10% of their monthly subscription for as long as they stay. $997/month subscription = $99.70 to you, every month.',
  },
]

const GOOD_FIT = [
  'Pastors who work with other churches in their network',
  'Church planters and denominational leaders',
  'Ministry consultants and coaches',
  'Church media directors who know other churches in need',
  'Christian business owners who serve the local church',
]

export default function PartnersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Partner Program"
        title="Refer a church. Earn every month they stay."
      >
        <p>
          If you know a church that would benefit from having a dedicated
          graphic designer, CCM&rsquo;s partner program pays you 10% of their
          monthly subscription for as long as they stay subscribed. No selling.
          Just a referral link and an honest recommendation.
        </p>
      </PageIntro>

      {/* How it works */}
      <section aria-label="How it works" className="mt-24 sm:mt-32">
        <Container>
          <FadeIn>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950">
              How it works
            </h2>
          </FadeIn>
          <FadeInStagger faster className="mt-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {HOW_IT_WORKS.map((item) => (
                <FadeIn key={item.step}>
                  <Border className="pt-8">
                    <p className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-cta)]">
                      {item.step}
                    </p>
                    <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-neutral-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-neutral-600">
                      {item.body}
                    </p>
                  </Border>
                </FadeIn>
              ))}
            </div>
          </FadeInStagger>
        </Container>
      </section>

      {/* Who this is for */}
      <section aria-label="Who this is for" className="mt-24 sm:mt-32">
        <Container>
          <FadeIn>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950">
              Who this is for
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
              This works best when the referral is genuine. People who tend to
              be a good fit:
            </p>
            <ul role="list" className="mt-8 divide-y divide-neutral-200">
              {GOOD_FIT.map((line) => (
                <li key={line} className="flex items-start gap-4 py-5">
                  <span
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 flex-shrink-0 rounded-full bg-[var(--color-cta)]"
                  />
                  <span className="text-base text-neutral-700">{line}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </Container>
      </section>

      {/* Commission details */}
      <section aria-label="Commission details" className="mt-24 sm:mt-32">
        <Container>
          <FadeIn className="rounded-3xl bg-neutral-950 px-10 py-12 text-white">
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-cta)]">
              Commission structure
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white">
              10% flat, every month.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-neutral-300">
              The $997/month subscription pays you $99.70 every month the church
              stays subscribed. There&rsquo;s no cap. If you refer three churches
              that stay for a year, that&rsquo;s over $3,500.
            </p>
            <p className="mt-4 text-base leading-7 text-neutral-400">
              Commissions are paid monthly via direct deposit. Minimum payout
              threshold is $50.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* CTA */}
      <section aria-label="Apply" className="mt-24 sm:mt-32 mb-24 sm:mb-32">
        <Container>
          <Border className="pt-12">
            <FadeIn className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950">
                  Ready to apply?
                </h2>
                <p className="mt-2 max-w-lg text-base leading-7 text-neutral-600">
                  Email Emily directly and she&rsquo;ll review your
                  application within one business day.
                </p>
              </div>
              <a
                href={`mailto:${siteConfig.email}?subject=Partner%20program%20application`}
                className="flex-shrink-0 rounded-full bg-neutral-950 px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Apply to become a partner
              </a>
            </FadeIn>
          </Border>
        </Container>
      </section>
    </>
  )
}
