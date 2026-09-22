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
    items: [
      {
        title: "Sviluppo di MVP Express (Web/App)",
        description:
          "Prodotti Minimi Funzionanti completi — autenticazione, database, pannello amministrativo e pagamenti — per validare rapidamente startup e nuove idee.",
        time: "tempi: 2-4 settimane",
      },
      {
        title: "Digitalizzazione di Metodologie & App su Misura",
        description:
          "Trasformo fogli di calcolo e processi manuali (consulenza finanziaria, mentoring e servizi) in web app e SaaS con il brand del cliente.",
        time: "tempi: 2-3 settimane",
      },
      {
        title: "Automazione dei Processi & Integrazione IA",
        description:
          "Collego sistemi (CRM, form, WhatsApp, gateway di pagamento) e assistenti IA che eliminano le attività ripetitive del team.",
        time: "tempi: 1-2 settimane",
      },
    ],
    newLabel: "Novità",
    extras: [
      {
        title: "Sito Express — online in 3 giorni lavorativi",
        description:
          "Landing page o sito istituzionale professionale, veloce e ottimizzato per Google — perfetto per lanciare la tua idea o portare il tuo business online senza aspettare mesi.",
        time: "online in 3 giorni lavorativi",
      },
      {
        title: "E-commerce & Negozi Online su Misura",
        description:
          "Inizia a vendere con catalogo, carrello e pagamenti integrati (Stripe, PayPal o bonifico) — negozi essenziali e professionali, pronti a crescere.",
        time: "tempi: 2-3 settimane",
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
        title: "Architettura & Prototipazione",
        description:
          "Progettazione del flusso applicativo e scelta dello stack tecnologico ideale.",
      },
      {
        num: "03",
        title: "Sviluppo con IA",
        description:
          "Costruzione rapida del software con validazioni continue di sicurezza e performance.",
      },
      {
        num: "04",
        title: "Consegna & Pubblicazione",
        description:
          "Deploy in produzione, formazione all'uso e consegna di codice e accessi.",
      },
    ],
  },
  about: {
    label: "Chi Sono",
    name: "Vanessa Martinatto",
    role: "Tech Project Manager & AI Software Developer",
    bio1: "Project Manager IT con solida esperienza nell'organizzazione di sistemi e flussi complessi, laureata in Analisi e Sviluppo di Sistemi e specializzanda in Ingegneria del Software con Intelligenza Artificiale.",
    bio2: "A differenza degli sviluppatori tradizionali che impiegano mesi o si limitano a scrivere codice senza capire il business, unisco visione strategica e project management rigoroso a uno sviluppo agile potenziato dall'IA — consegnando prodotti funzionanti, scalabili e pronti al mercato in tempi record.",
    points: [
      "Visione di business prima del codice",
      "Scope e scadenze sotto controllo",
      "Stack moderno e scalabile",
      "Consegna con deploy e formazione",
    ],
  },
  contact: {
    title: "Pronto a far decollare il tuo progetto?",
    subtitle:
      "Compila il form qui sotto oppure prenota una call di 15 minuti per valutare insieme la tua idea.",
    name: "Nome",
    namePlaceholder: "Il tuo nome completo",
    email: "Email",
    emailPlaceholder: "tu@azienda.com",
    projectType: "Tipo di Progetto",
    projectTypePlaceholder: "Seleziona un tipo di progetto",
    projectTypes: [
      { value: "mvp", label: "MVP" },
      { value: "web-app", label: "Web App / SaaS" },
      { value: "automation", label: "Automazione & IA" },
      { value: "other", label: "Altro" },
    ],
    description: "Breve Descrizione del Progetto",
    descriptionPlaceholder: "Raccontami in poche righe di cosa hai bisogno...",
    submit: "Invia richiesta",
    sending: "Invio in corso...",
    successTitle: "Richiesta inviata!",
    successMsg: "Grazie! Ti risponderò al più presto via email.",
    errorTitle: "Errore",
    errorMsg: "Si è verificato un errore. Riprova tra poco.",
  },
  footer: {
    tagline: "AI Software & Consulting",
    vat: "P.IVA: 14705270966",
    rights: "© 2026 Vanessa Martinatto. Tutti i diritti riservati.",
  },
};

export type Dict = typeof it;

