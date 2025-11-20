# Lovable → Next.js Migration Guide

A practical, step-by-step checklist for migrating a Lovable React/Tailwind project into a Next.js (App Router) application. This document focuses on minimizing rework, preserving your presentational components, and ensuring SEO, performance, and structured-data needs are met.

> Keep components *portable*. Build visuals and interactivity as standalone React components so they drop into Next.js with minimal change.

---

## 1. Quick summary

* You can finish visual changes in Lovable and then migrate. The recommended path is to build portable components now and migrate marketing/SEO-critical pages earlier if possible.
* Two migration routes: **Automated CLI** (fast) or **Manual** (control). Both are documented below.

---

## 2. Pre-migration checklist (prepare repository)

1. Commit current work to a branch (e.g., `migrate/nextjs`).
2. Export or ensure all public assets (images, fonts) live under a `public/` or `assets/` folder.
3. Consolidate configuration files: `tailwind.config.js`, `postcss.config.js`, and `package.json` dependencies.
4. Convert inline environment‑sensitive values to environment variables (placeholders) where applicable.
5. Create a `data/` or `content/` folder for canonical event/party content (slugs, metadata) rather than baking content deep inside components.
6. Note any Lovable-specific APIs or runtime features you use (hosting hooks, form integrations, third‑party scripts).

**Commands** (local):

```bash
# ensure a clean state
git checkout -b migrate/nextjs
git add .
git commit -m "Prepare for Next.js migration: snapshot before migrate"
```

---

## 3. Automated migration (fast path)

If available in your environment, use the Lovable → Next migration CLI. This automates file mapping and common import transforms.

**Run the CLI**:

```bash
# from project root (after commit)
npx @nextlovable/cli migrate
# install & run
npm install
npm run dev
```

**What the CLI typically does**:

* Converts routing to Next App Router layout (creates `app/` structure).
* Rewrites common imports (e.g., `Link` → `next/link`).
* Moves public assets into `public/` and suggests `next/image` replacements.

**After the CLI**:

* Review console output for manual fixes.
* Search for `TODO: migrate` comments inserted by the CLI.

---

## 4. Manual migration (detailed)

If you prefer control, follow these steps to create a stable Next.js App Router project and move code across.

### 4.1 Scaffold Next.js (App Router)

```bash
npx create-next-app@latest skycrest-next --experimental-app
cd skycrest-next
# or use pnpm / yarn as your project uses
```

### 4.2 Copy core source files

* Copy `src/components/` → `app/components/` or `src/components/` (retain structure).
* Copy all static assets to `/public`.
* Copy Tailwind config and ensure `content` includes `app/**/*.{js,jsx,ts,tsx}` and your component paths.

**tailwind.config.js (snippet)**

```js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: { extend: {} },
  plugins: [],
}
```

### 4.3 Configure `next.config.js`

Basic config with image support and any rewrites you need:

```js
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['your-cdn.com'],
    formats: ['image/avif', 'image/webp'],
  },
}
```

### 4.4 Routing: map Lovable routes to `app/` files

* `src/pages/about.jsx` (or Lovable route) → `app/about/page.jsx`.
* Dynamic events: create `app/events/[slug]/page.jsx`.

**Example event dynamic page (App Router)**

```jsx
// app/events/[slug]/page.jsx
import EventDetail from '@/components/EventDetail'

export async function generateStaticParams() {
  // read from data/events.json or CMS
  const events = await import('../../../data/events.json')
  return events.map(e => ({ slug: e.slug }))
}

export default async function EventPage({ params }) {
  const { slug } = params
  const events = await import('../../../data/events.json')
  const event = events.find(e => e.slug === slug)

  if (!event) return <p>Event not found</p>

  return (
    <main>
      <h1>{event.title}</h1>
      <EventDetail event={event} />
    </main>
  )
}

export const revalidate = 60 // ISR: revalidate every 60s
```

> Note: using `generateStaticParams` pre-renders event paths; `revalidate` gives ISR.

### 4.5 Metadata & Head

Use App Router `metadata` or the `<head/>` options to server-render meta tags and structured data.

**Example metadata with JSON-LD**

```jsx
// app/events/[slug]/head.jsx
export default function Head({ params }) {
  const event = /* load event data */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': event.title,
    'startDate': event.date,
    'location': {
      '@type': 'Place',
      'name': 'Skycrest Gaming Café',
      'address': 'Omaxe World Street, Faridabad'
    }
  }

  return (
    <>
      <title>{event.title} — Skycrest Events</title>
      <meta name="description" content={event.summary} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  )
}
```

