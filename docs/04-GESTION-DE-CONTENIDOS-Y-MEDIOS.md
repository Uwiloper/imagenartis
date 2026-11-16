# 04. Gestión de Contenidos, Medios & Organización de Archivos

> **Directorio Raíz de Medios**: [`public/`](file:///f:/IMAGEN%20ARTIS/wil/githubrep/imagenartis/public/)  
> **Catálogo Central de Proyectos**: [`src/lib/projects.ts`](file:///f:/IMAGEN%20ARTIS/wil/githubrep/imagenartis/src/lib/projects.ts)  
> **Textos & Configuración Universal**: [`src/content/`](file:///f:/IMAGEN%20ARTIS/wil/githubrep/imagenartis/src/content/)  

---

## 1. Organización del Directorio `public/`

Los archivos colocados dentro de `public/` son servidos directamente en la raíz de la web. Para mantener orden en el crecimiento del sitio, los medios se organizan por secciones:

```text
public/
├── Inicio/                # Recursos de la página principal (Home)
│   ├── dorcher_clean.jpeg # Camión sin rotular (Antes)
│   ├── dorcher_brand.jpg  # Camión con rotulación final (Después)
│   ├── gaspetrol_clean.jpg
│   └── gaspetrol_brand.jpg
├── galeria/               # Fotografías de proyectos de la galería
│   ├── asistmec-1.jpg
│   ├── asistmec-2.jpg
│   └── asistmec-3.jpg
├── wrapauto/              # Recursos exclusivos de la sección Wrapping Automotriz
├── brandcomercial/        # Recursos de Branding Comercial y Fachadas
├── diseno/                # Recursos de Diseño e Identidad Visual
├── nosotros/              # Fotos de taller, equipo y proceso artesanal
├── logosclientes/         # SVGs de marcas y clientes (Dorcher, Gaspetrol, Ampco, etc.)
├── videos/                # Videos nativos en formato MP4 (ej: fondo-hero.mp4)
├── favicon.svg            # Favicon vectorial principal
├── favicon.ico            # Favicon legado para navegadores antiguos
├── robots.txt             # Directivas de rastreo para buscadores
└── site.webmanifest       # Manifiesto PWA para móviles y tema oscuro
```

> [!TIP]
> **Sensibilidad a mayúsculas/minúsculas en Linux**:
> Cuando Cloudflare publica la web en sus servidores Linux, los nombres de archivo son sensibles a mayúsculas. Asegúrate de que las rutas escritas en el código coincidan exactamente con el nombre de la carpeta (ej: `/Inicio/dorcher_clean.jpeg` si la carpeta se llama `Inicio`).

---

## 2. Cómo Agregar o Modificar Proyectos en la Galería

Todos los proyectos se configuran en el archivo [`src/lib/projects.ts`](file:///f:/IMAGEN%20ARTIS/wil/githubrep/imagenartis/src/lib/projects.ts). Cada proyecto sigue esta estructura tipada:

```typescript
{
  id: 'flota-dorcher-logistics',           // Slug único para la URL: /galeria/flota-dorcher-logistics
  aliases: ['camion-dorcher', 'dorcher'],  // URLs alternas que redirigen automáticamente
  title: 'Camión Distribuidor Dorcher - Rotulación de Flota en Vinil Fundido',
  category: 'wrap',                        // 'wrap' | 'branding' | 'diseno'
  categoryLabel: 'Flotas Comerciales',
  client: 'Dorcher Logistics S.A.C.',
  location: 'Lima, Perú',
  year: '2026',
  priceEstimate: 'Presupuesto a medida según metraje',
  featuredImage: '/Inicio/dorcher_brand.jpg',
  galleryImages: [
    '/Inicio/dorcher_brand.jpg',
    '/Inicio/dorcher_clean.jpeg'
  ],
  galleryMedia: [
    {
      type: 'image',
      url: '/Inicio/dorcher_brand.jpg',
      title: 'Acabado Lateral en Cabina'
    },
    {
      type: 'video',
      url: '/videos/fondo-hero.mp4',
      title: 'Instalación en Taller'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      title: 'Video en YouTube'
    }
  ],
  materials: ['Vinil Fundido 3M IJ180mC', 'Laminado UV Mate 8518'],
  technique: 'Instalación térmica en caliente con termo-fijado de bordes',
  executionTime: '3 días hábiles',
  warranty: '3 años de garantía por escrito',
  description: 'Rotulación integral de unidad de transporte con colores corporativos de alta visibilidad...',
  highlights: [
    'Material de máxima resistencia al lavado a presión',
    'Corte milimétrico sin rayar la pintura original'
  ],
  tags: ['camion', 'flota', 'dorcher', '3M', 'wrap comercial'] // Palabras clave para el buscador difuso
}
```

---

## 3. Recomendaciones de Optimización Multimedia

Para que la web mantenga su velocidad de carga instantánea:
- **Fotografías**:
  - Formato preferido: WebP o JPEG de alta calidad optimizado.
  - Resolución sugerida para fotos de portada: entre **1600px y 1920px** de ancho.
  - Peso objetivo: menor a **400 KB** por imagen (puedes utilizar herramientas gratuitas como [Squoosh.app](https://squoosh.app) o TinyJPG).
- **Logotipos de Clientes**:
  - Siempre en formato vectorial **SVG** dentro de `public/logosclientes/` para que no pesen más de 5 KB y se vean nítidos en cualquier pantalla.
- **Videos**:
  - Para videos de fondo (Hero): compresión en formato **MP4 (H.264)** sin audio, con un bitrate controlado para que no supere los **3 a 5 MB**.
  - Para videos largos de demostración: subir a **YouTube** y colocar el enlace embed en `galleryMedia` para no consumir ancho de banda de tu servidor.
