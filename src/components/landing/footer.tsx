"use client";

import Image from "next/image";
import { useLanguage } from "./language-context";

export function Footer() {
  const { t } = useLanguage();

  const links = [
    { href: "#servizi", label: t.nav.services },
    { href: "#caso-studio", label: t.nav.caseStudy },
    { href: "#come-funziona", label: t.nav.howItWorks },
    { href: "#chi-sono", label: t.nav.about },
    { href: "#contatto", label: t.nav.bookCall },
  ];

  return (
    <footer className="mt-auto border-t border-white/[0.06] bg-[#04050A] text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <a href="#" aria-label="Martinatto Tech_Studio">
              <Image
                src="/images/martinatto-footer-logo.png"
                alt="Martinatto Tech_Studio"
                width={518}
                height={640}
                className="h-28 w-auto sm:h-36"
              />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-500">
              {t.footer.vat}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.rights}</p>
          <p className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text font-mono tracking-wider text-transparent">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
