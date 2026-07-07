# alexahman v2

Personlig portföljsajt för **Alexander Åhman** – systemutvecklare i Västervik. Byggd med Next.js och en mörk, gradient-baserad design. Sajten presenterar mig, mina projekt och hur jag jobbar, samt en enkel offline-chatt som svarar på vanliga frågor.

## Innehåll

- **Hero** – kort presentation + chatt med förvalsfrågor (svarar lokalt, utan API)
- **Projekt** – Fairway, VenueFlow, FX Monitor och Lördagsgolf med case-sidor och live-länkar
- **Så jobbar jag** – min process i fyra steg
- **Lokalt i Västervik** – lokalt erbjudande + kontakt-CTA
- **Om** – bakgrund, kompetenser och erfarenhet
- **Kontakt** – formulär (öppnar e-postklienten) samt kontaktvägar

## Teknik

- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS v4
- **UI-primitiver:** shadcn/ui (Radix), `cn()`-utility
- **Ikoner:** Lucide React
- **Bilder:** Unsplash (fri licens)

## Projekt som visas

| Projekt | Beskrivning | Live |
|---------|-------------|------|
| **Fairway** | Golf-scorekort i Next.js med Claude API | https://golf-scorecard-ok6r.onrender.com/ |
| **VenueFlow** | Multi-tenant bokningssystem i Laravel med realtid | https://venueflow-wjh1.onrender.com/ |
| **FX Monitor** | Datapipeline i Python med statisk leverans | – |
| **Lördagsgolf** | Publik React/Vite-sajt | https://lordagsgolf.se/ |

## Kom igång

```bash
npm install
npm run dev
```

Sajten körs sedan på [http://localhost:3000](http://localhost:3000).

### Kommandon

- `npm run dev` – startar dev-servern
- `npm run build` – produktionsbygge
- `npm run lint` – ESLint
- `npm run typecheck` – TypeScript-kontroll
- `npm run check` – lint + typecheck + build

## Struktur

```
src/
  app/           # Sidor (App Router): start, about, contact, projects/[slug], hemsida-vastervik
  components/    # Sektioner och UI-komponenter
  data/          # Projektdata för case-sidorna
  lib/           # Chatt-svar och hjälpfunktioner
  hooks/         # Custom hooks
public/          # Bilder och logotyp
```

## Kontakt

- **E-post:** alexhvahman@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/alexander-%C3%A5hman/
- **Plats:** Västervik / Remote
