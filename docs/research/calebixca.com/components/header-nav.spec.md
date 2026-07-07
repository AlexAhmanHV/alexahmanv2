# Header / Nav Specification

## Overview
- **Target file:** `src/components/SiteHeader.tsx` (also include `ThemeToggle` and `LangToggle` as small sub-components in the same file, or separate files under `src/components/` if cleaner — your call)
- **Screenshot:** `docs/design-references/calebixca.com/desktop-full.png` (top bar), `docs/design-references/calebixca.com/mobile/02-nav-open.png` (mobile drawer)
- **Interaction model:** projects dropdown = pure CSS hover (desktop, `group`/`group-hover`); mobile nav = click-to-open drawer, JS viewport detection (no CSS media query controls the swap — build with a `useIsMobile()` hook checking `window.innerWidth < 768`, matching shadcn's standard breakpoint, since exact JS threshold could not be directly observed)

## DOM structure (verbatim classes from the live site — reuse exactly)

```html
<nav class="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-gray-700 shadow-sm">
  <div class="max-w-7xl mx-auto px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="flex-shrink-0">
        <a class="flex items-center" href="/">
          <h1 class="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-lexend">Caleb Ixca</h1>
        </a>
      </div>

      <!-- DESKTOP ONLY (render when !isMobile) -->
      <div class="flex items-center space-x-8 font-figtree">
        <a class="transition-colors text-orange-600 font-bold" href="/">home</a>
        <div class="relative group">
          <span class="transition-colors cursor-pointer text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium">projects</span>
          <div class="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-slate-200 dark:border-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div class="py-2">
              <button class="flex items-center justify-between w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                <span>Persona X</span>
                <!-- lucide ExternalLink, size 14 -->
              </button>
              <a class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors" href="/case-study/2">Affirm - Deal Management</a>
              <a class="..." href="/case-study/3">StreetCode - Revamping Access</a>
              <a class="..." href="/case-study/4">Remediant - Scalable System</a>
            </div>
          </div>
        </div>
        <a class="transition-colors text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium" href="/play">play</a>
        <a class="..." href="/about">about</a>
        <a href="https://cal.com/caleb-ixca" target="_blank" rel="noopener noreferrer" class="text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium">connect</a>
      </div>
      <!-- END DESKTOP ONLY -->

      <!-- MOBILE ONLY (render when isMobile): hamburger button, same position as the link row -->
      <button aria-label="Open navigation" class="p-2"> <!-- lucide Menu icon, opens drawer --> </button>

      <div class="flex items-center space-x-2">
        <a href="https://www.linkedin.com/in/ixcastreet/" target="_blank" rel="noopener noreferrer" class="p-2 text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 hover:scale-110"><!-- lucide Linkedin, 20px --></a>
        <a href="https://instagram.com/ixcaboi" target="_blank" rel="noopener noreferrer" class="p-2 ... hover:scale-110"><!-- lucide Instagram, 20px --></a>
        <a href="mailto:caleb.ixca@gmail.com" class="p-2 ... hover:scale-110"><!-- lucide Mail, 20px --></a>
      </div>
    </div>
  </div>
</nav>
```

## Fixed toggle row (separate element, NOT inside nav, sits below it)
```html
<div class="fixed top-[88px] left-0 right-0 z-30 transition-all duration-500 ease-in-out opacity-100 transform translate-y-0">
  <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
    <ThemeToggle />
    <LangToggle />
  </div>
</div>
```
Both toggles are pill-shaped switches, ~white bg, rounded-full, shadow, positioned left (Theme) and right (Lang) within this row (see desktop-full.png). Exact pill markup wasn't captured verbatim; build as: `<button>` container `bg-white dark:bg-gray-800 rounded-full shadow-md border border-slate-200 dark:border-gray-700 flex items-center px-1 py-1 gap-1`, with two icon/label halves and a small circular orange indicator dot next to whichever is active (see screenshot — a small orange dot sits between the two options). Clicking the inactive side switches it.
- **ThemeToggle:** left icon = lucide `Sun` (active state: orange), right icon = lucide `Moon`. Clicking toggles `document.documentElement.classList.toggle('dark')`. Persist to `localStorage` and read on mount (avoid hydration flash by defaulting to system preference via `useEffect`).
- **LangToggle:** "EN" / "ES" text labels instead of icons. This clone only ships English content — make ES a **visual-only** toggle (flips the active-side styling, no real i18n) since no translated content was found on the live site during inspection.

## Mobile drawer (dialog)
Slides in from the right, ~72% width on a 390px viewport (looked like a fixed ~320-360px panel), white background, dark overlay/scrim behind covering the rest of the screen (click to close). Header row: "Navigation" (orange-600, bold, Lexend, text-2xl) + close `X` button top-right. Below:
- "home" — full-width pill, `bg-orange-50 text-orange-600 font-bold rounded-xl px-4 py-3` (active state)
- "projects" label (gray, no background, not clickable) followed by indented sub-items: Persona X (with small external-link icon), Affirm - Deal Management, StreetCode - Revamping Access, Remediant - Scalable System — plain text links, `text-slate-600 py-3`
- "play", "about", "connect" — same plain link style as home but inactive (no bg)
All items `font-figtree`. Reference screenshot: `docs/design-references/calebixca.com/mobile/02-nav-open.png`.

## Text Content (verbatim)
Logo: "Caleb Ixca" · Links: home, projects, play, about, connect · Dropdown: Persona X, Affirm - Deal Management, StreetCode - Revamping Access, Remediant - Scalable System

## Links
- home → `/` · play → `/play` · about → `/about` · connect → `https://cal.com/caleb-ixca` (external, `target="_blank"`)
- Persona X (dropdown item) → no href, it's a `<button>` in the source (scrolls to the Persona X section on the homepage — implement as a smooth-scroll-to-anchor click handler, or just make it a link to `/#persona-x` if you add that id to the project section)
- Affirm/StreetCode/Remediant dropdown items → `/case-study/2`, `/case-study/3`, `/case-study/4` (these routes don't exist in this clone — leave as plain `<Link>`, a 404 is acceptable, out of scope)
- Socials: LinkedIn `https://www.linkedin.com/in/ixcastreet/`, Instagram `https://instagram.com/ixcaboi`, Mail `mailto:caleb.ixca@gmail.com`

## Responsive Behavior
- **Desktop (≥768px, `!isMobile`):** full link row + dropdown-on-hover, no hamburger
- **Mobile (<768px):** hamburger replaces link row, drawer dialog on click
- Toggle row (theme/lang) and social icons stay visible at all widths

## Verification
Run `npx tsc --noEmit` before finishing.
