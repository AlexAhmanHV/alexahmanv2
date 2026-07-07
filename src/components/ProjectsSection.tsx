"use client";

import { Project, ProjectShowcase } from "@/components/ProjectShowcase";

const projects: Project[] = [
  {
    slug: "fairway",
    title: "Fairway",
    description:
      "En fullstack Next.js-app där du loggar scorekort hål för hål, ser statistik och får coachning från Claude. Man kan också importera en bild på scorekortet och läsa av den med AI. Jag byggde den för att visa hur en AI-integration kan göras säker: nycklarna ligger på servern och datan valideras innan den används.",
    image: "/images/proj-fairway.jpg",
    imageAlt: "Fairway – golf scorecard app",
    gradientFrom: "from-green-500",
    gradientTo: "to-emerald-600",
    buttons: [
      { label: "Läs case", href: "/projects/fairway", external: false },
      { label: "Besök sida", href: "https://golf-scorecard-ok6r.onrender.com/", external: true },
    ],
  },
  {
    slug: "venueflow",
    title: "VenueFlow",
    description:
      "Ett multi-tenant bokningssystem för restauranger och lokaler. Gäster bokar publikt, personalen ser bokningarna komma in i realtid, och varje restaurang är sin egen avskilda kund i samma system. Jag byggde det för att visa att jag klarar en hel plattform, från publikt flöde till admin och drift.",
    image: "/images/proj-venueflow.jpg",
    imageAlt: "VenueFlow – bokningssystem för lokaler",
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
    buttons: [
      { label: "Läs case", href: "/projects/venueflow", external: false },
      { label: "Besök sida", href: "https://venueflow-wjh1.onrender.com/", external: true },
    ],
  },
  {
    slug: "fx-monitor",
    title: "FX Monitor",
    description:
      "En monorepo med React-frontend och en Python-pipeline som hämtar valutakurser från ECB och sparar dem som statiska JSON-filer. GitHub Actions kör uppdateringen automatiskt. Du får KPI:er och riskindikatorer utan att behöva någon tung backend att drifta.",
    image: "/images/proj-fx-monitor.jpg",
    imageAlt: "FX Monitor – data pipeline",
    gradientFrom: "from-purple-500",
    gradientTo: "to-fuchsia-600",
    buttons: [{ label: "Läs case", href: "/projects/fx-monitor", external: false }],
  },
  {
    slug: "lordagsgolf",
    title: "Lördagsgolf",
    description:
      "En publik sajt byggd med React och Vite. Besökaren förstår banan snabbt och hittar upplägg och kontaktväg utan att behöva gräva i text. Jag la extra vikt vid att den känns snabb och tydlig i mobilen.",
    image: "/images/proj-lordagsgolf.jpg",
    imageAlt: "Lördagsgolf – publik sajt",
    gradientFrom: "from-orange-500",
    gradientTo: "to-red-600",
    buttons: [
      { label: "Läs case", href: "/projects/lordagsgolf", external: false },
      { label: "Besök sida", href: "https://lordagsgolf.se/", external: true },
    ],
  },
];

export function ProjectsSection() {
  return (
    <>
      {projects.map((project) => (
        <ProjectShowcase
          key={project.slug}
          project={project}
          id={project.slug === "fairway" ? "projects" : undefined}
        />
      ))}
    </>
  );
}
