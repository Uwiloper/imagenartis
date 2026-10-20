export interface MediaItem {
  type: 'image' | 'video' | 'youtube' | 'social';
  url: string;
  thumbnail?: string;
  title?: string;
  platform?: 'youtube' | 'instagram' | 'tiktok' | 'facebook';
  embedUrl?: string;
}

export interface ProjectItem {
  id: string;
  aliases?: string[];
  title: string;
  category: 'wrap' | 'branding' | 'diseno';
  categoryLabel: string;
  client: string;
  location?: string;
  year?: string;
  priceEstimate?: string;
  featuredImage: string;
  galleryImages: string[];
  galleryMedia?: MediaItem[];
  materials: string[];
  technique: string;
  executionTime: string;
  warranty: string;
  description: string;
  highlights: string[];
  aspectRatioClass?: string;
  tags: string[];
}

export const ALL_PROJECTS: ProjectItem[] = [
  // ==========================================
  // 1. WRAP AUTOMOTRIZ
  // ==========================================
  {
    id: 'hilux-camo-matte',
    aliases: ['pickup-camo-4x4', 'hilux-camo'],
    title: 'Toyota Hilux GR - Wrap Total Camo Militar Mate',
    category: 'wrap',
    categoryLabel: 'Wrap Automotriz',
    client: 'Cliente Particular',
    location: 'Surco, Lima',
    year: '2026',
    priceEstimate: 'Presupuesto a medida según modelo y cobertura',
    featuredImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryMedia: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
        title: 'Vista Frontal Hilux Camo'
      },
      {
        type: 'video',
        url: '/videos/fondo-hero.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80',
        title: 'Video Proceso de Instalación'
      },
      {
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80',
        title: 'Presentación en YouTube'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
        title: 'Detalle de Acabado Lateral'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
        title: 'Inspección de Bordes y Esquinas'
      }
    ],
    materials: [
      'Vinil Fundido Avery Dennison SW900 Supreme',
      'Laminado Mate Anti-reflejo UV',
      'Sellador de bordes y esquinas 3M Edge Sealer',
      'Cinta de corte Knifeless Tape 3M'
    ],
    technique: 'Desmontaje técnico de piezas periféricas, envoltura en paño continuo sin empalmes visibles y post-calentado a 95°C para memoria elástica.',
    executionTime: '72 horas hábiles',
    warranty: '3 años contra levantamiento, burbujas o decoloración',
    description: 'Transformación integral de carrocería con diseño camuflado táctico de alto impacto. Además de la estética renovada, protege la pintura original frente al impacto de piedras, rayos UV y agentes abrasivos en ciudad y off-road.',
    highlights: [
      '100% reversible sin dañar la pintura original',
      'Protección contra micro-rayaduras y arena de carretera',
      'Acabado mate sedoso de fácil mantenimiento'
    ],
    aspectRatioClass: 'aspect-[3/4]',
    tags: ['Camionetas', 'Pickups', 'Camo', 'Avery Dennison', 'Off-road', 'Matte', 'Wrap Total']
  },
  {
    id: 'flota-rush-logistics',
    aliases: ['van-comercial-rush', 'rush-logistics'],
    title: 'Flota Comercial Rush Logistics - Rotulado Integral',
    category: 'wrap',
    categoryLabel: 'Wrap Automotriz',
    client: 'Rush Logistics S.A.C.',
    location: 'Callao, Lima',
    year: '2026',
    priceEstimate: 'Tarifa corporativa por volumen de unidades',
    featuredImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryMedia: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
        title: 'Flota Comercial de Vans'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
        title: 'Lateral de Furgón'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
        title: 'Compuertas Traseras con Señalización'
      }
    ],
    materials: [
      'Vinil Polimérico Arlon DPF 4500 de alta adherencia',
      'Laminado UV Arlon Series 3220 Brillante',
      'Tintas látex ecológicas con certificación GREENGUARD'
    ],
    technique: 'Impresión digital de alta fidelidad a 1200 DPI y calce milimétrico de paneles laterales sobre carrocería de furgón.',
    executionTime: '24 horas por unidad de flota',
    warranty: '2 años garantizados frente a lavado industrial y sol',
    description: 'Estandarización de marca corporativa para flota de reparto logístico. La gráfica convierte cada vehículo en una valla publicitaria móvil de alto impacto que recorre todo Lima Metropolitana y provincias.',
    highlights: [
      'Material resistente al lavado a presión y químicos de carretera',
      'Instalación express programada para no detener operaciones',
      'Fidelidad cromática estricta con el manual de identidad corporativa'
    ],
    aspectRatioClass: 'aspect-[16/11]',
    tags: ['Flotas', 'Vans', 'Furgones', 'Logística', 'Arlon', 'Comercial']
  },
  {
    id: 'porsche-gt3-satin-black',
    aliases: ['sports-satin-black', 'porsche-gt3'],
    title: 'Porsche 911 GT3 - Satin Black Stealth & PPF Frontal',
    category: 'wrap',
    categoryLabel: 'Wrap Automotriz',
    client: 'Coleccionista Privado',
    location: 'La Molina, Lima',
    year: '2026',
    priceEstimate: 'Servicio premium de personalización deportiva',
    featuredImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryMedia: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
        title: 'Porsche GT3 Acabado Satin Black'
      },
      {
        type: 'video',
        url: '/videos/fondo-hero.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
        title: 'Inspección de Brillo y Textura'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
        title: 'Vista Frontal con PPF Instalado'
      }
    ],
    materials: [
      'PPF Stek Dynoshield Poliuretano 8 mil Auto-regenerable',
      'Vinil 3M 2080 Series Satin Black',
      'Tratamiento cerámico especial para vinilos mate'
    ],
    technique: 'Patrones digitales cortados con plotter sin uso de cuchilla sobre carrocería. Aplicación en ambiente controlado libre de polvo.',
    executionTime: '96 horas',
    warranty: '5 años en PPF y 3 años en Wrapping',
    description: 'Blindaje con película de poliuretano auto-regenerable (PPF) en el paquete frontal y envoltura completa en tono Satin Black, logrando una estética stealth imponente y protección máxima contra pedradas a alta velocidad.',
    highlights: [
      'Poliuretano con nanotecnología auto-regenerable con calor',
      'Cero contacto de cuchilla sobre la pintura de fábrica',
      'Hidrofobia superior que repele suciedad y agua'
    ],
    aspectRatioClass: 'aspect-[4/3]',
    tags: ['Supercars', 'Sports Cars', 'PPF', 'Satin Black', '3M', 'Protección']
  },
  {
    id: 'mercedes-sprinter-branding',
    aliases: ['van-rotulada-plumber', 'sprinter-branding'],
    title: 'Mercedes-Benz Sprinter - Plumber Pro Branding',
    category: 'wrap',
    categoryLabel: 'Wrap Automotriz',
    client: 'Plumber Pro Servicios',
    location: 'San Isidro, Lima',
    year: '2026',
    priceEstimate: 'Rotulado comercial de alta rentabilidad',
    featuredImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: [
      'Vinil Calandrado Ritrama con tecnología Air Flow antiburbuja',
      'Laminado transparente de protección solar'
    ],
    technique: 'Rotulado semi-integral sobre carrocería original con corte al contorno y microperforado homologado en lunas traseras.',
    executionTime: '48 horas',
    warranty: '2 años en solidez cromática',
    description: 'Diseño comercial concebido para captar clientes en ruta. La diagramación prioriza el número telefónico, servicios clave y logotipo para máxima legibilidad a distancia.',
    highlights: [
      'Vinil microperforado que permite visibilidad desde el interior',
      'Diagramación publicitaria orientada a llamadas directas',
      'Material resistente al lavado frecuente'
    ],
    aspectRatioClass: 'aspect-[3/4]',
    tags: ['Vans', 'Furgones', 'Comercial', 'Rotulado', 'Flotas']
  },
  {
    id: 'bmw-m4-nardo-grey',
    aliases: ['m4-nardo', 'bmw-m4'],
    title: 'BMW M4 Competition - Nardo Grey & Techo Carbono',
    category: 'wrap',
    categoryLabel: 'Wrap Automotriz',
    client: 'Cliente Particular',
    location: 'Miraflores, Lima',
    year: '2026',
    priceEstimate: 'Personalización deportiva de alta gama',
    featuredImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: [
      'Vinil 3M 2080 Gloss Nardo Grey',
      'Vinil 4D Ultra-Gloss Carbon Fiber'
    ],
    technique: 'Envoltura de esquinas profundas en parachoques M con encintado de precisión y sellado perimetral.',
    executionTime: '72 horas',
    warranty: '3 años de garantía escrita',
    description: 'Transformación total de color inspirada en el legendario tono Nardo Grey, coronada con techo y difusor en fibra de carbono de alto brillo para un contraste motorsport.',
    highlights: [
      'Color sólido ultra-brillante idéntico a pintura original',
      'Techo en fibra de carbono con relieve óptico hiperrealista',
      'Protección contra micro-impactos de piedras'
    ],
    aspectRatioClass: 'aspect-square',
    tags: ['Sedán', 'Coupé', 'Sports Cars', '3M', 'Cambio de Color', 'Carbon Fiber']
  },
  {
    id: 'furgon-classic-bins',
    aliases: ['classic-bins'],
    title: 'Furgón Hyundai H100 - Classic Bins Distribución',
    category: 'wrap',
    categoryLabel: 'Wrap Automotriz',
    client: 'Classic Bins Perú',
    location: 'Ate, Lima',
    year: '2026',
    priceEstimate: 'Rotulado industrial de gran durabilidad',
    featuredImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: [
      'Vinil Autoadhesivo Premium para fibra de vidrio',
      'Laminado mate anti-graffiti de alta densidad'
    ],
    technique: 'Instalación sobre paneles corrugados con pistola de calor industrial y rodillos de memoria térmica.',
    executionTime: '36 horas',
    warranty: '2 años en solidez y adherencia',
    description: 'Gráfica publicitaria industrial reforzada para camiones de reparto urbano e interurbano, resistente al polvo, humedad marina y sol abrasador.',
    highlights: [
      'Capa protectora que facilita la limpieza de manchas y grasa',
      'Calce exacto respetando remaches y bisagras de compuertas',
      'Excelente relación costo-beneficio para branding comercial'
    ],
    aspectRatioClass: 'aspect-[16/10]',
    tags: ['Furgones', 'Camiones', 'Flotas', 'Industrial', 'Distribución']
  },

  // ==========================================
  // 2. BRANDING COMERCIAL
  // ==========================================
  {
    id: 'letrero-artisan-cafe',
    aliases: ['artisan-cafe', 'letreros-artisan'],
    title: 'Letrero 3D Retroiluminado Artisan Café',
    category: 'branding',
    categoryLabel: 'Branding Comercial',
    client: 'Artisan Specialty Coffee',
    location: 'San Isidro, Lima',
    year: '2026',
    priceEstimate: 'Fabricación personalizada según medidas de fachada',
    featuredImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80'
    ],
    galleryMedia: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
        title: 'Letrero 3D en Fachada Exterior'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
        title: 'Efecto Retroiluminado Nocturno'
      }
    ],
    materials: [
      'Acrílico Cristal 4mm termoformado y laqueado',
      'Tira Neón LED Cálido 3000K alta eficiencia',
      'Chasis interno de aluminio antioxidante',
      'Transformador electrónico Mean Well IP67'
    ],
    technique: 'Corte por router CNC, ensamble artesanal de cantos y sellado de seguridad para intemperie.',
    executionTime: '5 días hábiles de fabricación',
    warranty: '2 años en luminarias y estructura',
    description: 'Letrero corpóreo 3D para fachada exterior con halo de luz trasera cálida. Proyecta un ambiente acogedor y moderno que potencia el tráfico de clientes en horario diurno y nocturno.',
    highlights: [
      'Luz trasera indirecta que no deslumbra y genera volumen tridimensional',
      'Bajo consumo eléctrico gracias a tecnología LED Samsung',
      'Estructura resistente a lluvia y polvo con certificación IP67'
    ],
    aspectRatioClass: 'aspect-[3/4]',
    tags: ['Letreros 3D', 'Neón LED', 'Acrílico', 'Fachadas', 'Restaurantes', 'Corpóreos']
  },
  {
    id: 'fachada-acm-alpha',
    aliases: ['fachada-acm-corporativa', 'edificio-alpha'],
    title: 'Fachada Arquitectónica en ACM Edificio Alpha',
    category: 'branding',
    categoryLabel: 'Branding Comercial',
    client: 'Corporación Alpha',
    location: 'Miraflores, Lima',
    year: '2026',
    priceEstimate: 'Cotización por metro cuadrado de recubrimiento',
    featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: [
      'Paneles de Aluminio Compuesto (ACM) 4mm núcleo ignífugo',
      'Estructura portante tubular de acero galvanizado',
      'Sellador de silicona estructural Dow Corning'
    ],
    technique: 'Modulación arquitectónica 3D, ruteado en V para dobleces sin arrugas y fijación oculta mediante zetas de aluminio.',
    executionTime: '12 días hábiles (obra completa)',
    warranty: '5 años en paneles ACM y sellado',
    description: 'Renovación de fachada comercial de 3 niveles con paneles ACM gris grafito y logotipo central corporativo retroiluminado, elevando el valor arquitectónico del inmueble.',
    highlights: [
      'Aislante térmico y acústico gracias a la cámara de aire',
      'Acabado ultra-plano resistente a sismos menores',
      'Cero mantenimiento de pintura por más de 10 años'
    ],
    aspectRatioClass: 'aspect-[16/11]',
    tags: ['Fachadas ACM', 'Arquitectura', 'Corporativo', 'Edificios', 'Aluminio Compuesto']
  },
  {
    id: 'vitrinas-banco-real',
    aliases: ['banco-real', 'vitrinas-pavonadas'],
    title: 'Vitrinas & Mamparas con Vinil Pavonado Banco Real',
    category: 'branding',
    categoryLabel: 'Branding Comercial',
    client: 'Banco Real',
    location: 'San Borja, Lima',
    year: '2026',
    priceEstimate: 'Instalación por metro cuadrado',
    featuredImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: [
      'Vinil Esmerilado Pavonado 3M Dusted Crystal',
      'Lámina de seguridad inastillable 8 mil'
    ],
    technique: 'Plotter de corte computarizado para calado de isotipos, aplicación por método húmedo libre de impurezas y burbujas.',
    executionTime: '48 horas',
    warranty: '3 años de garantía de adherencia',
    description: 'Solución integral de privacidad y elegancia para salas de directorio y ventanillas bancarias. Permite el paso de luz natural mientras impide la visibilidad de pantallas confidenciales.',
    highlights: [
      'Efecto esmerilado translúcido de aspecto arenado de fábrica',
      'Retención de fragmentos de vidrio ante roturas o impactos',
      'Diseño institucional a medida con logotipos troquelados'
    ],
    aspectRatioClass: 'aspect-[4/3]',
    tags: ['Pavonados & Vitrinas', '3M', 'Vitrinas', 'Oficinas', 'Privacidad', 'Cristales']
  },
  {
    id: 'directorio-clinica-sanitas',
    aliases: ['senaletica-clinica-sanitas', 'clinica-sanitas'],
    title: 'Directorio Flotante Clínica Sanitas',
    category: 'branding',
    categoryLabel: 'Branding Comercial',
    client: 'Clínica Sanitas',
    location: 'Surco, Lima',
    year: '2026',
    priceEstimate: 'Fabricación a medida según número de niveles',
    featuredImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: [
      'Acrílico Óptico Cast de 8mm',
      'Separadores cilíndricos de Acero Inoxidable 316',
      'Rotulado en vinil mate de alta definición'
    ],
    technique: 'Corte láser con pulido de cantos con diamante, montaje en muro con tacos expansivos invisibles.',
    executionTime: '3 días hábiles',
    warranty: '3 años de garantía estructural',
    description: 'Señalética de orientación arquitectónica (wayfinding) para lobby médico. Sistema modular que permite actualizar médicos y especialidades de forma sencilla.',
    highlights: [
      'Módulos fácilmente intercambiables ante cambios de personal',
      'Cantos pulidos con acabado cristal de lujo',
      'Fijaciones de acero quirúrgico anticorrosivo'
    ],
    aspectRatioClass: 'aspect-square',
    tags: ['Señalética', 'Acrílico', 'Directorio', 'Wayfinding', 'Clínicas']
  },
  {
    id: 'letras-acero-bistro',
    aliases: ['letrero-neoled-bistrot', 'bistro-barranco'],
    title: 'Letras de Acero Inoxidable Bistró Barranco',
    category: 'branding',
    categoryLabel: 'Branding Comercial',
    client: 'Bistró Barranco',
    location: 'Barranco, Lima',
    year: '2026',
    priceEstimate: 'Fabricación corpórea por centímetro de altura',
    featuredImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: [
      'Acero Inoxidable Satinado Calidad 304 de 1.5mm',
      'Módulos LED micro-encapsulados con lente de 160°'
    ],
    technique: 'Corte por fibra láser, soldadura TIG microscópica sin marcas y tratamiento pasivado superficial.',
    executionTime: '6 días hábiles',
    warranty: '5 años contra corrosión marina y brisa marina',
    description: 'Letras corpóreas de acero inoxidable diseñadas específicamente para resistir la intensa humedad y salinidad de Barranco sin perder su brillo satinado.',
    highlights: [
      'Inmune a la humedad del litoral limeño',
      'Proyección de luz suave sobre muros de ladrillo o concreto',
      'Acabado elegante que denota máxima categoría gastronómica'
    ],
    aspectRatioClass: 'aspect-[3/4]',
    tags: ['Acero Inoxidable', 'Letreros 3D', 'Restaurantes', 'Corpóreos', 'LED']
  },
  {
    id: 'stand-expo-tech',
    aliases: ['expo-tech', 'stand-minero'],
    title: 'Stand Modular Expomin Tech 2026',
    category: 'branding',
    categoryLabel: 'Branding Comercial',
    client: 'Mining Tech Corp',
    location: 'Jockey Plaza, Lima',
    year: '2026',
    priceEstimate: 'Servicio llave en mano (diseño, fabricación y montaje)',
    featuredImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: [
      'Sistema de perfilería de aluminio modular Octanorm/Maxima',
      'Tela sublimada Backlite tensada de una sola pieza',
      'Piso técnico melamínico de alto tránsito con remates de aluminio'
    ],
    technique: 'Montaje rápido nocturno de 12 horas, cableado eléctrico embutido y calibración lumínica.',
    executionTime: '12 horas de montaje en recinto ferial',
    warranty: 'Soporte y asistencia presencial durante la exhibición',
    description: 'Stand de 36 m² con zona de reuniones privadas, counter de recepción iluminado y tótem audiovisual de 3 metros para la feria minera más importante del país.',
    highlights: [
      'Gráfica sin costuras de hasta 6 metros de largo',
      'Estructura reutilizable para futuros eventos comerciales',
      'Montaje y desmontaje 100% coordinado por nuestro equipo'
    ],
    aspectRatioClass: 'aspect-[16/10]',
    tags: ['Stands & Ferias', 'Eventos', 'Backing', 'Modular', 'Ferias']
  },

  // ==========================================
  // 3. DISEÑO E IDENTIDAD
  // ==========================================
  {
    id: 'identidad-kronos',
    aliases: ['kronos-group', 'branding-kronos'],
    title: 'Identidad Corporativa & Manual de Marca Kronos Group',
    category: 'diseno',
    categoryLabel: 'Diseño e Identidad',
    client: 'Kronos Real Estate',
    location: 'San Isidro, Lima',
    year: '2026',
    priceEstimate: 'Paquete de Identidad Visual Integral',
    featuredImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: [
      'Archivos maestros vectoriales (.AI, .EPS, .SVG, .PDF)',
      'Paleta cromática normalizada (Pantone, CMYK, RGB, HEX)',
      'Manual de Marca de 48 páginas encuadernado y digital'
    ],
    technique: 'Metodología de diseño estratégico: auditoría de mercado, conceptualización geométrica, pruebas de reducción a 12mm y validación de contrastes.',
    executionTime: '10 días hábiles',
    warranty: 'Cesión completa de derechos patrimoniales y autorales',
    description: 'Construcción desde cero del sistema de identidad visual para un holding inmobiliario prime. Incluye isotipo heráldico simplificado, tipografía corporativa y diseño de toda la papelería ejecutiva.',
    highlights: [
      'Archivos editables listos para cualquier escala (desde un botón hasta un panel)',
      'Guía técnica detallada para evitar errores de imprenta por parte de terceros',
      'Entregables organizados en carpetas profesionales clasificadas'
    ],
    aspectRatioClass: 'aspect-[3/4]',
    tags: ['Manual de Marca', 'Logotipos', 'Identidad', 'Papelería', 'Branding']
  },
  {
    id: 'packaging-cafe-origen',
    aliases: ['cafe-origen', 'troquel-cafe'],
    title: 'Packaging & Troquel Café de Especialidad Origen',
    category: 'diseno',
    categoryLabel: 'Diseño e Identidad',
    client: 'Café Origen Chanchamayo',
    location: 'Lima / Junín',
    year: '2026',
    priceEstimate: 'Diseño estructural y gráfico de empaque',
    featuredImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: [
      'Plano mecánico de troquel con líneas de hendido y corte',
      'Separación de colores CMYK + 2 tintas directas Pantone',
      'Mockup 3D hiperrealista para catálogo comercial'
    ],
    technique: 'Cálculo de volumen interno para 250g y 500g, demasías de sangrado para termosellado y confección de válvulas desgasificadoras.',
    executionTime: '5 días hábiles',
    warranty: 'Aprobación directa con imprenta de empaques flexibles',
    description: 'Empaque de café premium que combina tradición cafetalera con ilustración botánica estilizada, resaltando las notas de cata y origen en góndolas gourmet.',
    highlights: [
      'Plano de corte testeado milimétricamente sin desperdicio de material',
      'Visualización 3D previa a la impresión final',
      'Diseño alineado a estándares de exportación internacional'
    ],
    aspectRatioClass: 'aspect-[4/3]',
    tags: ['Packaging & Troqueles', 'Café', 'Troqueles', 'Ecológico', 'Empaques']
  },
  {
    id: 'etiquetas-gin-altiplano',
    aliases: ['gin-altiplano', 'etiquetas-gin'],
    title: 'Etiquetas de Lujo para Gin Botánico Altiplano',
    category: 'diseno',
    categoryLabel: 'Diseño e Identidad',
    client: 'Destilería Andina',
    location: 'Cusco / Lima',
    year: '2026',
    priceEstimate: 'Diseño de etiqueta y supervisión de pre-prensa',
    featuredImage: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: [
      'Canales de Hot Stamping Oro Champagne en capas separadas',
      'Canal de relieve seco en bajo/sobre relieve',
      'Perfil técnico para papel encolado resistente al hielo (Ice Bucket)'
    ],
    technique: 'Diseño de envolvente para botella cónica con corrección de distorsión anamórfica de curvatura.',
    executionTime: '6 días hábiles',
    warranty: 'Certificación técnica con la planta de etiquetado',
    description: 'Etiqueta de autor para destilería artesanal de alta gama. Su diseño integra botánicos nativos con detalles metalizados que captan la luz en barras y licorerías boutique.',
    highlights: [
      'Preparación de capas técnicas exactas para clisés de estampado',
      'Cálculo geométrico para adhesión perfecta sin arrugas',
      'Impacto visual de producto de lujo de exportación'
    ],
    aspectRatioClass: 'aspect-square',
    tags: ['Etiquetas de Lujo', 'Hot Stamping', 'Bebidas', 'Relieve', 'Packaging']
  },
  {
    id: 'campana-publicitaria-digital',
    aliases: ['nova-sport', 'publicidad-digital'],
    title: 'Campaña Publicitaria & Banners E-commerce',
    category: 'diseno',
    categoryLabel: 'Diseño e Identidad',
    client: 'Nova Sport Perú',
    location: 'Lima, Perú',
    year: '2026',
    priceEstimate: 'Pack de piezas digitales multiformato',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: [
      'Archivos PNG/WebP optimizados para carga ultra-rápida',
      'Formatos para Meta Ads (1:1, 9:16), Google Display y TikTok',
      'Plantillas editables en Figma y Photoshop'
    ],
    technique: 'Composición centrada en copywriting de conversión, jerarquía óptica y llamadas a la acción contrastadas.',
    executionTime: '4 días hábiles',
    warranty: 'Formatos probados bajo políticas de pauta publicitaria',
    description: 'Batería de más de 30 creatividades publicitarias para campaña de temporada deportiva, logrando aumentar el CTR y reducir el costo por adquisición de clientes.',
    highlights: [
      'Diseño centrado en captar atención en los primeros 1.5 segundos',
      'Adaptabilidad a todos los dispositivos móviles y pantallas',
      'Archivos ligeros sin pérdida de definición'
    ],
    aspectRatioClass: 'aspect-[16/11]',
    tags: ['Publicidad Digital', 'Redes Sociales', 'E-commerce', 'Banners', 'Digital']
  },
  {
    id: 'bolsas-boutique-serena',
    aliases: ['boutique-serena', 'bolsas-serena'],
    title: 'Bolsas Corporativas & Material POP Serena',
    category: 'diseno',
    categoryLabel: 'Diseño e Identidad',
    client: 'Boutique Serena',
    location: 'San Isidro, Lima',
    year: '2026',
    priceEstimate: 'Diseño estructural y desarrollo de planos',
    featuredImage: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: [
      'Plano mecánico para cartulina couché 250g',
      'Capa de barniz UV sectorizado y plastificado mate',
      'Guías para ojales metálicos y cinta de algodón'
    ],
    technique: 'Diseño de fuelle lateral y refuerzo de base de cartón de 300g para soporte de peso sin deformación.',
    executionTime: '4 días hábiles',
    warranty: 'Archivos certificados para producción en imprenta offset',
    description: 'Desarrollo de packaging para tienda de moda exclusiva. Cada bolsa fue concebida como un objeto de deseo coleccionable que pasea la marca por las calles comerciales.',
    highlights: [
      'Refuerzos estructurales en base y solapas superiores',
      'Elegante contraste entre fondo mate y logotipo con brillo UV',
      'Experiencia de desempaque (unboxing) sofisticada'
    ],
    aspectRatioClass: 'aspect-[3/4]',
    tags: ['Bolsas & POP', 'POP', 'Moda', 'Retail', 'Troqueles']
  },
  {
    id: 'gigantografia-panamericana',
    aliases: ['nexus-valla', 'panel-panamericana'],
    title: 'Gigantografía Gran Formato Vía Panamericana',
    category: 'diseno',
    categoryLabel: 'Diseño e Identidad',
    client: 'Grupo Inmobiliario Nexus',
    location: 'Panamericana Sur, Lima',
    year: '2026',
    priceEstimate: 'Diseño y preparación técnica a escala',
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80'
    ],
    materials: [
      'Archivo maestro a escala 1:10 a 300 DPI (equivalente a 1:1 a 30 DPI)',
      'Perfil de color Fogra39 CMYK calibrado para tintas solventes UV',
      'Guía de demasías de 15cm para confección de bolsillos y templadores'
    ],
    technique: 'Tipografía de alto grosor y contrastes tonales optimizados para lectura periférica de conductores a 80 km/h.',
    executionTime: '3 días hábiles',
    warranty: 'Garantía técnica de cero pixelado en valla monumental',
    description: 'Valla publicitaria exterior de 12x4 metros ubicada en la autopista Panamericana Sur, diseñada para la venta de lotes de playa con número telefónico y web de lectura inmediata.',
    highlights: [
      'Legibilidad óptima comprobada a más de 150 metros de distancia',
      'Márgenes técnicos exactos para estructura metálica y ojales',
      'Colores vivos que no se lavan con la radiación solar'
    ],
    aspectRatioClass: 'aspect-[16/9]',
    tags: ['Gran Formato & Vallas', 'Gigantografías', 'Vallas', 'CMYK', 'Paneles']
  }
];

