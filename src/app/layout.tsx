import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

/* ============================================================
   SEO — URL canônica do site.
   Confirme se este é o endereço de produção (Render).
   Se tiver domínio próprio (ex.: https://martinatto.com),
   troque AQUI e no src/app/sitemap.ts e no public/robots.txt.
   ============================================================ */
const SITE_URL = "https://martinatto.com"; "https://martinatto.it";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Martinatto Tech_Studio | MVP e Automazione IA in settimane",
    template: "%s | Martinatto Tech_Studio",
  },
  description:
    "Project management IT, architettura dei sistemi e intelligenza artificiale per costruire MVP, web app e siti web su misura. Per startup e PMI in Italia e Brasile — online in settimane, non mesi.",
  keywords: [
    "Martinatto Tech_Studio",
    "Vanessa Martinatto",
    "sviluppo MVP Italia",
    "MVP per startup",
    "software su misura",
    "automazione processi IA",
    "consulente intelligenza artificiale",
    "web app su misura",
    "siti web professionali",
    "AI software developer",
    "MVP development",
    "AI automation consultant",
    "custom web app",
    "desenvolvimento MVP",
    "automação com IA",
    "software personalizado",
    "project management",
    "Next.js",
  ],
  authors: [{ name: "Vanessa Martinatto" }],
  creator: "Vanessa Martinatto",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Martinatto Tech_Studio | MVP e Web App in settimane",
    description:
      "Trasformo la tua idea in un prodotto digitale funzionante e online in settimane, non mesi. MVP, web app, siti web e automazione con IA per startup e PMI.",
    siteName: "Martinatto Tech_Studio",
    locale: "it_IT",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: "/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Martinatto Tech_Studio — MVP, Web App e Automazione IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Martinatto Tech_Studio | MVP e Automazione IA in settimane",
    description:
      "MVP, web app, siti web e automazione con IA — online in settimane, non mesi.",
    images: ["/images/og-cover.png"],
  },
};

/* ============================================================
   SEO — Dados estruturados (schema.org) para o Google entender
   o negócio: quem é, o que faz, onde atua e como ser contactada.
   ============================================================ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Martinatto Tech_Studio",
  url: SITE_URL,
  logo: `${SITE_URL}/images/martinatto-footer-logo.png`,
  image: `${SITE_URL}/images/og-cover.png`,
  description:
    "Sviluppo MVP, web app, siti web e automazione con intelligenza artificiale per startup e PMI. Project management IT e consegna in settimane.",
  email: "info@martinatto.it",
  telephone: ["+39 327 237 1259", "+55 11 94146-6406"],
  vatID: "14705270966",
  founder: {
    "@type": "Person",
    name: "Vanessa Martinatto",
    jobTitle: "Tech Project Manager & AI Software Developer",
  },
  areaServed: [
    { "@type": "Country", name: "Italia" },
    { "@type": "Country", name: "Brasile" },
  ],
  knowsAbout: [
    "Sviluppo di MVP",
    "Automazione dei processi con IA",
    "Web app su misura",
    "Siti web professionali",
    "Project management",
  ],
  priceRange: "€€",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}