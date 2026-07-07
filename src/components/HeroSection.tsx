"use client";

import { useState } from "react";
import Image from "next/image";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { answerFor } from "@/lib/chatAnswers";

const QUESTIONS = [
  "Hur börjar du ett nytt projekt?",
  "Vad menar du med att bygga något körbart?",
  "Hur jobbar du med AI och automation?",
  "Kan du hjälpa mig lokalt i Västervik?",
  "Vilka projekt har du byggt?",
  "Vilken teknik jobbar du med?",
  "Hur når jag dig?",
];

interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

export function HeroSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "bot", text: answerFor(trimmed) },
    ]);
  }

  return (
    <div className="min-h-screen snap-start flex flex-col page-background" id="hero">
      <div className="h-[160px] flex-shrink-0" />
      <div className="flex-1 flex items-start justify-center px-6 min-h-0">
        <div className="w-full max-w-7xl h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* LEFT: intro text, always visible */}
            <div className="h-full flex flex-col justify-start px-8 lg:px-12 pt-8">
              <div className="max-w-lg">
                <div className="mb-8">
                  <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 leading-tight font-lexend">
                    Hej, jag är{" "}
                    <span className="gradient-text relative">Alexander</span>
                  </h1>
                </div>
                <div className="space-y-6 text-slate-700 dark:text-slate-300 text-2xl leading-relaxed font-figtree">
                  <p>
                    Jag bygger{" "}
                    <span className="font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      praktiska webbappar och automationer
                    </span>
                    . Jag hjälper team och företag att ta sig från{" "}
                    <span className="font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      stökiga problem till lösningar som funkar
                    </span>
                    . Jobbar med datamodeller, API:er, gränssnitt och drift.{" "}
                    <a
                      href="/contact"
                      className="font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-orange-600 after:to-red-600"
                    >
                      Kontakta mig
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: chat widget, DESKTOP ONLY */}
            <div className="hidden lg:block">
              <div className="h-full flex flex-col pt-8">
                <div className="h-full max-h-[calc(100vh-280px)] w-full flex flex-col overflow-hidden relative flex-1 h-full">
                  <div className="flex-1 min-h-0 max-h-full overflow-y-auto px-8 space-y-6 relative flex flex-col items-end justify-start pb-44">
                    <div className="h-full w-full flex flex-col">
                      <div className="mb-8">
                        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white text-right mb-8 font-figtree">
                          Vill du fråga mig något?
                        </h2>

                        {messages.length === 0 ? (
                          <div className="space-y-3">
                            {QUESTIONS.map((question, index) => (
                              <div
                                key={question}
                                className="flex justify-end"
                                style={{ animationDelay: `${index * 0.1}s` }}
                              >
                                <button
                                  onClick={() => send(question)}
                                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-3 rounded-2xl text-sm shadow-lg hover:shadow-xl transition-all duration-200 max-w-xs text-left animate-scale-in font-medium font-figtree hover:from-orange-600 hover:to-red-700"
                                  style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                  {question}
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3 w-full">
                            {messages.map((m, i) => (
                              <div
                                key={i}
                                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                              >
                                <div
                                  className={`px-5 py-3 rounded-2xl text-sm shadow-md max-w-xs font-figtree animate-scale-in ${
                                    m.role === "user"
                                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium"
                                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                                  }`}
                                >
                                  {m.text}
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-end pt-1">
                              <button
                                onClick={() => setMessages([])}
                                className="text-xs text-gray-400 hover:text-orange-600 transition-colors font-figtree"
                              >
                                Rensa
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* mascot avatar, absolutely positioned bottom-right */}
                  <div className="absolute bottom-0 right-4">
                    <div className="relative group cursor-pointer">
                      <div className="w-40 h-40 transition-all duration-300 -mt-2 relative overflow-hidden rounded-full border-4 border-white dark:border-gray-700 shadow-xl hover:scale-105">
                        <Image
                          src="/images/alex.jpg"
                          alt="Alexander Åhman"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills marquee */}
      <div className="w-full h-20 flex-shrink-0">
        <SkillsMarquee />
      </div>
    </div>
  );
}
