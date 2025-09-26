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

interface ContactTranslation {
  heading: string;
  description: string;
  button: string;
  note: string;
  form: {
    name: string;
    email: string;
    message: string;
    submit: string;
    subject: string;
    body: string;
  };
}

interface FooterTranslation {
  signature: string;
  contact: string;
  github: string;
}

export interface Translation {
  nav: NavTranslation;
  hero: HeroTranslation;
  about: AboutTranslation;
  projects: ProjectsTranslation;
  experience: ExperienceTranslation;
  contact: ContactTranslation;
  footer: FooterTranslation;
}

const sectionAnchors = {
  about: "#sobre-mi",
  projects: "#proyectos",
  experience: "#experiencia",
  contact: "#contacto"
};

export const translations: Record<Language, Translation> = {
  es: {
    nav: {
      links: [
        { href: sectionAnchors.about, label: "Sobre mí" },
        { href: sectionAnchors.projects, label: "Proyectos" },
        { href: sectionAnchors.experience, label: "Experiencia" },
        { href: sectionAnchors.contact, label: "Contacto" }
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
      heading: "Contacto",
      description: "¿Tenés un proyecto, integración o idea en mente? Hablemos y diseñemos una solución a medida.",
      button: "Escribime por mail",
      note: "Descargá mi CV desde el menú principal",
      form: {
        name: "Tu nombre",
        email: "Tu email",
        message: "Tu mensaje",
        submit: "Enviar mensaje",
        subject: "Consulta desde tu CV web",
        body: "Hola Gaspar, me gustaría contactarte por..."
      }
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
        { href: sectionAnchors.about, label: "About" },
        { href: sectionAnchors.projects, label: "Projects" },
        { href: sectionAnchors.experience, label: "Experience" },
        { href: sectionAnchors.contact, label: "Contact" }
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
      heading: "Contact",
      description: "Working on an integration, automation, or custom build? Let’s design the right solution together.",
      button: "Email me",
      note: "Download my résumé from the main menu",
      form: {
        name: "Your name",
        email: "Your email",
        message: "Your message",
        submit: "Send message",
        subject: "Enquiry from your online résumé",
        body: "Hi Gaspar, I’d like to connect regarding..."
      }
    },
    footer: {
      signature: "Built with React + Tailwind",
      contact: "Contact",
      github: "GitHub"
    }
  }
};
