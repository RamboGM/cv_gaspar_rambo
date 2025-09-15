export interface Project {
  title: string;
  description: string;
  tech: string[];
  repo?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    title: "Plugin integrador de pagos — WooCommerce",
    description:
      "Plugin que conecta WooCommerce con una pasarela de pagos. Autenticación segura, captura de pagos, webhooks y actualización de estados de orden.",
    tech: ["PHP", "WordPress", "WooCommerce", "REST API"],
    repo: "https://github.com/RamboGM/tu-repo-woocommerce"
  },
  {
    title: "App para Tienda Nube",
    description:
      "Aplicación para checkout mejorado y sincronización de inventario. Panel admin, webhooks y endpoints custom.",
    tech: ["TypeScript", "React", "Node.js", "Express"],
    repo: "https://github.com/RamboGM/tu-repo-tiendanube"
  }
];

