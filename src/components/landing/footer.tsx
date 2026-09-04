"use client";

import { useLanguage } from "./language-context";
import { Logo } from "./navbar";

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
    <footer className="mt-auto bg-sky-950 text-sky-100">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-sky-300/90">
              {t.footer.vat}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-sky-200/80 transition-colors hover:text-orange-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-sky-900 pt-6 text-xs text-sky-400/80 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.rights}</p>
          <p className="font-mono tracking-wider">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
