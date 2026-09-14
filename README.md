# Vyomma powered by Valura.Ai: landing page

A single-page, co-branded landing page for **Vyomma powered by Valura.Ai**: global investing for Indian
investors (global stocks and ETFs, international funds, bonds and structured income, pre-IPO), funded in rupees
under the RBI Liberalised Remittance Scheme and provided through Valura India IFSC Limited, an IFSCA-regulated
broker-dealer at GIFT City.

**Vyomma is a demonstration brand** for the Valura.Ai co-brand programme, not an existing firm. The page says
nothing about Vyomma itself (no history, team, clients or figures) and is marked `noindex, nofollow`.

Stack: React 19, TypeScript, Vite 8, Tailwind CSS 4, GSAP (SplitText), Lenis and ogl.

## Page sections

| Section | File | Anchor |
| --- | --- | --- |
| Header and mobile menu | `src/components/layout/Navbar.tsx` | |
| Hero with app preview | `src/components/sections/Hero.tsx` | `#top` |
| Facts ticker | `src/components/sections/TrustMarquee.tsx` | |
| Why global | `src/components/sections/WhyGlobal.tsx` | `#why` |
| Trust and regulation | `src/components/sections/TrustRegulation.tsx` | `#trust` |
| What you can hold | `src/components/sections/WhatYouCanHold.tsx` | `#invest` |
| How it works | `src/components/sections/HowItWorks.tsx` | `#how` |
| Lead form and app download | `src/components/sections/OpenAccount.tsx` | `#open-account` |
| FAQ | `src/components/sections/FAQ.tsx` | `#faq` |
| Footer, legal and risk text, animation control | `src/components/sections/Footer.tsx` | |

Links, CTA targets, brand strings, the regulated entity and the lead-form settings live in
`src/config/site.ts`. Headline figures live in `src/content/facts.ts`. Change them there, nowhere else.

## Content sources

