"use client";

import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { useLanguage } from "./language-context";

/* Ícone oficial do WhatsApp (lucide não tem brand icons) */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* Linha de contato reutilizável (ícone + texto linkado) */
function ContactLink({
  href,
  label,
  children,
  external,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="inline-flex items-center gap-2 font-mono text-sm text-slate-400 transition-colors hover:text-cyan-300"
    >
      {children}
    </a>
  );
}

/* Rótulo pequeno de grupo (Brasile / Italia / Email) */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600">
      {children}
    </p>
  );
}

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
        {/* Grid 3 colunas: marca | navegação | contatos — distribui o peso igualmente */}
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-10">
          {/* Coluna 1 — marca */}
          <div>
            <a href="#" aria-label="Martinatto Tech_Studio">
              <Image
                src="/images/martinatto-footer-logo.png"
                alt="Martinatto Tech_Studio"
                width={518}
                height={640}
                className="h-24 w-auto sm:h-28"
              />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-500">
              {t.footer.blurb}
            </p>
            <p className="mt-3 font-mono text-xs tracking-wider text-slate-600">
              {t.footer.vat}
            </p>
          </div>

          {/* Coluna 2 — navegação (centro) */}
          <div className="md:justify-self-center">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-violet-400">
              {t.footer.navTitle}
            </h3>
            <nav aria-label="Footer" className="mt-5 flex flex-col gap-3">
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

          {/* Coluna 3 — contatos (direita) */}
          <div className="md:justify-self-end">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-violet-400">
              {t.footer.contactTitle}
            </h3>
            <div className="mt-5 space-y-5">
              <div>
                <GroupLabel>{t.footer.brazil}</GroupLabel>
                <div className="mt-2 flex items-center gap-3">
                  <ContactLink
                    href="tel:+5511941466406"
                    label="Ligar para o Brasil"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    +55 (11) 94146-6406
                  </ContactLink>
                  <ContactLink
                    href="https://wa.me/5511941466406"
                    label="WhatsApp"
                    external
                  >
                    <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  </ContactLink>
                </div>
              </div>

              <div>
                <GroupLabel>{t.footer.italy}</GroupLabel>
                <div className="mt-2">
                  <ContactLink href="tel:+393272371259" label="Chiama l'Italia">
                    <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    +39 327 237 1259
                  </ContactLink>
                </div>
              </div>

              <div>
                <GroupLabel>{t.footer.email}</GroupLabel>
                <div className="mt-2 flex flex-col gap-1.5">
                  <ContactLink href="mailto:info@martinatto.com" label="Email .com">
                    <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    info@martinatto.com
                  </ContactLink>
                  <ContactLink href="mailto:info@martinatto.it" label="Email .it">
                    <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    info@martinatto.it
                  </ContactLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.rights}</p>
          <p className="bg-gradient