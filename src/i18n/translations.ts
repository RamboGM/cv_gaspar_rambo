import type { Language } from "../types/language";

interface NavLinkTranslation {
  href: string;
  label: string;
}

interface NavTranslation {
  links: NavLinkTranslation[];
  download: {
    idle: string;
    loading: string;
    menuTitle: string;
    spanish: string;
    english: string;
  };
  menuLabel: string;
  openMenuAria: string;
  closeMenuAria: string;
  exploreTitle: string;
  languageSwitcherLabel: string;
}

interface FloatingWhatsappTranslation {
  label: string;
  ariaLabel: string;
  hoverMessage: string;
}

interface HeroTranslation {
  badge: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  highlights: string[];
  avatarFallback: string;
}

interface AboutTranslation {
  heading: string;
  description: string;
  skills: string[];
}

interface ProjectsTranslation {
  heading: string;
  subtitle: string;
  viewMore: string;
}

interface ExperienceTranslation {
  heading: string;
}

interface WordpressTranslation {
  heading: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  sitesHeading: string;
  visitLabel: string;
  scopeLabel: string;
  stackLabel: string;
}

interface ContactDetailTranslation {
  label: string;
  value: string;
  href?: string;
  dateISO?: string;
  ageSuffix?: string;
}

interface ContactTranslation {
  heading: string;
  description: string;
  button: string;
  note?: string;
  email: string;
  mailSubject: string;
  mailBody: string;
  details: ContactDetailTranslation[];
}

interface EducationTranslation {
  heading: string;
  description: string;
  highlights: string[];
  transcriptCta: string;
  transcriptLink: string;
}

interface CertificationResourceTranslation {
  label: string;
  href: string;
  download?: string;
}

interface CertificationItemTranslation {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  tags?: string[];
  resource: CertificationResourceTranslation;
}

interface CertificationsTranslation {
  heading: string;
  items: CertificationItemTranslation[];
}

interface FooterTranslation {
  signature: string;
  contact: string;
  github: string;
}

export interface Translation {
  nav: NavTranslation;
  floatingWhatsapp: FloatingWhatsappTranslation;
  hero: HeroTranslation;
  about: AboutTranslation;
  projects: ProjectsTranslation;
  wordpress: WordpressTranslation;
  experience: ExperienceTranslation;
  contact: ContactTranslation;
  education: EducationTranslation;
  certifications: CertificationsTranslation;
  footer: FooterTranslation;
}

const sectionAnchors = {
  about: "#sobre-mi",
  education: "#formacion-academica",
  certifications: "#licencias-certificaciones",
  projects: "#proyectos",
  wordpress: "#wordpress",
  experience: "#experiencia",
  contact: "#contacto"
};

