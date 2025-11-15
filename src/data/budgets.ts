import type { Budget } from "../types/budget";

export const budgets: Record<string, Budget> = {
  "marianela-mensa": {
    title: "Propuesta de Desarrollo Web",
    client: "Marianela Mensa",
    developer: "Gaspar Maximiliano Rambo",
    date: "13/11/2025",
    validity: "15 días",
    summary: {
      projectType: "Desarrollo de plataforma de talleres y cursos online",
      totalValue: "USD 650",
      estimatedTimeline: "2 a 3 meses",
      paymentSchedule: "40% anticipo / 40% preproducción / 20% entrega",
    },
    sections: [
      {
        title: "1. Alcance del Proyecto",
        description:
          "Desarrollo de un sitio web profesional enfocado en ofrecer talleres y cursos online con contenido audiovisual. El proyecto incluye diseño integral de la plataforma, sistema para administrar cursos y módulos, área privada para estudiantes, pasarela de pago integrada y optimización para dispositivos móviles, seguridad básica y rendimiento general.",
      },
      {
        title: "2. Valor y Condiciones de Pago",
        items: [
          "Valor total: USD 650.",
          "Plazo estimado: 2 a 3 meses (incluye posibles demoras por fin de año).",
          "Forma de pago: transferencia bancaria o efectivo.",
          "Condiciones de pago: 40% anticipo / 40% preproducción / 20% entrega final.",
        ],
      },
      {
        title: "3. Qué Incluye el Paquete",
        items: [
          "Configuración inicial del sitio en el hosting indicado por la clienta (el hosting lo contrata la clienta).",
          "Ajustes técnicos iniciales: dominio, certificado de seguridad y estructura base.",
          "Diseño de las secciones principales: Inicio, Sobre mí, Servicios, Contacto y Tienda/Cursos.",
          "Implementación del sistema para publicación y venta de cursos online.",
          "Creación de plantilla de curso y lección, con un curso inicial de ejemplo cargado.",
          "Integración con pasarela de pago (Mercado Pago o Stripe).",
          "Optimización móvil (responsive).",
          "Configuraciones básicas de seguridad y rendimiento.",
          "Capacitación personalizada para administrar el sitio.",
          "Soporte post lanzamiento por 30 días.",
        ],
      },
      {
        title: "4. No Incluye",
        items: [
          "El costo del hosting del sitio web (a cargo de la clienta).",
          "Edición avanzada de videos o creación de contenidos audiovisuales.",
          "Desarrollo de branding o diseño gráfico integral.",
        ],
      },
    ],
  },
};
