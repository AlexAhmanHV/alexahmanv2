# Skills Marquee Specification

## Overview
- **Target file:** `src/components/SkillsMarquee.tsx`
- **Screenshot:** bottom strip of `docs/design-references/calebixca.com/desktop-full.png`
- **Interaction model:** time-driven, infinite CSS-only marquee (no scroll or click involvement)

## DOM structure (verbatim classes)

```html
<div class="relative overflow-hidden py-6 w-full">
  <div class="flex animate-scroll-seamless space-x-4">
    <!-- the full 17-tag list below, rendered TWICE back to back (34 pill divs total) for a seamless loop -->
    <div class="flex-shrink-0 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 border border-orange-200 dark:border-gray-600">
      <span class="text-sm font-medium gradient-text font-figtree whitespace-nowrap">Figma</span>
    </div>
    <!-- ...repeat per tag... -->
  </div>
</div>
```

Implementation: define a `skills` array with the 17 labels below, then render `[...skills, ...skills].map(...)` so the track contains two copies — that's what makes the `translateX(-50%)` loop seamless (the second copy takes over exactly where the first ends).

## Animation (already defined in `globals.css` — just apply the classes)
- Track: `animate-scroll-seamless` → `@keyframes scroll-seamless { 0% { transform: translate(0px) } 100% { transform: translate(-50%) } }`, `animation: scroll-seamless 20s linear infinite`
- Outer wrapper: `overflow-hidden` clips it; `relative` for positioning context

## Text Content (verbatim, exact order)
Figma, Polymet, Lovable, Sketch, Illustrator, HTML / CSS, Pen & Pencil, AI prompt engineering, Design thinking, Diagrams, Storytelling, Interaction design, Wire framing, Customer experience, Questioning, Design engineer

(That's 16 tags — cross-check against the DOM dump: Figma, Polymet, Lovable, Sketch, Illustrator, HTML / CSS, Pen & Pencil, AI prompt engineering, Design thinking, Diagrams, Storytelling, Interaction design, Wire framing, Customer experience, Questioning, Design engineer = 16 items, confirmed from raw HTML extraction.)

## Responsive Behavior
Same markup and animation at all breakpoints — it's a full-bleed row that just keeps scrolling; no layout changes needed.

## Verification
Run `npx tsc --noEmit` before finishing.
