# Imagenartis | Plataforma Web Corporativa

> **Especialistas en Rotulación Vehicular (Car Wrap), Branding Comercial, Letreros Arquitectónicos 3D y Diseño de Identidad Visual en Lima, Perú.**  
> **Dominio de Producción**: [https://imagenartis.pe](https://imagenartis.pe)  
> **Stack Principal**: Astro 7 · React 19 · Tailwind CSS v4 · Cloudflare Pages · Supabase PostgreSQL

---

## 🧭 Índice de Documentación Técnica & Estratégica

Toda la arquitectura, decisiones de diseño, marketing y manuales operativos están organizados en los siguientes documentos:

| Documento | Descripción y Contenido Clave |
| :--- | :--- |
| 🏗️ **[01. Arquitectura & Stack Tecnológico](docs/01-ARQUITECTURA-Y-STACK.md)** | Infraestructura en Cloudflare Pages, SSR/SSG híbrido, resiliencia con fallback JSON, sistema Keep-Alive automático para Supabase y seguridad con Cloudflare Zero Trust. |
| 🎨 **[02. Sistema de Diseño & Filosofía UI/UX](docs/02-DISENO-Y-SISTEMA-VISUAL.md)** | Principios "Anti-AI Slop", paleta cromática (`#EE2737` / `#09090b`), tipografía editorial (Space Grotesk, Inter, Space Mono), Navbar con morphing y componentes interactivos. |
| 📈 **[03. Estrategia de Marketing, SEO & GEO](docs/03-ESTRATEGIA-SEO-Y-GEO.md)** | SEO local para Lima (Balconcillo, La Victoria), Schema.org `LocalBusiness` JSON-LD, Generative Engine Optimization (AEO/GEO para ChatGPT y Perplexity), GA4, Clarity y sitemap XML dinámico. |
| 📁 **[04. Gestión de Contenidos & Medios](docs/04-GESTION-DE-CONTENIDOS-Y-MEDIOS.md)** | Estructura organizada de `public/` por página, guía para dar de alta nuevos proyectos en `src/lib/projects.ts` (con fotos, videos y YouTube) y optimización de medios. |
| 🚀 **[05. Hoja de Ruta & Checklist de Lanzamiento](docs/05-HOJA-DE-RUTA-Y-CHECKLIST-LANZAMIENTO.md)** | Progreso de las 4 fases del proyecto, checklist paso a paso previo al go-live, vinculación de dominio, Search Console y auditorías finales. |

---

## ⚡ Comandos de Desarrollo

Todos los comandos se ejecutan desde la raíz del proyecto con Node.js `>=22.12.0`:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local (http://localhost:4321)
npm run dev

# Compilar proyecto para producción (Cloudflare Pages / Workers)
npm run build

# Previsualizar la compilación de producción localmente
npm run preview
```

---

## 🛡️ Seguridad y Credenciales

- Las credenciales privadas (`PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, IDs de analítica) residen exclusivamente en el archivo local `.env` y **nunca se suben al repositorio**.
- El archivo `.gitignore` se encuentra blindado para evitar la filtración accidental de claves, certificados o sesiones de Cloudflare.
- En producción, las variables se configuran en el panel de **Cloudflare Pages** (`Settings > Environment variables`).

---

## 📍 Ubicación & Contacto Oficial

- **Taller y Sede**: Balconcillo, La Victoria, Lima Metropolitana, Perú.
- **WhatsApp Oficial de Ventas**: [+51 994 097 417](https://wa.me/51994097417)
- **Email Corporativo**: ventas@imagenartis.pe
