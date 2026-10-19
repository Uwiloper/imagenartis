import React, { useState, useEffect, useMemo, useRef, useCallback, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { 
  Search, 
  X, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Layers, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  Car,
  Store,
  Palette
} from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'wrap' | 'branding' | 'diseno';
  categoryLabel: string;
  client: string;
  location?: string;
  year?: string;
  featuredImage: string;
  galleryImages?: string[];
  materials: string[];
  technique: string;
  executionTime?: string;
  warranty?: string;
  description: string;
  aspectRatioClass?: string;
  tags: string[];
}

export const GALLERY_PROJECTS: ProjectItem[] = [
  // --- 1. WRAP AUTOMOTRIZ (6 proyectos) ---
  {
    id: 'hilux-camo-matte',
    title: 'Toyota Hilux GR - Wrap Total Camo Militar Mate',
    category: 'wrap',
    categoryLabel: 'Wrap Automotriz',
    client: 'Cliente Particular',
    location: 'Surco, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Vinil Fundido Avery Dennison SW900', 'Laminado Mate Anti-reflejo', 'Sellador de bordes 3M'],
    technique: 'Desmontaje de piezas periféricas, envoltura sin empalmes en paño continuo y termofijado a 95°C.',
    executionTime: '72 horas',
    warranty: '3 años contra desprendimiento o decoloración',
    description: 'Transformación total de carrocería con patrón camuflado de grado militar y textura mate antirreflejo. Protección integral de la pintura original frente a piedras y micro-rayas.',
    aspectRatioClass: 'aspect-[3/4]',
    tags: ['Hilux', 'Toyota', 'Camo', 'Avery Dennison', 'Off-road', 'Matte']
  },
  {
    id: 'flota-rush-logistics',
    title: 'Flota Comercial Rush Logistics - Rotulado Integral',
    category: 'wrap',
    categoryLabel: 'Wrap Automotriz',
    client: 'Rush Logistics S.A.C.',
    location: 'Callao, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Vinil Polimérico Arlon DPF 4500', 'Laminado UV Series 3220', 'Corte vectorial Silhouette'],
    technique: 'Impresión digital látex de alta definición a 1200 DPI y calce milimétrico de paneles laterales.',
    executionTime: '24 horas por unidad',
    warranty: '2 años de resistencia a intemperie y lavado industrial',
    description: 'Estandarización de imagen corporativa en una flota de 12 furgones de reparto rápido, garantizando máxima visibilidad en autopistas y avenidas principales.',
    aspectRatioClass: 'aspect-[16/11]',
    tags: ['Flotas', 'Furgón', 'Logística', 'Arlon', 'Comercial']
  },
  {
    id: 'porsche-gt3-satin-black',
    title: 'Porsche 911 GT3 - Satin Black Stealth & PPF Frontal',
    category: 'wrap',
    categoryLabel: 'Wrap Automotriz',
    client: 'Coleccionista Privado',
    location: 'La Molina, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['PPF Stek Dynoshield Auto-regenerable 8 mil', 'Vinil 3M 2080 Satin Black'],
    technique: 'Corte por plotter digital de patrones específicos sin contacto de navaja en carrocería.',
    executionTime: '96 horas',
    warranty: '5 años en PPF y 3 años en wrapping',
    description: 'Protección con película de poliuretano auto-sanable en todo el frontal y envoltura completa en acabado Satin Black para un look deportivo discreto y agresivo.',
    aspectRatioClass: 'aspect-[4/3]',
    tags: ['Porsche', 'GT3', 'PPF', 'Satin Black', 'Supercar', '3M']
  },
  {
    id: 'mercedes-sprinter-branding',
    title: 'Mercedes-Benz Sprinter - Plumber Pro Branding',
    category: 'wrap',
    categoryLabel: 'Wrap Automotriz',
    client: 'Plumber Pro Servicios',
    location: 'San Isidro, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Vinil Calandrado Ritrama con adhesivo antiburbujas Air Flow', 'Laminado brillante'],
    technique: 'Rotulado semi-integral sobre carrocería blanca con recorte al contorno de isotipos.',
    executionTime: '48 horas',
    warranty: '2 años de durabilidad',
    description: 'Diseño publicitario móvil de alto contraste pensado para generar llamados de clientes desde las calles y obras de construcción.',
    aspectRatioClass: 'aspect-[3/4]',
    tags: ['Mercedes', 'Sprinter', 'Van', 'Comercial', 'Rotulado']
  },
  {
    id: 'bmw-m4-nardo-grey',
    title: 'BMW M4 Competition - Nardo Grey & Techo Carbono',
    category: 'wrap',
    categoryLabel: 'Wrap Automotriz',
    client: 'Cliente Particular',
    location: 'Miraflores, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Vinil 3M 2080 Gloss Nardo Grey', 'Vinil Fibra de Carbono 4D Realista'],
    technique: 'Envoltura de curvaturas complejas en parachoques M Performance con sellado térmico perimetral.',
    executionTime: '72 horas',
    warranty: '3 años de garantía técnica',
    description: 'Cambio de color radical sin alterar la documentación vehicular, complementado con techo en acabado fibra de carbono texturado de alto brillo.',
    aspectRatioClass: 'aspect-square',
    tags: ['BMW', 'M4', 'Nardo Grey', 'Carbon Fiber', '3M']
  },
  {
    id: 'furgon-classic-bins',
    title: 'Furgón Hyundai H100 - Classic Bins Distribución',
    category: 'wrap',
    categoryLabel: 'Wrap Automotriz',
    client: 'Classic Bins Perú',
    location: 'Ate, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Vinil Autoadhesivo Premium para remolques', 'Laminado mate anti-graffiti'],
    technique: 'Aplicación sobre planchas de fibra de vidrio corrugadas con rodillo térmico.',
    executionTime: '36 horas',
    warranty: '2 años en solidez cromática',
    description: 'Gráfica publicitaria industrial resistente al roce de almacenes, lluvia ácida y exposición constante a rayos ultravioleta.',
    aspectRatioClass: 'aspect-[16/10]',
    tags: ['Hyundai', 'Furgón', 'Industrial', 'Distribución']
  },

  // --- 2. BRANDING COMERCIAL (6 proyectos) ---
  {
    id: 'letrero-artisan-cafe',
    title: 'Letrero 3D Retroiluminado Artisan Café',
    category: 'branding',
    categoryLabel: 'Branding Comercial',
    client: 'Artisan Specialty Coffee',
    location: 'San Isidro, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Acrílico Cristal 4mm termoformado', 'Cinta Neón LED Cálido 3000K', 'Chasis de aluminio lacado'],
    technique: 'Corte router CNC, armado manual de cantos y sistema eléctrico hermético IP67.',
    executionTime: '5 días hábiles',
    warranty: '2 años en componentes LED y estructura',
    description: 'Letrero corpóreo para fachada exterior con halo luminoso trasero suave. Diseñado para transmitir calidez artesanal y destacar en horario nocturno.',
    aspectRatioClass: 'aspect-[3/4]',
    tags: ['Letrero 3D', 'Café', 'Neón LED', 'Acrílico', 'Fachadas']
  },
  {
    id: 'fachada-acm-alpha',
    title: 'Fachada Arquitectónica en ACM Edificio Alpha',
    category: 'branding',
    categoryLabel: 'Branding Comercial',
    client: 'Corporación Alpha',
    location: 'Miraflores, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Paneles de Aluminio Compuesto (ACM) 4mm', 'Estructura tubular galvanizada', 'Sellante estructural Dow Corning'],
    technique: 'Modulación arquitectónica, ruteado en V para plegado limpio y anclaje invisible.',
    executionTime: '12 días hábiles',
    warranty: '5 años en planchas ACM y fijaciones',
    description: 'Modernización integral de fachada comercial de 3 niveles con paneles ACM en color gris grafito y logotipo central retroiluminado.',
    aspectRatioClass: 'aspect-[16/11]',
    tags: ['ACM', 'Fachada', 'Arquitectura', 'Corporativo', 'Edificio']
  },
  {
    id: 'vitrinas-banco-real',
    title: 'Vitrinas & Mamparas de Cristal Banco Real',
    category: 'branding',
    categoryLabel: 'Branding Comercial',
    client: 'Banco Real',
    location: 'San Borja, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Vinil Esmerilado Pavonado 3M Dusted Crystal', 'Láminas de seguridad 8 mil'],
    technique: 'Corte vectorial de patrones lineales y logotipos en positivo/negativo con aplicación húmeda sin burbujas.',
    executionTime: '48 horas',
    warranty: '3 años sin amarillamiento ni contracción',
    description: 'Equilibrio perfecto entre privacidad de salas de reuniones corporativas y paso de luz natural, manteniendo los estándares de seguridad bancarios.',
    aspectRatioClass: 'aspect-[4/3]',
    tags: ['Pavonados', '3M', 'Vitrinas', 'Oficinas', 'Privacidad']
  },
  {
    id: 'directorio-clinica-sanitas',
    title: 'Directorio Flotante Clínica Sanitas',
    category: 'branding',
    categoryLabel: 'Branding Comercial',
    client: 'Clínica Sanitas',
    location: 'Surco, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Acrílico Óptico de 8mm', 'Separadores cilíndricos de Acero Inoxidable 316', 'Rotulación en vinil mate'],
    technique: 'Biselado y pulido de cantos con diamante, serigrafía técnica posterior.',
    executionTime: '3 días hábiles',
    warranty: '3 años de garantía estructural',
    description: 'Señalética de wayfinding y directorio de consultorios médicos para lobby central con acabado flotante minimalista.',
    aspectRatioClass: 'aspect-square',
    tags: ['Señalética', 'Acrílico', 'Directorio', 'Clínica', 'Wayfinding']
  },
  {
    id: 'letras-acero-bistro',
    title: 'Letras de Acero Inoxidable Bistró Barranco',
    category: 'branding',
    categoryLabel: 'Branding Comercial',
    client: 'Bistró Barranco',
    location: 'Barranco, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Acero Inoxidable Mate Satinado 1.5mm', 'Módulos LED encapsulados Samsung'],
    technique: 'Corte por fibra láser, soldadura TIG de precisión y luz indirecta hacia muro rústico.',
    executionTime: '6 días hábiles',
    warranty: '5 años contra corrosión marina y salitre',
    description: 'Identidad corpórea marina de alta durabilidad para distrito costero, combinando elegancia artesanal con tecnología LED de bajo consumo.',
    aspectRatioClass: 'aspect-[3/4]',
    tags: ['Acero', 'Letras Corpóreas', 'Restaurante', 'Barranco', 'LED']
  },
  {
    id: 'stand-expo-tech',
    title: 'Stand Modular Expomin Tech 2026',
    category: 'branding',
    categoryLabel: 'Branding Comercial',
    client: 'Mining Tech Corp',
    location: 'Jockey Plaza, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Perfilería de aluminio desmontable', 'Tela sublimada backlite sin uniones', 'Pisos laminados alto tránsito'],
    technique: 'Montaje exprés de 12 horas con tensores de seguridad para recintos feriales.',
    executionTime: '12 horas de montaje',
    warranty: 'Cobertura y soporte durante toda la feria',
    description: 'Espacio ferial interactivo de 36m² con tótems de atención, iluminación cenital y backing gráfico de gran impacto.',
    aspectRatioClass: 'aspect-[16/10]',
    tags: ['Stand', 'Feria', 'Eventos', 'Backing', 'Modular']
  },

  // --- 3. DISEÑO E IDENTIDAD (6 proyectos) ---
  {
    id: 'identidad-kronos',
    title: 'Identidad Corporativa & Manual de Marca Kronos Group',
    category: 'diseno',
    categoryLabel: 'Diseño e Identidad',
    client: 'Kronos Real Estate',
    location: 'San Isidro, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Vectores en curvas 100% escalables', 'Paleta Pantone Formula Guide', 'Manual en PDF Maestro de 48 páginas'],
    technique: 'Investigación estratégica, diseño geométrico de isotipo y normalización tipográfica.',
    executionTime: '10 días hábiles',
    warranty: 'Cesión total de derechos de propiedad intelectual',
    description: 'Desarrollo de sistema de identidad visual completa para desarrolladora inmobiliaria de lujo. Incluye papelería institucional, firmas y guía de usos correctos.',
    aspectRatioClass: 'aspect-[3/4]',
    tags: ['Branding', 'Logotipo', 'Identidad', 'Manual de Marca', 'Papelería']
  },
  {
    id: 'packaging-cafe-origen',
    title: 'Packaging & Troquel Café de Especialidad Origen',
    category: 'diseno',
    categoryLabel: 'Diseño e Identidad',
    client: 'Café Origen Chanchamayo',
    location: 'Lima / Junín',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Bolsa Kraft trilaminada con válvula desgasificadora', 'Impresión en serigrafía directa 2 tintas'],
    technique: 'Diseño de plano mecánico de troquel con demasías exactas para empaquetado automático.',
    executionTime: '5 días hábiles',
    warranty: 'Archivos testeados y aprobados con proveedor industrial de bolsas',
    description: 'Diseño de packaging sostenible y elegante que resalta el origen de granos de altura con narrativa gráfica autóctona.',
    aspectRatioClass: 'aspect-[4/3]',
    tags: ['Packaging', 'Troquel', 'Café', 'Etiquetas', 'Ecológico']
  },
  {
    id: 'etiquetas-gin-altiplano',
    title: 'Etiquetas de Lujo para Gin Botánico Altiplano',
    category: 'diseno',
    categoryLabel: 'Diseño e Identidad',
    client: 'Destilería Andina',
    location: 'Cusco / Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Papel Fasson Cotton White impermeable', 'Hot Stamping Oro Champagne', 'Relieve en seco en isotipo'],
    technique: 'Pre-prensa técnica multicapa con canales especiales para acabados post-impresión.',
    executionTime: '6 días hábiles',
    warranty: 'Pruebas de color y troquelado físico supervisadas',
    description: 'Etiqueta envolvente de alta gama para botella cónica licorera, evocando botánicos silvestres con acabados metálicos de impacto.',
    aspectRatioClass: 'aspect-square',
    tags: ['Etiquetas', 'Bebidas', 'Hot Stamping', 'Relieve', 'Packaging']
  },
  {
    id: 'campana-publicitaria-digital',
    title: 'Campaña Publicitaria & Banners E-commerce',
    category: 'diseno',
    categoryLabel: 'Diseño e Identidad',
    client: 'Nova Sport Perú',
    location: 'Lima, Perú',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Piezas para Meta Ads (1:1, 9:16)', 'Display Ads de Google Ads', 'Web Banners Responsive'],
    technique: 'Composición tipográfica y jerarquía visual optimizada para scroll en dispositivos móviles.',
    executionTime: '4 días hábiles',
    warranty: 'Formatos optimizados para peso y velocidad web',
    description: 'Set de más de 30 piezas publicitarias estáticas y animadas diseñadas con llamadas a la acción enfocadas en conversión y ventas.',
    aspectRatioClass: 'aspect-[16/11]',
    tags: ['Publicidad', 'Redes Sociales', 'E-commerce', 'Banners', 'Digital']
  },
  {
    id: 'bolsas-boutique-serena',
    title: 'Bolsas Corporativas & Material POP Serena',
    category: 'diseno',
    categoryLabel: 'Diseño e Identidad',
    client: 'Boutique Serena',
    location: 'San Isidro, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Cartulina Kimberly Couché 250g', 'Barniz sectorizado UV brillante', 'Asas de cinta gross tejida'],
    technique: 'Planos mecánicos para armado manual, refuerzo en base y solapas de sujeción.',
    executionTime: '4 días hábiles',
    warranty: 'Archivos certificados para imprenta offset',
    description: 'Experiencia de empaque premium para compras en tienda física, convirtiendo cada bolsa en un soporte publicitario móvil de lujo.',
    aspectRatioClass: 'aspect-[3/4]',
    tags: ['Bolsas', 'POP', 'Moda', 'Troquel', 'Retail']
  },
  {
    id: 'gigantografia-panamericana',
    title: 'Gigantografía Gran Formato Vía Panamericana',
    category: 'diseno',
    categoryLabel: 'Diseño e Identidad',
    client: 'Grupo Inmobiliario Nexus',
    location: 'Panamericana Sur, Lima',
    year: '2026',
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: ['Lona Frontlit 13oz de alta tenacidad', 'Perfil de color Fogra39 CMYK', 'Osetes metálicos reforzados'],
    technique: 'Preparación de archivo en escala 1:10 a 300 DPI, calibración de color para visión a 50 km/h.',
    executionTime: '3 días hábiles',
    warranty: 'Garantía técnica de cero pixelado en impresión monumental',
    description: 'Panel gigante de 12x4 metros con contrastes visuales calibrados para ser legible a gran velocidad desde la autopista.',
    aspectRatioClass: 'aspect-[16/9]',
    tags: ['Gran Formato', 'Gigantografía', 'Paneles', 'CMYK', 'Valla']
  }
];

