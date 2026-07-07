# Play Page (Photo Gallery) Specification

## Overview
- **Target files:** `src/app/play/page.tsx` + `src/components/PhotoGallery.tsx`
- **Screenshot:** `docs/design-references/calebixca.com/play-desktop-01.png` (shows the current live error state — see important context below)
- **Interaction model:** click-driven (grid tile click opens a lightbox; lightbox supports prev/next click and Escape/ArrowLeft/ArrowRight keyboard nav)

## Important context — read before building
On the live site, this page fetches photos from a Supabase table (`photos`) at a project URL that no longer resolves (DNS failure — the backend project has been deleted/deprovisioned). This is a **permanent** condition, not a temporary outage, confirmed via direct `curl`/`nslookup` outside the browser. The live page currently just shows an error message + Retry button.

However, the actual gallery component code (still shipped in the site's JS bundle, just never successfully rendering due to the dead backend) reveals the intended real design: a masonry photo grid with a lightbox. **Decision (confirmed with the project owner): build the real masonry gallery UI, populated with generic placeholder tiles** (clearly placeholders, not fake photography) so the page looks and functions complete, rather than cloning the broken error state.

## Page structure

```tsx
<SiteHeader toggleRowClassName="max-w-7xl mx-auto px-8" />
<div className="pt-36 min-h-screen p-8">
  <div className="max-w-7xl mx-auto">
    <PhotoGallery />
    <div className="text-center mt-12 mb-12">
      <p className="text-lg text-slate-600 dark:text-slate-300 font-figtree">
        all photos taken using analog film
      </p>
    </div>
  </div>
</div>
```

## PhotoGallery component (verbatim classes, reconstructed from the site's own minified JS bundle)

Masonry grid via CSS columns (not CSS grid):

```html
<div class="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
  <!-- one per photo -->
  <div class="break-inside-avoid mb-4 cursor-pointer group" onClick="openLightbox(index)">
    <div class="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
      <img class="w-full h-auto object-cover" src="{photo.url}" alt="{photo.caption}" />
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
        <div class="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <!-- zoom/search icon, lucide "Search" or "ZoomIn", size 32 (w-8 h-8) -->
        </div>
      </div>
    </div>
  </div>
</div>
```

### Placeholder photo data
Since there's no real photo data to fetch, generate ~18 placeholder items client-side with **varied aspect ratios** so the masonry layout looks natural (real photo grids have mixed portrait/landscape/square tiles — a uniform grid would look obviously wrong). Do NOT fetch anything over the network for these. Approach:
- Define an array of 18 entries, each with a `height` value cycling through a set like `[280, 380, 320, 420, 260, 360]` (px) to vary tile proportions, paired with a `width` of a fixed value like `400` for aspect-ratio purposes.
- Render each tile as a `<div>` with a subtle muted gradient background (e.g. `bg-gradient-to-br from-muted to-muted-foreground/20`, reusing the same placeholder-shimmer look already established in `ArticlesSection`/`EventsSection` for loading states) sized via inline `style={{ aspectRatio: `${width}/${height}` }}`, plus a centered lucide `ImageIcon` (or `Camera`) at low opacity as a visual placeholder marker — NOT a real `<img>` tag, since there's no real image URL. Label each with `alt`/`aria-label` like `"Placeholder photo 1"` etc. for accessibility, and note in a one-line code comment that these stand in for the site's now-unreachable photo backend.
- Give each tile a `caption` like `"Analog film photo {n}"` for the lightbox to display.

### Lightbox
On tile click, open a full-screen overlay:
- `fixed inset-0 z-50 bg-black/90 flex items-center justify-center` backdrop, click-outside-to-close
- Close button top-right: lucide `X`, `absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full`
- Prev/Next: lucide `ChevronLeft` / `ChevronRight`, positioned `absolute left-4`/`right-4`, vertically centered, `text-white p-2 hover:bg-white/10 rounded-full`, disabled/hidden at the first/last item (or wrap around — wrapping is simpler and fine)
- Centered content: the enlarged placeholder tile (same gradient placeholder styling, larger, `max-h-[80vh] max-w-[80vw]`) with its caption below in white text
- Keyboard: `Escape` closes, `ArrowLeft`/`ArrowRight` navigate — wire via a `useEffect` keydown listener while the lightbox is open
- `"use client"` required for this component (state for open index, keyboard handling)

## Project conventions (same as rest of codebase)
- Reuse `SiteHeader` from `@/components/SiteHeader`, passing `toggleRowClassName="max-w-7xl mx-auto px-8"` (this page's toggle row is `max-w-7xl` like the homepage, but `px-8` not `px-6` — confirmed via outerHTML dump).
- lucide-react icons: `ImageIcon` (or `Camera`), `X`, `ChevronLeft`, `ChevronRight`, `Search` — import by name. Note from the homepage build: this project's `lucide-react` version has dropped brand/logo icons, but generic icons like these are all still present — verify each import resolves, and if any is missing, pick the closest available generic icon (e.g. `ImageOff`, `ZoomIn`) instead.
- `.font-figtree` utility class already defined in `globals.css`.
- File path: `src/app/play/page.tsx` for the route, `src/components/PhotoGallery.tsx` for the gallery + lightbox logic.

## Responsive Behavior
- Grid: `columns-2 md:columns-3 lg:columns-4 xl:columns-5` — 2 columns mobile, up to 5 on large desktop.
- Lightbox should stay usable on mobile (prev/next/close buttons remain reachable, image scales via `max-h-[80vh] max-w-[80vw]`).

## Verification
Run `npx tsc --noEmit` before finishing.
