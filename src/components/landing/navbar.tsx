"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./language-context";
import type { Lang } from "@/lib/i18n";

export function Logo({ dark = false }: { dark?: boolean }) {
  const { t } = useLanguage();
  return (
    <a href="#" className="flex items-center gap-3" aria-label="VM Tech Studio">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-sky-300 to-orange-300 font-display text-base font-bold text-white shadow-md shadow-sky-500/25">
        VM
      </span>
      <span className="leading-tight">
        <span
          className={`block font-display text-base font-bold ${
            dark ? "text-white" : "text-slate-900"
          }`}
        >
          VM Tech Studio
        </span>
        <span
          className={`block font-mono text-[10px] uppercase tracking-[0.18em] ${
            dark ? "text-sky-300" : "text-slate-500"
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
      className="flex items-center gap-0.5 rounded-full border border-slate-200 bg-white/80 p-1"
    >
      {options.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 font-mono text-[11px] tracking-wider transition-colors ${
            lang === l
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-500 hover:bg-sky-50 hover:text-sky-700"
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
    <header className="sticky top-0 z-50 border-b border-sky-100/70 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-sky-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitcher />
          <a
            href="#contatto"
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/15 transition-all hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-sky-500/30"
          >
            {t.nav.bookCall}
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-sky-100 bg-white/95 px-4 pb-6 pt-4 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-700"
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
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-600"
            >
              {t.nav.bookCall}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
