# Playground Studio — Reimagined Website

Take-home vibe coding challenge submission for **Playground Studio × Teamified**.

A reimagined rebuild of [playgroundstudio.com.au](https://playgroundstudio.com.au) — same brand identity, elevated execution, plus three new features.

---

## Live Links

| | |
|---|---|
| 🌐 Live URL | `https://YOUR-PROJECT.vercel.app` |
| 💻 GitHub | `https://github.com/YOUR_USERNAME/playground-studio` |

---

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — all animations
- **Claude AI (Sonnet 4.6)** — used in place of V0/Lovable

---

## What's Built

### Rebuilt sections
- Animated hero with mouse-tracking parallax and discipline ticker
- Work portfolio — 9 real projects with images from the studio's DatoCMS CDN
- Capability — all 8 real services with copy from the live site
- Navigation with scroll-aware blur, dark/light toggle, mobile drawer
- Footer with real acknowledgement (Boon Wurrung people, Kulin Nation)

### New features added
- **Team / Culture section** — real leadership (Sally Dobell, Olivia Finlayson, Millie Romanin), studio values, talent CTA
- **Insights / Blog feed** — editorial cards ready to connect to DatoCMS
- **Multi-step enquiry flow** — 4-step animated contact form with real studio contact details

---

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css       # CSS custom properties, dark mode
│   ├── layout.tsx        # Root layout, metadata
│   └── page.tsx          # Page composition
└── components/
    ├── ThemeProvider.tsx  # Dark/light mode
    ├── CursorFollower.tsx # Custom cursor (desktop)
    ├── Navbar.tsx
    ├── Hero.tsx
    ├── Work.tsx
    ├── Capabilities.tsx
    ├── Team.tsx           # ★ New
    ├── Insights.tsx       # ★ New
    ├── WorkWithUs.tsx     # ★ New
    └── Footer.tsx
```
