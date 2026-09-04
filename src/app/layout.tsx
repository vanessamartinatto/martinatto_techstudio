import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
  title: "VM Tech Studio | MVP e Automazione IA in settimane",
  description:
    "Unisco project management IT, architettura dei sistemi e intelligenza artificiale per costruire MVP, web app e automazioni su misura per il tuo business. Online in settimane, non mesi.",
  keywords: [
    "VM Tech Studio",
    "MVP",
    "AI",
    "Automazione IA",
    "Web App",
    "Next.js",
    "Project Management",
    "Vanessa Martinatto",
  ],
  authors: [{ name: "Vanessa Martinatto" }],
  openGraph: {
    title: "VM Tech Studio | MVP e Automazione IA in settimane",
    description:
      "Trasformo la tua idea in un prodotto digitale funzionante e online in settimane, non mesi.",
    siteName: "VM Tech Studio",
    type: "website",
  },
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
