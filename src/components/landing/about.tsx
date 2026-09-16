"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useLanguage } from "./language-context";
import { Reveal } from "./shared";

export function About() {
  const { t } = useLanguage();

  return (
    <section
      id="chi-sono"
      className="scroll-mt-24 border-t border-white/[0.06] py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          {/* Left: identity */}
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-violet-400 md:text-sm">
              {"// "}
              {t.about.label}
            </p>
            <div className="flex items-center gap-4">
              <Image
                src="/images/vm-studio-logo.png"
                alt="VM Studio"
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-2xl shadow-lg shadow-violet-600/25 ring-1 ring-white/10"
              />
              <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                {t.about.name}
              </h2>
            </div>
            <p className="mt-5 font-mono text-base leading-relaxed text-cyan-300 md:text-lg">
              {t.about.role}
            </p>
            <div
              aria-hidden
              className="mt-8 h-1.5 w-28 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_12px_rgba(139,92,246,0.5)]"
            />
          </Reveal>

          {/* Right: bio + points */}
          <div>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-slate-400">
                {t.about.bio1}
              </p>
              <p className="mt-5 text-lg leading-relaxed text-slate-400">
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
                          ? "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/25"
                          : "bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/25"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span className="leading-relaxed text-slate-300">
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
