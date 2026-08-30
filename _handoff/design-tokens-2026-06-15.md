# Design tokens & component rules — 2026-06-15

Locked decisions that recur across the site. Update this when a rule changes.

## Brand color

- `--color-cta: #EEDD47` (brand yellow, sampled from Emily's "create." wordmark)
- `--color-cta-hover: #E3CF2A`
- `--color-cta-ink: #0A0A0A` (near-black, the text/ink that sits on yellow)

## CTA treatments — marker swipe vs. rectangular button

Two distinct CTA families. Do not mix them.

- **Marker swipe** (`Button` variants `primary` / `secondary` / `ghost`):
  highlighter-style yellow swipe behind text. Used for **hero text links and the
  active nav state only** (e.g. "See the work", "See the full portfolio"). Text
  is always dark (#0A0A0A) on the yellow marker; the marker is always #EEDD47
  regardless of the surface — the marker IS the contrast container.
- **Rectangular yellow button**: conventional `rounded-md`, yellow #EEDD47 bg,
  dark text, clear press affordance. Every **"Join the wait list" CTA** uses
  this, via `<JoinWaitListButton source="…">`, which opens the shared wait-list
  modal (see below). `Button` also still has a `solid` variant with the same
  look for any plain form submit.

### Wait-list modal (2026-06-15 pivot — supersedes inline forms)

All "Join the wait list" CTAs are now `<JoinWaitListButton>` rectangular buttons
that open one shared `<JoinWaitListModal>` (4 fields: first name, last name,
email, optional church domain). The earlier inline forms (footer email-capture,
contact-block inline form, dedicated /contact form) were removed. Global state
lives in `WaitListProvider` (React context, wrapping the app in the root layout);
every button passes a `source` string so signups are attributed to the exact CTA.
Submissions POST to `/api/wait-list`, which fans out to a Google Sheet (Apps
Script webhook) and an email to Emily. See
`_handoff/google-sheets-waitlist-setup-2026-06-15.md`.

## Marker fill implementation

The marker paints a literal `#EEDD47` via the inline CSS `fill` property (plus a
literal `fill` attribute). Never `fill="var(--color-cta)"` as an SVG
presentation attribute — Safari/iOS don't evaluate `var()` there, which left the
marker unpainted (outline on white, illegible CTA on dark).

## Logo variants by surface

Logos ship in three recolored variants: `-black`, `-white`, `-yellow`
(`public/church-logos/<slug>-{black,white,yellow}.png`, via
`churchLogo(slug, variant)`).

- **Light backgrounds** → `black` variant by default, `yellow` on hover.
- **Dark backgrounds** (`bg-neutral-950`: trust marquee, case-study cards,
  case-study detail hero, any future dark logo placement) → `white` variant by
  default, `yellow` on hover (cross-fade).

Never place a `black` logo on a dark surface (it disappears) or a `white` logo
on a light surface.

## Focus indicators

- Global `:focus-visible` outline: `2px solid var(--color-cta-ink)`, 2px offset
  (white on `.bg-neutral-950` / `[data-surface="dark"]`).
- Mouse-click focus (`:focus:not(:focus-visible)`) shows no outline — no
  persistent ring after a click.
- Inputs/textareas keep their own border + soft ring `:focus` state.
