export type Lang = "it" | "en" | "pt";

const it = {
  nav: {
    services: "Servizi",
    caseStudy: "Caso Studio",
    howItWorks: "Come Funziona",
    about: "Chi Sono",
    bookCall: "Prenota una Call",
  },
  hero: {
    badge: "[ AI-Assisted Development & Tech PM ]",
    lead1: "Trasformo la tua idea in un ",
    highlight: "prodotto digitale funzionante",
    lead2: " e online in settimane, non mesi.",
    subtitle:
      "Unisco project management IT, architettura dei sistemi e intelligenza artificiale per costruire MVP, web app e siti web su misura per il tuo business.",
    ctaPrimary: "Richiedi un Preventivo per il Mio MVP",
    ctaSecondary: "Guarda il Progetto di Riferimento",
    stats: [
      { value: "3x", label: "più veloce" },
      { value: "2-4", label: "settimane per MVP" },
      { value: "40%", label: "meno tempo operativo" },
    ],
  },
  benefits: {
    label: "Perché lavorare con me",
    title: "Strategia di PM unita a un'esecuzione accelerata dall'IA",
    items: [
      {
        title: "Velocità con Precisione IA",
        description:
          "IA avanzata in tutto il ciclo di sviluppo per consegnare 3 volte più in fretta, senza rinunciare alla qualità.",
      },
      {
        title: "Project Management Senza Caos",
        description:
          "Scope chiaro, scadenze rispettate e comunicazione trasparente dall'inizio alla fine.",
      },
      {
        title: "Architettura Scalabile",
        description:
          "Applicazioni moderne in Next.js, API robuste e database pronti a crescere con te.",
      },
    ],
  },
  services: {
    label: "Servizi",
    title: "Cosa costruisco per te",
    priceLabel: "Da",
    fxNote: "Cambi del giorno · BCE",
    payLabel: "50% all'inizio, 50% alla consegna · progetti più grandi fino a 3 rate",
    items: [
      {
        title: "Sviluppo di MVP Express (Web/App)",
        description:
          "Prodotti Minimi Funzionanti completi — autenticazione, database, pannello amministrativo e pagamenti — per validare rapidamente startup e nuove idee.",
        time: "tempi: 2-4 settimane",
        price: 4900,
      },
      {
        title: "Digitalizzazione di Metodologie & App su Misura",
        description:
          "Trasformo fogli di calcolo e processi manuali (consulenza finanziaria, mentoring e servizi) in web app e SaaS con il brand del cliente.",
        time: "tempi: 2-3 settimane",
        price: 2490,
      },
      {
        title: "Automazione dei Processi & Integrazione IA",
        description:
          "Collego sistemi (CRM, form, WhatsApp, gateway di pagamento) e assistenti IA che eliminano le attività ripetitive del team.",
        time: "tempi: 1-2 settimane",
        price: 890,
      },
    ],
    newLabel: "Novità",
    extras: [
      {
        title: "Sito Express — online in 3 giorni lavorativi",
        description:
          "Landing page o sito istituzionale professionale, veloce e ottimizzato per Google — perfetto per lanciare la tua idea o portare il tuo business online senza aspettare mesi.",
        time: "online in 3 giorni lavorativi",
        price: 490,
      },
      {
        title: "E-commerce & Negozi Online su Misura",
        description:
          "Inizia a vendere con catalogo, carrello e pagamenti integrati (Stripe, PayPal o bonifico) — negozi essenziali e professionali, pronti a crescere.",
        time: "tempi: 2-3 settimane",
        price: 1490,
      },
    ],
  },
  caseStudy: {
    label: "Caso Studio",
    title: "SaaS Finanziario su Misura per un Educatore",
    statValue: "-40%",
    statLabel:
      "di riduzione del tempo dedicato alla gestione dei clienti, oltre all'automazione completa della metodologia.",
    challengeTitle: "La Sfida",
    challenge:
      "Il cliente seguiva gli studenti con fogli di calcolo complessi, generando confusione nel supporto e limiti di crescita.",
    solutionTitle: "La Soluzione",
    solution:
      "Una web app di gestione finanziaria intuitiva, personalizzabile e integrata, sviluppata con Next.js, Prisma e ingegneria IA.",
    stackTitle: "Stack Utilizzato",
    stack: ["Next.js", "Prisma", "Tailwind CSS", "OpenAI API", "Render"],
  },
  process: {
    label: "Come Funziona",
    title: "Dallo scope al deploy in 4 passi",
    steps: [
      {
        num: "01",
        title: "Allineamento & Scope",
        description:
          "Call iniziale per capire le regole di business e mappare le funzionalità essenziali.",
      },
      {
        num: "02",
        title: "Archit