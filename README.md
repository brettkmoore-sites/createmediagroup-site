# Create Church Media — Website

Next.js 16 marketing site for Create Media Group (Emily Farmer). Unlimited graphic design for pastors and churches.

**Tagline:** Unlimited graphic design for pastors and churches.

**Subhead:** Your church's design team, on a monthly subscription. Same-day rush available.

**Pricing:** $997 a month, or $9,997 a year (save almost $2,000).

## Stack

- Next.js 16 (App Router), TypeScript, React 19
- Tailwind v4 (`@theme` tokens in `src/app/globals.css`)
- `next/font/google` Fraunces (display serif) and Inter (body and UI)
- Server Components by default
- Markdown blog rendered with `gray-matter` and `remark`
- JSON-LD structured data on every page (Organization, LocalBusiness, Service, FAQPage, BlogPosting plus Speakable)

## Local dev

```sh
npm install
npm run dev
# http://localhost:3000
```

## Deploy

Connected to Vercel via GitHub. Pushes to `main` auto-deploy.

- Temporary preview URL: `*.vercel.app` (assigned on first deploy)
- Production domain (when DNS swaps from GoDaddy): `createmediagroup.org`

Set `NEXT_PUBLIC_SITE_URL` in Vercel env vars to the production URL once known.

## Content

- Pages in `src/app/*/page.tsx`
- Blog posts in `content/blog/*.md` (frontmatter: `title`, `date`, `description`, `tags`)
- Case study narratives live in `src/app/case-studies/page.tsx` (will move to `content/case-studies/*.md` once permissions confirmed)

## Copy rules

- No em dashes anywhere in user-facing copy. Use periods or commas.
- No "X, not Y" / "X. Not Y." contrast pattern.
- Banned AI tells: essentially, fundamentally, leverage, ecosystem, navigate the landscape, in today's [X], comprehensive solution, robust, seamless, empower, elevate.

## Contact

- Emily Farmer. emilyfarmer808@gmail.com. 317-502-7443.
- Repo owner: Brett Moore (brett@brettkmoore.com)
