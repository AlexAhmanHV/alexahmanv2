"use client";

import { useEffect, useRef, useState } from "react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Läs nuläget",
    description:
      "Jag börjar med användarflöden, datakällor, begränsningar och befintliga system. Att förstå hur det faktiskt fungerar idag sparar tid längre fram.",
    tags: ["Användarflöden", "Data", "Begränsningar"],
  },
  {
    number: "02",
    title: "Gör det körbart",
    description:
      "Jag prioriterar en fungerande version framför storslagna planer som aldrig möter användarna. Något körbart att reagera på slår en perfekt idé på papper.",
    tags: ["MVP", "Iteration", "Leverans"],
  },
  {
    number: "03",
    title: "Skriv för nästa person",
    description:
      "Kod, namngivning, struktur och anteckningar ska göra det lätt för mig själv, eller någon annan, att ta vid. Jag dokumenterar besluten så att teamet har kontinuitet.",
    tags: ["Dokumentation", "Struktur", "Kontinuitet"],
  },
  {
    number: "04",
    title: "Var tydlig med tradeoffs",
    description:
      "Jag är tydlig med vad som är snabbt, vad som är robust och vad som kräver mer tid. Det gör tekniska beslut enklare att ta tillsammans.",
    tags: ["Risk", "Beslut", "Transparens"],
  },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

export function ArticlesSection() {
  const { ref: headerRef, isInView: headerInView } =
    useInView<HTMLDivElement>();
  const { ref: gridRef, isInView: gridInView } = useInView<HTMLDivElement>();

  const cardDelays = [300, 400, 500, 600];

  return (
    <div
      id="process"
      className="min-h-screen w-full flex flex-col justify-center relative pt-32 pb-20 px-6 snap-start page-background"
    >
      <div
        ref={headerRef}
        className={`text-center mb-16 transition-all duration-700 ease-out ${
          headerInView
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0"
        }`}
      >
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mb-8" />
        <div className="flex items-center justify-center gap-4 mb-6">
          <h2 className="text-5xl lg:text-7xl font-bold font-lexend bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent leading-tight">
            Så jobbar jag
          </h2>
        </div>
        <p className="text-xl lg:text-2xl leading-relaxed font-bold max-w-3xl mx-auto font-figtree text-muted-foreground">
          Jag arbetar nära problemet, inte bara briefen.
        </p>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <div
              key={step.number}
              style={{ transitionDelay: `${cardDelays[index]}ms` }}
              className={`transition-all duration-700 ease-out ${
                gridInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
            >
              <div className="group h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform relative bg-white dark:bg-card hover:shadow-2xl hover:scale-105 hover:rotate-1">
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <span className="text-7xl font-bold text-white/90 font-lexend">
                    {step.number}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 leading-tight transition-colors duration-300 text-foreground group-hover:text-orange-600">
                      {step.title}
                    </h3>
                    <p className="text-sm mb-4 leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <div
                          key={tag}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors text-xs bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