type CategoryFilter = 'todos' | 'wrap' | 'branding' | 'diseno';

export default function PinterestGallery() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal de Detalle
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  // Sincronización inicial con URL query parameters (?categoria=... & ?q=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('categoria');
    const qParam = params.get('q');

    if (catParam) {
      if (['wrap', 'branding', 'diseno', 'todos'].includes(catParam)) {
        setSelectedCategory(catParam as CategoryFilter);
      } else if (catParam.includes('wrap') || catParam.includes('flotas') || catParam.includes('ppf') || catParam.includes('auto')) {
        setSelectedCategory('wrap');
      } else if (catParam.includes('brand') || catParam.includes('letrero') || catParam.includes('fachada') || catParam.includes('vitrina')) {
        setSelectedCategory('branding');
      } else if (catParam.includes('diseno') || catParam.includes('digital') || catParam.includes('impresion') || catParam.includes('packaging')) {
        setSelectedCategory('diseno');
      }
    }

    if (qParam) {
      setSearchQuery(qParam);
    }
  }, []);

  // Actualizar query params de forma transparente al cambiar de filtro sin recargar
  const handleCategoryChange = (cat: CategoryFilter) => {
    setSelectedCategory(cat);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (cat === 'todos') {
        url.searchParams.delete('categoria');
      } else {
        url.searchParams.set('categoria', cat);
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Filtrado reactivo en vivo por categoría y término de búsqueda
  const filteredProjects = useMemo(() => {
    return GALLERY_PROJECTS.filter((item) => {
      // 1. Filtro de Categoría
      const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      // 2. Filtro de Búsqueda por texto libre
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      
      const inTitle = item.title.toLowerCase().includes(q);
      const inClient = item.client.toLowerCase().includes(q);
      const inLocation = item.location ? item.location.toLowerCase().includes(q) : false;
      const inDescription = item.description.toLowerCase().includes(q);
      const inTechnique = item.technique.toLowerCase().includes(q);
      const inMaterials = item.materials.some(m => m.toLowerCase().includes(q));
      const inTags = item.tags.some(t => t.toLowerCase().includes(q));

      return inTitle || inClient || inLocation || inDescription || inTechnique || inMaterials || inTags;
    });
  }, [selectedCategory, searchQuery]);

  // Contadores por categoría
  const counts = useMemo(() => {
    return {
      todos: GALLERY_PROJECTS.length,
      wrap: GALLERY_PROJECTS.filter(p => p.category === 'wrap').length,
      branding: GALLERY_PROJECTS.filter(p => p.category === 'branding').length,
      diseno: GALLERY_PROJECTS.filter(p => p.category === 'diseno').length
    };
  }, []);

  // Abrir Modal de Detalle
  const handleOpenProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setModalImageIndex(0);
    setIsZoomed(false);
    setZoomOrigin({ x: 50, y: 50 });
    document.body.style.overflow = 'hidden';
  };

  // Cerrar Modal
  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
    setIsZoomed(false);
    document.body.style.overflow = '';
  }, []);

  // Navegar al proyecto anterior / siguiente dentro del modal
  const handleNavigateProject = useCallback((direction: 'prev' | 'next', e?: ReactMouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    if (currentIndex === -1) return;

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0) nextIndex = filteredProjects.length - 1;
    if (nextIndex >= filteredProjects.length) nextIndex = 0;

    setSelectedProject(filteredProjects[nextIndex]);
    setModalImageIndex(0);
    setIsZoomed(false);
  }, [selectedProject, filteredProjects]);

  // Manejo de Zoom dentro del modal
  const handleToggleZoom = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isZoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomOrigin({ x, y });
      setIsZoomed(true);
    } else {
      setIsZoomed(false);
    }
  };

  // Atajos de teclado en modal
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowLeft') {
        handleNavigateProject('prev');
      } else if (e.key === 'ArrowRight') {
        handleNavigateProject('next');
      } else if (e.key === 'z' || e.key === 'Z') {
        setIsZoomed(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, handleCloseModal, handleNavigateProject]);

  // Categorías con etiquetas e iconos
  const categoryTabs = [
    { key: 'todos' as CategoryFilter, label: 'Todos', count: counts.todos, icon: null },
    { key: 'wrap' as CategoryFilter, label: 'Wrap Automotriz', count: counts.wrap, icon: Car },
    { key: 'branding' as CategoryFilter, label: 'Branding Comercial', count: counts.branding, icon: Store },
    { key: 'diseno' as CategoryFilter, label: 'Diseño e Identidad', count: counts.diseno, icon: Palette }
  ];

  return (
    <section className="relative w-full bg-white dark:bg-zinc-950 transition-colors duration-300">
      
      {/* 1. Encabezado Editorial Simple (Sin Hero, pero con margen superior generoso para no solaparse con el Navbar) */}
      <div className="pt-28 sm:pt-32 md:pt-36 pb-8 md:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-800/80">
        
        {/* Badge Sutil con Pulso Rojo */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 shadow-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EE2737] animate-pulse"></span>
            PORTAFOLIO & GALERÍA DE PROYECTOS
          </span>
        </div>

        {/* Título de Alto Impacto */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-display font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-4">
          Trabajos reales y <span className="text-[#EE2737]">acabados de precisión</span>
        </h1>

        {/* Subtítulo Descriptivo */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-sans max-w-3xl leading-relaxed mb-8">
          Explora nuestras instalaciones en wrapping vehicular de flotas, letreros arquitectónicos corpóreos y sistemas de identidad visual. Filtra por categoría o usa el buscador para ver proyectos con tus materiales de interés.
        </p>

        {/* 2. Barra de Control: Buscador en Vivo + Pestañas de Servicio */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2">
          
          {/* Pestañas de Filtro por Servicio */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 select-none">
            {categoryTabs.map(tab => {
              const isActive = selectedCategory === tab.key;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleCategoryChange(tab.key)}
                  className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-sm text-xs sm:text-sm font-sans font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap border shadow-none ${
                    isActive
                      ? 'bg-[#EE2737] text-white border-[#EE2737]'
                      : 'bg-zinc-100 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  {Icon && <Icon size={14} className={isActive ? 'text-white' : 'text-zinc-500'} />}
                  <span>{tab.label}</span>
                  <span className={`text-[11px] font-mono px-1.5 py-0.2 rounded-xs ${
                    isActive ? 'bg-black/25 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Campo de Búsqueda Reactiva */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por cliente, vehículo, material..."
              className="w-full pl-9 pr-9 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#EE2737] dark:focus:border-[#EE2737] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                title="Limpiar búsqueda"
              >
                <X size={14} />
              </button>
            )}
          </div>

        </div>

        {/* Contador de Resultados y Estado de Filtro */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <span>
            Mostrando <strong>{filteredProjects.length}</strong> de {GALLERY_PROJECTS.length} proyectos
            {searchQuery && <span> para "{searchQuery}"</span>}
          </span>
          {(searchQuery || selectedCategory !== 'todos') && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="text-[#EE2737] hover:underline cursor-pointer"
            >
              Restablecer filtros
            </button>
          )}
        </div>

      </div>

      {/* 3. Grilla Dinámica Estilo Pinterest (Masonry Grid con Proporciones Naturales) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-md border border-dashed border-zinc-300 dark:border-zinc-800">
            <p className="text-base sm:text-lg font-display font-bold text-zinc-800 dark:text-zinc-200 mb-2">
              No se encontraron proyectos con ese criterio
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-6">
              Prueba con otros términos como "Hilux", "Letrero", "Acrílico", "3M" o "Packaging".
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-sm bg-[#EE2737] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
            >
              Ver todos los proyectos
            </button>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 [column-fill:_balance]">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleOpenProject(project)}
                className="break-inside-avoid mb-4 sm:mb-5 group rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden cursor-pointer transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-none relative"
              >
                
                {/* Contenedor de Imagen con Proporción Natural (Estilo Pinterest) */}
                <div className={`relative w-full ${project.aspectRatioClass || 'aspect-[4/3]'} overflow-hidden bg-zinc-950`}>
                  <img
                    src={project.featuredImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradiente Inferior de Alto Contraste */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 transition-opacity duration-300 pointer-events-none"></div>

                  {/* Badge de Categoría Superior */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-block px-2.5 py-0.5 rounded-xs bg-black/75 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 inline-block rounded-full bg-[#EE2737] mr-1.5"></span>
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Botón de Expansión en Hover */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-7 h-7 rounded-sm bg-[#EE2737] text-white flex items-center justify-center shadow-lg">
                      <Maximize2 size={13} />
                    </div>
                  </div>

                  {/* Textos Informativos al Pie de la Foto */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 pointer-events-none">
                    <h3 className="text-sm font-display font-bold text-white leading-snug line-clamp-2 drop-shadow-sm group-hover:text-[#EE2737] transition-colors">
                      {project.title}
                    </h3>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-zinc-300 font-sans">
                      <span className="truncate">{project.client}</span>
                      {project.location && (
                        <span className="shrink-0 text-zinc-400 font-mono text-[10px]">
                          {project.location}
                        </span>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* 4. Modal de Detalle de Proyecto ("Bien UX": Visor Multi-foto, Ficha Técnica y Cotización) */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 select-none animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          
          {/* Tarjeta Contenedora del Modal */}
          <div
            className="relative w-full max-w-6xl max-h-[92vh] bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col lg:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Botón Cerrar (X) */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-3 right-3 z-40 p-2 rounded-sm bg-black/60 hover:bg-[#EE2737] text-white transition-colors cursor-pointer"
              title="Cerrar (Esc)"
            >
              <X size={18} />
            </button>

            {/* COLUMNA IZQUIERDA: Visor de Fotos con Zoom y Navegación entre Proyectos */}
            <div className="lg:w-7/12 relative bg-black flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 min-h-[320px] sm:min-h-[420px] lg:min-h-[580px]">
              
              {/* Controles Superiores del Visor */}
              <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-sm bg-[#EE2737] text-white font-mono text-xs font-bold uppercase">
                  {selectedProject.categoryLabel}
                </span>

                <button
                  type="button"
                  onClick={() => setIsZoomed(prev => !prev)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-black/75 hover:bg-zinc-800 text-white font-sans text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
                  title={isZoomed ? 'Restablecer vista' : 'Zoom 2x'}
                >
                  {isZoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
                  <span className="hidden sm:inline">{isZoomed ? '100%' : 'Zoom 2x'}</span>
                </button>
              </div>

              {/* Área Central de la Foto Grande con Zoom Interactivo */}
              <div 
                className={`relative flex-1 w-full h-full flex items-center justify-center overflow-hidden p-2 sm:p-4 ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={handleToggleZoom}
              >
                <img
                  src={
                    selectedProject.galleryImages && selectedProject.galleryImages[modalImageIndex]
                      ? selectedProject.galleryImages[modalImageIndex]
                      : selectedProject.featuredImage
                  }
                  alt={selectedProject.title}
                  style={{
                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`
                  }}
                  className={`max-w-full max-h-[50vh] sm:max-h-[65vh] object-contain rounded-sm transition-transform duration-300 ease-out select-none ${
                    isZoomed ? 'scale-[2.1]' : 'scale-100'
                  }`}
                />

                {/* Flecha Proyecto Anterior */}
                <button
                  type="button"
                  onClick={(e) => handleNavigateProject('prev', e)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-[#EE2737] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 border border-white/10"
                  title="Proyecto anterior (←)"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Flecha Proyecto Siguiente */}
                <button
                  type="button"
                  onClick={(e) => handleNavigateProject('next', e)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-[#EE2737] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 border border-white/10"
                  title="Proyecto siguiente (→)"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Tira Inferior de Miniaturas del Proyecto Actual (si tiene más de 1 foto) */}
              {selectedProject.galleryImages && selectedProject.galleryImages.length > 1 && (
                <div className="p-2.5 bg-zinc-950/95 border-t border-zinc-800/80 flex items-center justify-center gap-2 z-20">
                  {selectedProject.galleryImages.map((imgUrl, idx) => {
                    const isActive = idx === modalImageIndex;
                    return (
                      <button
                        key={'proj-thumb-' + idx}
                        type="button"
                        onClick={() => {
                          setIsZoomed(false);
                          setModalImageIndex(idx);
                        }}
                        className={`relative w-14 h-10 sm:w-16 sm:h-11 rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${
                          isActive
                            ? 'border-[#EE2737] opacity-100 scale-105'
                            : 'border-transparent opacity-50 hover:opacity-90'
                        }`}
                      >
                        <img src={imgUrl} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    );
                  })}
                </div>
              )}

            </div>

            {/* COLUMNA DERECHA: Ficha Técnica Editorial y Botón WhatsApp de Conversión */}
            <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-[580px] bg-white dark:bg-zinc-900 transition-colors">
              <div>
                
                {/* Meta de Ubicación y Año */}
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2">
                  {selectedProject.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-[#EE2737]" />
                      {selectedProject.location}
                    </span>
                  )}
                  {selectedProject.year && (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {selectedProject.year}
                    </span>
                  )}
                </div>

                {/* Título Principal del Proyecto */}
                <h2 className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white tracking-tight leading-snug mb-1">
                  {selectedProject.title}
                </h2>

                {/* Cliente */}
                <p className="text-xs sm:text-sm font-sans font-semibold text-[#EE2737] mb-4">
                  Cliente: {selectedProject.client}
                </p>

                {/* Descripción del Trabajo Realizado */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Ficha Técnica: Materiales y Ejecución */}
                <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  
                  {/* Materiales */}
                  <div>
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 flex items-center gap-1.5">
                      <Layers size={13} className="text-[#EE2737]" />
                      Materiales Utilizados
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedProject.materials.map((mat, idx) => (
                        <li key={idx} className="text-xs text-zinc-800 dark:text-zinc-200 font-sans flex items-start gap-2">
                          <span className="text-[#EE2737] font-bold">✓</span>
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Técnica & Proceso */}
                  <div>
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                      Técnica Aplicada
                    </h4>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 font-sans leading-snug">
                      {selectedProject.technique}
                    </p>
                  </div>

                  {/* Garantía y Tiempos */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {selectedProject.executionTime && (
                      <div className="p-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800/80">
                        <span className="text-[10px] font-mono uppercase text-zinc-500 dark:text-zinc-400 block flex items-center gap-1">
                          <Clock size={11} className="text-[#EE2737]" />
                          Ejecución
                        </span>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5 block">
                          {selectedProject.executionTime}
                        </span>
                      </div>
                    )}
                    {selectedProject.warranty && (
                      <div className="p-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800/80">
                        <span className="text-[10px] font-mono uppercase text-zinc-500 dark:text-zinc-400 block flex items-center gap-1">
                          <ShieldCheck size={11} className="text-[#EE2737]" />
                          Garantía
                        </span>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5 block truncate" title={selectedProject.warranty}>
                          {selectedProject.warranty}
                        </span>
                      </div>
                    )}
                  </div>

                </div>

              </div>

              {/* Botón WhatsApp de Cotización Directa */}
              <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
                <a
                  href={`https://wa.me/51994097417?text=${encodeURIComponent(
                    `¡Hola! Vi en su galería el proyecto "${selectedProject.title}" y deseo cotizar algo similar para mi empresa o vehículo.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm bg-[#EE2737] hover:bg-zinc-900 dark:hover:bg-white text-white dark:hover:text-black font-sans text-xs font-bold uppercase tracking-wider transition-colors duration-200 shadow-none text-center"
                >
                  <span>COTIZAR PROYECTO SIMILAR</span>
                  <span>→</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
