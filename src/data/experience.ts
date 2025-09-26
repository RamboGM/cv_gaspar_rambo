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
      role: "Full-Stack Web Developer & Technical Support Engineer",
      period: "2024 — Actualidad",
      summary:
        "Desarrollo de funcionalidades a medida e integraciones para entorno web, aplicaciones para Tiendanube como partner tecnológico. Enfoque en performance, UX y automatización.",
      stack: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "Python"]
    }
  ],
  en: [
    {
      company: "Tienda Pocket",
      role: "Full-Stack Web Developer & Technical Support Engineer",
      period: "2024 — Present",
      summary:
        "Build bespoke features and integrations for Tiendanube merchants. Deliver partner apps focused on performance, UX, and automation across the web stack.",
      stack: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "Python"]
    }
  ]
};