const en: Dict = {
  nav: {
    services: "Services",
    caseStudy: "Case Study",
    howItWorks: "How It Works",
    about: "About Me",
    bookCall: "Book a Call",
  },
  hero: {
    badge: "[ AI-Assisted Development & Tech PM ]",
    lead1: "I turn your idea into a ",
    highlight: "working digital product",
    lead2: ", online in weeks, not months.",
    subtitle:
      "I combine IT project management, systems architecture and artificial intelligence to build MVPs, web apps and custom websites for your business.",
    ctaPrimary: "Request a Quote for My MVP",
    ctaSecondary: "View the Reference Project",
    stats: [
      { value: "3x", label: "faster" },
      { value: "2-4", label: "weeks per MVP" },
      { value: "40%", label: "less operational time" },
    ],
  },
  benefits: {
    label: "Why work with me",
    title: "PM strategy combined with AI-accelerated execution",
    items: [
      {
        title: "Speed with AI Precision",
        description:
          "Advanced AI across the whole development cycle to deliver 3x faster, without compromising on quality.",
      },
      {
        title: "Project Management Without Chaos",
        description:
          "Clear scope, respected deadlines and transparent communication from start to finish.",
      },
      {
        title: "Scalable Architecture",
        description:
          "Modern Next.js applications, robust APIs and databases ready to grow with you.",
      },
    ],
  },
  services: {
    label: "Services",
    title: "What I build for you",
    items: [
      {
        title: "Express MVP Development (Web/App)",
        description:
          "Complete Minimum Viable Products — authentication, database, admin panel and payments — to quickly validate startups and new ideas.",
        time: "timeline: 2-4 weeks",
      },
      {
        title: "Digitalization of Methodologies & Custom Apps",
        description:
          "I transform spreadsheets and manual processes (financial consulting, mentoring and services) into web apps and SaaS with the client's own brand.",
        time: "timeline: 2-3 weeks",
      },
      {
        title: "Process Automation & AI Integration",
        description:
          "I connect systems (CRM, forms, WhatsApp, payment gateways) and build AI assistants that eliminate your team's repetitive tasks.",
        time: "timeline: 1-2 weeks",
      },
    ],
    newLabel: "New",
    extras: [
      {
        title: "Express Website — live in 3 business days",
        description:
          "A professional, fast, SEO-optimized landing page or business website — perfect to launch your idea or get your business online without waiting months.",
        time: "live in 3 business days",
      },
      {
        title: "Custom E-commerce & Online Stores",
        description:
          "Start selling with catalog, cart and integrated payments (Stripe, PayPal and more) — lean, professional stores ready to grow.",
        time: "timeline: 2-3 weeks",
      },
    ],
  },
  caseStudy: {
    label: "Case Study",
    title: "Custom Financial SaaS for an Educator",
    statValue: "-40%",
    statLabel:
      "reduction in time spent on client management, plus full automation of the methodology.",
    challengeTitle: "The Challenge",
    challenge:
      "The client managed students through complex spreadsheets, creating support confusion and limiting growth.",
    solutionTitle: "The Solution",
    solution:
      "An intuitive, customizable and integrated financial management web app, developed with Next.js, Prisma and AI engineering.",
    stackTitle: "Tech Stack",
    stack: ["Next.js", "Prisma", "Tailwind CSS", "OpenAI API", "Render"],
  },
  process: {
    label: "How It Works",
    title: "From scope to deploy in 4 steps",
    steps: [
      {
        num: "01",
        title: "Alignment & Scope",
        description:
          "Initial call to understand the business rules and map the essential features.",
      },
      {
        num: "02",
        title: "Architecture & Prototyping",
        description:
          "Design of the application flow and choice of the ideal tech stack.",
      },
      {
        num: "03",
        title: "AI-Powered Development",
        description:
          "Rapid software construction with continuous security and performance validation.",
      },
      {
        num: "04",
        title: "Delivery & Launch",
        description:
          "Production deployment, user training and handover of code and access.",
      },
    ],
  },
  about: {
    label: "About Me",
    name: "Vanessa Martinatto",
    role: "Tech Project Manager & AI Software Developer",
    bio1: "IT Project Manager with solid experience in organizing complex systems and workflows, holding a degree in Systems Analysis and Development and currently specializing in Software Engineering with Artificial Intelligence.",
    bio2: "Unlike traditional developers who take months — or simply write code without understanding the business — I combine strategic vision and rigorous project management with AI-powered agile development, delivering working, scalable products ready for the market in record time.",
    points: [
      "Business vision before code",
      "Scope and deadlines under control",
      "Modern, scalable stack",
      "Delivery with deployment and training",
    ],
  },
  contact: {
    title: "Ready to make your project take off?",
    subtitle:
      "Fill in the form below or book a 15-minute call to evaluate your idea together.",
    name: "Name",
    namePlaceholder: "Your full name",
    email: "Email",
    emailPlaceholder: "you@company.com",
    projectType: "Project Type",
    projectTypePlaceholder: "Select a project type",
    projectTypes: [
      { value: "mvp", label: "MVP" },
      { value: "web-app", label: "Web App / SaaS" },
      { value: "automation", label: "Automation & AI" },
      { value: "other", label: "Other" },
    ],
    description: "Brief Project Description",
    descriptionPlaceholder: "Tell me in a few lines what you need...",
    submit: "Send request",
    sending: "Sending...",
    successTitle: "Request sent!",
    successMsg: "Thank you! I'll get back to you by email as soon as possible.",
    errorTitle: "Error",
    errorMsg: "Something went wrong. Please try again shortly.",
  },
  footer: {
    tagline: "AI Software & Consulting",
    vat: "P.IVA: 14705270966",
    rights: "© 2026 Vanessa Martinatto. All rights reserved.",
  },
};

