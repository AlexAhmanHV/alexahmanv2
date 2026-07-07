# About Page Specification

## Overview
- **Target file:** `src/app/about/page.tsx`
- **Screenshot:** `docs/design-references/calebixca.com/about-desktop-01.png`, `about-mobile-01.png`
- **Interaction model:** fully static, no data fetching, no client-side state needed (can be a server component)

## DOM structure (verbatim classes, from live outerHTML dump)

```html
<SiteHeader toggleRowClassName="max-w-4xl mx-auto px-8" />
<!-- note: this page's fixed toggle row uses max-w-4xl px-8, NOT the homepage's max-w-7xl px-6 -->

<div class="pt-[calc(64px+2rem)] min-h-screen">
  <div class="max-w-4xl mx-auto px-8 py-12">

    <div class="flex flex-col mb-16">
      <span class="relative flex shrink-0 overflow-hidden rounded-full w-24 h-24 border-4 border-white dark:border-gray-600 shadow-lg mb-6">
        <img class="aspect-square h-full w-full" alt="Caleb Ixca" src="/images/caleb-avatar-about.png" />
      </span>
      <div class="space-y-6 text-base lg:text-lg text-slate-700 dark:text-slate-300 font-figtree leading-relaxed font-bold text-left">
        <p>
          👋🏾 Hola, I'm Caleb Ixca. AI-powered designer, founder, and artist. I've been building since I was 14,
          from teaching kids art to showing work in galleries. That creative spark now powers my work leading
          product and experience at <span class="underline font-bold text-orange-600 dark:text-orange-400">Persona X</span>,
          an AI platform helping teams understand their customers. Along the way, I've designed at
          <span class="underline font-bold text-orange-600 dark:text-orange-400">Affirm</span>,
          <span class="underline font-bold text-orange-600 dark:text-orange-400">Streetcode</span>, and
          <span class="underline font-bold text-orange-600 dark:text-orange-400">Sumo Logic</span>,
          and taught UX/UI to students entering tech.
        </p>
        <p>
          I've been lucky to learn from incredible mentors, and I'm passionate about paying it forward,
          whether through mentorship, collaboration, or honest conversation. Let's connect and make it personal.
        </p>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold mb-8 text-slate-900 dark:text-white font-lexend">Experience</h2>
      <div class="space-y-12">
        <!-- one of these per timeline entry, see data below -->
        <div class="flex gap-8">
          <div class="text-slate-500 dark:text-slate-400 font-medium min-w-[80px] font-figtree">{entry.year}</div>
          <div class="flex-1">
            <div class="mb-3">
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white font-lexend">{entry.role}</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 font-figtree">{entry.duration}</p>
            </div>
            <p class="text-slate-700 dark:text-slate-300 leading-relaxed font-figtree">{entry.description}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
```

**Important:** "Persona X", "Affirm", "Streetcode", "Sumo Logic" in the intro paragraph are plain `<span>` elements styled to look like links (`underline font-bold text-orange-600`) — they are NOT `<a>` tags in the source, verified via outerHTML dump. Do not make them clickable.

## Data (verbatim, exact order top to bottom)

```ts
const experience = [
  {
    year: "2023",
    role: "Co-Founder, Head of Product & Experience at Persona X",
    duration: "2 years • Present",
    description: "Co-founded an AI Customer Intelligence platform that helps product teams turn customer data into actionable insights. Led product strategy, design, and go-to-market execution from concept to MVP launch.",
  },
  {
    year: "2022",
    role: "Designer at Affirm",
    duration: "8 months",
    description: "Designed internal tools for Capital Markets, including a self-service deal management system and a real-time risk dashboard. Focused on clarity, scalability, and auditability.",
  },
  {
    year: "2021",
    role: "UX/ UI Intern at Ring Central",
    duration: "6 months",
    description: "Collaborated on new features for the collaboration suite, prototyping and testing workflows in short, research-driven sprints.",
  },
  {
    year: "2019-2021",
    role: "UX/UI teacher (Educator), Digital Experience (Internal) at Streetcode",
    duration: "2 years",
    description: "Taught UX/UI to underrepresented students and led a website redesign for the nonprofit to improve usability and engagement.",
  },
  {
    year: "2019",
    role: "Designer at Remediant",
    duration: "7 months",
    description: "Designed the MVP and implemented a scalable design system for a cybersecurity startup focused on privileged access management.",
  },
  {
    year: "2018",
    role: "In-house designer, Training and Documentation team at Sumo Logic",
    duration: "1 year • 10 months",
    description: "Redesigned the documentation site and certification program, and prototyped a mobile dashboard for real-time analytics during a company hackathon.",
  },
];
```

## Project conventions (same as the rest of the codebase)
- Reuse the existing `SiteHeader` component from `@/components/SiteHeader` — it now accepts an optional `toggleRowClassName` prop (default `"max-w-7xl mx-auto px-6"`); pass `"max-w-4xl mx-auto px-8"` for this page to match the live site's narrower toggle row here.
- `.font-figtree` / `.font-lexend` utility classes already exist in `globals.css`.
- Avatar image already downloaded to `public/images/caleb-avatar-about.png`.
- This can be a plain server component (no `"use client"` needed) — no interactivity beyond what `SiteHeader` itself already handles.
- File path: `src/app/about/page.tsx` (Next.js App Router route for `/about`). Export a default `Page` function per Next.js convention.

## Responsive Behavior
No responsive breakpoint classes were found on the content itself beyond `text-base lg:text-lg` on the intro paragraphs — the single-column `max-w-4xl` layout naturally reflows on mobile (confirmed via mobile screenshot, no structural changes needed).

## Verification
Run `npx tsc --noEmit` before finishing.
