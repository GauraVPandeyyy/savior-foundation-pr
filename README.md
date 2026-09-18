# SAVIOR Healthcare Foundation — Website

Production-oriented Next.js website for **SAVIOR Healthcare Foundation**, designed around the Foundation's primary public identity: **heart care**, with supporting programmes in health camps, patient assistance, women and child health, disability support, volunteer-led outreach and selected community initiatives.

## Core decisions

- Public brand: **SAVIOR Healthcare Foundation**
- Legal entity reference where needed: **SAVIOR HEALTHCARE FOUNDATION (INDIA)**
- Established: **2022**
- Language: **English only**
- Primary programme identity: **Heart Care**
- Current hosting target: **Netlify**
- Future portability: **Node-capable Hostinger plan / VPS**
- Form destination: `shiwendrakumarshuklarbl@gmail.com`
- Shiwendra Kumar Shukla is shown under a neutral leadership heading; no unverified designation is published.

## Stack

- Next.js 16.3.3
- React 19.2.0
- TypeScript 5.7.2
- Tailwind CSS 4.3.0
- Lucide React 1.46.0
- Resend HTTP API for form email delivery (no SDK dependency)
- Razorpay REST + Checkout for donations
- Supabase REST for donation reconciliation/persistence
- Cloudflare Turnstile supported for spam protection

## Local setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Production checks:

```bash
npm run typecheck
npm run build
```

## Environment setup

See `.env.example`. Important production values:

- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY`
- `MAIL_FROM`
- `FORM_DESTINATION_EMAIL`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `NEXT_PUBLIC_RAZORPAY_ENABLED`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- Turnstile keys (recommended)

Never commit `.env` or production secrets.

## Forms

The following website forms post to `/api/forms` and use server-side validation + optional Turnstile before sending through Resend:

- Contact
- Volunteer
- Medical Volunteer
- Patient Support
- Heart Patient Support
- Host a Health Camp
- Partner / CSR

If mail credentials are missing, the API returns an error rather than pretending the message was sent.

## Donation architecture

The donation experience is intentionally disabled until production credentials are configured.

Flow:

1. Browser submits donor details + amount to `/api/donations/create-order`.
2. Server creates a Razorpay order using the Key Secret.
3. Razorpay Checkout opens in the browser using only the safe Key ID/order information.
4. Checkout response is sent to `/api/donations/verify`.
5. Server verifies the signature and independently checks payment status with Razorpay.
6. Webhook endpoint `/api/razorpay/webhook` validates the webhook signature and reconciles captured/failed state.
7. Webhook event IDs are stored for idempotency.
8. Production can require Supabase persistence before live orders are created.

Database SQL is in `supabase/schema.sql`.

## Content architecture

Primary editable data lives in:

- `lib/site.ts` — identity, address, email, navigation, bank placeholders, impact placeholders, social placeholders
- `lib/content.ts` — programme content, representative media, story/update templates

Foundation images can be replaced centrally without redesigning page components.

## Representative imagery

Actual Foundation programme photography was not available during this build. Representative India healthcare images are used from Wikimedia Commons / Government Open Data sources and are explicitly credited. They **must not be represented as SAVIOR events or beneficiaries**. See `/image-credits` and `IMAGE_CREDITS.md`.

## SEO safety

If `NEXT_PUBLIC_SITE_URL` is missing or still points to an example domain, the project emits `noindex`/robots disallow behavior to reduce the risk of indexing a preview with a fake canonical domain. Set the real production URL before launch.

Gallery, placeholder stories and placeholder updates are intentionally noindex until real Foundation material is supplied.

## Before public launch

Read `PLACEHOLDER_CHECKLIST.md` and `DEVELOPER_HANDOFF.md`.

## September 2026 UI/content revision
The navigation has been consolidated, mobile navigation repaired, desktop dropdown close behaviour fixed, the typography changed to Source Sans 3 + Source Serif 4, programme pages merged, missing image sections repaired, copy professionalised, and an image-download manifest/script set added at the project root.
