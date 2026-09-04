"use client";

import { LanguageProvider } from "@/components/landing/language-context";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Benefits } from "@/components/landing/benefits";
import { Services } from "@/components/landing/services";
import { CaseStudy } from "@/components/landing/case-study";
import { Process } from "@/components/landing/process";
import { About } from "@/components/landing/about";
import { Contact } from "@/components/landing/contact";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col bg-[#05070D]">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Benefits />
          <Services />
          <CaseStudy />
          <Process />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
