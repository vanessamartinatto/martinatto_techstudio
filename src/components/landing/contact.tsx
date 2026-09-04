"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "./language-context";
import { Reveal } from "./shared";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const { t, lang } = useLanguage();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, projectType, description, lang }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setName("");
      setEmail("");
      setProjectType("");
      setDescription("");
      toast({
        title: t.contact.successTitle,
        description: t.contact.successMsg,
      });
    } catch {
      setStatus("error");
      toast({
        title: t.contact.errorTitle,
        description: t.contact.errorMsg,
        variant: "destructive",
      });
    }
  }

  return (
    <section
      id="contatto"
      className="relative scroll-mt-24 overflow-hidden border-t border-slate-100 py-20 md:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/70 via-white to-orange-50/60" />
        <div className="animate-blob absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="animate-blob-delayed absolute -right-24 top-10 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            {t.contact.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-12 max-w-2xl rounded-[2rem] border border-sky-100 bg-white/90 p-6 shadow-2xl shadow-sky-900/5 backdrop-blur sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name">{t.contact.name}</Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.contact.namePlaceholder}
                  required
                  minLength={2}
                  maxLength={120}
                  className="h-12 rounded-xl border-slate-200 focus-visible:ring-sky-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">{t.contact.email}</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.contact.emailPlaceholder}
                  required
                  maxLength={200}
                  className="h-12 rounded-xl border-slate-200 focus-visible:ring-sky-400"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="contact-type">{t.contact.projectType}</Label>
              <Select value={projectType} onValueChange={setProjectType} required>
                <SelectTrigger
                  id="contact-type"
                  className="h-12 w-full rounded-xl border-slate-200 focus:ring-sky-400"
                >
                  <SelectValue placeholder={t.contact.projectTypePlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {t.contact.projectTypes.map((pt) => (
                    <SelectItem key={pt.value} value={pt.value}>
                      {pt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="contact-description">
                {t.contact.description}
              </Label>
              <Textarea
                id="contact-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.contact.descriptionPlaceholder}
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                className="resize-none rounded-xl border-slate-200 focus-visible:ring-sky-400"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-8 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-base font-medium text-white shadow-xl shadow-slate-900/15 transition-all hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-sky-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              {status === "sending" ? t.contact.sending : t.contact.submit}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
