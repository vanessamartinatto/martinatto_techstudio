"use client";

import { AlertCircle, Lightbulb } from "lucide-react";
import { useLanguage } from "./language-context";
import { Reveal, SectionTitle } from "./shared";

export function CaseStudy() {
  const { t } = useLanguage();

  return (
    <section id="caso-studio" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle label={t.caseStudy.label} title={t.caseStudy.title} />

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-[2.5rem] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-orange-50 shadow-xl shadow-sky-900/5">
            <div className="grid gap-10 p-8 md:grid-cols-2 md:p-14">
              {/* Left column: challenge + solution */}
              <div className="space-y-9">
                <div>
                  <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.25em] text-sky-700">
                    <AlertCircle className="h-4 w-4" aria-hidden />
                    {t.caseStudy.challengeTitle}
                  </h3>
                  <p className="mt-4 leading-relaxed text-slate-600">
                    {t.caseStudy.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.25em] text-orange-600">
                    <Lightbulb className="h-4 w-4" aria-hidden />
                    {t.caseStudy.solutionTitle}
                  </h3>
                  <p className="mt-4 leading-relaxed text-slate-600">
                    {t.caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Right column: big stat + stack */}
              <div className="flex flex-col justify-center gap-10">
                <div>
                  <p className="text-gradient-brand font-display text-7xl font-bold tracking-tight md:text-8xl">
                    {t.caseStudy.statValue}
                  </p>
                  <p className="mt-3 max-w-sm leading-relaxed text-slate-600">
                    {t.caseStudy.statLabel}
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-sm uppercase tracking-[0.25em] text-slate-500">
                    {t.caseStudy.stackTitle}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {t.caseStudy.stack.map((tech, i) => (
                      <li
                        key={tech}
                        className={`rounded-full border px-4 py-1.5 font-mono text-sm transition-colors ${
                          i % 2 === 0
                            ? "border-sky-200 bg-white/80 text-sky-700 hover:bg-sky-500 hover:text-white"
                            : "border-orange-200 bg-white/80 text-orange-600 hover:bg-orange-400 hover:text-white"
                        }`}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
