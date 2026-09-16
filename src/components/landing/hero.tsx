"use client";

import { ArrowRight, Rocket } from "lucide-react";
import { useLanguage } from "./language-context";
import { Reveal } from "./shared";
import { Logo3D } from "./logo3d";

export function Hero() {
  const { t } = useLanguage();

  const statColors = ["text-cyan-400", "text-white", "text-violet-400"];

  return (
    <section className="relative overflow-hidden">
      {/* Decorative background — Deep Space Tech */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1C] via-[#05070D] to-[#070B14]" />
        <div className="bg-dot-grid absolute inset-0 opacity-80" />
        <div className="animate-blob absolute -left-32 -top-24 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="animate-blob-delayed absolute -right-32 top-1/4 h-[26rem] w-[26rem] rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute left-1/2 top-24 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-12 text-center sm:px-6 md:pb-28 md:pt-16">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-5 py-2 font-mono text-[11px] tracking-widest text-violet-200 shadow-[0_0_24px_rgba(139,92,246,0.15)] sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            {t.hero.badge}
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="relative mx-auto mt-5 w-40 sm:w-48 md:w-56">
            <div
              aria-hidden
              className="absolute inset-0 scale-75 rounded-full bg-violet-600/20 blur-3xl"
            />
            <Logo3D className="relative aspect-square w-full" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-8 font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-300 sm:text-5xl md:text-[4.2rem]">
            {t.hero.lead1}
            <span className="text-gradient-brand">{t.hero.highlight}</span>
            {t.hero.lead2}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
            {t.hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contatto"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 text-base font-medium text-white shadow-xl shadow-violet-600/30 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-cyan-500/30 sm:w-auto"
            >
              <Rocket className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#caso-studio"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-medium text-slate-200 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:text-cyan-300 sm:w-auto"
            >
              {t.hero.ctaSecondary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-8 shadow-2xl shadow-violet-950/40 backdrop-blur sm:grid-cols-3 md:p-10">
            {t.hero.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center ${
                  i > 0 ? "sm:border-l sm:border-white/[0.08]" : ""
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
