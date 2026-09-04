"use client";

import { useLanguage } from "./language-context";
import { Reveal, SectionTitle } from "./shared";

export function Process() {
  const { t } = useLanguage();

  return (
    <section
      id="come-funziona"
      className="scroll-mt-24 border-t border-slate-100 bg-gradient-to-b from-orange-50/40 to-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle label={t.process.label} title={t.process.title} />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1} className="h-full">
              <li className="group relative flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10">
                <span
                  className={`font-display text-5xl font-bold tracking-tight ${
                    i % 2 === 1 ? "text-orange-300" : "text-sky-300"
                  } transition-colors group-hover:text-gradient-brand`}
                >
                  {step.num}
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold leading-snug text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
                {i < t.process.steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-4 top-1/2 hidden h-px w-3 bg-gradient-to-r from-sky-300 to-orange-300 lg:block"
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
