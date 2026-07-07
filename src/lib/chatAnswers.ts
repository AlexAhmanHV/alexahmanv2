export interface QA {
  keywords: string[];
  answer: string;
}

// Offline "assistant": matches the user's text against keyword sets.
// No API, no cost. Purely client-side.
export const KNOWLEDGE: QA[] = [
  {
    keywords: ["börja", "börjar", "start", "nytt projekt", "nuläge", "process", "hur jobbar"],
    answer:
      "Jag börjar med att förstå nuläget: användarflöden, datakällor, begränsningar och vilka system som redan finns. När jag vet hur det fungerar idag gör jag snabbt något körbart att reagera på. Jag tar hellre fram en fungerande version än en perfekt plan på papper.",
  },
  {
    keywords: ["körbar", "körbart", "mvp", "leverans", "version"],
    answer:
      "Att bygga något körbart betyder att prioritera en fungerande version framför storslagna planer som aldrig möter användarna. Något konkret att testa och iterera på slår en idé på papper varje gång.",
  },
  {
    keywords: ["ai", "automation", "automatisera", "claude", "fairway", "integration"],
    answer:
      "Jag bygger AI-integrationer på ett säkert sätt. Nycklarna ligger på servern och datan valideras innan den används. Fairway är ett exempel: ett golf-scorekort där du får coachning från Claude och kan läsa av en bild på scorekortet med AI.",
  },
  {
    keywords: ["lokal", "västervik", "hemsida", "nära", "träffas"],
    answer:
      "Ja! Bor du i Västervik med omnejd och behöver en utvecklare som tar helhetsansvar för det digitala finns jag lokalt för dig. Kolla sidan \"Hemsida i Västervik\" eller hör av dig direkt.",
  },
  {
    keywords: ["vem", "om dig", "bakgrund", "vem är du", "presentera"],
    answer:
      "Jag är Alexander Åhman, systemutvecklare i Västervik med en stark skribentprofil. Jag kombinerar informatik och systemutveckling med en bakgrund inom journalistik och pedagogik, och gillar att göra komplex teknik tydlig och användbar.",
  },
  {
    keywords: ["teknik", "stack", "språk", "verktyg", "react", "laravel", "python", "typescript"],
    answer:
      "Mest React, TypeScript, Laravel, Python och PostgreSQL, plus Next.js, Tailwind och CI/CD. Jag jobbar hela vägen från datamodell och API till gränssnitt.",
  },
  {
    keywords: ["projekt", "case", "portfolio", "portfölj", "exempel", "byggt"],
    answer:
      "Fyra projekt att kika på: Fairway (golf-scorekort med Claude API), VenueFlow (multi-tenant bokningssystem i Laravel med realtid), FX Monitor (data-pipeline med Python) och Lördagsgolf (publik React/Vite-sajt). Scrolla ner till projekten för case och live-länkar.",
  },
  {
    keywords: ["kontakt", "kontakta", "mejl", "mail", "e-post", "anlita", "hör av", "linkedin"],
    answer:
      "Enklast når du mig på alexhvahman@gmail.com eller via LinkedIn. Skicka nuläge, mål och vad som skaver, så återkommer jag med ett konkret nästa steg.",
  },
  {
    keywords: ["utbildning", "studerat", "examen", "skola", "högskola"],
    answer:
      "Jag läser Informatik/Systemutveckling på Högskolan Väst (examen 2026) och har tidigare läst lärarprogrammet i engelska i Karlstad. Utbildningen täcker UX, systemutveckling, informationssäkerhet och verksamhetsprocesser.",
  },
];

const FALLBACK =
  "Bra fråga! Det svarar jag hellre på personligen. Mejla alexhvahman@gmail.com så återkommer jag. Du kan också prova någon av förvalsfrågorna, eller fråga om mina projekt, teknik eller hur jag jobbar.";

export function answerFor(input: string): string {
  const text = input.toLowerCase();
  let best: { qa: QA; score: number } | null = null;
  for (const qa of KNOWLEDGE) {
    const score = qa.keywords.filter((k) => text.includes(k)).length;
    if (score > 0 && (!best || score > best.score)) best = { qa, score };
  }
  return best ? best.qa.answer : FALLBACK;
}
