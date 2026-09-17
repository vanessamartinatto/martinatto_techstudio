import nodemailer from "nodemailer";

export type ContactLang = "it" | "en" | "pt";

export interface ContactData {
  name: string;
  email: string;
  projectType: string;
  description: string;
  lang: ContactLang;
}

/**
 * Gmail SMTP configuration via environment variables.
 *
 * Setup (Google App Password):
 * 1. Google Account → Security → 2-Step Verification (must be ON)
 * 2. Google Account → Security → App passwords → generate one
 * 3. Fill .env: SMTP_USER (your Gmail) + SMTP_PASS (the 16-char app password)
 * 4. CONTACT_EMAIL = address that receives the notifications
 */

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const SMTP_USER = process.env.SMTP_USER ?? "";
const SMTP_PASS = process.env.SMTP_PASS ?? "";
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "";

export function isMailConfigured(): boolean {
  return Boolean(SMTP_USER && SMTP_PASS && CONTACT_EMAIL);
}

function getTransport() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const PROJECT_TYPE_LABELS: Record<ContactLang, Record<string, string>> = {
  it: {
    mvp: "MVP",
    "web-app": "Web App / SaaS",
    automation: "Automazione & IA",
    other: "Altro",
  },
  en: {
    mvp: "MVP",
    "web-app": "Web App / SaaS",
    automation: "Automation & AI",
    other: "Other",
  },
  pt: {
    mvp: "MVP",
    "web-app": "Web App / SaaS",
    automation: "Automação & IA",
    other: "Outro",
  },
};

function projectTypeLabel(value: string, lang: ContactLang): string {
  return PROJECT_TYPE_LABELS[lang]?.[value] ?? value;
}

/* ------------------------------------------------------------------ */
/*  Notification email → studio owner (plain text + Reply-To client)  */
/* ------------------------------------------------------------------ */

export async function sendNotificationEmail(data: ContactData): Promise<void> {
  const transport = getTransport();

  const subject = `Nuova richiesta dal sito — ${data.name} (${projectTypeLabel(data.projectType, "it")})`;

  const text = [
    "Nuova richiesta ricevuta dal form di vmtechstudio.it",
    "",
    `Nome: ${data.name}`,
    `Email: ${data.email}`,
    `Tipo di progetto: ${projectTypeLabel(data.projectType, "it")}`,
    `Lingua del cliente: ${data.lang.toUpperCase()}`,
    "",
    "Descrizione:",
    data.description,
    "",
    "---",
    `Per rispondere direttamente al cliente, rispondi a questa email`,
    `(Reply-To: ${data.email}) oppure scrivi a ${data.email}.`,
    "",
    "Martinatto Tech_Studio — notifica automatica",
  ].join("\n");

  await transport.sendMail({
    from: `"Martinatto Tech_Studio" <${SMTP_USER}>`,
    to: CONTACT_EMAIL,
    replyTo: data.email,
    subject,
    text,
  });
}

/* ------------------------------------------------------------------ */
/*        Confirmation email → visitor (IT / EN / PT templates)       */
/* ------------------------------------------------------------------ */

const CONFIRMATION_TEMPLATES: Record<
  ContactLang,
  { subject: string; body: (name: string, type: string) => string }
> = {
  it: {
    subject: "Ho ricevuto la tua richiesta — Martinatto Tech_Studio",
    body: (name, type) => [
      `Ciao ${name},`,
      "",
      `ho ricevuto la tua richiesta relativa a "${type}".`,
      "Ti risponderò personalmente entro 24 ore lavorative con i prossimi passi",
      "o, se serve, un link per una call gratuita di 15 minuti.",
      "",
      "Nel frattempo, se vuoi dare un'occhiata a come lavoro:",
      "https://vmtechstudio.it/#caso-studio",
      "",
      "A presto,",
      "Vanessa Martinatto",
      "Martinatto Tech_Studio — AI Software & Consulting",
    ].join("\n"),
  },
  en: {
    subject: "I've received your request — Martinatto Tech_Studio",
    body: (name, type) => [
      `Hi ${name},`,
      "",
      `I've received your request about "${type}".`,
      "I'll personally get back to you within 24 business hours with the next steps,",
      "or — if useful — a link to book a free 15-minute call.",
      "",
      "In the meantime, you can see how I work here:",
      "https://vmtechstudio.it/#caso-studio",
      "",
      "Talk soon,",
      "Vanessa Martinatto",
      "Martinatto Tech_Studio — AI Software & Consulting",
    ].join("\n"),
  },
  pt: {
    subject: "Recebi a sua solicitação — Martinatto Tech_Studio",
    body: (name, type) => [
      `Olá ${name},`,
      "",
      `Recebi a sua solicitação sobre "${type}".`,
      "Responderei pessoalmente em até 24 horas úteis com os próximos passos,",
      "ou — se for útil — com um link para uma call gratuita de 15 minutos.",
      "",
      "Enquanto isso, veja como eu trabalho:",
      "https://vmtechstudio.it/#caso-studio",
      "",
      "Até breve,",
      "Vanessa Martinatto",
      "Martinatto Tech_Studio — AI Software & Consulting",
    ].join("\n"),
  },
};

export async function sendConfirmationEmail(data: ContactData): Promise<void> {
  const template = CONFIRMATION_TEMPLATES[data.lang] ?? CONFIRMATION_TEMPLATES.it;
  const type = projectTypeLabel(data.projectType, data.lang);
  const transport = getTransport();

  await transport.sendMail({
    from: `"Vanessa Martinatto — Martinatto Tech_Studio" <${SMTP_USER}>`,
    to: data.email,
    subject: template.subject,
    text: template.body(data.name, type),
  });
}
