# Sajidh Ahamed — Portfolio

Personal portfolio for **Sajidh Ahamed** — full-stack developer and AI-engineering
undergraduate in Colombo, Sri Lanka. Built with **Next.js (App Router) + TypeScript**.

Editorial-monochrome design: Bricolage Grotesque (display), Newsreader (serif body),
JetBrains Mono (metadata). GSAP-powered horizontal work gallery, animated skills
terminal, and a working contact form backed by a serverless route.

---

## Tech

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **GSAP / ScrollTrigger** — pinned horizontal project gallery (desktop), native swipe (mobile)
- **next/font** — self-hosted Google fonts, no external requests
- **Resend** — contact-form email delivery via `/api/contact`

## Project structure

```
app/
  layout.tsx          fonts + metadata
  page.tsx            composes the sections
  globals.css         all styles
  api/contact/route.ts  contact-form backend (Resend)
components/           Masthead, Hero, ProfileCard, Work, Skills,
                     Services, About, Contact, Band, Clock, RevealEffects
data/projects.ts     project content (edit here to add/change projects)
public/
  sajid_dp.jpg       profile photo
  assets/            project screenshots: erp.png, heysaz.png, ecom.png
```

---

## Getting started

```bash
npm install
copy .env.example .env.local   # then fill in RESEND_API_KEY (see below)
npm run dev                  # http://localhost:3000
```

## Contact form setup (Resend)

The form posts to `/api/contact`, which emails you via [Resend](https://resend.com).

1. Create a free account at <https://resend.com>.
2. Generate an API key at <https://resend.com/api-keys>.
3. Put it in `.env.local`:

   ```
   RESEND_API_KEY=re_xxxxxxxxxxxx
   CONTACT_TO=sajidhsaz@gmail.com
   CONTACT_FROM="Portfolio <onboarding@resend.dev>"
   ```

   `onboarding@resend.dev` is Resend's shared sender and works immediately for
   delivering to your own inbox. For a custom "from" address, verify your domain
   in Resend and update `CONTACT_FROM`.

If the key is missing, the form fails gracefully and shows your email address
instead — nothing breaks.

---

## Adding your content

- **Profile photo** — replace `public/sajid_dp.jpg` (square works best).
- **Project screenshots** — drop `erp.png`, `heysaz.png`, `ecom.png` into
  `public/assets/`. Until then, a labelled placeholder shows in each device frame.
- **Projects** — edit `data/projects.ts`. Add an object to add a panel; remove the
  `live` field to hide a Live link. The gallery and counter adapt to any number.

---

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it at <https://vercel.com/new>.
3. Add the same environment variables (`RESEND_API_KEY`, `CONTACT_TO`,
   `CONTACT_FROM`) in **Project → Settings → Environment Variables**.
4. Deploy. Update `SITE_URL` in `app/layout.tsx` to your live domain so the
   social-share metadata resolves correctly.

```bash
npm run build   # production build
npm start       # serve the production build locally
```
