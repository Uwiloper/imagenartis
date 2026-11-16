# 02. Sistema de Diseño & Filosofía UI/UX

> **Enfoque de Diseño**: Editorial / Taller de Precisión / Anti-Generic Agency  
> **Personalidad**: Industrial suizo, tipográfico de alto contraste, limpio, sin plantillas genéricas de IA  
> **Audiencia**: Empresas que buscan renovar flotas, marcas comerciales que exigen señalética premium, dueños de vehículos de alta gama  

---

## 1. Filosofía Visual: "Anti-AI Slop"

El diseño de Imagenartis fue concebido bajo el principio de **cero clichés genéricos**:
- ❌ **Prohibido**: Fondos de tarjetas con degradados morados genéricos, ilustraciones vectoriales infantiles, bordes redondeados excesivos (`rounded-3xl` estilo juguete) o textos corporativos vacíos.
- ✅ **Apostamos por**: Grillas asimétricas precisas, tipografía editorial con jerarquía contundente, bordes arquitectónicos ligeros (`rounded-md sm:rounded-lg`), fotografía real a pantalla completa y micro-interacciones de hardware aceleradas (60fps).

---

## 2. Paleta Cromática Oficial

| Color | Código HEX / Tailwind | Uso Semántico |
| :--- | :--- | :--- |
| **Rojo Imagenartis** | `#EE2737` | Color corporativo de marca. Navbar, botones de cotización primaria, badges de acento y trazos interactivos. |
| **Negro Profundo** | `#09090b` / `zinc-950` | Fondo general en modo oscuro y superficies base para resaltar la fotografía de wrapping y letreros con luz. |
| **Superficie de Tarjetas** | `zinc-900 / zinc-800` | Contenedores de proyectos, bordes de separación (`border-white/10`) y fondos sutiles con `backdrop-blur`. |
| **Blanco Puro** | `#FFFFFF` / `zinc-100` | Textos titulares (`text-white`), contraste directo en botones primarios y fondos de dropdowns. |
| **Gris Técnico** | `zinc-400 / zinc-500` | Metadatos secundarios, fichas técnicas, materiales y etiquetas de categoría. |

---

## 3. Sistema Tipográfico

El proyecto utiliza tres fuentes tipográficas con propósitos específicos:

1. **Space Grotesk** (`font-heading` / `font-display`):
   - **Propósito**: Titulares principales (H1, H2), números de impacto, botones de acción y menú de navegación.
   - **Carácter**: Moderno, geométrico y con peso industrial.
2. **Inter** (`font-sans`):
   - **Propósito**: Párrafos de lectura, testimonios de clientes, descripciones de proyectos y fichas técnicas.
   - **Carácter**: Máxima legibilidad en pantallas de cualquier densidad de píxeles (Retina / OLED).
3. **Space Mono** (`font-mono`):
   - **Propósito**: Badges técnicos, etiquetas de materiales (ej: `3M 2080`, `ACM 4mm`), tiempos de ejecución y metadatos de proyectos.

---

## 4. Componentes Clave & Micro-Interacciones

### A. Navbar con Morphing & Trazo Ondulado (`Navbar.tsx`)
- **Estado Inicial**: Se extiende al 100% del ancho con fondo `#EE2737` y borde sutil.
- **Estado Scrolled**: Al superar los 40px de scroll, transiciona suavemente a un navbar flotante tipo cápsula arquitectónica (`max-w-6xl`, esquinas `rounded-md sm:rounded-lg`, backdrop-blur y sombra profunda).
- **Subrayado Dinámico**: Cada elemento activo o al hacer hover dibuja un trazo curvo vectorial SVG (`CurvedUnderline`) que crece desde la izquierda.
- **Dropdown Servicios**: Posee un contenedor flotante con compensación `pt-2` y esquinas estilizadas, manteniendo la continuidad del hover sin interferir con la línea inferior del menú.
- **Persistencia SPA**: Envuelto en `transition:persist="main-navbar"` en `Layout.astro` para que jamás parpadee ni se reinicie entre páginas.

### B. Galería Interactiva con Filtros & Buscador Difuso (`PinterestGallery.tsx`)
- **Layout Masonry**: Disposición fluida tipo Pinterest con diferentes relaciones de aspecto (verticales, panorámicas, cuadradas).
- **Fuzzy Search con Fuse.js**: El buscador permite escribir términos con errores ortográficos (ej: *"hilux"*, *"folta"*, *"letrero"*), encontrando instantáneamente coincidencias en títulos, clientes, técnicas y tags ocultos.
- **Dropdown de Categorías**: Menú desplegable elegante estilo catálogo que ahorra espacio horizontal en pantallas pequeñas y móviles.

### C. Ficha de Proyecto & Visor Multimedia (`ProjectDetailView.tsx`)
- **Distribución Editorial**: 60% para fotografía y video de alta definición / 40% para ficha técnica y conversión.
- **Soporte Multimedia Universal**: Cada proyecto puede contener fotos en alta resolución, videos directos MP4, videos de YouTube y publicaciones de Instagram o TikTok.
- **Zoom & Lightbox Avanzado**: Modal a pantalla completa para inspeccionar acabados, texturas y esquinas con soporte de atajos de teclado (`Esc`, flechas `← / →`).
- **Modal de Compartir Dinámico**: Diálogo flotante ligero para compartir por WhatsApp, Facebook, LinkedIn o copiar enlace directo sin interrumpir la navegación.
- **Carrusel Infinito Inferior**: Despliega proyectos relacionados de la misma categoría de manera continua.

### D. Comparador Interactivo Antes / Después (`ShowcasePortfolio.tsx`)
- Permite al usuario arrastrar el control divisor entre la foto de un vehículo o fachada sin rotular y el acabado final con wrapping o letrero iluminado.
- Soporta eventos táctiles nativos para móviles y arrastre suave con mouse en computadoras de escritorio.

### E. Canvas Interactivo de Puntos (`InteractiveDotCanvas.tsx`)
- Renderiza una grilla sutil de puntos de precisión matemática que reacciona suavemente ante la cercanía del cursor del ratón, transmitiendo tecnología y exactitud artesanal.
