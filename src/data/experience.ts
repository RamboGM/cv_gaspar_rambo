export interface Job {
  company: string;
  role: string;
  period: string;
  summary: string;
  stack?: string[];
}

export const jobs: Job[] = [
  {
    company: "Partner Tienda Nube",
    role: "Desarrollador (freelance)",
    period: "2023 — Actualidad",
    summary: "Desarrollo de funcionalidades a medida e integraciones para e-commerce. Enfoque en performance, UX y automatización.",
    stack: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "Python"]
  }
];

