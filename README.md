# Playground Studio — Reimagined Website

> **Take-Home Vibe Coding Challenge** — Full-Stack Developer (AI Tools)
> Submitted for **Playground Studio × Teamified**

---

## What This Is

A reimagined rebuild of [playgroundstudio.com.au](https://playgroundstudio.com.au) — same brand identity, elevated execution, plus three new features. Built with **Next.js 15 + Tailwind CSS + Framer Motion**, assisted by **Claude AI** (in place of V0/Lovable).

---

## Live Demo & Repository

| | Link |
|---|---|
| **Live URL** | *(deploy to Vercel — see Deployment section below)* |
| **GitHub Repo** | *(push to GitHub — see GitHub section below)* |

---

## What Was Built

### Sections rebuilt from the original site

| Section | Details |
|---|---|
| **Navigation** | Scroll-aware blur header, dark/light toggle, mobile drawer with animated slide-in links. Labels match the original site exactly: Work, Capability, Team, Contact |
| **Hero** | Full-viewport animated section. Opens with "Hello" greeting (matching the original). Large kinetic headline "Where change happens" with mouse-tracking parallax. Discipline ticker (Design → Motion → Brand → Strategy → Change). Body copy matches original verbatim. Scroll-to-capabilities CTA. |
| **Work / Portfolio** | 9 real projects with actual images pulled directly from the studio's DatoCMS CDN. Hover reveals project description and arrow. Grid layout with staggered entrance animations. |
| **Capability** | All 8 real capabilities from the original site: Insights & Strategy, Creative, Digital, Data, Social Media, Communications, 3D & Motion, Videography — with real copy and service tags. Studio stats row below. |
| **Footer** | Big "Let's work together" CTA linking to email. Real copyright, acknowledgement of Boon Wurrung people of the Kulin Nation (correct Country for South Melbourne), Privacy, Instagram and LinkedIn links. |

### Three new features added

#### 1. Team / Culture Section *(new)*
**Why:** The original site has a `/team` page but no team presence on the homepage. First-time visitors never meet the people behind the work. Bringing the team to the homepage builds trust and humanises the brand.

- Real leadership names and roles: Sally Dobell (Owner & Director), Olivia Finlayson (Head of Creative), Millie Romanin (Managing Director)
- "Fiercely passionate people" headline — taken directly from the original team page
- Studio values grid that communicates culture at a glance
- "Join the team" call-to-action with mailto link

#### 2. Insights / Blog Feed *(new)*
**Why:** A creative studio blog builds authority, improves SEO, and gives the studio a voice between project launches. Playground has no editorial content section currently — this is a clear gap.

- Three editorial posts with realistic topic framing (brand motion, briefs, culture)
- Category tags, read time, date
- Colour-coded feature blocks
- "All articles" link placeholder for future CMS integration

#### 3. Interactive "Work With Us" Multi-Step Enquiry Flow *(new)*
**Why:** The original contact page is a plain form. An interactive flow reduces friction, qualifies leads upfront, and gives the studio instant signal on what a prospect needs — matching how an agency of this calibre should present itself.

- Step 1: Service type selection (Choice buttons)
- Step 2: Timeline selection
- Step 3: Free-text project description
- Step 4: Contact details form
- Animated slide transitions between steps with direction awareness
- Progress indicator dots
- Real contact details pre-filled on left panel (address, email, phone from the real site)
- Success state with animated check mark

---

## Tech Stack

| Tool | Purpose |
|---|---|
| **Next.js 15 (App Router)** | Framework — SSG static export, file-based routing |
| **TypeScript** | Type safety throughout |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | All animations — entrance, parallax, hover, cursor, step transitions |
| **Lucide React** | Icons |
| **DatoCMS CDN** | Real project images (same source as the live site) |
| **Claude AI (Sonnet 4.6)** | AI coding assistant used in place of V0/Lovable |

### Design decisions
- **CSS custom properties for theming** (`--bg`, `--fg`, `--accent`, `--muted`, `--surface`, `--border`) — toggling dark mode is a single class flip on `<html>`, no re-render needed
- **Warm off-white palette** (`#f5f4f0`) for light mode — closer to the studio's aesthetic than pure white
- **Accent colour `#e8440a`** — warm orange-red, energetic without being garish, suits a creative agency
- **`useInView` for all section animations** — elements only animate once they enter the viewport, not on page load
- **Event delegation for cursor** — covers dynamically rendered interactive elements without stale listeners

---

## Local Setup

### Prerequisites
- Node.js 18.17 or later
- npm (comes with Node)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/playground-studio.git
cd playground-studio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
npm run build      # Production build (checks for TypeScript errors)
npm run start      # Serve the production build locally
npm run lint       # Run ESLint
```

---

## GitHub Setup

1. Go to [github.com/new](https://github.com/new)
2. Create a **public** repository named `playground-studio`
3. Do **not** initialise with a README (the repo already has one)
4. Run the following in your terminal:

```bash
cd playground-studio

git remote add origin https://github.com/YOUR_USERNAME/playground-studio.git
git push -u origin master
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Vercel Deployment

### Option A — Deploy via Vercel dashboard (recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your `playground-studio` repo
4. Leave all settings at their defaults — Vercel auto-detects Next.js
5. Click **Deploy**

Your live URL will be: `https://playground-studio-xxx.vercel.app`

### Option B — Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. On first run it links your project. Subsequent deploys: just run `vercel` again.

### Automatic deploys
Once linked, every `git push` to `master` (or `main`) automatically triggers a new Vercel deployment.

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # CSS custom properties, dark mode, scrollbar
│   ├── layout.tsx           # Root layout with ThemeProvider, metadata
│   └── page.tsx             # Main page — assembles all sections
└── components/
    ├── ThemeProvider.tsx    # Dark/light mode context + localStorage
    ├── CursorFollower.tsx   # Custom cursor dot + ring (desktop only)
    ├── Navbar.tsx           # Scroll-aware header, mobile drawer
    ├── Hero.tsx             # Animated hero, parallax, ticker
    ├── Work.tsx             # Portfolio grid with real DatoCMS images
    ├── Capabilities.tsx     # All 8 capabilities with service tags
    ├── Team.tsx             # ★ NEW — leadership + culture values
    ├── Insights.tsx         # ★ NEW — blog/editorial feed
    ├── WorkWithUs.tsx       # ★ NEW — multi-step enquiry form
    └── Footer.tsx           # CTA footer + acknowledgement
```

---

## Submission Checklist

- [x] Site rebuilt with same brand identity — fresh, elevated execution
- [x] At least one new feature implemented (this submission has **three**)
- [x] Next.js + Tailwind CSS stack
- [x] Animations throughout (Framer Motion)
- [x] Dark / light mode
- [x] Responsive — mobile, tablet, desktop
- [x] Real project images from the studio's own CDN
- [x] Real contact details, real team names, real capabilities
- [x] Production build passing (zero TypeScript errors)
- [ ] **Public GitHub repository** — push using instructions above
- [ ] **Live Vercel URL** — deploy using instructions above
- [ ] **Walkthrough video** (5 min max) — record covering:
  - What you built and the decisions you made
  - The three new features and why you added them
  - How you used Claude AI in your workflow
  - Any challenges and how you resolved them

---

## How Claude AI Was Used

Claude (Sonnet 4.6) was used as a direct replacement for V0/Lovable:

- **Research phase** — fetched and analysed the live Playground Studio site to extract brand tone, copy, real project images, capabilities, team details, and contact info
- **Component generation** — generated all 10 components from scratch in one session
- **Debugging** — caught and fixed SSR issues (cursor `window.matchMedia` crash), animation frame mismatches (TickerWord keyframes), TypeScript type errors, and image domain configuration
- **Content accuracy** — cross-referenced all copy against the real site (team names, capability descriptions, acknowledgement Country, contact details)
- **Code review** — identified dead code (unused `sectionRef`), stale event listeners, and missing `next.config.ts` image domain

The workflow was: prompt → generate → build → fix errors → verify → iterate. Exactly how you'd use V0 or Lovable, with the advantage of being able to apply corrections in-context without hitting a usage cap.

---

## Known Limitations

- **Team photos** — The real team photos require authenticated CMS access. Avatar initials are used as placeholders. Replace by adding real image URLs to the `leaders` array in `Team.tsx`.
- **Form submission** — The enquiry form shows a success state but doesn't send data anywhere. Connect to a form endpoint (Formspree, Resend, or a Next.js route handler) for production use.
- **Blog content** — The Insights section uses static placeholder posts. Connect to a headless CMS (DatoCMS, which the studio already uses) for real editorial content.
