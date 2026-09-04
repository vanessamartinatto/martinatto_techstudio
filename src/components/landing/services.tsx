"use client";

import { Clock, LayoutGrid, Rocket, Workflow } from "lucide-react";
import { useLanguage } from "./language-context";
import { Reveal, SectionTitle } from "./shared";

const ICONS = [Rocket, LayoutGrid, Workflow];
// Alternating Electric Violet & Cyan tints
const TINTS = [
  {
    box: "bg-violet-500/10 text-violet-300 ring-violet-400/20 group-hover:bg-violet-500 group-hover:text-white group-hover:ring-violet-300",
    card: "hover:border-violet-400/40 hover:shadow-violet-600/10",
  },
  {
    box: "bg-cyan-500/10 text-cyan-300 ring-cyan-400/20 group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:ring-cyan-300",
    card: "hover:border-cyan-400/40 hover:shadow-cyan-500/10",
  },
  {
    box: "bg-violet-500/10 text-violet-300 ring-violet-400/20 group-hover:bg-violet-500 group-hover:text-white group-hover:ring-violet-300",
    card: "hover:border-violet-400/40 hover:shadow-violet-600/10",
  },
];

export function Services() {
  const { t } = useLanguage();

  return (
    <section
      id="servizi"
      className="scroll-mt-24 border-t border-white/[0.06] bg-gradient-to-b from-[#05070D] to-[#080C17] py-20 md:py-28"
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
                  className={`group flex h-full flex-col rounded-3xl border border-white/[0.07] bg-[#0B0E16] p-8 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${tint.card}`}
                >
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-colors duration-300 ${tint.box}`}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-2xl font-semibold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                  <span className="mt-auto pt-7">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-mono text-sm transition-colors ${
                        i === 1
                          ? "border-cyan-400/25 bg-cyan-500/10 text-cyan-300"
                          : "border-violet-400/25 bg-violet-500/10 text-violet-300"
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
