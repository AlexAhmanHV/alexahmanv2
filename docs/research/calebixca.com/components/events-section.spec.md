# Events Section Specification

## Overview
- **Target file:** `src/components/EventsSection.tsx`
- **Screenshot:** `docs/design-references/calebixca.com/mobile/06-events-end.png` (mobile, 2nd card), desktop capture shows date-column-left layout (see structure below)
- **Interaction model:** scroll-driven entrance (same stagger pattern as Articles: 400ms / 500ms card delays), hover lift on each card

## DOM structure (verbatim classes, both cards captured in full)

```html
<div id="events" class="min-h-screen w-full flex flex-col justify-center relative pt-32 pb-20 px-6 snap-start page-background">
  <div class="text-center mb-16 HEADER_TRANSITION"> <!-- translate-y-12 opacity-0 -> translate-y-0 opacity-100, duration-700 ease-out -->
    <div class="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mb-8"></div>
    <h2 class="text-5xl lg:text-7xl font-bold font-lexend bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent leading-tight">Local and Online Events</h2>
    <p class="text-xl lg:text-2xl leading-relaxed font-bold max-w-3xl mx-auto font-figtree text-muted-foreground">Join me at upcoming design events, meetups, and courses</p>
  </div>

  <div class="max-w-6xl mx-auto w-full">
    <div class="space-y-8 GRID_TRANSITION_delay-300"> <!-- translate-y-12 opacity-0 -> translate-y-0 opacity-100 -->

      <!-- EVENT CARD (repeat per event; card 1 delay 400ms hover:rotate-1, card 2 delay 500ms hover:-rotate-1 — alternate rotation direction per card index) -->
      <div style="transition-delay: 400ms" class="CARD_TRANSITION">
        <div class="group bg-white dark:bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform hover:rotate-1">
          <div class="flex flex-col lg:flex-row h-full">

            <!-- MOBILE-ONLY date bar (lg:hidden) — full-width gradient strip above the image -->
            <div class="lg:hidden flex items-center justify-center p-6 bg-gradient-to-r from-orange-500 to-red-600">
              <div class="text-center text-white">
                <div class="text-sm font-medium">{event.month}</div>
                <div class="text-3xl font-bold">{event.day}</div>
              </div>
            </div>

            <!-- image column, fixed width on desktop -->
            <div class="relative lg:w-80 lg:flex-shrink-0">
              <div class="h-64 lg:h-full relative overflow-hidden">
                <img src="{event.image}" alt="{event.title}"
                     class="w-full h-full object-contain bg-gradient-to-br from-muted/50 to-muted transition-transform duration-500 group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute top-4 right-4">
                  <!-- badge: "Online Event" = bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800
                       "Local Meetup" = bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800 -->
                  <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium {badgeClasses}">{event.badge}</div>
                </div>
              </div>
            </div>

            <div class="flex-1 flex">
              <!-- DESKTOP-ONLY date column (hidden lg:flex) -->
              <div class="hidden lg:flex flex-col items-center justify-center p-8 bg-gradient-to-b from-orange-500 to-red-600 text-white">
                <div class="text-center">
                  <div class="text-sm font-medium">{event.month}</div>
                  <div class="text-4xl font-bold">{event.day}</div>
                </div>
              </div>

              <div class="flex-1 p-8 flex flex-col justify-between">
                <div class="flex-1">
                  <h3 class="text-3xl font-bold text-foreground group-hover:text-orange-600 transition-colors duration-300 mb-4 line-clamp-2 leading-tight">{event.title}</h3>
                  <p class="text-muted-foreground text-lg mb-6 line-clamp-3 leading-relaxed">{event.description}</p>
                  <div class="space-y-3 mb-8">
                    <div class="flex items-center gap-3 text-sm text-muted-foreground"><!-- lucide Calendar w-5 h-5 text-orange-500 --><span class="font-medium">{event.date}</span></div>
                    <div class="flex items-center gap-3 text-sm text-muted-foreground"><!-- lucide Clock w-5 h-5 text-orange-500 --><span class="font-medium">{event.time}</span></div>
                    <div class="flex items-center gap-3 text-sm text-muted-foreground"><!-- lucide MapPin w-5 h-5 text-orange-500 --><span class="font-medium">{event.location}</span></div>
                  </div>
                </div>
                <div class="flex gap-4">
                  <button class="inline-flex items-center justify-center gap-2 h-11 flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg text-lg font-lexend">
                    <!-- lucide Users w-5 h-5 mr-2 --><span>RSVP</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END repeat -->

    </div>
  </div>
</div>
```

Note the date appears **twice** in the markup (mobile bar + desktop column) — both must be rendered; Tailwind's `lg:hidden` / `hidden lg:flex` pair handles which one shows.

## Data (verbatim)

```ts
const events = [
  {
    title: "Design Challenge Lab",
    description: "A new, live way to prep for design challenges with other designers. Each session, 4 designers get the spotlight with 10 minutes to think out loud, sketch, and solve challenges in a collaborative environment.",
    image: "/images/event-design-challenge-lab.png",
    badge: "Online Event", badgeVariant: "online",
    month: "AUG", day: "5",
    date: "August 5, 2025", time: "6:15 - 7:30pm PST", location: "Online, Google Meet",
  },
  {
    title: "The Designer Mixer",
    description: "Local design meetup in Guadalajara, Mexico. Come meet your fellow designers and connect with the local design community. A casual, collaborative event built for growth.",
    image: "/images/event-designer-mixer.png",
    badge: "Local Meetup", badgeVariant: "local",
    month: "TBD", day: "", // no day number for this one — matches source exactly (empty text-3xl/text-4xl div)
    date: "TBD", time: "TBD", location: "TBD",
  },
];
```

Badge classes by variant:
- `online`: `bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800`
- `local`: `bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800`

Card hover rotation alternates: card index 0 → `hover:rotate-1`, card index 1 → `hover:-rotate-1` (confirmed both from source).

## Responsive Behavior
- **Desktop (≥1024px, `lg:`):** horizontal card (`lg:flex-row`), fixed 320px (`lg:w-80`) image column, dedicated vertical date column between image and text
- **Mobile (<1024px):** stacked (`flex-col`), date renders as a full-width gradient bar above the image instead of a side column, image becomes full-width with fixed height (`h-64`)

## Verification
Run `npx tsc --noEmit` before finishing.
