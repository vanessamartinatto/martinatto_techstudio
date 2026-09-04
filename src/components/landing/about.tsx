"use client";

import { Check } from "lucide-react";
import { useLanguage } from "./language-context";
import { Reveal } from "./shared";

export function About() {
  const { t } = useLanguage();

  return (
    <section
      id="chi-sono"
      className="scroll-mt-24 border-t border-slate-100 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          {/* Left: identity */}
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-sky-600 md:text-sm">
              {"// "}
              {t.about.label}
            </p>
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-sky-300 to-orange-300 font-display text-xl font-bold text-white shadow-lg shadow-sky-500/25">
                VM
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {t.about.name}
              </h2>
            </div>
            <p className="mt-5 font-mono text-base leading-relaxed text-sky-700 md:text-lg">
              {t.about.role}
            </p>
            <div
              aria-hidden
              className="mt-8 h-1.5 w-28 rounded-full bg-gradient-to-r from-sky-400 to-orange-300"
            />
          </Reveal>

          {/* Right: bio + points */}
          <div>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-slate-600">
                {t.about.bio1}
              </p>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                {t.about.bio2}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {t.about.points.map((point, i) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        i % 2 === 1
                          ? "bg-orange-100 text-orange-500"
                          : "bg-sky-100 text-sky-600"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span className="leading-relaxed text-slate-700">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
