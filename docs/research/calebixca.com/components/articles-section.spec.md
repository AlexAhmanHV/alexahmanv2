# Articles Section Specification

## Overview
- **Target file:** `src/components/ArticlesSection.tsx`
- **Screenshot:** `docs/design-references/calebixca.com/mobile/05-articles.png` (mobile), and the desktop capture described below (3-col grid, first card active with a real cover image, cards 2–3 grayed out with "In Progress" overlay)
- **Interaction model:** scroll-driven entrance (grid fades/slides in, cards stagger 400/500/600ms delay), hover-driven card lift on the active card only

## DOM structure (verbatim classes, from live extraction)

```html
<div id="articles" class="min-h-screen w-full flex flex-col justify-center relative pt-32 pb-20 px-6 snap-start page-background">
  <div class="text-center mb-16 SECTION_HEADER_TRANSITION"> <!-- translate-y-12 opacity-0 -> translate-y-0 opacity-100, duration-700 ease-out -->
    <div class="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mb-8"></div>
    <div class="flex items-center justify-center gap-4 mb-6">
      <h2 class="text-5xl lg:text-7xl font-bold font-lexend bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent leading-tight">Articles</h2>
    </div>
    <p class="text-xl lg:text-2xl leading-relaxed font-bold max-w-3xl mx-auto font-figtree text-muted-foreground">My writing from Medium</p>
  </div>

  <div class="max-w-7xl mx-auto w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 GRID_TRANSITION_delay-300">

      <!-- CARD 1 — active, transition-delay: 400ms -->
      <div style="transition-delay: 400ms" class="TRANSITION"> <!-- translate-y-12 opacity-0 -> translate-y-0 opacity-100 -->
        <div class="group h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform relative bg-white dark:bg-card hover:shadow-2xl hover:scale-105 cursor-pointer hover:rotate-1">
          <div class="relative h-48 overflow-hidden">
            <img src="https://lovable.dev/opengraph-image.png" alt="Building my portfolio with Lovable"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div class="p-6 flex flex-col h-full">
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-3 line-clamp-2 leading-tight transition-colors duration-300 text-foreground group-hover:text-orange-600">Building my portfolio with Lovable</h3>
              <p class="text-sm mb-4 line-clamp-3 leading-relaxed text-muted-foreground">My experience building my portfolio on Lovable and incorporating my own AI chat bot.</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <!-- one badge per tag: AI, UX Design, Lovable, Ai Design, Design Engineer -->
                <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors text-xs bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800">AI</div>
              </div>
            </div>
            <div class="flex items-center justify-between text-xs mb-4 text-muted-foreground">
              <div class="flex items-center gap-2"><!-- lucide Calendar w-4 h-4 --><span>December 20, 2023</span></div>
              <div class="flex items-center gap-2"><!-- lucide Clock w-4 h-4 --><span>5 min read</span></div>
            </div>
            <button class="inline-flex items-center justify-center gap-2 h-10 w-full font-medium py-2 px-4 rounded-xl transition-all duration-300 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white hover:shadow-lg font-lexend">
              <span class="flex items-center justify-center"><span>Read on Medium</span><!-- lucide ExternalLink w-4 h-4 ml-2 --></span>
            </button>
          </div>
          <div class="absolute bottom-4 left-4 w-24 h-24">
            <img src="https://images.seeklogo.com/logo-png/39/2/medium-logo-png_seeklogo-394601.png" alt="Medium Logo" class="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      <!-- CARDS 2 & 3 — disabled/"in progress", transition-delay 500ms / 600ms -->
      <div style="transition-delay: 500ms" class="TRANSITION">
        <div class="group h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform relative bg-gray-800 dark:bg-gray-900 opacity-60 cursor-not-allowed">
          <div class="relative h-48 overflow-hidden">
            <img src="{coverImage}" class="w-full h-full object-cover grayscale blur-sm" />
            <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div class="bg-gray-700/90 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium">In Progress</div>
            </div>
          </div>
          <div class="p-6 flex flex-col h-full">
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-3 line-clamp-2 leading-tight text-gray-400 dark:text-gray-500">{title}</h3>
              <p class="text-sm mb-4 line-clamp-3 leading-relaxed text-gray-500 dark:text-gray-600">{description}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold text-xs bg-gray-600 text-gray-400 border-gray-500">{tag}</div>
              </div>
            </div>
            <div class="flex items-center justify-between text-xs mb-4 text-gray-500 dark:text-gray-600">
              <div class="flex items-center gap-2"><span>December 20, 2023</span></div>
              <div class="flex items-center gap-2"><span>5 min read</span></div>
            </div>
            <button disabled class="inline-flex items-center justify-center gap-2 h-10 w-full font-medium py-2 px-4 rounded-xl bg-gray-600 text-gray-400 cursor-not-allowed">
              <span>Coming Soon</span>
            </button>
          </div>
          <div class="absolute bottom-4 left-4 w-24 h-24">
            <img src="https://images.seeklogo.com/logo-png/39/2/medium-logo-png_seeklogo-394601.png" alt="Medium Logo" class="w-full h-full object-contain opacity-40 grayscale" />
          </div>
        </div>
      </div>
      <!-- repeat pattern for card 3 -->
    </div>
  </div>
</div>
```

## Data (verbatim)

```ts
const articles = [
  {
    title: "Building my portfolio with Lovable",
    description: "My experience building my portfolio on Lovable and incorporating my own AI chat bot.",
    image: "https://lovable.dev/opengraph-image.png",
    tags: ["AI", "UX Design", "Lovable", "Ai Design", "Design Engineer"],
    date: "December 20, 2023", readTime: "5 min read",
    status: "active", ctaLabel: "Read on Medium",
  },
  {
    title: "AI for UX/UI",
    description: "My take on the up and coming AI tools for Product and development.",
    image: "https://cdn-images-1.medium.com/max/2600/1*Qjc2TGGCKyQrkSSnFaeu-A.png",
    tags: ["Product Development", "AI", "UX/UI", "AI Tools"],
    date: "December 20, 2023", readTime: "5 min read",
    status: "in-progress", ctaLabel: "Coming Soon",
  },
  {
    title: "Persona X: Building A Visual Brand Identity Using Mid Journey",
    description: "Creating a visual identity involves a thoughtful integration of photographic style, tone of communication, and strategic goals of Persona X. Here's a breakdown of how we made that connection.",
    image: "https://cdn-images-1.medium.com/max/2000/1*kP3iRmzRKLFQBzeMRcdr7g.jpeg",
    tags: ["Brand Identity", "Visual Identity", "Customer Intelligence", "AI SaaS"],
    date: "December 20, 2023", readTime: "5 min read",
    status: "in-progress", ctaLabel: "Coming Soon",
  },
];
```

Both external hosts (`lovable.dev`, `images.seeklogo.com`, `cdn-images-1.medium.com`) are already allow-listed in `next.config.ts` `images.remotePatterns` — use `next/image` (or plain `<img>` if you hit remote-loader issues, either is fine here since these aren't first-party assets).

## Responsive Behavior
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — 1 col mobile, 2 col tablet (≥768px), 3 col desktop (≥1024px)
- Cards are full-height (`h-full`) within their grid cell so uneven text lengths don't break row alignment

## Verification
Run `npx tsc --noEmit` before finishing.
