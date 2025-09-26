import type { Language } from "../types/language";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  repo?: string;
  demo?: string;
}

export const projectsByLanguage: Record<Language, Project[]> = {
  es: [
    {
      title: "Plugin integrador de plataforma de cobros recurrentes con WooCommerce",
      description:
        "El integrador gestiona la comunicación bidireccional entre la plataforma de cobros recurrentes y el sitio en WordPress, autenticando peticiones, enviando operaciones de alta y cambios de planes, y escuchando notificaciones para actualizar estados de usuarios, membresías y accesos en tiempo real.",
      tech: ["PHP", "WordPress", "WooCommerce", "REST API"],
      repo: "https://github.com/RamboGM/boxful-woo-integration/"
    },
    {
      title: "App Tabla de Talles | Tiendanube",
      description:
        "Es una app para Tienda Nube que agrega en la página de producto un botón “Tabla de talles” que abre un modal/drawer liviano con una imagen de la guía, y te permite desde un panel simple subir y asignar imágenes por producto/categoría/variante, definir una imagen por defecto, opciones de visibilidad, soporte móvil y multi-idioma, todo con carga rápida y sin romper el theme.",
      tech: ["TypeScript", "React", "Node.js", "Express"],
      repo: "https://github.com/RamboGM/tabla-talles-tn"
    },
    {
      title: "Sincronizador Factusol | Tiendanube",
      description:
        "Sincronizador Factusol es una aplicación externa para Tiendanube que extrae y normaliza datos de productos desde bases de datos Factusol en Microsoft Access, permitiendo gestionar precios, stock y altas desde una interfaz de escritorio Tkinter con programación de sincronizaciones automáticas. Además ofrece utilidades de exportación CSV y expone endpoints Flask para instalación y webhooks dentro del ecosistema Tiendanube, pudiendo empaquetarse como ejecutable para operadores de Windows.",
      tech: ["Python", "Tkinter", "Flask", "APScheduler", "Pandas", "PyODBC", "Requests", "python-dotenv", "PyInstaller"],
      repo: "https://github.com/RamboGM/sincronizador_factusol_TN"
    }
  ],
  en: [
    {
      title: "Recurring Billing Gateway Connector for WooCommerce",
      description:
        "Bi-directional integration between a subscription billing platform and a WordPress site. Handles authenticated requests, customer onboarding, plan upgrades, and listens to webhooks to sync member status, entitlements, and real-time access across both systems.",
      tech: ["PHP", "WordPress", "WooCommerce", "REST API"],
      repo: "https://github.com/RamboGM/boxful-woo-integration/"
    },
    {
      title: "Size Chart App | Tiendanube",
      description:
        "Lightweight Tiendanube app that injects a \"Size chart\" trigger on product pages. Merchants can upload and assign guides by product, category, or variant, define fallbacks, control visibility, and serve responsive multi-language modals—all without compromising theme performance.",
      tech: ["TypeScript", "React", "Node.js", "Express"],
      repo: "https://github.com/RamboGM/tabla-talles-tn"
    },
    {
      title: "Factusol Sync | Tiendanube",
      description:
        "External Tiendanube integration that ingests product data from Factusol Microsoft Access databases, normalises catalog information, and manages pricing and stock through a Tkinter desktop console with scheduled syncs. Ships CSV export tools and Flask endpoints for installers and webhooks, and can be packaged as a Windows-ready executable.",
      tech: ["Python", "Tkinter", "Flask", "APScheduler", "Pandas", "PyODBC", "Requests", "python-dotenv", "PyInstaller"],
      repo: "https://github.com/RamboGM/sincronizador_factusol_TN"
    }
  ]
};

