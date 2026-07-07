"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, ExternalLink, MapPin, Clock, Send } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

const EMAIL = "alexhvahman@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/alexander-%C3%A5hman/";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      name ? `Förfrågan från ${name}` : "Förfrågan via alexahman.se"
    );
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <SiteHeader toggleRowClassName="max-w-5xl mx-auto px-8" />

      <div className="pt-[calc(64px+2rem)] min-h-screen">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-figtree mb-10"
          >
            <ArrowLeft size={18} />
            Tillbaka
          </Link>

          <div className="w-24 h-1 rounded-full mb-8 bg-gradient-to-r from-orange-500 to-red-600" />
          <h1 className="text-5xl lg:text-6xl font-bold mb-4 font-lexend bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent leading-tight pb-2">
            Hör av dig
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 font-figtree leading-relaxed mb-12 max-w-2xl">
            Behöver du en utvecklare som bygger på riktigt? Skriv några rader om
            nuläge, mål och vad som skaver, så återkommer jag med ett konkret
            nästa steg.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-3 bg-white dark:bg-card rounded-2xl shadow-lg p-8 font-figtree"
            >
              <label className="block mb-5">
                <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Namn
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ditt namn"
                  className="w-full border border-slate-200 dark:border-gray-600 rounded-xl px-4 h-12 bg-white dark:bg-gray-800 text-slate-900 dark:text-gray-100 placeholder:text-slate-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                />
              </label>
              <label className="block mb-6">
                <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Meddelande
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  placeholder="Nuläge, mål och vad som skaver..."
                  className="w-full border border-slate-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-800 text-slate-900 dark:text-gray-100 placeholder:text-slate-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors resize-none"
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 w-full h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white font-bold rounded-xl transition-all font-lexend"
              >
                <Send size={18} />
                Skicka meddelande
              </button>
              <p className="text-xs text-slate-400 mt-3 text-center">
                Öppnar din e-postklient med texten ifylld.
              </p>
            </form>

            {/* Side info */}
            <div className="lg:col-span-2 space-y-4 font-figtree">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-4 bg-white dark:bg-card rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shrink-0">
                  <Mail size={22} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    E-post
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-orange-600">
                    {EMAIL}
                  </div>
                </div>
              </a>

              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white dark:bg-card rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shrink-0">
                  <ExternalLink size={22} />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    LinkedIn
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white group-hover:text-orange-600">
                    Alexander Åhman
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-white dark:bg-card rounded-2xl shadow-lg p-5">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-gray-700 flex items-center justify-center text-orange-500 shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Plats
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Västervik / Remote
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white dark:bg-card rounded-2xl shadow-lg p-5">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-gray-700 flex items-center justify-center text-orange-500 shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Svarstid
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Oftast inom ett dygn
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
