import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

const offerings = [
  {
    title: "Hemsida från grunden",
    description:
      "Snabb, responsiv och lätt att uppdatera. Byggd på modern teknik, inte en tung mall.",
  },
  {
    title: "Helhetsansvar för det digitala",
    description:
      "Från idé och innehåll till drift, formulär och automation. En kontaktväg för hela kedjan.",
  },
  {
    title: "Lokalt och nära",
    description:
      "Bor du i Västervik med omnejd finns jag lokalt för dig. Enkelt att ses och stämma av.",
  },
];

export default function HemsidaVastervikPage() {
  return (
    <>
      <SiteHeader toggleRowClassName="max-w-4xl mx-auto px-8" />

      <div className="pt-[calc(64px+2rem)] min-h-screen">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-figtree mb-10"
          >
            <ArrowLeft size={18} />
            Tillbaka
          </Link>

          <div className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-full px-3 py-1 mb-6">
            <MapPin size={14} />
            Västervik / Remote
          </div>

          <div className="w-24 h-1 rounded-full mb-8 bg-gradient-to-r from-orange-500 to-red-600" />
          <h1 className="text-5xl lg:text-6xl font-bold mb-4 font-lexend bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent leading-tight pb-2">
            Hemsida i Västervik
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 font-figtree leading-relaxed mb-12 max-w-2xl">
            Behöver du en som tar helhetsansvar för det digitala? Jag bygger
            praktiska hemsidor och webbappar, och finns lokalt för dig i
            Västervik med omnejd.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {offerings.map((o) => (
              <div
                key={o.title}
                className="bg-white dark:bg-card rounded-2xl p-6 shadow-lg font-figtree"
              >
                <h2 className="text-lg font-bold mb-2 text-slate-900 dark:text-white font-lexend">
                  {o.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {o.description}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white px-8 py-4 text-lg rounded-xl shadow-lg transition-all font-lexend"
          >
            Planera din hemsida
          </Link>
        </div>
      </div>
    </>
  );
}
