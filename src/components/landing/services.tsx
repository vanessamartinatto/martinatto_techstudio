"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  CreditCard,
  LayoutGrid,
  Rocket,
  ShoppingCart,
  Workflow,
  Zap,
} from "lucide-react";
import { useLanguage } from "./language-context";
import { Reveal, SectionTitle } from "./shared";

const ICONS = [Rocket, LayoutGrid, Workflow];
const EXTRA_ICONS = [Zap, ShoppingCart];
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

/* Taxa de segurança enquanto /api/fx não responde (e se ele falhar). */
const FALLBACK_RATE = 6.2;

/**
 * Busca a taxa EUR->BRL do dia (via /api/fx, taxas diárias do BCE).
 * Só é chamada quando o idioma é PT. Começa com a taxa de segurança
 * para não haver "salto" de layout; corrige em ~200ms.
 */
function useEurBrlRate(active: boolean) {
  const [rate, setRate] = useState(FALLBACK_RATE);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;
    let alive = true;
    fetch("/api/fx")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d) return;
        if (typeof d.rate === "number" && d.rate > 0) setRate(d.rate);
        if (typeof d.date === "string") setDate(d.date);
      })
      .catch(() => {
        /* mantém a taxa de segurança */
      });
    return () => {
      alive = false;
    };
  }, [active]);

  return { rate, date };
}

/* Agrupa milhares: 4900 -> "4.900" (it/pt) ou "4,900" (en) */
function groupDigits(n: number, sep: "," | "."): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

/**
 * Formatação manual (sem Intl) para garantir resultado idêntico em
 * servidor (SSR), crawler e navegador — independe do ICU do runtime.
 *
 * IT: "4.900 €" | EN: "€4,900" | PT: converte EUR->BRL com o câmbio
 * do dia e arredonda para baixo em múltiplos de R$ 50 (preço de
 * marketing limpo, sempre a favor do cliente).
 */
function formatPrice(priceEur: number, lang: string, rate: number): string {
  if (lang === "pt") {
    const brl = Math.floor((priceEur * rate) / 50) * 50;
    return `R$ ${groupDigits(brl, ".")}`;
  }
  if (lang === "en") {
    return `€${groupDigits(priceEur, ",")}`;
  }
  return `${groupDigits(priceEur, ".")}\u00A0€`;
}

/* Linha discreta com o plano de pagamento (50/50 · até 3x) */
function PayNote({ label }: { label: string }) {
  return (
    <span className="mt-1.5 flex items-start gap-1.5 text-sm leading-snug text-slate-400">
      <CreditCard className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
      {label}
    </span>
  );
}

export function Services() {
  const { t, lang } = useLanguage();
  const isPt = lang === "pt";
  const { rate, date: fxDate } = useEurBrlRate(isPt);

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
                  <div className="mt-auto pt-7">
                    <span className="block font-display text-lg font-semibold text-white">
                      {t.services.priceLabel}{" "}
                      {formatPrice(item.price, lang, rate)}
                    </span>
                    <PayNote label={t.services.payLabel} />
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-2 font-mono text-sm text-violet-300 transition-colors">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {item.time}
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Segunda fileira: Site Expresso (destaque) + Loja Online */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {t.services.extras.map((item, i) => {
            const Icon = EXTRA_ICONS[i] ?? Zap;
            const isHighlight = i === 0;
            return (
              <Reveal key={item.title} delay={i * 0.1} className="h-full">
                <article
                  className={`group relative flex h-full flex-col rounded-3xl border p-8 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                    isHighlight
                      ? "border-cyan-400/30 bg-gradient-to-br from-cyan-500/[0.07] via-[#0B0E16] to-[#0B0E16] hover:border-cyan-400/60 hover:shadow-cyan-500/20"
                      : "border-white/[0.07] bg-[#0B0E16] hover:border-violet-400/40 hover:shadow-violet-600/10"
                  }`}
                >
                  {isHighlight && (
                    <span className="absolute right-6 top-6 rounded-full bg-cyan-400 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-950">
                      {t.services.newLabel}
                    </span>
                  )}
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-colors duration-300 ${
                      isHighlight
                        ? "bg-cyan-500/15 text-cyan-300 ring-cyan-400/30 group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:ring-cyan-300"
                        : "bg-violet-500/10 text-violet-300 ring-violet-400/20 group-hover:bg-violet-500 group-hover:text-white group-hover:ring-violet-300"
                    }`}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-2xl font-semibold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-7">
                    <span
                      className={`block font-display text-lg font-semibold ${
                        isHighlight ? "text-cyan-300" : "text-white"
                      }`}
                    >
                      {t.services.priceLabel}{" "}
                      {formatPrice(item.price, lang, rate)}
                    </span>
                    <PayNote label={t.services.payLabel} />
                    <span
                      className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-mono text-sm transition-colors ${
                        isHighlight
                          ? "border-cyan-400/25 bg-cyan-500/10 text-cyan-300"
                          : "border-violet-400/25 bg-violet-500/10 text-violet-300"
                      }`}
                    >
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {item.time}
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Nota de câmbio — apenas no idioma PT (preços convertidos) */}
        {isPt && (
          <p className="mt-6 text-center font-mono text-xs text-slate-500">
            {t.services.fxNote}
            {fxDate ? ` · ${fxDate}` : ""} · €1 = R${" "}
            {rate.toFixed(2).replace(".", ",")}
          </p>
        )}
      </div>
    </section>
  );
}