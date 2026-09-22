/**
 * Envio de e-mails do formulário de contato via API HTTP do Brevo (ex-Sendinblue).
 *
 * Por que API e não SMTP?
 * O egress SMTP do Render (portas 25/465/587) não estabelece conexão nem com
 * IONOS nem com Brevo ("Connection timeout"). A API HTTP usa HTTPS porta 443,
 * que não tem restrição de saída.
 *
 * Setup (Brevo):
 * 1. Criar conta em brevo.com com info@martinatto.it e confirmar o e-mail
 *    (remetente verificado)
 * 2. Painel Brevo → canto superior direito (perfil) → "SMTP & API" → aba
 *    "API Keys" → "Generate new key" (chave no formato xkeysib-...)
 * 3. Render → Environment: adicionar BREVO_API_KEY=xkeysib-... e manter
 *    CONTACT_EMAIL=info@martinatto.it
 *    (as variáveis SMTP_* podem ser removidas — não são mais usadas)
 */

export type ContactLang = "it" | "en" | "pt";

export interface ContactData {
  name: string;
  email: string;
  projectType: string;
  description: string;
  lang: ContactLang;
}

const BREVO_API_KEY = process.env.BREVO_API_KEY ?? "";
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "";
const SENDER_EMAIL = process.env.SENDER_EMAIL ?? CONTACT_EMAIL;
const BREVO_API_URL =
  process.env.BREVO_API_URL ?? "https://api.brevo.com/v3/smtp/email";

export function isMailConfigured(): boolean {
  return Boolean(BREVO_API_KEY && SENDER_EMAIL && CONTACT_EMAIL);
}

interface BrevoEmailPayload {
  sender: { name: string; email: string };
  to: { email: string; name?: string }[];
  replyTo?: { email: string };
  subject: string;
  textContent: string;
}

async function sendViaBrevo(payload: BrevoEmailPayload): Promise<void> {
  const res = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 300);
    throw new Error(`Brevo API ${res.status}: ${detail}`);
  }
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

  await sendViaBrevo({
    sender: { name: "Martinatto Tech_Studio", email: SENDER_EMAIL },
    to: [{ email: CONTACT_EMAIL }],
    replyTo: { email: data.email },
    subject,
    textContent: text,
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
      "Até breve,",
      "Vanessa Martinatto",
      "Martinatto Tech_Studio — AI Software & Consulting",
    ].join("\n"),
  },
};

export async function sendConfirmationEmail(data: ContactData): Promise<void> {
  const template = CONFIRMATION_TEMPLATES[data.lang] ?? CONFIRMATION_TEMPLATES.it;
  const type = projectTypeLabel(data.projectType, data.lang);

  await sendViaBrevo({
    sender: {
      name: "Vanessa Martinatto — Martinatto Tech_Studio",
      email: SENDER_EMAIL,
    },
    to: [{ email: data.email, name: data.name }],
    subject: template.subject,
    textContent: template.body(data.name, type),
  });
}