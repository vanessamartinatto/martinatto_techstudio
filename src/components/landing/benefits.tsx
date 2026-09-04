"use client";

import { ClipboardList, Layers, Zap } from "lucide-react";
import { useLanguage } from "./language-context";
import { Reveal, SectionTitle } from "./shared";

const ICONS = [Zap, ClipboardList, Layers];

export function Benefits() {
  const { t } = useLanguage();

  return (
    <section id="perche" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle label={t.benefits.label} title={t.benefits.title} />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.benefits.items.map((item, i) => {
            const Icon = ICONS[i] ?? Zap;
            const isPeach = i === 1;
            return (
              <Reveal key={item.title} delay={i * 0.1} className="h-full">
                <article
                  className={`group flex h-full flex-col rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                    isPeach
                      ? "border-orange-100 hover:border-orange-300 hover:shadow-orange-400/10"
                      : "border-sky-100 hover:border-sky-300 hover:shadow-sky-500/10"
                  }`}
                >
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-colors duration-300 group-hover:text-white ${
                      isPeach
                        ? "bg-orange-50 text-orange-500 ring-orange-100 group-hover:bg-orange-400 group-hover:ring-orange-300"
                        : "bg-sky-50 text-sky-600 ring-sky-100 group-hover:bg-sky-500 group-hover:ring-sky-400"
                    }`}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-2xl font-semibold leading-snug text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
