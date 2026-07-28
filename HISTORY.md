# Historial de Cambios y Seguimiento de Issues

Este documento registra de forma profesional todos los cambios, correcciones de errores y evolución del software "mi-cv-web".

## Convención de Versionado
Utilizamos un sistema de versionado extendido para mayor detalle:
`X.Y.Z.A.B.C`
- **X**: Cambios en el Core (Arquitectura base)
- **Y**: Cambios Críticos (Seguridad, rendimiento mayor)
- **Z**: Cambios Primarios (Nuevas funcionalidades grandes)
- **A**: Cambios Secundarios (Mejoras en funciones existentes)
- **B**: Cambios Menores (Ajustes de lógica pequeños)
- **C**: Cambios Estéticos (UI/UX, CSS, visuales)

---

## Registro de Actividad

### [28/07/2026] - Sección WordPress y Detección Automática de Idioma
**Versión Actual:** 0.5.3.0.0.0
**Cambios:**
- [x] **Nueva Sección "Experiencia en WordPress"**: Resumen de trabajo a medida sobre WordPress/WooCommerce con highlights y grilla de sitios enlazados (`src/sections/WordPress.tsx`).
- [x] **Nuevo Modelo de Datos**: `src/data/wordpress.ts` con el tipo `WordpressSite` (nombre, URL, rol, alcance y stack) por idioma, cargado con Somos 70/30, Impulso Fitness y RXZ.
- [x] **Copy Bilingüe**: Bloque `wordpress` agregado a `translations.ts` en español e inglés, más nuevo link de navegación.
- [x] **Integración en el PDF**: La sección se renderiza en el CV generado con URLs clickeables (`Link` de `@react-pdf/renderer`) y texto seleccionable para ATS.
- [x] **Detección de Idioma del Navegador**: `LanguageProvider` resuelve el idioma inicial por prioridad `?lang=` > preferencia guardada > `navigator.languages` > español, y sincroniza `<html lang>`. Sólo se persiste en `localStorage` el cambio manual, para que la autodetección siga vigente en visitas posteriores.
- [x] **Verificación**: PDFs `es`/`en` renderizados con los módulos reales del proyecto y extraídos con `pdftotext`; la sección, los tres sitios y sus URLs aparecen como texto seleccionable (ATS) y como anotaciones `/URI` clickeables.
- [x] **Skills**: Inclusión explícita de "WordPress" en el listado de habilidades para cobertura ATS.

### [28/04/2026 12:15] - Rediseño Premium de PDF y Control de Saltos de Página
**Versión Actual:** 0.5.2.0.0.0
**Cambios:**
- [x] **Diseño Premium en PDF**: Implementación de un encabezado con fondo oscuro (`Slate/Navy`) y tipografía blanca para un look más profesional y alineado a la web.
- [x] **Integración de Fotografía**: Inclusión de la foto de perfil en el PDF generado dinámicamente.
- [x] **Control de Paginación**: Aplicación de reglas de `wrap={false}` en todos los bloques de experiencia, proyectos y formación para evitar saltos de página a mitad de un item.
- [x] **Mejora de Estilos PDF**: Ajuste de márgenes, colores de acento en bullet points y jerarquía de fuentes.

### [28/04/2026 12:01] - Corrección de Errores de Build (TypeScript)
**Versión Actual:** 0.5.1.0.0.1
**Cambios:**
- [x] **Limpieza de Código**: Eliminación de importación de `Font` no utilizada en `CvPdfDocument.tsx`.
- [x] **Fix de Tipado TS**: Aplicación de cast a `any` en la llamada a `pdf()` para resolver incompatibilidad de tipos entre componentes personalizados y la librería `@react-pdf/renderer` durante el build de producción.

### [28/04/2026 11:58] - Optimización ATS Integral y Motor de PDF Dinámico
**Versión Actual:** 0.5.1.0.0.0
**Cambios:**
- [x] **Generador de PDF Dinámico**: Implementación de `@react-pdf/renderer` para la creación de CVs en PDF con texto real y seleccionable (optimizado para máquinas).
- [x] **Refactorización de Experiencia**: Inclusión de campo de "Logros" (Achievements) en la data para permitir el uso de viñetas estratégicas.
- [x] **Optimización de Contenido (ATS)**: Redacción de descripciones y perfiles orientada a impacto, métricas y palabras clave de arquitectura e IA.
- [x] **Evolución de la UI**: Actualización de la sección de experiencia para renderizar los logros con una estética limpia y profesional.
- [x] **Integración de Descarga**: Conexión del botón de descarga con el nuevo servicio asíncrono de generación de archivos.

### [28/03/2026 20:10] - Unificación Estética Total: "The Linear Executive"
**Versión Actual:** 0.5.0.1.0.1
**Cambios:**
- [x] **Unificación de Títulos**: Todos los títulos de sección (`h2`, `h3`) ahora siguen un estilo monocromático nítido con `text-gradient`.
- [x] **Fondo Monocromo**: Actualización de `ParticleBackground.tsx` con una paleta de blancos y cian tenues para máxima elegancia.
- [x] **Rediseño de Photo Frame**: Sustitución del hexágono por un **"Technical Bento Frame"** rectangular con bordes de cristal y efecto shimmer en hover.
- [x] **Navbar Pro**: Rediseño completo del encabezado eliminando colores heredados y usando un estilo glass neutro y profesional.
- [x] **Consolidación Visual**: Eliminación de animaciones de flotación disruptivas y ruidos de color en todo el sitio.

### [28/03/2026 20:01] - Rediseño Estético: "The Linear Executive"

### [28/03/2026 19:38] - Integración de Proyectos Core de Infraestructura y Gestión

### [28/03/2026 19:10] - Optimización Integradora de Portfolio y CV

### [28/03/2026 18:58] - Inicio de Proyecto Local
**Versión Inicial:** 0.0.0.0.0.1
**Cambios:**
- [x] Clonación, setup inicial e instalación de dependencias exitosa.
- [x] Verificación del servidor de desarrollo.

---

## Issues Pendientes (Resueltos en esta versión)
- [x] Invertir enfoque en el perfil (de ejecutor a arquitecto).
- [x] Resolver visibilidad de proyectos con código privado.
- [x] Facilitar generación de CVs que pasen filtros ATS.
- [x] Modernizar estética visual hacia un estilo "Premium".
