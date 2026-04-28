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
