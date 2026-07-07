# Page Topology — calebixca.com (homepage only)

Source: Vite SPA (not Next.js), Tailwind + shadcn/ui, built with Lovable. Fonts: Figtree (body, `font-figtree`) + Lexend (headings/display, `font-lexend`) via Google Fonts.

Out of scope (per clone defaults — only `/` is cloned): `/play`, `/about`, `/case-study/2|3|4`. Nav links to these stay as plain `<Link>`/`<a>` targets; they may 404 in the clone, which is acceptable.

## Root structure

```
<body>
  <div class="scroll-smooth overflow-y-scroll h-screen snap-y snap-mandatory">  <!-- THE scroll container -->
    <nav>                                <!-- fixed top-0, z-50, height 69px -->
    <div class="fixed top-[88px] ...">   <!-- EN/ES language toggle, z-30, fixed -->
    <section: Hero>                       min-h-screen snap-start (0–911px)
    <wrapper (no scroll-snap on itself)>
      <section: Project — Persona X>      h-screen snap-start
      <section: Project — Affirm>         h-screen snap-start
      <section: Project — StreetCode>     h-screen snap-start
      <section: Project — Remediant>      h-screen snap-start
    </wrapper>
    <section: Articles>                   min-h-screen snap-start, pt-32 pb-20
    <section: Events>                     min-h-screen snap-start, pt-32 pb-20  (taller than viewport — scrolls past snap point to reach 2nd card)
  </div>
```

No footer exists — the page ends after the Events section.

**Interaction model:** hybrid.
- Page-level: **scroll-snap** (`snap-y snap-mandatory`, `scroll-smooth`) — one wheel/trackpad gesture jumps a full section.
- Per-section content reveal: **scroll-driven entrance animation**, NOT click. Each section's title/description/buttons/image fade+slide in (`opacity-0 translate-y-12` → `opacity-100 translate-y-0`) with staggered `delay-{200,300,400,500,600}ms`, triggered when the section enters the viewport (IntersectionObserver pattern, standard Tailwind transition classes toggled by a `useInView`-style hook — not CSS `@scroll-timeline`).
- Nav "projects" dropdown: **pure CSS hover** (`group` / `group-hover:opacity-100 group-hover:visible`), NOT click-controlled. Desktop only.
- Mobile nav: **click-to-open drawer** (hamburger → slide-in dialog from the right, dark scrim, close X).
- Theme toggle / language toggle: click, instant class swap (`.dark` on `<html>`); language toggle is presentational only in this clone (EN active, ES not wired to real translation — verify before building i18n; if not wired, just make it a visual toggle with no content change).

## Sections detail

### 1. Nav (fixed, z-50)
- Logo "Caleb Ixca" (gradient text orange→red, Lexend bold) links to `/`
- Links: home (active, orange-600 bold) · projects (hover dropdown) · play · about · connect (external, cal.com)
- projects dropdown (group-hover): Persona X (button, no href — scrolls to section), Affirm/StreetCode/Remediant (real links to /case-study/N)
- Social icons: LinkedIn, Instagram, Mail (lucide, hover:scale-110)
- Mobile (<lg breakpoint, exact px TBD by builder via Tailwind `lg:` default 1024px): hamburger button replaces the inline links; logo centered; social icons stay. Hamburger opens a right-side drawer dialog ("Navigation" header, home pill highlighted, projects flattened inline, play/about/connect, close X).

### 2. Theme + language toggles (both fixed, overlay content)
- Theme: pill switch, sun/moon icons, positioned top-left below nav
- Language: "EN ES" pill switch, top-right below nav — visual only unless proven otherwise

### 3. Hero (id: implicit, first snap section)
- 2-col grid (`lg:grid-cols-2`), single col on mobile
- Left: "Hi, I'm **Caleb**" (Lexend 700, 5xl→6xl, gradient "Caleb"), paragraph with 3 gradient-text phrases + "Let's talk" gradient underline link → cal.com
- Right (desktop only, `hidden lg:block` — verified via computed style at 390px: `display:none`, `offsetParent:null`): chat widget. **On mobile the chat widget does not render at all** — mobile hero is just the intro text + marquee. (An early screenshot appeared to show it on mobile; that was a headless-emulation render race, not real behavior — re-verified twice.)
- Bottom: full-bleed skills marquee (infinite scroll, see component spec)

