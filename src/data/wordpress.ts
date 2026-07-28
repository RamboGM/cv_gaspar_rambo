import type { Language } from "../types/language";

export interface WordpressSite {
  /** Nombre público del sitio o cliente. */
  name: string;
  /** URL completa (https://...). Se muestra como link en la web y en el PDF. */
  url: string;
  /** Rol / tipo de intervención en una línea. */
  role: string;
  /** Qué se construyó a medida. Hasta 4 bullets para no romper la paginación del PDF. */
  scope: string[];
  /** Tecnologías y plugins clave. */
  stack: string[];
}

export const wordpressSitesByLanguage: Record<Language, WordpressSite[]> = {
  es: [
    {
      name: "Somos 70/30",
      url: "https://somos7030.com",
      role: "Arquitectura y desarrollo full-stack del tema a medida",
      scope: [
        "Tema WordPress construido desde cero con una SPA de React embebida (React Router + Vite), sin page builders: landing pública, biblioteca de clases, dashboard, perfil y sección de nutrición.",
        "Plugin propio de integración con la pasarela Boxful para suscripciones recurrentes: validación de webhooks, ciclo de vida de membresías, cancelaciones y reintentos sobre WooCommerce Memberships.",
        "Plugin de engagement con tracking de consumo de contenido, rachas y medallas, tablero de métricas con gráficos interactivos, exportación CSV y sincronización a Google Sheets.",
        "Endpoints REST propios, medición GA4 y Meta server-side con deduplicación de eventos, y despliegue continuo con GitHub Actions vía SSH/rsync."
      ],
      stack: [
        "WordPress",
        "WooCommerce",
        "WC Memberships",
        "PHP",
        "React",
        "Vite",
        "REST API",
        "ACF",
        "GitHub Actions"
      ]
    },
    {
      name: "Impulso Fitness",
      url: "https://impulsofitness.com.ar/",
      role: "Desarrollo del sistema de contenido por suscripción",
      scope: [
        "Plantillas PHP personalizadas desarrolladas y desplegadas vía SSH para montar una plataforma de contenido virtual por suscripción.",
        "Backend completo de carga y administración de clases, para que el equipo publique y organice el contenido sin intervención técnica.",
        "Front de \"aula virtual\" y sección Mi Cuenta, con acceso al catálogo de clases restringido según el estado de la suscripción del usuario."
      ],
      stack: ["WordPress", "PHP", "Templates a medida", "MySQL", "SSH"]
    },
    {
      name: "RXZ",
      url: "https://rxzweb.com",
      role: "Desarrollo a medida sobre tema propio y mantenimiento evolutivo",
      scope: [
        "Trabajos a medida sobre tema y plugins propios de un e-commerce mayorista con más de 600 productos.",
        "Motor de precios diferenciados por rol de usuario (revendedor y distribuidor), reescrito para resolverse en runtime y convivir con las ofertas nativas de WooCommerce.",
        "Overrides de plantillas de WooCommerce y despliegue de hotfixes en producción vía SSH, con backups verificados y plan de rollback documentado."
      ],
      stack: ["WordPress", "WooCommerce", "PHP", "WP-Cron", "SSH", "B2B Pricing"]
    }
  ],
  en: [
    {
      name: "Somos 70/30",
      url: "https://somos7030.com",
      role: "Architecture and full-stack development of the custom theme",
      scope: [
        "WordPress theme built from scratch around an embedded React SPA (React Router + Vite), with no page builders: public landing, class library, dashboard, profile, and nutrition section.",
        "In-house plugin integrating the Boxful gateway for recurring subscriptions: webhook validation, membership lifecycle, cancellations, and retries on top of WooCommerce Memberships.",
        "Engagement plugin with content-consumption tracking, streaks and badges, a metrics dashboard with interactive charts, CSV export, and Google Sheets synchronisation.",
        "Custom REST endpoints, server-side GA4 and Meta tracking with event deduplication, and continuous deployment through GitHub Actions over SSH/rsync."
      ],
      stack: [
        "WordPress",
        "WooCommerce",
        "WC Memberships",
        "PHP",
        "React",
        "Vite",
        "REST API",
        "ACF",
        "GitHub Actions"
      ]
    },
    {
      name: "Impulso Fitness",
      url: "https://impulsofitness.com.ar/",
      role: "Subscription-based content platform development",
      scope: [
        "Custom PHP templates developed and deployed over SSH to build a subscription-based virtual content platform.",
        "Full content-management backend for uploading and organising classes, letting the team publish without technical support.",
        "\"Virtual classroom\" front end and My Account section, gating the class catalogue by the user's subscription status."
      ],
      stack: ["WordPress", "PHP", "Custom templates", "MySQL", "SSH"]
    },
    {
      name: "RXZ",
      url: "https://rxzweb.com",
      role: "Custom development on a bespoke theme and ongoing maintenance",
      scope: [
        "Custom work across the bespoke theme and in-house plugins of a wholesale e-commerce with 600+ products.",
        "Role-based pricing engine (reseller and distributor tiers), rewritten to resolve at runtime and coexist with native WooCommerce sale prices.",
        "WooCommerce template overrides and production hotfix deployment over SSH, with verified backups and a documented rollback plan."
      ],
      stack: ["WordPress", "WooCommerce", "PHP", "WP-Cron", "SSH", "B2B Pricing"]
    }
  ]
};
