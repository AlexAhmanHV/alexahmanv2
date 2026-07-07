# Projects Section Specification

## Overview
- **Target files:** `src/components/ProjectShowcase.tsx` (shared per-project component) + `src/components/ProjectsSection.tsx` (wrapper rendering the 4 instances)
- **Screenshots:** `docs/design-references/calebixca.com/01-hero.png`, `02-project-personax.png`, `03-project-streetcode.png`, `desktop-full.png` (Affirm), and live-captured Remediant view described below
- **Interaction model:** scroll-driven entrance animation, one full-viewport (`h-screen snap-start`) section per project, re-triggers each time the section becomes the active snapped section (IntersectionObserver-style — IN Progress state resets to hidden when scrolled away, then replays when scrolled back into view. If exact re-trigger-on-revisit behavior is hard to implement reliably, a simpler one-shot-per-mount reveal is an acceptable fallback — note this as a known simplification if taken.)

## DOM structure (verbatim classes, from the Persona X instance — identical structure for all 4, only text/image/gradient/buttons differ)

```html
<div class="h-screen w-full flex items-center justify-center relative pt-[134px] px-[20px] snap-start page-background">
  <div class="absolute top-[134px] left-[20px] right-[20px] bottom-0 rounded-t-2xl">
    <div class="relative overflow-hidden w-full h-full rounded-t-[25px] TRANSITION_CLASSES">
      <img src="{project.image}" alt="{project.imageAlt}" class="w-full h-full object-cover transition-all duration-500 opacity-100" loading="eager" decoding="async" />
    </div>
    <div class="absolute inset-0 transition-all duration-1000 ease-out rounded-t-[25px] OVERLAY_OPACITY_CLASS"
         style="background: radial-gradient(80% 95% at 35% 45%, rgba(0,0,0,0.85) 0%, transparent 85%), radial-gradient(65% 80% at 70% 55%, rgba(0,0,0,0.85) 0%, transparent 80%);">
    </div>
  </div>
  <div class="relative z-10 max-w-4xl mx-auto px-8 py-12 text-center">
    <div class="TITLE_TRANSITION_CLASSES">
      <div class="w-24 h-1 bg-gradient-to-r {gradientFrom} {gradientTo} rounded-full mx-auto mb-8"></div>
      <h2 class="text-5xl lg:text-7xl font-bold mb-6 font-lexend bg-gradient-to-r {gradientFrom} {gradientTo} bg-clip-text text-transparent leading-tight pb-2">{project.title}</h2>
    </div>
    <div class="DESC_TRANSITION_CLASSES">
      <p class="text-xl lg:text-2xl leading-relaxed mb-8 font-bold max-w-3xl mx-auto font-figtree text-white">{project.description}</p>
    </div>
    <div class="flex justify-center gap-4 flex-wrap BUTTONS_TRANSITION_CLASSES">
      <!-- one <a> per button -->
      <a href="{button.href}" target="_blank" rel="noopener noreferrer"
         class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium h-10 bg-gradient-to-r {gradientFrom} {gradientTo} hover:opacity-90 text-white px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-lexend">
        <!-- lucide ExternalLink, size 20, mr-3 --> {button.label}
      </a>
    </div>
  </div>
</div>
```

## Entrance animation (State A → State B, exact — verified via getComputedStyle on the live Persona X section before/after scrolling it into view)
| Element | Transition | Hidden (A) | Visible (B) | Delay |
|---|---|---|---|---|
| Title wrapper (bar+h2) | `transition-all duration-700 ease-out` | `translate-y-12 opacity-0` | `translate-y-0 opacity-100` | 0ms |
| Description wrapper | `transition-all duration-700 ease-out` | `translate-y-12 opacity-0` | `translate-y-0 opacity-100` | 200ms (`delay-200`) |
| Buttons wrapper | `transition-all duration-700 ease-out` | `translate-y-12 opacity-0` | `translate-y-0 opacity-100` | 400ms (`delay-400`) |
| Showcase image | `transition-all duration-1000 ease-out` | `translate-y-8 opacity-0 scale-110` | `translate-y-0 opacity-100 scale-100` | 0ms |
| Dark overlay | `transition-all duration-1000 ease-out` | `opacity-0` | `opacity-100` | 0ms (fades in with image) |

Implement with a small `useInView` hook (IntersectionObserver, threshold ~0.5) per section, toggling a `visible` boolean that switches each element's classes between the "A" and "B" column above.

## Per-project data (verbatim)

```ts
const projects = [
  {
    slug: "persona-x",
    title: "Persona X",
    description: "Co-founded an AI Customer Intelligence platform that helps product teams turn customer data into actionable insights. Led product strategy, design, and go-to-market execution from concept to MVP launch.",
    image: "/images/project-persona-x.png",
    imageAlt: "Persona X showcase",
    gradientFrom: "from-purple-700", gradientTo: "to-pink-600",
    buttons: [
      { label: "Persona X Website", href: "https://www.personax.ai/", external: true },
      { label: "Persona X App", href: "https://app.personax.ai/", external: true },
    ],
  },
  {
    slug: "affirm",
    title: "Internal Deal Management for Affirm",
    description: "I helped reimagine how Capital Markets at Affirm create and update funding deals. The redesign introduced self-service editing, approval flows, and a system built to scale.",
    image: "/images/project-affirm.png",
    imageAlt: "Internal Deal Management for Affirm showcase",
    gradientFrom: "from-orange-500", gradientTo: "to-red-600",
    buttons: [{ label: "Case Study", href: "/case-study/2", external: false }],
  },
  {
    slug: "streetcode",
    title: "Revamping Access to Tech Education",
    description: "I redesigned StreetCode's digital experience to better serve underrepresented communities learning tech. Focused on usability, clarity, and community engagement.",
    image: "/images/project-streetcode.png",
    imageAlt: "Revamping Access to Tech Education showcase",
    gradientFrom: "from-green-500", gradientTo: "to-teal-600",
    buttons: [{ label: "Case Study", href: "/case-study/3", external: false }],
  },
  {
    slug: "remediant",
    title: "Scaleable System for a Cybersecurity MVP",
    description: "I worked with Remediant's product team to launch their MVP and design a component system to support fast iteration and visual consistency across tools.",
    image: "/images/project-remediant.png",
    imageAlt: "Scaleable System for a Cybersecurity MVP showcase",
    gradientFrom: "from-blue-400", gradientTo: "to-purple-600",
    buttons: [{ label: "Case Study", href: "/case-study/4", external: false }],
  },
];
```

Note: the "Case Study" buttons in the live site use `<a>` without `target="_blank"` (internal route) — for the two external Persona X buttons only, use `target="_blank" rel="noopener noreferrer"`.

## Responsive Behavior
- Buttons row: `flex-wrap` already handles mobile stacking; on narrow screens they'll wrap to a centered 2-line or stack — no extra breakpoint classes were found, `flex-wrap` alone produces the stacked mobile look seen in `mobile/04-project-card.png`.
- Title uses `text-5xl lg:text-7xl` — confirm this exact responsive step.
- No other breakpoint-specific classes were found on this section; the whole thing is fluid via `max-w-4xl mx-auto` + fluid image cover.

## Verification
Run `npx tsc --noEmit` before finishing.
