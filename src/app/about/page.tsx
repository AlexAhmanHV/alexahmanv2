import { SiteHeader } from "@/components/SiteHeader";

interface ExperienceEntry {
  year: string;
  role: string;
  duration: string;
  description: string;
}

const experience: ExperienceEntry[] = [
  {
    year: "2025",
    role: "Praktik – webbutvecklare, Everday",
    duration: "Praktik",
    description:
      "Arbetade med interna digitala lösningar i WordPress och Laravel med fokus på funktion, struktur och användarflöden. Bidrog till förbättringar i innehåll, tydlighet och användarupplevelse, och samarbetade verksamhetsnära kring behov och förbättringar i digitala kanaler.",
  },
  {
    year: "Tidigare",
    role: "Sportjournalist / skribent",
    duration: "Tidigare erfarenhet",
    description:
      "Arbetade med research, intervjuer, källgranskning, textproduktion och publicering med höga krav på korrekthet och tempo. Anpassade språk och tonalitet efter målgrupp och kanal, och gjorde komplexa händelser begripliga i ett tydligt och lättillgängligt språk.",
  },
  {
    year: "Tidigare",
    role: "Klasslärare",
    duration: "Tidigare erfarenhet",
    description:
      "Förmedlade komplex information på ett tydligt, pedagogiskt och mottagaranpassat sätt. Tog fram planeringar, instruktioner och stödmaterial för olika målgrupper och utvecklade en stark förmåga att strukturera innehåll och skapa begriplighet.",
  },
  {
    year: "2026",
    role: "Informatik / Systemutveckling, Högskolan Väst",
    duration: "Examen 2026",
    description:
      "Kurser inom UX och användarcentrerad design, verksamhetsprocesser, systemutveckling, webbutveckling, informationssäkerhet och digitalisering. Arbetat med processkartläggning, användarresor, informationsstruktur och kravarbete.",
  },
  {
    year: "Tidigare",
    role: "Lärarprogrammet i engelska, Karlstads universitet",
    duration: "2 år fullföljda",
    description:
      "Gav mig en grund i språk, pedagogik och kommunikation som jag har nytta av när teknik och innehåll ska göras begripligt.",
  },
];

const highlightClass = "underline font-bold text-orange-600 dark:text-orange-400";

export default function AboutPage() {
  return (
    <>
      <SiteHeader toggleRowClassName="max-w-4xl mx-auto px-8" />

      <div className="pt-[calc(64px+2rem)] min-h-screen">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <div className="flex flex-col mb-16">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-24 h-24 border-4 border-white dark:border-gray-600 shadow-lg mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="aspect-square h-full w-full object-cover"
                alt="Alexander Åhman"
                src="/images/alex.jpg"
              />
            </span>
            <div className="space-y-6 text-base lg:text-lg text-slate-700 dark:text-slate-300 font-figtree leading-relaxed font-bold text-left">
              <p>
                👋 Hej, jag heter Alexander Åhman och är systemutvecklare i{" "}
                <span className={highlightClass}>Västervik</span>. Jag har också
                en stark skribentprofil och kombinerar utbildning inom{" "}
                <span className={highlightClass}>
                  informatik och systemutveckling
                </span>{" "}
                med en bakgrund inom journalistik och pedagogiskt arbete.
              </p>
              <p>
                Jag trivs där språk, webbinnehåll och användarfokus möts, särskilt
                när teknisk information behöver göras{" "}
                <span className={highlightClass}>tydlig och lätt</span> att använda.
                Jag är strukturerad och gillar att bygga hela vägen från datamodell
                och API till ett gränssnitt som faktiskt används.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white font-lexend">
              Nyckelkompetenser
            </h2>
            <div className="flex flex-wrap gap-2 font-figtree">
              {[
                "Webbredaktion & digital publicering",
                "Klarspråk & målgruppsanpassning",
                "Innehållsstruktur & metadata",
                "UX & användarcentrerad design",
                "WordPress (CMS)",
                "React / TypeScript",
                "Laravel",
                "SQL & API-integrationer",
                "Grundläggande SEO",
              ].map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full border px-3 py-1 font-semibold text-sm bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white font-lexend">
              Erfarenhet & utbildning
            </h2>
            <div className="space-y-12">
              {experience.map((entry) => (
                <div key={entry.year + entry.role} className="flex gap-8">
                  <div className="text-slate-500 dark:text-slate-400 font-medium min-w-[80px] font-figtree">
                    {entry.year}
                  </div>
                  <div className="flex-1">
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white font-lexend">
                        {entry.role}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-figtree">
                        {entry.duration}
                      </p>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-figtree">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
