export interface CaseProject {
  slug: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  demonstrates: string;
  stack: string[];
  gradientFrom: string;
  gradientTo: string;
}

export const caseProjects: CaseProject[] = [
  {
    slug: "fairway",
    title: "Fairway",
    tagline: "Golf scorecard / Next.js / Claude API",
    problem:
      "Golfare som vill bli bättre har sällan någon data att gå tillbaka till efter rundan. Det jag ville lösa var att göra det enkelt att logga hål för hål och faktiskt få något konkret tillbaka.",
    solution:
      "En fullstack Next.js-app. Du loggar scorekortet hål för hål, ser statistik och får coachning från Claude. Datan sparas i localStorage, och man kan importera en bild på scorekortet och läsa av den med AI.",
    demonstrates:
      "Att jag kan bygga en AI-integration på ett säkert sätt. Nycklarna ligger på servern, datan valideras innan den används, och gränssnittet är gjort för att funka ute på banan.",
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "Anthropic SDK", "Zod", "Render"],
    gradientFrom: "from-green-500",
    gradientTo: "to-emerald-600",
  },
  {
    slug: "venueflow",
    title: "VenueFlow",
    tagline: "Bokningssystem / multi-tenant / realtid",
    problem:
      "En restaurang vill kunna ta emot bokningar publikt och samtidigt se dem dyka upp direkt hos personalen. Flera restauranger ska dessutom kunna dela samma system utan att se varandras data.",
    solution:
      "En multi-tenant plattform i Laravel. Gäster bokar via ett publikt flöde, personalen har en admin som uppdateras i realtid via WebSockets, och en superadmin hanterar hela plattformen. Varje restaurang är sin egen avskilda kund.",
    demonstrates:
      "Att jag kan ta ansvar för en hel plattform, från publik bokning och realtidsuppdateringar till behörigheter, datamodell och drift.",
    stack: ["Laravel 11", "PHP 8.3", "Laravel Reverb", "Supabase (PostgreSQL)", "Blade", "Alpine.js", "Tailwind"],
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
  },
  {
    slug: "fx-monitor",
    title: "FX Monitor",
    tagline: "Data pipeline / statisk leverans",
    problem:
      "Man vill kunna följa valutakurser över tid, med jämförelser och riskindikatorer, men utan att behöva drifta en tung backend för det.",
    solution:
      "En monorepo med React-frontend och en Python-pipeline som hämtar kurser från ECB och sparar dem som statiska JSON-filer. GitHub Actions kör uppdateringen automatiskt.",
    demonstrates:
      "Att jag gillar lösningar där drift, data och gränssnitt hänger ihop i något enkelt och billigt att köra.",
    stack: ["React", "TypeScript", "Python", "pytest", "ruff", "Chart.js", "GitHub Actions"],
    gradientFrom: "from-purple-500",
    gradientTo: "to-fuchsia-600",
  },
  {
    slug: "lordagsgolf",
    title: "Lördagsgolf",
    tagline: "Publik sajt / informationsflöde",
    problem:
      "En besökare vill snabbt förstå banan och hitta upplägg och kontaktväg, utan att behöva gräva i massa text eller vänta på att sidan laddar i mobilen.",
    solution:
      "En publik sajt byggd med React och Vite. Tydlig struktur, responsiva vyer och några få knappar som leder rätt.",
    demonstrates:
      "Att jag kan göra innehåll konkret och lätt att skanna, och samtidigt hålla koden lätt att bygga vidare på.",
    stack: ["React", "Vite", "JSX", "React Router", "Tailwind", "ESLint"],
    gradientFrom: "from-orange-500",
    gradientTo: "to-red-600",
  },
];

export function getCaseProject(slug: string): CaseProject | undefined {
  return caseProjects.find((p) => p.slug === slug);
}