const pt: Dict = {
  nav: {
    services: "Serviços",
    caseStudy: "Estudo de Caso",
    howItWorks: "Como Funciona",
    about: "Quem Sou",
    bookCall: "Agendar uma Call",
  },
  hero: {
    badge: "[ AI-Assisted Development & Tech PM ]",
    lead1: "Transformo a sua ideia em um ",
    highlight: "produto digital funcional",
    lead2: " e online em semanas, não meses.",
    subtitle:
      "Uno gerenciamento de projetos de TI, arquitetura de sistemas e inteligência artificial para construir MVPs, web apps e sites sob medida para o seu negócio.",
    ctaPrimary: "Solicitar Orçamento para o Meu MVP",
    ctaSecondary: "Ver o Projeto de Referência",
    stats: [
      { value: "3x", label: "mais rápido" },
      { value: "2-4", label: "semanas por MVP" },
      { value: "40%", label: "menos tempo operacional" },
    ],
  },
  benefits: {
    label: "Por que trabalhar comigo",
    title: "Estratégia de PM unida a uma execução acelerada pela IA",
    items: [
      {
        title: "Velocidade com Precisão de IA",
        description:
          "IA avançada em todo o ciclo de desenvolvimento para entregar 3 vezes mais rápido, sem abrir mão da qualidade.",
      },
      {
        title: "Gerenciamento de Projetos sem Caos",
        description:
          "Escopo claro, prazos respeitados e comunicação transparente do início ao fim.",
      },
      {
        title: "Arquitetura Escalável",
        description:
          "Aplicações modernas em Next.js, APIs robustas e bancos de dados prontos para crescer com você.",
      },
    ],
  },
  services: {
    label: "Serviços",
    title: "O que eu construo para você",
    items: [
      {
        title: "Desenvolvimento de MVP Express (Web/App)",
        description:
          "Produtos Mínimos Viáveis completos — autenticação, banco de dados, painel administrativo e pagamentos — para validar rapidamente startups e novas ideias.",
        time: "prazo: 2-4 semanas",
      },
      {
        title: "Digitalização de Metodologias & Apps sob Medida",
        description:
          "Transformo planilhas e processos manuais (consultoria financeira, mentoring e serviços) em web apps e SaaS com a marca do cliente.",
        time: "prazo: 2-3 semanas",
      },
      {
        title: "Automação de Processos & Integração de IA",
        description:
          "Conecto sistemas (CRM, formulários, WhatsApp, gateways de pagamento) e crio assistentes de IA que eliminam as tarefas repetitivas da equipe.",
        time: "prazo: 1-2 semanas",
      },
    ],
    newLabel: "Novo",
    extras: [
      {
        title: "Site Expresso — no ar em 3 dias úteis",
        description:
          "Landing page ou site institucional profissional, rápido e otimizado para o Google — perfeito para lançar sua ideia, validar um projeto ou colocar seu negócio online sem esperar meses.",
        time: "no ar em 3 dias úteis",
      },
      {
        title: "Loja Online & E-commerce sob Medida",
        description:
          "Comece a vender com catálogo, carrinho e pagamentos integrados (Stripe, PayPal e outros) — lojas enxutas e profissionais, prontas para crescer.",
        time: "prazo: 2-3 semanas",
      },
    ],
  },
  caseStudy: {
    label: "Estudo de Caso",
    title: "SaaS Financeiro sob Medida para um Educador",
    statValue: "-40%",
    statLabel:
      "de redução do tempo dedicado à gestão de clientes, além da automação completa da metodologia.",
    challengeTitle: "O Desafio",
    challenge:
      "O cliente acompanhava os alunos com planilhas complexas, gerando confusão no suporte e limites de crescimento.",
    solutionTitle: "A Solução",
    solution:
      "Um web app de gestão financeira intuitivo, personalizável e integrado, desenvolvido com Next.js, Prisma e engenharia de IA.",
    stackTitle: "Stack Utilizado",
    stack: ["Next.js", "Prisma", "Tailwind CSS", "OpenAI API", "Render"],
  },
  process: {
    label: "Como Funciona",
    title: "Do escopo ao deploy em 4 passos",
    steps: [
      {
        num: "01",
        title: "Alinhamento & Escopo",
        description:
          "Call inicial para entender as regras de negócio e mapear as funcionalidades essenciais.",
      },
      {
        num: "02",
        title: "Arquitetura & Prototipação",
        description:
          "Projeto do fluxo da aplicação e escolha do stack tecnológico ideal.",
      },
      {
        num: "03",
        title: "Desenvolvimento com IA",
        description:
          "Construção rápida do software com validações contínuas de segurança e performance.",
      },
      {
        num: "04",
        title: "Entrega & Publicação",
        description:
          "Deploy em produção, treinamento de uso e entrega de código e acessos.",
      },
    ],
  },
  about: {
    label: "Quem Sou",
    name: "Vanessa Martinatto",
    role: "Tech Project Manager & AI Software Developer",
    bio1: "Project Manager de TI com sólida experiência na organização de sistemas e fluxos complexos, formada em Análise e Desenvolvimento de Sistemas e em especialização em Engenharia de Software com Inteligência Artificial.",
    bio2: "Diferentemente dos desenvolvedores tradicionais, que levam meses ou se limitam a escrever código sem entender o negócio, uno visão estratégica e gerenciamento de projetos rigoroso a um desenvolvimento ágil potencializado pela IA — entregando produtos funcionais, escaláveis e prontos para o mercado em tempos recorde.",
    points: [
      "Visão de negócio antes do código",
      "Escopo e prazos sob controle",
      "Stack moderno e escalável",
      "Entrega com deploy e treinamento",
    ],
  },
  contact: {
    title: "Pronto para decolar o seu projeto?",
    subtitle:
      "Preencha o formulário abaixo ou agende uma call de 15 minutos para avaliarmos juntos a sua ideia.",
    name: "Nome",
    namePlaceholder: "Seu nome completo",
    email: "Email",
    emailPlaceholder: "voce@empresa.com",
    projectType: "Tipo de Projeto",
    projectTypePlaceholder: "Selecione um tipo de projeto",
    projectTypes: [
      { value: "mvp", label: "MVP" },
      { value: "web-app", label: "Web App / SaaS" },
      { value: "automation", label: "Automação & IA" },
      { value: "other", label: "Outro" },
    ],
    description: "Breve Descrição do Projeto",
    descriptionPlaceholder: "Conte-me em poucas linhas do que você precisa...",
    submit: "Enviar solicitação",
    sending: "Enviando...",
    successTitle: "Solicitação enviada!",
    successMsg: "Obrigado! Responderei o mais breve possível por e-mail.",
    errorTitle: "Erro",
    errorMsg: "Ocorreu um erro. Tente novamente em instantes.",
  },
  footer: {
    tagline: "AI Software & Consulting",
    vat: "P.IVA: 14705270966",
    rights: "© 2026 Vanessa Martinatto. Todos os direitos reservados.",
  },
};

export const translations: Record<Lang, Dict> = { it, en, pt };