### 4.6 Replace routing helpers

* Replace any Lovable router `<Link>` with `next/link`:

```jsx
import Link from 'next/link'
<Link href="/events/rog-summer-cup-2025">Rog Summer Cup</Link>
```

* For programmatic navigation, use `useRouter()` from `next/navigation` (App Router):

```jsx
import { useRouter } from 'next/navigation'
const router = useRouter()
router.push('/events')
```

### 4.7 Images: move to `next/image`

Replace `<img>` with `next/image` where appropriate to get automatic optimization.

```jsx
import Image from 'next/image'
<Image src="/images/gallery1.jpg" alt="gallery" width={1200} height={675} />
```

Use `priority` on hero images and `loading="lazy"` defaults for others.

### 4.8 Client vs Server components

* By default files in `app/` are Server Components. Interactive widgets (tabs, masonry gallery, lightbox, booking form) should be created as **Client Components**.
* In a client component file, add:

```js
'use client'
```

at the top.

**Example client component header**

```jsx
// app/components/Tabs.jsx
'use client'
import { useState, useEffect } from 'react'
export default function Tabs({ initialTab }) { /* ... */ }
```

### 4.9 API routes & forms

* Move server-side endpoints to `app/api/` (App Router) or `pages/api/`.

**Example serverless booking endpoint**

```js
// app/api/book/route.js
import { NextResponse } from 'next/server'
export async function POST(req) {
  const data = await req.json()
  // validate & process booking (store in DB or send email)
  return NextResponse.json({ ok: true })
}
```

### 4.10 Structured data & schema

Add `LocalBusiness`, `Event`, `Offer`, and `FAQPage` JSON-LD in server-rendered head so crawlers immediately see it.

---

## 5. Specific UI patterns & examples

### 5.1 Tabs with hash anchors (client component)

Basic accessible tab skeleton that honors `location.hash`:

```jsx
// app/components/ZoneTabs.jsx
'use client'
import { useEffect, useState } from 'react'

export default function ZoneTabs({ tabs }) {
  const [active, setActive] = useState(tabs[0].id)

  useEffect(() => {
    const hash = window.location.hash.replace('#','')
    if (hash && tabs.find(t => t.id === hash)) setActive(hash)
  }, [])

  useEffect(() => {
    if (window.history && window.location) {
      window.history.replaceState(null, '', `#${active}`)
    }
  }, [active])

  return (
    <div role="tablist">
      <nav>
        {tabs.map(t => (
          <button key={t.id} role="tab" aria-selected={t.id===active} onClick={() => setActive(t.id)}>
            {t.title}
          </button>
        ))}
      </nav>
      <section>
        {tabs.map(t => (
          <div key={t.id} hidden={t.id !== active} role="tabpanel">{t.content}</div>
        ))}
      </section>
    </div>
  )
}
```

### 5.2 Event page with cinematic modal (high level)

* Render an events index with only titles and dates.
* Each title links to `/events/[slug]`.
* The event page loads server-rendered summary + clickable hero that opens a lightbox (client component) showing a video loop and masonry gallery.
* Keep event detail pages pre-rendered and use client JS only for the lightbox and animations.

---

## 6. SEO checklist (post-migration)

* [ ] Ensure server-rendered `<title>` and `<meta description>` for all marketing pages
* [ ] Add JSON-LD for `LocalBusiness` on homepage and `Event` on each event page
* [ ] Generate OG images (1200×630) for pages and events and reference in head
* [ ] Ensure Events and Party pages have crawlable URLs (not client-only)
* [ ] Submit sitemap to Google Search Console
* [ ] Validate pages with URL Inspection (Search Console) to confirm server-rendered HTML

---

## 7. Performance & accessibility

* Use `next/image` for optimized images; add `priority` on hero assets
* Lazy-load gallery images (IntersectionObserver or native `loading='lazy'`)
* Respect `prefers-reduced-motion`
* Ensure tap targets ≥ 44px on mobile
* Use CSS transforms for animation (translate/opacity) for best performance

---

## 8. Testing & validation

* `npm run build` then `npm start` (or `next start`) to test production build locally
* Run Lighthouse audits and fix Core Web Vitals issues
* Check server-side rendered meta tags via `View Source` (not DevTools Elements)
* Validate JSON-LD with Rich Results Test
* Test deep links: open `/events/your-slug` directly in a fresh browser session

**Commands**:

```bash
# build & run production locally
npm run build
npm run start

