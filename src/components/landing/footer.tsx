"use client";

import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "./language-context";

/* Client-provided display strings — language independent, do not reformat. */
const PHONE_BR = "+55 (11) 941466406";
const PHONE_IT = "+39 327237 1259";
const EMAIL = "info@martinatto.it";

const ICON_BOX_VIOLET =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300 ring-1 ring-violet-400/20 transition-colors duration-300 group-hover:bg-violet-500/20 group-hover:text-violet-200";
const ICON_BOX_CYAN =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20 transition-colors duration-300 group-hover:bg-cyan-400/20 group-hover:text-cyan-200";

const ROW_LABEL = "text-[11px] font-medium uppercase tracking-wider text-slate-500";
const ROW_VALUE =
  "text-sm text-slate-300 transition-colors duration-300 group-hover:text-cyan-300";
const ROW_ANCHOR =
  "group flex min-h-[44px] items-center gap-3 rounded-xl px-2 py-1.5 transition-colors duration-300 hover:bg-white/[0.03]";

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
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start lg:gap-16">
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

          <div className="max-w-sm">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-400">
              {"// "}
              {t.footer.contactTitle}
            </p>
            <ul className="mt-4 flex flex-col gap-1.5">
              <li className="flex items-center gap-2">
                <a href="tel:+5511941466406" className={`${ROW_ANCHOR} flex-1`}>
                  <span className={ICON_BOX_VIOLET}>
                    <Phone className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="flex flex-col">
                    <span className={ROW_LABEL}>{t.footer.phoneBrazil}</span>
                    <span className={ROW_VALUE}>{PHONE_BR}</span>
                  </span>
                </a>
                <a
                  href="https://wa.me/5511941466406"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${PHONE_BR}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300 ring-1 ring-white/10 transition-colors duration-300 hover:bg-cyan-400/20 hover:text-cyan-200 hover:ring-cyan-400/40"
                >
                  <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
                </a>
              </li>
              <li>
                <a href="tel:+393272371259" className={ROW_ANCHOR}>
                  <span className={ICON_BOX_VIOLET}>
                    <Phone className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="flex flex-col">
                    <span className={ROW_LABEL}>{t.footer.phoneItaly}</span>
                    <span className={ROW_VALUE}>{PHONE_IT}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className={ROW_ANCHOR}>
                  <span className={ICON_BOX_CYAN}>
                    <Mail className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="flex flex-col">
                    <span className={ROW_LABEL}>{t.footer.email}</span>
                    <span className={ROW_VALUE}>{EMAIL}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
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
