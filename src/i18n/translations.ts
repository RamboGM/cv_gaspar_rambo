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
        { href: sectionAnchors.experience, label: "Experiencia" }
      ],
      download: {
        idle: "Descargar CV",
        loading: "Generando CV..."
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
      title: "Desarrollador de soluciones a medida impulsadas por IA",
      description:
        "Desarrollador web especializado en integraciones para e-commerce. Conecto plataformas como Tiendanube y WooCommerce con soluciones para mejorar la experiencia de usuario.",
      primaryCta: "Ver proyectos",
      secondaryCta: "GitHub",
      highlights: [
        "Integraciones & Automatizaciones",
        "E-commerce a medida",
        "Experiencias centradas en el usuario"
      ],
      avatarFallback: "Tu foto"
    },
    about: {
      heading: "Sobre mí",
      description:
        "Soy desarrollador de software con experiencia en entorno web con foco en integraciones y e-commerce. Todos mis desarrollos son creados mediante IA. Trabajo como partner tecnológico de Tiendanube y desarrollo plugins e integraciones que conectan plataformas, automatizan procesos y mejoran la experiencia de usuario.",
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "Python", "PHP", "WooCommerce"]
    },
    projects: {
      heading: "Proyectos",
      subtitle: "Selección de integraciones, plugins y automatizaciones que impulsan resultados.",
      viewMore: "Ver más en GitHub →"
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
        { href: sectionAnchors.experience, label: "Experience" }
      ],
      download: {
        idle: "Download résumé",
        loading: "Preparing résumé..."
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
      title: "AI-assisted product developer for tailored solutions",
      description:
        "Web engineer focused on e-commerce integrations. I bridge platforms such as Tiendanube and WooCommerce with purpose-built experiences that elevate the customer journey.",
      primaryCta: "View projects",
      secondaryCta: "GitHub",
      highlights: [
        "Integrations & Automation",
        "Custom commerce builds",
        "User-centred experiences"
      ],
      avatarFallback: "Your photo"
    },
    about: {
      heading: "About",
      description:
        "I am a software developer specialised in the web ecosystem with a strong focus on integrations and commerce. Every build is co-created with AI tooling. As a Tiendanube technology partner I ship plugins and integrations that connect platforms, automate operations, and improve customer experience end to end.",
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "Python", "PHP", "WooCommerce"]
    },
    projects: {
      heading: "Projects",
      subtitle: "Selected integrations, plugins, and automation tools that drive measurable impact.",
      viewMore: "See more on GitHub →"
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
