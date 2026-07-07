# Hero Section Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Screenshot:** `docs/design-references/calebixca.com/desktop-full.png` (top viewport), `docs/design-references/calebixca.com/mobile/01-hero-top.png` and `mobile/07-recheck-hero.png` (mobile — chat widget does NOT appear on mobile, see below)
- **Interaction model:** static layout; chat bubbles play a one-time staggered scale-in entrance on mount; input/send are non-functional (`disabled` when input is empty, per source)

## DOM structure (verbatim classes)

```html
<div class="min-h-screen snap-start flex flex-col page-background">
  <div class="h-[160px] flex-shrink-0"></div>
  <div class="flex-1 flex items-start justify-center px-6 min-h-0">
    <div class="w-full max-w-7xl h-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">

        <!-- LEFT: intro text, always visible -->
        <div class="h-full flex flex-col justify-start px-8 lg:px-12 pt-8">
          <div class="max-w-lg">
            <div class="mb-8">
              <h1 class="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 leading-tight font-lexend">
                Hi, I'm <span class="gradient-text relative">Caleb</span>
              </h1>
            </div>
            <div class="space-y-6 text-slate-700 dark:text-slate-300 text-2xl leading-relaxed font-figtree">
              <p>
                I've spent the last <span class="font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">7 years designing systems for SaaS products</span>
                that need to go from <span class="font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">0 to 1</span>.
                I focus on the details that make products feel clear and human. I thrive on collaboration, empathy, and simplicity.
                <a href="https://cal.com/caleb-ixca" target="_blank" rel="noopener noreferrer"
                   class="font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-orange-600 after:to-red-600">Let's talk</a>.
              </p>
            </div>
          </div>
        </div>

        <!-- RIGHT: chat widget, DESKTOP ONLY -->
        <div class="hidden lg:block">
          <!-- verified via computed style at 390px width: display:none, offsetParent:null — genuinely absent on mobile, do not render it in a mobile-only variant, this column simply doesn't exist below lg (1024px) -->
          <div class="h-full flex flex-col pt-8">
            <div class="h-full max-h-[calc(100vh-280px)] w-full flex flex-col overflow-hidden relative flex-1 h-full">
              <div class="flex-1 min-h-0 max-h-full overflow-y-auto px-8 space-y-6 relative flex flex-col items-end justify-start pb-44">
                <div class="h-full w-full flex flex-col">
                  <div class="mb-8">
                    <h2 class="text-3xl font-semibold text-gray-800 dark:text-white text-right mb-8 font-figtree">Want to ask me a question?</h2>
                    <div class="space-y-3">
                      <!-- one of these per question, stagger animation-delay 0s / 0.1s / 0.2s / 0.3s -->
                      <div class="flex justify-end" style="animation-delay: 0s;">
                        <button class="bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-3 rounded-2xl text-sm shadow-lg hover:shadow-xl transition-all duration-200 max-w-xs text-left animate-scale-in font-medium font-figtree hover:from-orange-600 hover:to-red-700">
                          What's your overall approach to product design?
                        </button>
                      </div>
                      <!-- repeat for: "How do you typically start a new project?" (0.1s), "What role do you usually play on a team?" (0.2s), "How do you balance user needs with business goals?" (0.3s) -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0">
                <div class="p-6 pr-40">
                  <div class="flex items-center space-x-3">
                    <input class="flex w-full border px-3 py-2 flex-1 border-gray-200 dark:border-gray-600 focus:border-[#219DE9] focus:ring-[#219DE9] text-sm h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100 rounded-xl font-figtree"
                      placeholder="Ask, write or search for anything..." />
                    <button disabled class="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-sm h-12 w-12 rounded-xl p-0 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none">
                      <!-- lucide Send, 16px, white -->
                    </button>
                  </div>
                </div>
              </div>
              <!-- mascot avatar, absolutely positioned bottom-right, overlapping the input row -->
              <div class="absolute bottom-0 right-4">
                <div class="relative group cursor-pointer">
                  <div class="w-44 h-44 transition-all duration-300 -mt-2 relative overflow-visible hover:scale-105">
                    <img src="/images/caleb-avatar.png" alt="Caleb Avatar" class="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Skills marquee — see skills-marquee.spec.md, import <SkillsMarquee /> here -->
  <div class="w-full h-20 flex-shrink-0">
    <SkillsMarquee />
  </div>
</div>
```

## Behavior
- Chat question buttons: on mount, each fades/scales in (`animate-scale-in`, 0.3s ease-out) with a stagger — implement the keyframe via the already-defined `.animate-scale-in` utility in `globals.css` (scale 0.9→1, opacity 0→1) and apply inline `style={{ animationDelay: '0s' }}` etc. per button (0s, 0.1s, 0.2s, 0.3s).
- Send button is `disabled` whenever the input is empty (controlled input + `disabled={value.trim() === ''}"`); no submit action needed (non-functional in the source).
- Input focus ring color is a one-off custom blue `#219DE9` (not part of the orange/red brand palette) — use `focus:border-[#219DE9] focus:ring-[#219DE9]` arbitrary values.
- Avatar: `hover:scale-105` on the group wrapper (subtle lift on hover), 300ms transition.

## Text Content (verbatim)
- H1: "Hi, I'm **Caleb**"
- Paragraph: "I've spent the last **7 years designing systems for SaaS products** that need to go from **0 to 1**. I focus on the details that make products feel clear and human. I thrive on collaboration, empathy, and simplicity. **Let's talk**."
- Chat heading: "Want to ask me a question?"
- Questions (in order): "What's your overall approach to product design?" / "How do you typically start a new project?" / "What role do you usually play on a team?" / "How do you balance user needs with business goals?"
- Input placeholder: "Ask, write or search for anything..."

## Assets
- `/images/caleb-avatar.png` (already downloaded to `public/images/`)

## Responsive Behavior
- **Desktop (≥1024px, `lg:`):** 2-column grid, chat widget visible on the right
- **Mobile/tablet (<1024px):** single column, chat widget column literally does not render (`hidden lg:block`); hero is just the intro text followed directly by the skills marquee

## Verification
Run `npx tsc --noEmit` before finishing.
