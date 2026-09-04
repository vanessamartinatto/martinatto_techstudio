"use client";

import { ArrowRight, Rocket } from "lucide-react";
import { useLanguage } from "./language-context";
import { Reveal } from "./shared";

export function Hero() {
  const { t } = useLanguage();

  const statColors = ["text-sky-600", "text-slate-900", "text-orange-500"];

  return (
    <section className="relative overflow-hidden">
      {/* Decorative background — Sky & Peach */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/90 via-[#F7FBFF] to-orange-50/70" />
        <div className="bg-dot-grid absolute inset-0 opacity-70" />
        <div className="animate-blob absolute -left-32 -top-24 h-96 w-96 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="animate-blob-delayed absolute -right-32 top-1/4 h-[26rem] w-[26rem] rounded-full bg-orange-200/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-16 text-center sm:px-6 md:pb-28 md:pt-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-5 py-2 font-mono text-[11px] tracking-widest text-sky-700 shadow-sm shadow-sky-100 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-sky-500 to-orange-400" />
            {t.hero.badge}
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-8 font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-400 sm:text-5xl md:text-[4.2rem]">
            {t.hero.lead1}
            <span className="text-gradient-brand">{t.hero.highlight}</span>
            {t.hero.lead2}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
            {t.hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contatto"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-600 px-8 py-4 text-base font-medium text-white shadow-xl shadow-sky-600/25 transition-all hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-2xl hover:shadow-orange-400/25 sm:w-auto"
            >
              <Rocket className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#caso-studio"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-8 py-4 text-base font-medium text-slate-700 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-600 sm:w-auto"
            >
              {t.hero.ctaSecondary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 rounded-[2rem] border border-sky-100/80 bg-white/70 p-8 shadow-2xl shadow-sky-900/5 backdrop-blur sm:grid-cols-3 md:p-10">
            {t.hero.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center ${
                  i > 0 ? "sm:border-l sm:border-slate-200/80" : ""
                }`}
              >
                <dd
                  className={`font-display text-4xl font-bold tracking-tight md:text-5xl ${statColors[i]}`}
                >
                  {stat.value}
                </dd>
                <dt className="mt-2 font-mono text-xs uppercase tracking-wider text-slate-500 md:text-sm">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