# run lighthouse (example using lighthouse CLI)
npm install -g lighthouse
lighthouse http://localhost:3000
```

---

## 9. Deployment recommendations

* **Vercel**: native Next.js support, ISR, edge functions, image optimization. Quickest path.
* **Cloudflare Pages / Netlify**: both support Next.js; verify ISR/edge function support depending on your needs.

**Vercel deploy (basic)**:

1. Connect GitHub repo to Vercel
2. Set `Framework Preset` to Next.js
3. Add environment variables in Vercel dashboard
4. Deploy and monitor build logs

---

## 10. Post-deploy checklist

A thorough checklist to run immediately after your first production deploy. Treat this as your go/no‑go verification list.

### Immediate smoke tests (first 30 minutes)

* [ ] Visit the homepage and several major pages (Gaming Zones, Party, Events index, an Event detail) in an **incognito** window. Confirm correct content and server‑rendered `<title>` and `<meta>` (View Source).
* [ ] Open an Event detail URL directly (not via navigation) to confirm pre-rendering and OG tags. Example: `https://skycrestgaming.com/events/rog-summer-cup-2025`.
* [ ] Test booking form end-to-end: submit a test booking and verify the API receives the payload and returns success. Check confirmation email/webhook if configured.
* [ ] Ensure images load (especially hero and gallery). Confirm `next/image` served formats (AVIF/WebP) in Production.
* [ ] Confirm `robots.txt` and `sitemap.xml` exist and are accessible: `https://skycrestgaming.com/robots.txt`, `https://skycrestgaming.com/sitemap.xml`.

### Monitoring & observability (first 24 hours)

* [ ] Configure and verify Error monitoring (Sentry, LogRocket, or equivalent). Ensure server and client errors are reported.

  * Example Sentry init (client):

    ```js
    import * as Sentry from '@sentry/nextjs'
    Sentry.init({ dsn: process.env.SENTRY_DSN })
    ```
* [ ] Enable and verify server logs (Vercel/Cloudflare logs). Confirm that API routes log requests and errors.
* [ ] Configure uptime monitoring (UptimeRobot / Pingdom) for `/`, `/events`, `/party`, `/api/book` endpoints.
* [ ] Set alerts for error rate spikes and uptime drops (Slack/Email/Webhook).

### Performance & Core Web Vitals

* [ ] Run Lighthouse on home and representative pages and record scores.

  ```bash
  lighthouse https://skycrestgaming.com --output html --output-path=report.html
  ```
* [ ] Enable Real User Monitoring (RUM) to collect CWV from real visitors (e.g., Vercel Analytics or Google Web Vitals library + GA4).
* [ ] Set performance budgets and monitor them in CI (Lighthouse CI or GitHub Action).

### SEO & Indexing

* [ ] Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools.
* [ ] Use URL Inspection (Search Console) on key pages (homepage, party page, 3 events) and ensure Google sees server-side HTML and structured data.
* [ ] Verify JSON-LD snippets for `LocalBusiness`, `Event`, `Offer`, and `FAQPage` with the Rich Results Test.
* [ ] Verify social previews: use Facebook Sharing Debugger and Twitter Card Validator to ensure OG tags & images render properly.
* [ ] Check canonical URLs and any `hreflang` if applicable.

### Analytics & Conversion tracking

* [ ] Confirm GA4 (or preferred analytics) is receiving data. Check real-time view when you open the site.
* [ ] Track these events (examples with GA4 Measurement API or gtag):

  * `booking_submitted` (booking form success)
  * `tab_changed` (Gaming Zones tab anchors)
  * `gallery_opened` (lightbox open)
  * `event_share` (social share click)

  Example gtag event:

  ```js
  window.gtag('event', 'booking_submitted', { value: 1, method: 'web' })
  ```
* [ ] Verify funnel: homepage → zones → party → booking. Record dropoff points.

### Security & DNS

* [ ] Confirm TLS/SSL certificate is active for the domain. (Vercel auto‑provisions certs; verify no mixed content.)
* [ ] Verify HTTP → HTTPS redirect.
* [ ] Ensure env vars (secrets) are set in production and not leaked to client-side (only `NEXT_PUBLIC_` prefixed values are allowed to be exposed).
* [ ] Run a basic security scan (e.g., snyk, npm audit) on production dependencies.

### Caching & CDN

