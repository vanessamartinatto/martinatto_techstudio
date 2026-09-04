"use client";

import { useLanguage } from "./language-context";
import { Reveal, SectionTitle } from "./shared";

export function Process() {
  const { t } = useLanguage();

  return (
    <section
      id="come-funziona"
      className="scroll-mt-24 border-t border-white/[0.06] bg-gradient-to-b from-[#080C17] to-[#05070D] py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle label={t.process.label} title={t.process.title} />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1} className="h-full">
              <li className="group relative flex h-full flex-col rounded-3xl border border-white/[0.07] bg-[#0B0E16] p-7 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/40 hover:shadow-xl hover:shadow-violet-600/10">
                <span
                  className={`font-display text-5xl font-bold tracking-tight ${
                    i % 2 === 1 ? "text-cyan-400/50" : "text-violet-400/50"
                  } transition-colors group-hover:text-gradient-brand`}
                >
                  {step.num}
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold leading-snug text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>
                {i < t.process.steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-4 top-1/2 hidden h-px w-3 bg-gradient-to-r from-violet-400/50 to-cyan-400/50 lg:block"
                  />
                )}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