- **Copy**: adapted from the live Valura.Ai co-brand landing pages, mainly Voguestock
  (https://voguestock.valura.ai) and Bonanza (https://bonanza-app.valura.ai), with Narnolia
  (https://narnolia.valura.ai) as a secondary reference. Wording was kept close and rewritten only to remove
  partner-specific material and to meet the compliance rules below.
- **Figures and legal details**: the cobrand Studio (`lib/metrics.js`, `lib/legal.js`): 90+ global markets,
  100,000+ instruments, 4,000+ US stocks and ETFs, fractional investing from $1, the LRS allowance of up to
  $250,000 each financial year, a $10,000 minimum ticket for pre-IPO, and the entity name and GIFT City address.
- **Layout, motion and visuals**: the designer's template (Figma Make export by Shibashis Pandit). App screens
  were edited, see "Assets".

## Compliance guardrails for editors

- No guaranteed, assured, fixed or promised returns, no protection or safety claims, no superlatives about
  performance, no competitor names.
- No return, yield or coupon figures in headlines, the hero, chips, badges or meta tags. A coupon figure may only
  appear in body copy, in the same sentence as "indicative, disclosed per issue and not assured. Capital is at
  risk." The page currently shows none.
- Mock app screens and portfolio visuals carry the caption "Illustrative only. Not investment advice."
- The footer keeps the risk line "Investments in securities markets are subject to market risks. Read all
  related documents carefully before investing." Legal, risk and disclaimer text is never animated.
- The brand is written "Valura.Ai" and the relation is always "Vyomma powered by Valura.Ai". The Valura mark
  (`src/assets/brand/`) is used as supplied and never recoloured.
- No private company names, fund manager names, partner registrations or exchange and regulator logos.
- No em dashes or en dashes anywhere.

## Motion

Designed motion runs for every visitor, including visitors whose operating system reports
`prefers-reduced-motion: reduce` (for example Windows with animation effects turned off).

- **Reduced motion** withholds only the vestibular-risk effects: Lenis smooth scrolling is off (native
  scrolling, instant in-page jumps) and the hero wave camera no longer follows the pointer. Ambient loops run
  a little slower. The page has no scroll-scrubbed parallax, tilt or zoom.
- **Pause animations**: one button in the footer (also reachable with the "Skip to animation controls" link)
  stops the floating app preview and glow, the FAQ illustration, both WebGL backgrounds and all entrance
  animations, and replaces the moving facts ticker with the facts listed once in centred, balanced rows (no
  edge fade, separators only between facts on the same row). The choice is stored in `localStorage` under
  `vyomma:animations-paused`, applied before first paint by a small script in `index.html`, and kept in step
  across tabs. The moving ticker also pauses on hover and on keyboard focus.
- **Performance guards**: the WebGL canvases render at 1x, stop while off screen, while the tab is hidden and
  while paused, and resume without jumping. Motion animates transform and opacity only, except the FAQ answer
  height. Reveals never move the layout, split text waits at most 350 ms for web fonts, and a shared in-view
  watcher (IntersectionObserver plus scroll and one-second timer fallbacks) ensures content in view is never
  left hidden.
- **Timing**: UI transitions 200 to 700 ms, reveals under 900 ms, one easing family (quint out for entrances
  and UI, a gentle sine in-out for ambient loops), and no hero copy held back by more than about 400 ms.

| Section | Motion |
| --- | --- |
| Header | Underline slides to the section in view, shadow fades in on scroll, mobile menu links stagger in, CTA sheen |
| Hero | Wave shader background, headline lines slide up from a mask, subtitle reveals word by word, CTAs and stats rise in, stats count up once, app preview rises then floats with a soft glow, primary CTA sheen and arrow nudge |
| Facts ticker | Continuous ticker that pauses on hover or keyboard focus; with animations paused the facts are listed once in centred rows |
| Why global | Heading letters, copy and checklist stagger, image eases in, portfolio card rises and floats, donut turns into place |
| Trust and regulation | Heading letters, copy, registrations card and rows rise in with a short stagger |
| What you can hold | Heading letters, six cards stagger in, cards lift with a shadow and the icon grows on hover |
| How it works | Heading letters, three step cards stagger in, cards lift and the app screen eases closer on hover |
| Open account | Heading letters, checklist stagger, form card rises in, submit sheen and arrow nudge, field errors fade in, success mark pops in |
| FAQ | Heading letters, questions stagger in, answers animate their height and fade in, chevron turns, question marks bob |
| Footer | Gradient shader background, columns and wordmark rise in, links grow an underline, Pause animations control |

Motion code: `src/motion/` (pause store, in-view watcher, `Reveal`, `CountUp`), `src/components/ui/SplitText.tsx`,
`src/components/ui/GradientWaves.tsx`, `src/components/ui/Velaris.tsx`, `src/components/common/MotionToggle.tsx`
and the motion block in `src/index.css`.

## Configuration

Both variables are optional and read at build time (Vite inlines them). Copy `.env.example` to `.env.local`
for local builds.

| Variable | When unset | When set |
| --- | --- | --- |
| `VITE_APP_URL` | "Open account" CTAs scroll to the lead form; no "Log in" link is shown | "Open account" and "Log in" go to this URL, and the form section adds an "Open your account online" link |
| `VITE_SITE_URL` | Open Graph and Twitter image URLs stay relative | Image URLs become absolute and `og:url` plus a canonical link are added |

### Lead form

The form posts to Web3Forms (`https://api.web3forms.com/submit`) with the public access key already used by the
live Valura.Ai landing pages, the subject "Vyomma powered by Valura.Ai: new lead" and a `botcheck` honeypot.
It validates fields before sending and shows sending, success and error states; success is shown only when
Web3Forms confirms the submission. Leads arrive in the inbox registered for that key.

## Run, build and check

Requires Node 20.19+ or 22.12+ (Vite 8).

```bash
npm ci
npm run dev            # local dev server
npm run build          # type-check, then build to dist/
npm run preview        # serve dist/
npm run typecheck      # tsc only
npm run format         # oxfmt
npm run format:check   # formatting check
```

## Deploy

The build output in `dist/` is a static site.

**Docker** (nginx on port 80):

```bash
docker build -t vyomma-landing \
  --build-arg VITE_APP_URL=https://app.example.com \
  --build-arg VITE_SITE_URL=https://vyomma.example.com .
docker run -p 8080:80 vyomma-landing
```

`nginx.conf` serves the single-page app with an `index.html` fallback, gzip, a one-year cache for fingerprinted
files in `/assets/` and `no-cache` for `index.html`. The container health check calls `http://127.0.0.1/`.

**Netlify**: `netlify.toml` sets the build command, the `dist` publish directory, the SPA redirect and asset
caching. The repository is not linked to any Netlify site; set the variables above in the site settings.

## Assets

- `src/assets/app/`: Vyomma-branded app screens from the designer's export, converted to WebP and edited so they
  show no return, upside or performance figures and no personal or account details. The dashboard mock-up lost a
  named stock "deal" with a projected upside, real news headlines, unverified product counts, the portfolio day
  change, watchlist and event percentage moves and the index ticker values; its greetings read "User", not a
  person's name. The portfolio-analysis screen lost its metric values. The bank-account screen lost the bank
  name, account holder, account number and IFSC value.
- `src/assets/media/`: the globe and chart photo used in "Why global" and the footer wordmark, from the export.
- `src/assets/brand/`: `valura-green.png` and `valura-white.png`, copied unchanged from the live Narnolia landing.
- `src/components/brand/vyommaPaths.ts`: the Vyomma mark and wordmark paths from the export.
- `public/`: favicons generated from the Vyomma mark and `og-image.jpg` (1200 x 630) composed from the logos and
  the edited dashboard.

Heavy media is sized for display (WebP, at most 2x the rendered size), below-the-fold images load lazily, and
the wave shader is a separate chunk mounted once the page is idle.

## Needs sign-off

1. **Demonstration brand**: Vyomma is not a real firm. Confirm before any public use, and remove the
   `noindex, nofollow` robots tag when a real partner adopts this page.
2. **Custody wording** (FAQ "Where are my investments held?"): "Your funds move through India's GIFT City
   financial hub and are held with regulated custodians", adapted from the Voguestock FAQ.
3. **Tax paperwork** (FAQ): "Your LRS usage, Schedule FA and capital-gains statements are generated for you",
   from the Voguestock FAQ. The TCS answer is general and gives no rates or thresholds.
4. **Repatriation** (FAQ): "USD balances are repatriable on request ... a single statement showing realised
   gains in both currencies", from the Bonanza FAQ.
5. **Shelves beyond the canonical three**: global mutual funds and ready portfolios come from the live Voguestock
   and Bonanza pages. Confirm they are available under this brand.
6. **Service and timing lines** from the live pages: "Paperless KYC in minutes", "Two minutes. No overseas
   paperwork.", "a specialist takes it from there", "AI-assisted research", "FX and global onboarding are
   handled for you". Also confirm who follows up on leads sent with the shared Web3Forms key.
7. **Left out pending compliance review**: "Your money never leaves India" and "residents, NRIs and foreign
   nationals welcome" (Voguestock). The lead form asks for a primary interest instead of resident, NRI or
   foreign-national status. The Voguestock recognition line and its US estate-tax claim were also left out.
8. **Image licence**: the globe and chart photo (`src/assets/media/global-markets-*.webp`) came with the export
   without licence details.
9. **App screens**: confirm the edited screens reflect the current Valura.Ai app.
10. **Typography**: the design referenced Clash Grotesk for some headings, which the export never loaded;
    those headings use Plus Jakarta Sans.
11. **Motion policy**: designed motion runs even when the OS asks for reduced motion, with a persistent Pause
    animations control in the footer instead. Confirm this with an accessibility review.
