# 03. Estrategia de Marketing, SEO Local & Generative Engine Optimization (GEO)

> **Mercado Objetivo**: Lima Metropolitana, Callao y principales provincias del Perú  
> **Sede Principal**: Balconcillo, La Victoria, Lima  
> **Servicios Clave**: Wrap automotriz, branding de flotas, letreros arquitectónicos en ACM, diseño de identidad  
> **Objetivo de Conversión**: Redirigir el tráfico calificado directamente al WhatsApp de ventas corporativas  

---

## 1. Posicionamiento en Dos Frentes: Google (SEO) + Inteligencia Artificial (GEO / AEO)

La visibilidad digital actual ya no depende únicamente de aparecer en la lista azul de Google. Los clientes de alto valor consultan directamente a motores generativos de inteligencia artificial como **ChatGPT, Perplexity y Google Gemini** para pedir recomendaciones de proveedores en Lima.

| Canal | Cómo Busca el Usuario | Estrategia Implementada en Imagenartis |
| :--- | :--- | :--- |
| **Google Search tradicional** | *"wrap hilux lima"*, *"letreros luminosos balconcillo"* | Schema.org estructurado, títulos SEO optimizados, sitemap XML dinámico y canonicals. |
| **Búsqueda por IA (GEO / AEO)** | *"¿Cuáles son los talleres más recomendados en Lima para rotular una flota de camiones?"* | Estructuración de datos con entidades comerciales exactas, especificaciones de materiales certificados (3M, Avery) y casos de estudio reales. |

---

## 2. Marcado Estructurado Schema.org JSON-LD

Inyectado directamente en el `<head>` de [`Layout.astro`](file:///f:/IMAGEN%20ARTIS/wil/githubrep/imagenartis/src/layouts/Layout.astro):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["AutomotiveBusiness", "LocalBusiness", "ProfessionalService"],
      "@id": "https://imagenartis.pe/#business",
      "name": "Imagenartis | Branding & Rotulación Vehicular",
      "url": "https://imagenartis.pe",
      "logo": "https://imagenartis.pe/favicon.svg",
      "telephone": "+51994097417",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Balconcillo",
        "addressLocality": "La Victoria",
        "addressRegion": "Lima",
        "postalCode": "15034",
        "addressCountry": "PE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -12.0784,
        "longitude": -77.0275
      },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Lima Metropolitana" },
        { "@type": "Country", "name": "Perú" }
      ],
      "knowsAbout": [
        "Car Wrap",
        "Rotulación de Vehículos",
        "Branding de Flotas",
        "Letreros en Alucobond ACM",
        "Letras 3D Iluminadas",
        "Vinil Automotriz 3M y Avery Dennison"
      ]
    }
  ]
}
```

---

## 3. Indexación Automatizada: Sitemap XML & Robots.txt

1. **Sitemap XML Dinámico (`@astrojs/sitemap`)**:
   - Configurado en [`astro.config.mjs`](file:///f:/IMAGEN%20ARTIS/wil/githubrep/imagenartis/astro.config.mjs) con el dominio canónico `https://imagenartis.pe`.
   - Genera automáticamente `https://imagenartis.pe/sitemap-index.xml` mapeando todas las páginas estáticas y las fichas de proyectos dinámicos (`/galeria/*`).
   - Filtra y oculta de forma automática rutas administrativas como `/admin`.
2. **Robots.txt ([`public/robots.txt`](file:///f:/IMAGEN%20ARTIS/wil/githubrep/imagenartis/public/robots.txt))**:
   - Autoriza el rastreo completo a motores de búsqueda y bots de IA.
   - Bloquea explícitamente el acceso a `/admin/` y endpoints `/api/`.
   - Declara la URL canónica del sitemap para Google Search Console.

---

## 4. Analítica & Mapas de Calor con View Transitions (SPA)

En aplicaciones construidas con Astro y `ClientRouter` (SPA), la navegación entre páginas no recarga el navegador. Si se pegan scripts tradicionales, solo se registraría la primera página vista.

Para resolver esto en [`Layout.astro`](file:///f:/IMAGEN%20ARTIS/wil/githubrep/imagenartis/src/layouts/Layout.astro):

- **Google Analytics 4 (GA4)**:
  Se enlaza al evento `astro:page-load`, enviando el evento `page_view` cada vez que el usuario navega a `/galeria`, `/nosotros` o cualquier proyecto individual:
  ```javascript
  document.addEventListener('astro:page-load', () => {
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  });
  ```
- **Microsoft Clarity**:
  - 100% gratuito de por vida y sin límites de grabación de sesiones.
  - Registra clics de frustración (*rage clicks*), clics muertos (*dead clicks*) y reproduce grabaciones de pantalla de los visitantes reales para optimizar la conversión en el botón de WhatsApp.

---

## 5. Estrategia de Conversión: Galería de Casos vs. Blog Genérico

Los blogs con artículos genéricos como *"5 consejos para cuidar tu auto"* no generan clientes B2B calificados en talleres de rotulación.

Por ello, la estrategia de Imagenartis utiliza la **Galería de Proyectos ([`/galeria/[id]`](file:///f:/IMAGEN%20ARTIS/wil/githubrep/imagenartis/src/pages/galeria/[id].astro)) como páginas de aterrizaje transaccionales**:
- Cada trabajo (ej: Camión Dorcher, Hilux Camo, Letrero Artisan Café) tiene su propia URL indexable en Google.
- Responde a intenciones de búsqueda comerciales con alto valor de ticket: *"rotulacion de camiones lima"*, *"wrap militar mate lima"*, *"letrero acm edificio corporativo"*.
- Cada ficha incluye ficha técnica, garantía, tiempo de entrega y un botón directo:  
  **`"Cotizar Trabajo Similar por WhatsApp"`**, prellenando un mensaje con el nombre específico del proyecto para que el asesor de ventas cierre la venta en segundos.
