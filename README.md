# CV de Gaspar Rambo

Aplicación web construida con React, TypeScript y Vite para mostrar el currículum de Gaspar Rambo.

## Requisitos

- Node.js >= 18.17
- npm

## Desarrollo local

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo con recarga en caliente:
   ```bash
   npm run dev
   ```
3. Genera la build de producción:
   ```bash
   npm run build
   ```
4. Previsualiza la build generada:
   ```bash
   npm run preview
   ```
5. Ejecuta el análisis estático con ESLint:
   ```bash
   npm run lint
   ```

## Despliegue en Vercel

El repositorio ya incluye un archivo `vercel.json` que configura el proyecto para ser desplegado como un sitio estático de Vite:

- Usa el builder `@vercel/static-build` con el comando `npm run build`.
- Publica el contenido generado en `dist/`.
- Añade una ruta de *fallback* (`/(.*) -> /index.html`) para soportar el enrutado del lado del cliente.

Para publicarlo en Vercel:

1. Crea un proyecto en [Vercel](https://vercel.com/) y conéctalo con este repositorio de GitHub.
2. En la sección **Build & Development Settings**, deja los valores predeterminados o verifica que sean:
   - **Framework Preset**: Vite (o "Other" si no aparece, usando `npm run build`).
   - **Build Command**: `npm run build`.
   - **Install Command**: `npm install`.
   - **Output Directory**: `dist`.
3. Guarda la configuración y presiona **Deploy**. Vercel ejecutará el build y publicará el sitio estático usando la configuración del repositorio.
4. Cada nuevo push a la rama principal volverá a desplegar automáticamente el CV.

Si necesitas personalizar variables de entorno o dominios personalizados, puedes hacerlo desde el panel del proyecto en Vercel.
