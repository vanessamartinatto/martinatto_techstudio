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
          <div className="mt-12 overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-br from-violet-950/40 via-[#0B0E16] to-cyan-950/30 shadow-xl shadow-violet-950/30">
            <div className="grid gap-10 p-8 md:grid-cols-2 md:p-14">
              {/* Left column: challenge + solution */}
              <div className="space-y-9">
                <div>
                  <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.25em] text-violet-300">
                    <AlertCircle className="h-4 w-4" aria-hidden />
                    {t.caseStudy.challengeTitle}
                  </h3>
                  <p className="mt-4 leading-relaxed text-slate-400">
                    {t.caseStudy.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">
                    <Lightbulb className="h-4 w-4" aria-hidden />
                    {t.caseStudy.solutionTitle}
                  </h3>
                  <p className="mt-4 leading-relaxed text-slate-400">
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
                  <p className="mt-3 max-w-sm leading-relaxed text-slate-400">
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
                        className={`rounded-full border bg-white/[0.03] px-4 py-1.5 font-mono text-sm transition-colors ${
                          i % 2 === 0
                            ? "border-violet-400/25 text-violet-300 hover:bg-violet-500 hover:text-white"
                            : "border-cyan-400/25 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950"
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
