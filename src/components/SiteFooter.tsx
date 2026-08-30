import Link from 'next/link'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { EmilyAvatar } from '@/components/EmilyAvatar'
import { JoinWaitListButton } from '@/components/wait-list/JoinWaitListButton'
import { navItems, siteConfig } from '@/lib/site-config'

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M10 1.5l2.47 5.18 5.68.77-4.16 3.94 1.05 5.61L10 14.9l-5.04 2.6 1.05-5.61L1.85 7.45l5.68-.77z" />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
          <div>
            <Link
              href="/"
              aria-label={`${siteConfig.brand} home`}
              className="inline-block"
            >
              <Logo />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-6 text-neutral-600">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-display text-sm font-semibold tracking-wider uppercase text-neutral-950">
              Site
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-neutral-700">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-neutral-950 hover:underline underline-offset-4 decoration-[var(--color-cta)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold tracking-wider uppercase text-neutral-950">
              Contact Emily
            </h2>

            <p className="mt-6 max-w-xs text-sm leading-6 text-neutral-600">
              Emily takes on a small number of new churches each quarter. Drop
              your info and she will reach out by email when a spot opens.
            </p>
            <div className="mt-5">
              <JoinWaitListButton source="footer" />
            </div>

            <ul className="mt-8 space-y-3 text-sm text-neutral-700">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition hover:text-neutral-950 hover:underline underline-offset-4 decoration-[var(--color-cta)]"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-neutral-500">
                {siteConfig.city}, {siteConfig.state}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-neutral-200 pt-8 pb-12">
          <p className="flex flex-wrap items-center gap-x-1.5 text-sm text-neutral-500">
            © {siteConfig.brand} {new Date().getFullYear()}. All work designed by
            <EmilyAvatar size={32} />
            <span className="font-medium text-neutral-600">{siteConfig.designer}.</span>
          </p>

          {/* The 5-star review CTA only shows once Emily provides a real GBP
              review URL (siteConfig.googleReviewUrl). Hidden until then so it
              never points at the generic Google Business signup page. */}
          {siteConfig.googleReviewUrl ? (
            <a
              href={siteConfig.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-700 transition hover:text-neutral-950"
            >
              <StarIcon className="h-4 w-4 text-[var(--color-cta)]" />
              <span className="underline-offset-4 decoration-[var(--color-cta)] group-hover:underline">
                Leave a 5-star review
              </span>
            </a>
          ) : null}

          <p className="flex items-center gap-4 text-sm text-neutral-500">
            <Link
              href="/privacy"
              className="transition hover:text-neutral-950 hover:underline underline-offset-4 decoration-[var(--color-cta)]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition hover:text-neutral-950 hover:underline underline-offset-4 decoration-[var(--color-cta)]"
            >
              Terms
            </Link>
          </p>

          <p className="text-sm text-neutral-500">
            Made in {siteConfig.city}, {siteConfig.state}.
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