* [ ] Confirm caching headers for static assets (images, fonts). Example for `next.config.js`:

  ```js
  // next.config.js snippet
  module.exports = {
    async headers() {
      return [
        {
          source: '/(.*?)',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=0, s-maxage=600, stale-while-revalidate=60' }]
        }
      ]
    }
  }
  ```
* [ ] Test purge and invalidation workflow in your CDN (Vercel/Cloudflare). Confirm updates to images or pages propagate as expected.

### Backups & Rollback

* [ ] Confirm CI/CD rollback strategy: ensure previous deployment is available to redeploy quickly.
* [ ] For data (bookings, events), verify DB backups and retention policy.
* [ ] Document manual rollback steps (e.g., `vercel rollback` or redeploy previous commit by tag).

### Accessibility & QA

* [ ] Run automated accessibility checks (axe-core / pa11y) and fix high‑impact issues.
* [ ] Manual keyboard navigation test: tab through header, tabs, booking form, modals.
* [ ] Test `prefers-reduced-motion` and screen-reader friendly labels (aria attributes for tabs, modals).

### Integrations & Third-party services

* [ ] Verify email service (SendGrid/Postmark) for booking confirmations.
* [ ] Verify payment flows if any (Stripe sandbox/live), ensure webhooks endpoint is reachable.
* [ ] Verify social embeds and analytics scripts are non-blocking (deferred) and loaded conditionally if necessary.

### Final checklist before public announcement

* [ ] Confirm contact info and opening hours are correct in `LocalBusiness` JSON-LD and visible in footer.
* [ ] Confirm event pages have shareable OG images and proper titles.
* [ ] Announce on social channels and monitor incoming traffic behavior closely for 24–72 hours.

---

## 11. Useful snippets & quick references (expanded)

### Deploy & rollback (Vercel commands)

```bash
# deploy current branch to production
vercel --prod

# list deployments
vercel deployments

# rollback to a previous deployment (example)
vercel rollback <deployment-id>
```

### Example `robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://skycrestgaming.com/sitemap.xml

# Disallow staging and internal paths
Disallow: /api/
Disallow: /private/
```

### Example `sitemap.xml` entry for events (scripted)

```xml
<url>
  <loc>https://skycrestgaming.com/events/isupreme-valorant-cup-2025</loc>
  <lastmod>2025-07-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Lighthouse CI (example GitHub Action)

```yaml
name: Lighthouse CI
on: [push]
jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install deps
        run: npm ci
      - name: Start
        run: npm start &
      - name: Run LHCI
        run: npx @lhci/cli autorun --upload.target=temporary-public-storage
```

---

## 12. Post-migration QA Checklist (detailed)

Run these checks after your migration and initial public launch (day 0–7).

1. **SEO**

   * All marketing pages return server-rendered `<title>` and `<meta description>`.
   * Schema JSON-LD is present in page source for `LocalBusiness` and `Event`.
   * Sitemap updated and submitted.
2. **Performance**

   * Largest Contentful Paint (LCP) under 2.5s on mobile for hero page (aim).
   * CLS near 0.02–0.1.
   * JS bundle split and hydration times acceptable.
3. **Functionality**

   * Booking flow works and logs to backend.
   * Event modals and galleries open and show images/videos.
   * Tab anchors work from external links and on initial page load.
4. **Security**

   * No sensitive env vars leaked to client.
   * HTTPS enforced.
5. **Observability**

   * Errors reported to Sentry and alerts wired to Slack/email.

---

## 13. Rollback & Emergency Runbook

In case of critical production failure, follow this quick runbook:

1. **Identify** the failing release (Vercel/Netlify build logs, Sentry error spike).
2. **Rollback** to previous known-good deployment:

   * Vercel: `vercel rollback <deployment-id>` or redeploy previous commit.
3. **Re-route traffic** if using a load balancer/CDN (Cloudflare) to a static maintenance page while investigating.
4. **Hotfix**: if the issue is a config/env var, change and restart deployment; if code fix is trivial, patch on a hotfix branch and deploy.
5. **Post-mortem**: record timeline, root cause, and remediation steps. Update CI checks to catch similar regressions.

---

## 14. Long-term maintenance & growth

* Schedule monthly checks for dependency updates and security patches.
* Publish 1–2 content pieces monthly (blog/events) to build organic traffic for keywords like "gaming parlor Faridabad" and "gaming party Faridabad".
* Run quarterly accessibility audits and user testing sessions.

---

If you want, I can now append this checklist to the migration guide textdoc as a separate file, or generate ready-to-run scripts for Lighthouse CI, Sentry config, or a sample `vercel.json`. Which would you like next?
