"use client";

import { Clock, LayoutGrid, Rocket, Workflow } from "lucide-react";
import { useLanguage } from "./language-context";
import { Reveal, SectionTitle } from "./shared";

const ICONS = [Rocket, LayoutGrid, Workflow];
// Alternating Sky & Peach icon tints
const TINTS = [
  {
    box: "bg-sky-50 text-sky-600 ring-sky-100 group-hover:bg-sky-500 group-hover:ring-sky-400",
    card: "hover:border-sky-300 hover:shadow-sky-500/10 border-sky-100",
  },
  {
    box: "bg-orange-50 text-orange-500 ring-orange-100 group-hover:bg-orange-400 group-hover:ring-orange-300",
    card: "hover:border-orange-300 hover:shadow-orange-400/10 border-orange-100",
  },
  {
    box: "bg-sky-50 text-sky-600 ring-sky-100 group-hover:bg-sky-500 group-hover:ring-sky-400",
    card: "hover:border-sky-300 hover:shadow-sky-500/10 border-sky-100",
  },
];

export function Services() {
  const { t } = useLanguage();

  return (
    <section
      id="servizi"
      className="scroll-mt-24 border-t border-slate-100 bg-gradient-to-b from-white to-sky-50/50 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle label={t.services.label} title={t.services.title} />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.services.items.map((item, i) => {
            const Icon = ICONS[i] ?? Rocket;
            const tint = TINTS[i] ?? TINTS[0];
            return (
              <Reveal key={item.title} delay={i * 0.1} className="h-full">
                <article
                  className={`group flex h-full flex-col rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${tint.card}`}
                >
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-colors duration-300 group-hover:text-white ${tint.box}`}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-2xl font-semibold leading-snug text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                  <span className="mt-auto inline-flex w-fit items-center gap-2 pt-7 font-mono text-sm text-slate-500">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 transition-colors ${
                        i === 1
                          ? "border-orange-200 bg-orange-50 text-orange-600"
                          : "border-sky-200 bg-sky-50 text-sky-700"
                      }`}
                    >
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {item.time}
                    </span>
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
