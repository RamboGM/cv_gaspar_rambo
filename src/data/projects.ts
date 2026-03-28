import type { Language } from "../types/language";

export interface Project {
  title: string;
  description: string;
  architecture?: string;
  keyChallenges?: string[];
  tech: string[];
  repo?: string;
  demo?: string;
}

export const projectsByLanguage: Record<Language, Project[]> = {
  es: [
    {
      title: "Solución de Pagos Recurrentes para WooCommerce",
      description:
        "Arquitectura de un motor de sincronización bidireccional entre WordPress y pasarelas de pago externas. Gestiona el ciclo de vida completo de membresías, autenticación de webhooks y consistencia de datos en tiempo real para ecosistemas de suscripción de alto tráfico.",
      architecture: "Arquitectura basada en eventos (Webhooks) con capa de persistencia intermedia en WordPress. Implementa un sistema de colas para reintentos y logs de auditoría para garantizar la integridad financiera.",
      keyChallenges: ["Sincronización de estados ante fallos de red", "Seguridad en la validación de firmas de webhooks", "Manejo de concurrencia en cambios de planes"],
      tech: ["Architecture", "PHP", "WordPress", "WooCommerce", "Webhooks", "REST API"],
      repo: "https://github.com/RamboGM/boxful-woo-integration/"
    },
    {
      title: "App de Experiencia de Compra | Tiendanube",
      description:
        "Inyector de componentes dinámicos para el storefront de Tiendanube. Permite a los merchants gestionar guías de talles inteligentes mediante un panel administrativo intuitivo, optimizando la tasa de conversión y reduciendo devoluciones mediante una integración zero-latency.",
      architecture: "Micro-frontend inyectado vía Script Tag con Lazy Loading. El backend en Node.js/Express sirve los assets y gestiona la lógica de asignación mediante una API cacheada para máximo rendimiento.",
      keyChallenges: ["Inyección sin colisiones de CSS/JS en themes externos", "Optimización de assets (Lighthouse +95)", "Panel de administración modular"],
      tech: ["UX Optimization", "TypeScript", "React", "Node.js", "Express"],
      repo: "https://github.com/RamboGM/tabla-talles-tn"
    },
    {
      title: "Sincronizador Empresarial Factusol ⇄ Tiendanube",
      description:
        "Pipeline de datos avanzado para la sincronización de inventarios y catálogos entre ERPs locales (Factusol) y plataformas cloud. Incluye normalización de datos mediante Python/Pandas, programación de tareas concurrentes y una interfaz de control distribuida.",
      architecture: "Data pipeline local con extracción SQL/ODBC, transformación con Pandas y carga vía REST API. Orquestación de tareas con APScheduler y empaquetado para entornos Windows restringidos.",
      keyChallenges: ["Manejo de bases de datos Legacy (Access/ODBC)", "Normalización de esquemas heterogéneos", "Resiliencia ante desconexiones del ERP local"],
      tech: ["Data Engineering", "Python", "Pandas", "Flask", "Tkinter", "ETL"],
      repo: "https://github.com/RamboGM/sincronizador_factusol_TN"
    }
  ],
  en: [
    {
      title: "WooCommerce Recurring Payments Engine",
      description:
        "Architected a bi-directional synchronisation engine between WordPress and external payment gateways. It manages the full lifecycle of memberships, webhook authentication, and real-time data consistency for high-traffic subscription ecosystems.",
      architecture: "Event-driven architecture (Webhooks) with an intermediate persistence layer in WordPress. Implements retry queues and audit logs to ensure financial data integrity.",
      keyChallenges: ["State sync during network failures", "Webhook signature validation security", "Concurrency handling in plan upgrades"],
      tech: ["Architecture", "PHP", "WordPress", "WooCommerce", "Webhooks", "REST API"],
      repo: "https://github.com/RamboGM/boxful-woo-integration/"
    },
    {
      title: "Commerce Experience App | Tiendanube",
      description:
        "Dynamic component injector for the Tiendanube storefront. Enables merchants to manage intelligent size guides through an intuitive admin panel, boosting conversion rates and reducing returns via zero-latency integration.",
      architecture: "Micro-frontend injected via Script Tag with Lazy Loading. Node.js/Express backend serves assets and manages assignment logic via a cached API for peak performance.",
      keyChallenges: ["Collision-free CSS/JS injection in third-party themes", "Asset optimisation (Lighthouse +95)", "Modular admin panel design"],
      tech: ["UX Optimization", "TypeScript", "React", "Node.js", "Express"],
      repo: "https://github.com/RamboGM/tabla-talles-tn"
    },
    {
      title: "Enterprise Sync: Factusol ⇄ Tiendanube",
      description:
        "Advanced data pipeline for inventory and catalogue synchronisation between local ERPs (Factusol) and cloud platforms. Features data normalisation via Python/Pandas, concurrent task scheduling, and a distributed control interface.",
      architecture: "On-premise data pipeline with SQL/ODBC extraction, Pandas transformation, and REST API loading. Task orchestration with APScheduler and packaging for restricted Windows environments.",
      keyChallenges: ["Legacy database handling (Access/ODBC)", "Heterogeneous schema normalisation", "Resilience against local ERP disconnects"],
      tech: ["Data Engineering", "Python", "Pandas", "Flask", "Tkinter", "ETL"],
      repo: "https://github.com/RamboGM/sincronizador_factusol_TN"
    }
  ]
};

