import type { Language } from "../types/language";

export interface Job {
  company: string;
  role: string;
  period: string;
  summary: string;
  stack?: string[];
}

export const jobsByLanguage: Record<Language, Job[]> = {
  es: [
    {
      company: "Tienda Pocket",
      role: "Senior AI-Native Solutions Architect",
      period: "2024 — Actualidad",
      summary:
        "Liderazgo técnico en el diseño y despliegue de ecosistemas de integración para el mercado de Tiendanube. Arquitectura de soluciones escalables que conectan APIs críticas y automatizan procesos de negocio de alto impacto con precisión quirúrgica.",
      stack: ["AI Orchestration", "TypeScript", "React", "Node.js", "Python", "Cloud Architecture", "REST API", "SQL"]
    }
  ],
  en: [
    {
      company: "Tienda Pocket",
      role: "Senior AI-Native Solutions Architect",
      period: "2024 — Present",
      summary:
        "Technical lead in designing and deploying complex integration ecosystems for the Tiendanube ecosystem. Architecting scalable solutions that bridge critical APIs and automate high-impact business processes with AI-driven precision.",
      stack: ["AI Orchestration", "TypeScript", "React", "Node.js", "Python", "Cloud Architecture", "REST API", "SQL"]
    }
  ]
};