### 4. Projects (4 full-height snap sections, shared component)
Each: fixed-position showcase image (absolute, rounded-t-2xl, own gradient dark overlay) behind centered text stack (accent bar, gradient H2, white bold paragraph, 1–2 gradient CTA buttons). Only per-project variables: image src/alt, gradient colors, title, description, button(s).

| Project | Gradient (Tailwind) | Buttons |
|---|---|---|
| Persona X | `from-purple-700 to-pink-600` | "Persona X Website" (external), "Persona X App" (external) |
| Affirm | `from-orange-500 to-red-600` | "Case Study" → /case-study/2 |
| StreetCode | `from-green-500 to-teal-600` | "Case Study" → /case-study/3 |
| Remediant | `from-blue-400 to-purple-600` | "Case Study" → /case-study/4 |

Entrance animation (identical structure per project, verified on Persona X, applies to all 4):
- Accent bar + H2 title wrapper: `transition-all duration-700 ease-out` , `translate-y-12 opacity-0` → `translate-y-0 opacity-100`, delay 0ms
- Description paragraph wrapper: same, `delay-200`
- Button row wrapper: same, `delay-400`
- Showcase image: `transition-all duration-1000 ease-out`, `translate-y-8 opacity-0 scale-110` → `translate-y-0 opacity-100 scale-100`, no delay (starts immediately, runs longest)
- Dark radial-gradient overlay on image fades in alongside the image (`opacity-0` → presumably `opacity-100`, same duration)
- All triggered on scroll-into-view (IntersectionObserver-style), re-fires each time section becomes active

### 5. Articles
Heading block (accent bar, gradient "Articles" H2, subtitle) + 3-col grid (1 col mobile, 2 col md, 3 col lg) of article cards. Card 1 active (real cover image, orange tag pills, "Read on Medium" gradient button). Cards 2–3 disabled/"Coming Soon" (grayscale cover, gray tag pills, disabled gray button, "In Progress" badge overlay). Medium logo watermark bottom-left of every card.

### 6. Events
Heading block + stacked list (not grid) of event cards. Each: image/date-block left (desktop) becomes full-width image top + gradient date bar on mobile, content right/below (title, description, calendar/clock/map-pin meta rows with lucide icons, gradient "RSVP" button with users icon). Card 1 = Online Event (Aug 5, real date), Card 2 = Local Meetup (all TBD).

## Assets inventory (see ASSET_MAP below for hosts)
1. `/lovable-uploads/2c5fc284-...png` — Caleb mascot avatar (hero)
2. `/lovable-uploads/2bd44283-...png` — Persona X showcase
3. `/lovable-uploads/53eedeb4-...png` — Affirm showcase
4. `/lovable-uploads/666f217a-...png` — StreetCode showcase
5. `/lovable-uploads/fdc39b98-...png` — Remediant showcase
6. `/lovable-uploads/6dab7e2f-...png` — Design Challenge Lab event image
7. `/lovable-uploads/6b8e0af1-...png` — Designer Mixer event image
— all 7 above hosted on calebixca.com itself → download to `public/images/`
8. `lovable.dev/opengraph-image.png` — Lovable article cover (external, hotlink or mirror)
9. `images.seeklogo.com/.../medium-logo...png` — Medium logo watermark (external)
10. `cdn-images-1.medium.com/max/2600/...png` — "AI for UX/UI" article cover (external, grayscale/blurred — disabled card)
11. `cdn-images-1.medium.com/max/2000/...jpeg` — "Persona X Visual Brand" article cover (external, grayscale/blurred — disabled card)

Icons: all standard `lucide-react` (external-link, linkedin, instagram, mail, send, calendar, clock, map-pin, users, menu, x, sun, moon) — no custom icon extraction needed, just import from the package.
