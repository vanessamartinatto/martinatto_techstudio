"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./language-context";
import type { Lang } from "@/lib/i18n";

export function Logo({ dark = false }: { dark?: boolean }) {
  const { t } = useLanguage();
  return (
    <a href="#" className="flex items-center gap-3" aria-label="VM Tech Studio">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-indigo-400 to-cyan-400 font-display text-base font-bold text-white shadow-md shadow-violet-500/30">
        VM
      </span>
      <span className="leading-tight">
        <span
          className={`block font-display text-base font-bold ${
            dark ? "text-white" : "text-white"
          }`}
        >
          VM Tech Studio
        </span>
        <span
          className={`block font-mono text-[10px] uppercase tracking-[0.18em] ${
            dark ? "text-cyan-300/80" : "text-slate-400"
          }`}
        >
          {t.footer.tagline}
        </span>
      </span>
    </a>
  );
}

function LangSwitcher() {
  const { lang, setLang } = useLanguage();
  const options: Lang[] = ["en", "pt", "it"];
  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-1"
    >
      {options.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 font-mono text-[11px] tracking-wider transition-colors ${
            lang === l
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#servizi", label: t.nav.services },
    { href: "#caso-studio", label: t.nav.caseStudy },
    { href: "#come-funziona", label: t.nav.howItWorks },
    { href: "#chi-sono", label: t.nav.about },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05070D]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitcher />
          <a
            href="#contatto"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-lg shadow-white/10 transition-all hover:-translate-y-0.5 hover:bg-violet-500 hover:text-white hover:shadow-violet-500/30"
          >
            {t.nav.bookCall}
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-[#05070D]/95 px-4 pb-6 pt-4 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between gap-3">
            <LangSwitcher />
            <a
              href="#contatto"
              onClick={() => setOpen(false)}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-violet-500 hover:text-white"
            >
              {t.nav.bookCall}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
