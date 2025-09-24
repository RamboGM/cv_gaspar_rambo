export interface Job {
  company: string;
  role: string;
  period: string;
  summary: string;
  stack?: string[];
}

export const jobs: Job[] = [
  {
    company: "Tienda Pocket",
    role: "Full-Stack Web Developer & Technical Support Engineer",
    period: "2024 — Actualidad",
    summary: "Desarrollo de funcionalidades a medida e integraciones para entorno web, aplicaciones para Tiendanube como partner tecnológico. Enfoque en performance, UX y automatización.",
    stack: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "Python"]
  }
];