export function getAllProjects(): ProjectItem[] {
  return ALL_PROJECTS;
}

export function getProjectById(idOrAlias: string): ProjectItem | undefined {
  const cleanId = idOrAlias.toLowerCase().trim();
  return ALL_PROJECTS.find(p => 
    p.id === cleanId || 
    (p.aliases && p.aliases.some(a => a.toLowerCase() === cleanId))
  );
}

export function getRelatedProjects(currentId: string, category: string, limit = 6): ProjectItem[] {
  return ALL_PROJECTS
    .filter(p => p.id !== currentId && p.category === category)
    .slice(0, limit);
}

export interface FilterOption {
  id: string;
  label: string;
  badge?: string;
}

export interface FilterGroup {
  id: string;
  title: string;
  isMulti?: boolean;
  options: FilterOption[];
}

export const GALLERY_FILTER_GROUPS: FilterGroup[] = [
  {
    id: 'category',
    title: 'Servicio Principal',
    isMulti: false,
    options: [
      { id: 'todos', label: 'Todos los Servicios' },
      { id: 'wrap', label: 'Wrap Automotriz' },
      { id: 'branding', label: 'Branding Comercial' },
      { id: 'diseno', label: 'Diseño e Identidad' }
    ]
  },
  {
    id: 'application',
    title: 'Tipo de Aplicación / Proyecto',
    isMulti: true,
    options: [
      { id: 'camionetas', label: 'Camionetas / Pickups' },
      { id: 'flotas', label: 'Flotas Comerciales' },
      { id: 'deportivos', label: 'Autos Deportivos' },
      { id: 'letreros', label: 'Letreros Luminosos' },
      { id: 'fachadas', label: 'Fachadas Comerciales' },
      { id: 'vitrinas', label: 'Vitrinas / Tiendas' },
      { id: 'identidad', label: 'Identidad Corporativa' },
      { id: 'packaging', label: 'Packaging & Etiquetas' },
      { id: 'gigantografias', label: 'Gran Formato & Vallas' }
    ]
  },
  {
    id: 'coverage',
    title: 'Cobertura y Técnica',
    isMulti: true,
    options: [
      { id: 'wrap-total', label: 'Wrap Total' },
      { id: 'rotulado', label: 'Rotulado Comercial' },
      { id: 'corporeo', label: 'Letras Corpóreas 3D' },
      { id: 'neon', label: 'Neón LED' },
      { id: 'esmerilado', label: 'Vinil Esmerilado' },
      { id: 'troquel', label: 'Troquel Digital' }
    ]
  },
  {
    id: 'materials',
    title: 'Materiales Certificados',
    isMulti: true,
    options: [
      { id: 'avery', label: 'Avery Dennison' },
      { id: '3m', label: '3M' },
      { id: 'arlon', label: 'Arlon Graphics' },
      { id: 'acrilico', label: 'Acrílico' },
      { id: 'alucobond', label: 'Alucobond' },
      { id: 'acero', label: 'Acero Inoxidable' }
    ]
  }
];

// Extracción dinámica de tags únicos para el Drawer de Filtros
export function getAllUniqueTags(): { category: string; tags: string[] }[] {
  const categories = [
    { key: 'wrap', label: 'Wrap Automotriz' },
    { key: 'branding', label: 'Branding Comercial' },
    { key: 'diseno', label: 'Diseño e Identidad' }
  ];

  return categories.map(cat => {
    const projectsInCat = ALL_PROJECTS.filter(p => p.category === cat.key);
    const tagSet = new Set<string>();
    projectsInCat.forEach(p => p.tags.forEach(t => tagSet.add(t)));
    return {
      category: cat.label,
      tags: Array.from(tagSet)
    };
  });
}