export const translations: Record<Language, Translation> = {
  es: {
    nav: {
      links: [
        { href: sectionAnchors.contact, label: "Contacto" },
        { href: sectionAnchors.about, label: "Sobre mí" },
        { href: sectionAnchors.education, label: "Formación académica" },
        { href: sectionAnchors.certifications, label: "Licencias y certificaciones" },
        { href: sectionAnchors.projects, label: "Proyectos" },
        { href: sectionAnchors.wordpress, label: "WordPress" },
        { href: sectionAnchors.experience, label: "Experiencia" }
      ],
      download: {
        idle: "Descargar CV",
        loading: "Generando CV...",
        menuTitle: "Idioma del CV",
        spanish: "Versión en español",
        english: "Versión en inglés"
      },
      menuLabel: "Menú",
      openMenuAria: "Abrir menú de navegación",
      closeMenuAria: "Cerrar menú de navegación",
      exploreTitle: "Explorar",
      languageSwitcherLabel: "Cambiar idioma"
    },
    floatingWhatsapp: {
      label: "Hablemos",
      ariaLabel: "Abrir conversación de WhatsApp",
      hoverMessage: "Si necesitas más información no dudes en escribirme"
    },
    hero: {
      badge: "Portfolio · CV",
      title: "Senior Solutions Architect | AI-Native Software Engineer",
      description:
        "Arquitecto de soluciones escalables especializado en integraciones e-commerce y automatización inteligente con IA. Diseño sistemas robustos que optimizan flujos operativos y potencian el crecimiento del negocio.",
      primaryCta: "Ver proyectos",
      secondaryCta: "GitHub",
      highlights: [
        "Escalabilidad & Arquitectura",
        "E-commerce Integrations",
        "AI-Driven Performance"
      ],
      avatarFallback: "Tu foto"
    },
    about: {
      heading: "Sobre mí",
      description:
        "Arquitecto de Soluciones experto en ingeniería nativa de IA y ecosistemas de software escalables. Como partner tecnológico de Tiendanube, me especializo en diseñar integraciones complejas que automatizan procesos críticos de negocio, reduciendo costos operativos y maximizando la eficiencia mediante el uso estratégico de modelos de lenguaje y agentes autónomos. Mi enfoque combina precisión técnica con una entrega ágil para garantizar experiencias de usuario superiores.",
      skills: ["AI Orchestration", "Prompt Engineering", "System Design", "Scalability", "JavaScript", "TypeScript", "React", "Node.js", "Express", "Python", "PHP", "WordPress", "WooCommerce", "REST API", "SQL", "Cloud Computing", "Architecture Patterns"]
    },
    projects: {
      heading: "Proyectos",
      subtitle: "Selección de integraciones, plugins y automatizaciones que impulsan resultados.",
      viewMore: "Ver más en GitHub →"
    },
    wordpress: {
      heading: "Experiencia en WordPress",
      subtitle: "Desarrollo a medida sobre WordPress y WooCommerce: temas propios, plugins, integraciones y performance.",
      summary:
        "Desarrollo a medida sobre WordPress y WooCommerce, escribiendo código en lugar de armar con page builders. Construí plataformas de contenido por suscripción de punta a punta: temas propios con SPA de React embebida, plugins PHP desde cero para pasarelas de pago recurrente y engagement de usuarios, endpoints REST propios y paneles de administración pensados para que el cliente opere sin soporte técnico. Trabajo también el ciclo de vida completo: entornos locales y de staging, deploy continuo vía SSH, medición de analytics y mantenimiento evolutivo en producción.",
      highlights: [
        "Temas WordPress a medida, incluyendo aplicaciones React (SPA) embebidas en el theme y renderizadas sobre la REST API.",
        "Plugins PHP desarrollados desde cero: lógica de negocio, endpoints REST propios, tareas programadas (WP-Cron) y paneles de administración.",
        "WooCommerce avanzado: suscripciones recurrentes, memberships, validación de webhooks, checkout personalizado y precios diferenciados por rol.",
        "Plataformas de contenido por suscripción: aula virtual, backend de carga de clases, control de acceso y sección de cuenta del usuario.",
        "Tableros de métricas y engagement: tracking de consumo, gamificación, exportación CSV, sincronización a Google Sheets y medición GA4/Meta.",
        "Operación en producción: deploy continuo con GitHub Actions y SSH/rsync, hotfixes con backups verificados y rollback documentado."
      ],
      sitesHeading: "Sitios en los que trabajé",
      visitLabel: "Visitar sitio",
      scopeLabel: "Trabajo realizado",
      stackLabel: "Stack"
    },
    experience: {
      heading: "Experiencia"
    },
    contact: {
      heading: "Información de contacto",
      description:
        "Hablemos sobre proyectos, integraciones o automatizaciones para tu negocio. Estoy disponible para colaborar en soluciones a medida.",
      button: "Escribime por mail",
      email: "gaspar.rambo@gmail.com",
      mailSubject: "Consulta desde gasparrambo.dev",
      mailBody: "Hola Gaspar, me gustaría contactarte por...",
      details: [
        {
          label: "Dirección",
          value: "Villa Dolores, Córdoba · CP 5870 · Argentina"
        },
        {
          label: "Teléfono",
          value: "+54 280 434 2550",
          href: "tel:+542804342550"
        },
        {
          label: "Email",
          value: "gaspar.rambo@gmail.com",
          href: "mailto:gaspar.rambo@gmail.com"
        },
        {
          label: "Fecha de nacimiento",
          value: "17 de enero de 1992",
          dateISO: "1992-01-17",
          ageSuffix: "años"
        },
        {
          label: "LinkedIn",
          value: "linkedin.com/in/gaspar-rambo-a24ab3a0",
          href: "https://www.linkedin.com/in/gaspar-rambo-a24ab3a0/"
        }
      ]
    },
    education: {
      heading: "Formación académica",
      description:
        "Tecnicatura superior orientada al desarrollo de software, bases de datos y automatización de procesos para soluciones digitales.",
      highlights: [
        "Tecnicatura Superior en Programación · Instituto Técnico Superior TECLAB",
        "Condición: Egresado · 2023"
      ],
      transcriptCta: "Descargar analítico",
      transcriptLink: "/docs/analitico-gaspar-rambo.pdf",
    },
    certifications: {
      heading: "Licencias y certificaciones",
      items: [
        {
          title: "Google: Inteligencia Artificial y productividad",
          issuer: "Google",
          issueDate: "Expedición: jul. 2024",
          credentialId: "ID de la credencial: OA-2024-0710000017680",
          tags: ["IA y Google Gemini"],
          resource: {
            label: "Ver credencial",
            href: "/docs/certificate-google-ia.pdf",
            download: "certificate-google-ia.pdf",
          },
        },
        {
          title: "EFSET English Certificate 75/100 (C2 Proficient)",
          issuer: "EF SET",
          issueDate: "Expedición: jul. 2024",
          tags: ["Habla", "Comprensión lectora"],
          resource: {
            label: "Mostrar credencial",
            href: "/docs/certificate-efset-english-75-100.pdf",
            download: "certificate-efset-english-75-100.pdf",
          },
        },
      ],
    },
    footer: {
      signature: "Hecho con React + Tailwind",
      contact: "Contacto",
      github: "GitHub"
    }
  },
  en: {
    nav: {
      links: [
        { href: sectionAnchors.contact, label: "Contact info" },
        { href: sectionAnchors.about, label: "About" },
        { href: sectionAnchors.education, label: "Education" },
        { href: sectionAnchors.certifications, label: "Licenses & certifications" },
        { href: sectionAnchors.projects, label: "Projects" },
        { href: sectionAnchors.wordpress, label: "WordPress" },
        { href: sectionAnchors.experience, label: "Experience" }
      ],
      download: {
        idle: "Download résumé",
        loading: "Preparing résumé...",
        menuTitle: "Choose résumé language",
        spanish: "Spanish version",
        english: "English version"
      },
      menuLabel: "Menu",
      openMenuAria: "Open navigation menu",
      closeMenuAria: "Close navigation menu",
      exploreTitle: "Explore",
      languageSwitcherLabel: "Change language"
    },
    floatingWhatsapp: {
      label: "Let's talk",
      ariaLabel: "Open WhatsApp conversation",
      hoverMessage: "If you need more details, feel free to reach out"
    },
    hero: {
      badge: "Portfolio · Résumé",
      title: "Senior Solutions Architect | AI-Native Software Engineer",
      description:
        "Scalable solutions architect specialising in e-commerce integrations and AI-driven intelligent automation. I design robust systems that optimise operational workflows and drive business growth.",
      primaryCta: "View projects",
      secondaryCta: "GitHub",
      highlights: [
        "Scalability & System Design",
        "Custom commerce builds",
        "AI-Driven Efficiency"
      ],
      avatarFallback: "Your photo"
    },
    about: {
      heading: "About",
      description:
        "Solutions Architect expert in AI-native engineering and scalable software ecosystems. As a Tiendanube technology partner, I specialise in designing complex integrations that automate critical business processes, reducing operating costs and maximising efficiency through the strategic use of LLMs and autonomous agents. My approach combines technical precision with agile delivery to ensure superior user experiences.",
      skills: ["AI Orchestration", "Prompt Engineering", "System Design", "Scalability", "JavaScript", "TypeScript", "React", "Node.js", "Express", "Python", "PHP", "WordPress", "WooCommerce", "REST API", "SQL", "Cloud Computing", "Architecture Patterns"]
    },
    projects: {
      heading: "Projects",
      subtitle: "Selected integrations, plugins, and automation tools that drive measurable impact.",
      viewMore: "See more on GitHub →"
    },
    wordpress: {
      heading: "WordPress Experience",
      subtitle: "Custom development on WordPress and WooCommerce: bespoke themes, plugins, integrations, and performance.",
      summary:
        "Custom development on WordPress and WooCommerce — writing code rather than assembling page builders. I have built subscription content platforms end to end: bespoke themes with embedded React SPAs, PHP plugins written from scratch for recurring payment gateways and user engagement, custom REST endpoints, and admin panels designed so clients can operate without technical support. I also own the full lifecycle: local and staging environments, continuous deployment over SSH, analytics instrumentation, and ongoing maintenance in production.",
      highlights: [
        "Bespoke WordPress themes, including React single-page applications embedded in the theme and rendered against the REST API.",
        "PHP plugins built from scratch: business logic, custom REST endpoints, scheduled tasks (WP-Cron), and admin panels.",
        "Advanced WooCommerce: recurring subscriptions, memberships, webhook validation, custom checkout, and role-based pricing.",
        "Subscription content platforms: virtual classroom, class-upload backend, access control, and user account areas.",
        "Metrics and engagement dashboards: consumption tracking, gamification, CSV export, Google Sheets sync, and GA4/Meta instrumentation.",
        "Production operations: continuous deployment with GitHub Actions and SSH/rsync, hotfixes with verified backups and documented rollback."
      ],
      sitesHeading: "Sites I have worked on",
      visitLabel: "Visit site",
      scopeLabel: "Work delivered",
      stackLabel: "Stack"
    },
    experience: {
      heading: "Experience"
    },
    contact: {
      heading: "Contact information",
      description:
        "Let’s collaborate on integrations, automations, or tailored software that supports your business goals.",
      button: "Email me",
      email: "gaspar.rambo@gmail.com",
      mailSubject: "Enquiry from gasparrambo.dev",
      mailBody: "Hi Gaspar, I’d like to connect regarding...",
      details: [
        {
          label: "Address",
          value: "Villa Dolores, Córdoba · ZIP 5870 · Argentina"
        },
        {
          label: "Phone",
          value: "+54 280 434 2550",
          href: "tel:+542804342550"
        },
        {
          label: "Email",
          value: "gaspar.rambo@gmail.com",
          href: "mailto:gaspar.rambo@gmail.com"
        },
        {
          label: "Birth date",
          value: "17 January 1992",
          dateISO: "1992-01-17",
          ageSuffix: "years old"
        },
        {
          label: "LinkedIn",
          value: "linkedin.com/in/gaspar-rambo-a24ab3a0",
          href: "https://www.linkedin.com/in/gaspar-rambo-a24ab3a0/"
        }
      ]
    },
    education: {
      heading: "Education",
      description:
        "Higher technical degree focused on software development, databases, and process automation for digital solutions.",
      highlights: [
        "Higher Technician in Programming · Instituto Técnico Superior TECLAB",
        "Status: Graduate · 2023"
      ],
      transcriptCta: "Download transcript",
      transcriptLink: "/docs/analitico-gaspar-rambo.pdf"
    },
    certifications: {
      heading: "Licenses & certifications",
      items: [
        {
          title: "Google: Artificial Intelligence and Productivity",
          issuer: "Google",
          issueDate: "Issued: Jul 2024",
          credentialId: "Credential ID: OA-2024-0710000017680",
          tags: ["AI & Google Gemini"],
          resource: {
            label: "View credential",
            href: "/docs/certificate-google-ia.pdf",
            download: "certificate-google-ia.pdf",
          },
        },
        {
          title: "EFSET English Certificate 75/100 (C2 Proficient)",
          issuer: "EF SET",
          issueDate: "Issued: Jul 2024",
          tags: ["Speaking", "Reading comprehension"],
          resource: {
            label: "Show credential",
            href: "/docs/certificate-efset-english-75-100.pdf",
            download: "certificate-efset-english-75-100.pdf",
          },
        },
      ],
    },
    footer: {
      signature: "Built with React + Tailwind",
      contact: "Contact",
      github: "GitHub"
    }
  }
};
