"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Sparkles, ArrowRight } from "lucide-react";

type CardVariant = "local" | "cta";

interface LocalCard {
  title: string;
  description: string;
  badgeVariant: CardVariant;
  meta: string;
  ctaLabel: string;
  ctaHref: string;
}

const cards: LocalCard[] = [
  {
    title: "Lokalt i Västervik",
    description:
      "Bor du i Västervik med omnejd och behöver en utvecklare som tar helhetsansvar för det digitala? Jag finns lokalt för dig, från idé och hemsida till drift och automation.",
    badgeVariant: "local",
    meta: "Västervik / Remote",
    ctaLabel: "Planera en hemsida i Västervik",
    ctaHref: "/hemsida-vastervik",
  },
  {
    title: "Behöver du en utvecklare som bygger på riktigt?",
    description:
      "Skicka ett meddelande med nuläge, mål och vad som skaver. Jag återkommer med ett konkret nästa steg.",
    badgeVariant: "cta",
    meta: "Svar inom kort",
    ctaLabel: "Kontakta mig",
    ctaHref: "/contact",
  },
];

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function EventsSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      id="local"
      ref={ref}
      className="min-h-screen w-full flex flex-col justify-center relative pt-32 pb-20 px-6 snap-start page-background"
    >
      <div
        className={`text-center mb-16 transition-all duration-700 ease-out ${
          inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mb-8" />
        <h2 className="text-5xl lg:text-7xl font-bold font-lexend bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent leading-tight">
          Lokalt i Västervik
        </h2>
        <p className="text-xl lg:text-2xl leading-relaxed font-bold max-w-3xl mx-auto font-figtree text-muted-foreground">
          Nära problemet och nära dig, redo för nästa steg
        </p>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-700 ease-out delay-300 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {cards.map((card, index) => (
            <div
              key={card.title}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
              className={`transition-all duration-700 ease-out ${
                inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              <div
                className={`group h-full bg-white dark:bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform ${
                  index % 2 === 0 ? "hover:rotate-1" : "hover:-rotate-1"
                }`}
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white">
                      {card.badgeVariant === "local" ? (
                        <MapPin className="w-7 h-7" />
                      ) : (
                        <Sparkles className="w-7 h-7" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-foreground group-hover:text-orange-600 transition-colors duration-300 mb-4 leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {card.description}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                      <MapPin className="w-5 h-5 text-orange-500" />
                      <span className="font-medium">{card.meta}</span>
                    </div>
                  </div>

                  <a
                    href={card.ctaHref}
                    className="inline-flex items-center justify-center gap-2 h-12 w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg text-lg font-lexend"
                  >
                    <span>{card.ctaLabel}</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
