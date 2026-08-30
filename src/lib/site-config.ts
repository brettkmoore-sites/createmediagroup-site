export const siteConfig = {
  brand: 'Create Church Media',
  shortBrand: 'CCM',
  domain: 'createchurchmedia.com',
  // Canonical host is www. The bare apex 308-redirects to www, so every
  // canonical, og:url, sitemap entry, and JSON-LD url must use the www host to
  // match the resolved address. Changing this one value propagates everywhere.
  url: 'https://www.createchurchmedia.com',
  email: 'emily@createchurchmedia.com',
  // Default social share card, 1200x630, lives at /og-image.jpg.
  ogImage: '/og-image.jpg',
  city: 'Indianapolis',
  state: 'IN',
  designer: 'Emily Farmer',
  description:
    'Unlimited graphic design for churches on a monthly subscription. Designer Emily Farmer based in Indianapolis, IN.',
  pricing: {
    monthly: 997,
    annual: 9970,
  },
  // The wait list is the only call to action. People join the list, Emily gets
  // an email alert, and she reaches out personally when a spot opens.
  waitlistUrl: '/contact',
  ctaLabel: 'Join the wait list',
  // Plain mailto fallback used if the wait list API is ever unavailable.
  waitlistMailto:
    'mailto:emily@createchurchmedia.com?subject=Joining%20the%20wait%20list',
  // Google Business Profile URL. Empty until Brett fills it in.
  googleBusinessUrl: '',
  // Direct "write a review" link for Emily's Google Business Profile. Empty
  // until Emily sends her real GBP review URL. The footer "Leave a 5-star
  // review" CTA only renders when this is set, so it stays hidden rather than
  // pointing at the generic Google Business signup page (which the audit flagged
  // as a broken-intent link, and there are no on-site reviews to back the claim).
  // TODO: set to Emily's GBP review URL once she sends it. Cleanest format is
  // https://search.google.com/local/writereview?placeid=<PLACE_ID>, or a
  // Google-generated https://g.page/r/<short-code>/review short link.
  googleReviewUrl: '',
} as const

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/subscription', label: 'Subscription' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/resources', label: 'Resources' },
] as const
