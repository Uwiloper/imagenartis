import React, { useState, useEffect, useRef, useCallback, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { 
  PenTool, 
  Layout, 
  Printer, 
  Package, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2 
} from 'lucide-react';

export interface DesignGalleryImage {
  url: string;
  title: string;
  alt: string;
}

export interface DesignWorkItem {
  id: string;
  tabLabel: string;
  iconType: 'brand' | 'digital' | 'print' | 'pack' | string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  images: DesignGalleryImage[];
  galleryUrl: string;
  galleryBtnText?: string;
  attributes?: { label: string; value: string; detail?: string }[];
  beforeImage?: string;
  afterImage?: string;
}

export interface DesignServicesProps {
  badge?: string;
  titleStatic?: string;
  titleHighlight?: string;
  description?: string;
  works?: DesignWorkItem[];
}

export const DEFAULT_DESIGN_WORKS: DesignWorkItem[] = [
  {
    id: 'identidad-branding',
    tabLabel: 'Identidad & Branding',
    iconType: 'brand',
    title: 'Identidad Corporativa & Logotipos',
    subtitle: 'Diseño de sistemas de marca, manual de identidad y papelería',
    description: 'Creación de logotipos memorables y sistemas visuales concebidos para proyectar autoridad, diferenciación y coherencia en todos los puntos de contacto.',
    features: [
      'Manual de identidad con guías de color, tipografía y usos correctos',
      'Paquete completo de archivos editables en curvas (AI, EPS, PDF, SVG)',
      'Aplicaciones básicas: tarjetas personales, hojas membretadas y firmas'
    ],
    galleryUrl: '/portafolio?categoria=branding',
    galleryBtnText: 'VER TRABAJOS EN GALERIA',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
        title: 'Manual de Marca & Papelería Corporativa',
        alt: 'Manual de identidad corporativa y papelería institucional'
      },
      {
        url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
        title: 'Bocetado & Conceptualización de Logotipo',
        alt: 'Proceso de bocetado y trazado vectorial de isotipo'
      },
      {
        url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80',
        title: 'Sistemas Visuales & Tipografía Corporativa',
        alt: 'Selección tipográfica y jerarquía visual de marca'
      },
      {
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        title: 'Guía Normativa & Despliegue de Marca',
        alt: 'Guía de normas gráficas y aplicaciones de marca'
      }
    ]
  },
  {
    id: 'publicidad-digital',
    tabLabel: 'Publicidad & Digital',
    iconType: 'digital',
    title: 'Diseño Publicitario & Redes Sociales',
    subtitle: 'Creatividad visual de alto impacto para campañas comerciales',
    description: 'Desarrollo de piezas publicitarias orientadas a la conversión. Banners promocionales, carruseles de producto y plantillas para Instagram, Facebook y LinkedIn.',
    features: [
      'Formatos optimizados en alta resolución para cada plataforma digital',
      'Jerarquía visual estratégica pensada para captar atención en el scroll',
      'Adaptación a lineamientos de marca y tono de comunicación corporativo'
    ],
    galleryUrl: '/portafolio?categoria=digital',
    galleryBtnText: 'VER TRABAJOS EN GALERIA',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        title: 'Piezas Publicitarias para Pauta Digital',
        alt: 'Diseño publicitario digital y anuncios de alto rendimiento'
      },
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        title: 'Estrategia Visual de Rendimiento Comercial',
        alt: 'Gráficas orientadas a métricas y conversión publicitaria'
      },
      {
        url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
        title: 'Campañas Comerciales & Banners de Conversión',
        alt: 'Banners publicitarios corporativos y banners web'
      },
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        title: 'Composiciones Creativas para Redes Sociales',
        alt: 'Diseño editorial y visual para feed y stories'
      }
    ]
  },
  {
    id: 'gran-formato-impresion',
    tabLabel: 'Gran Formato & Impresión',
    iconType: 'print',
    title: 'Diseño para Gran Formato & Gigantografías',
    subtitle: 'Artes técnicos en escala 1:1 para paneles, vallas y letreros',
    description: 'Preparación milimétrica de archivos gráficos para impresión a gran escala. Paneles carreteros, banderolas, vitrinas y rotulación de estructuras comerciales.',
    features: [
      'Configuración técnica en CMYK con perfiles Fogra para máxima fidelidad',
      'Resolución DPI calibrada según distancia visual para cero pixelado',
      'Demasías y márgenes de sangrado exactos para confección y ojales'
    ],
    galleryUrl: '/portafolio?categoria=impresion',
    galleryBtnText: 'VER TRABAJOS EN GALERIA',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
        title: 'Gigantografías & Paneles Publicitarios CMYK',
        alt: 'Impresión en gran formato para paneles y vallas publicitarias'
      },
      {
        url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
        title: 'Artes en Escala 1:1 & Preparación Técnica',
        alt: 'Planificación de artes a escala real para estructuras de vía pública'
      },
      {
        url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        title: 'Revisión Milimétrica de Sangrías & Perfiles',
        alt: 'Ajuste de color y perfiles técnicos de pre-prensa'
      },
      {
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        title: 'Rotulación & Estructuras Comerciales',
        alt: 'Instalación de gráficas comerciales de gran escala'
      }
    ]
  },
  {
    id: 'packaging-etiquetas',
    tabLabel: 'Packaging & Etiquetas',
    iconType: 'pack',
    title: 'Diseño de Packaging & Material POP',
    subtitle: 'Troqueles, etiquetas y displays para destacar en punto de venta',
    description: 'Diseño estructural y gráfico de etiquetas adhesivas para botellas, empaques plegadizos, bolsas corporativas y displays para góndolas comerciales.',
    features: [
      'Planos de troquel a medida con líneas de corte, hendido y sangría técnica',
      'Preparación de acabados especiales: sectorizado UV, hot stamping y relieve',
      'Asesoría en sustratos: papeles ecológicos, vinil adhesivo y cartulinas'
    ],
    galleryUrl: '/portafolio?categoria=packaging',
    galleryBtnText: 'VER TRABAJOS EN GALERIA',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
        title: 'Diseño Estructural de Empaques & Troqueles',
        alt: 'Empaques de producto y planos de troquel plegadizo'
      },
      {
        url: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=1200&q=80',
        title: 'Etiquetas Comerciales para Botellas & Frascos',
        alt: 'Etiquetas adhesivas en vinil con acabados sectorizados'
      },
      {
        url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
        title: 'Acabados Especiales: Hot Stamping & Relieve',
        alt: 'Diseño de cajas de lujo con aplicaciones metalizadas'
      },
      {
        url: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1200&q=80',
        title: 'Bolsas Corporativas & Material POP',
        alt: 'Bolsas impresas y material promocional para punto de venta'
      }
    ]
  }
];

const AUTOPLAY_INTERVAL = 4000; // 4 segundos de transición automática

export default function DesignServices({
  titleStatic = 'Nuestras especialidades en',
  titleHighlight = 'diseño & producción gráfica',
  description = 'Combinamos creatividad estratégica con rigor técnico de pre-prensa para que tus artes luzcan impecables en pantalla y en papel.',
  works = DEFAULT_DESIGN_WORKS
}: DesignServicesProps) {
  const safeWorks = works && works.length > 0 ? works : DEFAULT_DESIGN_WORKS;
  const [activeTab, setActiveTab] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Estados del Mini Modal / Lightbox
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  // Estados de navegación móvil y barrita
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [mobileNavState, setMobileNavState] = useState<'hidden' | 'sticky' | 'docked'>('hidden');

  const sectionRef = useRef<HTMLElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);

  const safeIndex = Math.min(Math.max(0, activeTab), safeWorks.length - 1);
  const currentWork = safeWorks[safeIndex];

  // Imágenes seguras de la especialidad actual
  const currentImages: DesignGalleryImage[] = (currentWork.images && currentWork.images.length > 0)
    ? currentWork.images
    : [
        {
          url: currentWork.afterImage || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
          title: currentWork.title,
          alt: currentWork.title
        }
      ];

  const safeImageIndex = Math.min(Math.max(0, activeImageIndex), currentImages.length - 1);
  const activeImage = currentImages[safeImageIndex];

  const safeFeatures = currentWork.features && currentWork.features.length > 0
    ? currentWork.features
    : currentWork.attributes?.map(a => `${a.label}: ${a.value}`) || [
        'Archivos 100% vectoriales y escalables',
        'Preparación técnica lista para imprenta',
        'Entrega de manual de uso y tipografías'
      ];

  // Cambio de pestaña de servicio: reiniciar imagen activa y barra de progreso
  useEffect(() => {
    setActiveImageIndex(0);
    setProgress(0);
  }, [safeIndex]);

  // Temporizador de Autoplay con barra de progreso para las fotos chiquitas
  useEffect(() => {
    if (isPaused || isModalOpen) return;

    const intervalStep = 50; // ms
    const totalSteps = AUTOPLAY_INTERVAL / intervalStep;
    const progressIncrement = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setActiveImageIndex(oldIdx => (oldIdx + 1) % currentImages.length);
          return 0;
        }
        return prev + progressIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused, isModalOpen, currentImages.length, safeImageIndex]);

  // Selección manual de miniatura: cambia la foto y reinicia el timer inmediatamente
  const handleSelectThumbnail = (index: number) => {
    setActiveImageIndex(index);
    setProgress(0);
  };

  // Abrir Lightbox en la foto seleccionada
  const openModal = (index: number) => {
    setModalImageIndex(index);
    setIsZoomed(false);
    setZoomOrigin({ x: 50, y: 50 });
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Cerrar Lightbox y sincronizar la foto activa con la tarjeta
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsZoomed(false);
    setActiveImageIndex(modalImageIndex);
    setProgress(0);
    document.body.style.overflow = '';
  }, [modalImageIndex]);

  // Navegación dentro del Lightbox
  const handleModalPrev = useCallback((e?: ReactMouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setModalImageIndex(prev => (prev - 1 + currentImages.length) % currentImages.length);
  }, [currentImages.length]);

  const handleModalNext = useCallback((e?: ReactMouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setModalImageIndex(prev => (prev + 1) % currentImages.length);
  }, [currentImages.length]);

  // Toggle de zoom con cálculo de coordenadas del clic
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

  // Atajos de teclado para el Lightbox (ESC, flechas izquierda/derecha, Z)
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        handleModalPrev();
      } else if (e.key === 'ArrowRight') {
        handleModalNext();
      } else if (e.key === 'z' || e.key === 'Z') {
        setIsZoomed(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal, handleModalPrev, handleModalNext]);

  // Sliding pill animado de la barrita inferior
  const updatePill = () => {
    if (navRef.current) {
      const activeBtn = navRef.current.querySelector(`[data-id="${safeWorks[safeIndex]?.id}"]`) as HTMLButtonElement;
      if (activeBtn) {
        setPillStyle({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          opacity: 1
        });
        const scrollLeft = activeBtn.offsetLeft - navRef.current.offsetWidth / 2 + activeBtn.offsetWidth / 2;
        navRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    updatePill();
    const frame = requestAnimationFrame(updatePill);
    return () => cancelAnimationFrame(frame);
  }, [safeIndex, mobileNavState]);

  useEffect(() => {
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [safeIndex]);

  // Manejo de scroll para la barra de navegación en móvil:
  // - Oculto (hidden) antes de la sección
  // - Flotante inferior (sticky) durante el scroll por la sección
  // - Acoplado (docked) en su posición real al pie de la tarjeta
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !anchorRef.current) return;
      const sRect = sectionRef.current.getBoundingClientRect();
      const aRect = anchorRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      const isSectionInView = sRect.top < vh - 60 && sRect.bottom > 60;

      if (!isSectionInView) {
        setMobileNavState('hidden');
      } else if (aRect.bottom <= vh - 12) {
        setMobileNavState('docked');
      } else {
        setMobileNavState('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const renderIcon = (type: string, className = 'w-4 h-4') => {
    switch (type) {
      case 'brand':
        return <PenTool className={className} />;
      case 'digital':
        return <Layout className={className} />;
      case 'print':
        return <Printer className={className} />;
      case 'pack':
        return <Package className={className} />;
      default:
        return <PenTool className={className} />;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="servicios-diseno" 
      className="relative py-16 md:py-24 bg-white dark:bg-zinc-950 transition-colors duration-300 border-t border-zinc-200 dark:border-zinc-800/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Proporcional (Sin Badge principal) */}
        {(titleStatic || titleHighlight) && (
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.2]">
              {titleStatic} <span className="text-[#EE2737]">{titleHighlight}</span>
            </h2>
            {description && (
              <p className="mt-2 text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Tarjeta Principal Dividida en 2 Columnas con Altura Estandarizada (md:h-[480px]) */}
        <div className="w-full bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-none transition-colors duration-300 md:h-[480px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch h-full">
            
            {/* Columna Izquierda: Información Editorial Estandarizada */}
            <div className="lg:col-span-6 p-6 sm:p-8 md:p-9 flex flex-col justify-between h-full bg-white dark:bg-zinc-900 transition-colors duration-300">
              <div>
                
                {/* Título Principal de la Línea */}
                <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white tracking-tight leading-snug mb-1 line-clamp-1">
                  {currentWork.title}
                </h3>
                
                {/* Subtítulo en Rojo Primario */}
                <p className="text-xs sm:text-sm font-sans font-semibold text-[#EE2737] mb-3 leading-tight line-clamp-1">
                  {currentWork.subtitle}
                </p>

                {/* Descripción Breve de Altura Homogénea */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed mb-6 h-12 sm:h-11 line-clamp-2">
                  {currentWork.description}
                </p>

                {/* 3 Viñetas con Checkmark Rojo */}
                <ul className="space-y-3 mb-6">
                  {safeFeatures.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-snug">
                      <span className="text-[#EE2737] font-bold shrink-0 mt-0.5 text-sm select-none">
                        ✓
                      </span>
                      <span className="line-clamp-1 sm:line-clamp-2">{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Botón Inferior: Ver Trabajos en Galería */}
              <div className="pt-2">
                <a
                  href={currentWork.galleryUrl}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm border border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-white text-zinc-900 dark:text-white bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/60 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 select-none shadow-none text-center"
                >
                  <span>{currentWork.galleryBtnText || 'VER TRABAJOS EN GALERIA'}</span>
                  <span className="text-sm leading-none transition-transform duration-200 hover:translate-x-0.5">↗</span>
                </a>
              </div>

            </div>

            {/* Columna Derecha: Foto Principal Interactiva + Miniaturas con Autoplay y Timer */}
            <div 
              className="lg:col-span-6 relative bg-zinc-950 flex flex-col justify-between overflow-hidden h-[390px] lg:h-full border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 select-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              
              {/* 1. Foto Principal Grande con Botón de Ampliar */}
              <div 
                onClick={() => openModal(safeImageIndex)}
                className="relative flex-1 w-full overflow-hidden cursor-pointer group bg-black"
                title="Haz clic para ver de cerca y hacer zoom"
              >
                <img 
                  key={activeImage.url}
                  src={activeImage.url} 
                  alt={activeImage.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Viñeta sutil de contraste */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"></div>

                {/* Badge Superior Izquierdo: Contador de fotos */}
                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2 px-2.5 py-1 rounded-sm bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EE2737] animate-pulse"></span>
                  <span>{String(safeImageIndex + 1).padStart(2, '0')} / {String(currentImages.length).padStart(2, '0')}</span>
                </div>

                {/* Badge Superior Derecho: Clic para Ampliar */}
                <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black/60 group-hover:bg-[#EE2737] backdrop-blur-md border border-white/10 text-white font-sans text-xs font-semibold tracking-wide transition-all duration-300">
                  <Maximize2 size={13} />
                  <span className="hidden sm:inline">Ver de cerca</span>
                </div>

                {/* Pie de Foto Principal */}
                <div className="absolute bottom-3 left-4 right-4 z-10 pointer-events-none">
                  <p className="text-xs sm:text-sm font-sans font-semibold text-white truncate drop-shadow-md">
                    {activeImage.title}
                  </p>
                </div>
              </div>

              {/* 2. Miniaturas Inferiores con Temporizador y Reseteo al Clic */}
              <div className="p-2 sm:p-2.5 bg-zinc-950/95 border-t border-zinc-800/80 flex items-center gap-2">
                {currentImages.map((img, idx) => {
                  const isActive = idx === safeImageIndex;
                  return (
                    <button
                      key={img.url + idx}
                      type="button"
                      onClick={() => handleSelectThumbnail(idx)}
                      className={`relative flex-1 h-13 sm:h-15 rounded-sm overflow-hidden transition-all duration-200 cursor-pointer select-none group border ${
                        isActive
                          ? 'border-[#EE2737] ring-1 ring-[#EE2737]/40 opacity-100 scale-[1.02]'
                          : 'border-white/10 opacity-55 hover:opacity-95 hover:border-white/30'
                      }`}
                      title={img.title}
                    >
                      <img 
                        src={img.url} 
                        alt={img.alt}
                        className="w-full h-full object-cover object-center pointer-events-none"
                        loading="lazy"
                      />

                      {/* Barrita de Progreso del Timer en la Miniatura Activa */}
                      {isActive && (
                        <div 
                          className="absolute bottom-0 left-0 h-[2.5px] bg-[#EE2737] transition-all duration-75 pointer-events-none z-10"
                          style={{ width: `${progress}%` }}
                        />
                      )}

                      {/* Indicador numérico tenue */}
                      <span className={`absolute top-1 left-1 font-mono text-[9px] font-bold px-1 rounded-xs backdrop-blur-xs ${
                        isActive ? 'bg-[#EE2737] text-white' : 'bg-black/60 text-zinc-300'
                      }`}>
                        0{idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

          </div>
        </div>

        {/* Mini Navbar Animado con Iconos (Estilo Showcase / Vehicular Services) */}
        <div ref={anchorRef} className="relative w-full mt-3 min-h-[48px]">
          <div 
            ref={navRef}
            className={`w-full bg-gray-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800/80 rounded-md p-1 select-none shadow-none flex items-center overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory ${
              'md:relative md:inset-auto md:w-full md:opacity-100 md:pointer-events-auto md:translate-y-0 ' +
              (mobileNavState === 'sticky'
                ? 'fixed bottom-4 inset-x-3 z-40 max-w-lg mx-auto opacity-100 pointer-events-auto shadow-2xl ring-1 ring-black/10 dark:ring-white/10 translate-y-0 transition-all duration-300 ease-out'
                : mobileNavState === 'docked'
                ? 'relative inset-auto w-full opacity-100 pointer-events-auto translate-y-0 transition-all duration-300 ease-out'
                : 'fixed bottom-4 inset-x-3 z-40 max-w-lg mx-auto opacity-0 pointer-events-none translate-y-4 transition-all duration-300 ease-in')
            }`}
          >
            {/* Sliding Pill animado en rojo (#EE2737) */}
            <div 
              className="absolute top-1 bottom-1 bg-[#EE2737] rounded-md transition-all duration-300 ease-out pointer-events-none"
              style={{ 
                left: pillStyle.left, 
                width: pillStyle.width, 
                opacity: pillStyle.opacity 
              }}
            />

            {safeWorks.map((work, index) => {
              const isActive = index === safeIndex;
              return (
                <button
                  key={work.id}
                  data-id={work.id}
                  onClick={() => setActiveTab(index)}
                  type="button"
                  className={`relative z-10 flex-1 shrink-0 md:shrink flex items-center justify-center gap-2 py-2.5 px-4 sm:px-3 rounded-md text-xs sm:text-sm font-sans transition-colors duration-300 cursor-pointer select-none whitespace-nowrap snap-center ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium'
                  }`}
                >
                  <span className="shrink-0">{renderIcon(work.iconType, 'w-4 h-4')}</span>
                  <span>{work.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. Mini Modal / Lightbox con Zoom, Flechas y Navegación ("Bien UX") */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-200"
          onClick={closeModal}
        >
          {/* Barra Superior del Modal */}
          <div 
            className="w-full flex items-center justify-between px-4 sm:px-8 py-4 border-b border-zinc-800 bg-black/50 backdrop-blur-md z-30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Info y Contador */}
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-sm bg-[#EE2737] text-white font-mono text-xs font-bold uppercase">
                {String(modalImageIndex + 1).padStart(2, '0')} / {String(currentImages.length).padStart(2, '0')}
              </span>
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-white truncate max-w-[200px] sm:max-w-md">
                  {currentImages[modalImageIndex]?.title || currentWork.title}
                </h4>
                <p className="text-xs text-zinc-400 hidden sm:block font-sans">
                  {currentWork.title}
                </p>
              </div>
            </div>

            {/* Controles: Zoom y Cerrar */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setIsZoomed(prev => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-zinc-800 hover:bg-zinc-700 text-white font-sans text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                title={isZoomed ? 'Restablecer vista 100%' : 'Hacer zoom al 200%'}
              >
                {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
                <span className="hidden sm:inline">{isZoomed ? 'Restablecer' : 'Zoom 2x'}</span>
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 rounded-sm bg-zinc-800 hover:bg-[#EE2737] text-white transition-colors cursor-pointer"
                title="Cerrar modal (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Área Central: Flechas y Visor con Zoom */}
          <div 
            className="relative flex-1 w-full flex items-center justify-center overflow-hidden p-2 sm:p-6"
            onClick={closeModal}
            onTouchStart={(e) => {
              touchStartRef.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartRef.current === null) return;
              const touchEnd = e.changedTouches[0].clientX;
              const diff = touchStartRef.current - touchEnd;
              if (diff > 50) handleModalNext();
              if (diff < -50) handleModalPrev();
              touchStartRef.current = null;
            }}
          >
            {/* Flecha Izquierda */}
            <button
              type="button"
              onClick={handleModalPrev}
              className="absolute left-3 sm:left-8 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-900/80 hover:bg-[#EE2737] border border-white/10 text-white flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
              title="Foto anterior (←)"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Contenedor de la Imagen con Zoom */}
            <div 
              className={`relative max-w-5xl max-h-[70vh] sm:max-h-[76vh] flex items-center justify-center overflow-hidden rounded-md transition-all duration-300 ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={handleToggleZoom}
            >
              <img 
                src={currentImages[modalImageIndex]?.url} 
                alt={currentImages[modalImageIndex]?.alt}
                style={{
                  transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`
                }}
                className={`max-w-full max-h-[70vh] sm:max-h-[76vh] object-contain rounded-md transition-transform duration-300 ease-out select-none ${
                  isZoomed ? 'scale-[2.1]' : 'scale-100'
                }`}
              />
            </div>

            {/* Flecha Derecha */}
            <button
              type="button"
              onClick={handleModalNext}
              className="absolute right-3 sm:right-8 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-900/80 hover:bg-[#EE2737] border border-white/10 text-white flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
              title="Foto siguiente (→)"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Tira Inferior: Miniaturas en el Modal + Indicaciones de Teclado */}
          <div 
            className="w-full border-t border-zinc-800 bg-black/60 backdrop-blur-md px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 z-30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lista de Miniaturas Horizontales */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto w-full sm:w-auto">
              {currentImages.map((img, idx) => {
                const isActive = idx === modalImageIndex;
                return (
                  <button
                    key={'modal-thumb-' + idx}
                    type="button"
                    onClick={() => {
                      setIsZoomed(false);
                      setModalImageIndex(idx);
                    }}
                    className={`relative w-14 h-10 sm:w-16 sm:h-11 rounded-sm overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'border-[#EE2737] ring-1 ring-[#EE2737]/50 scale-105 opacity-100' 
                        : 'border-transparent opacity-50 hover:opacity-90'
                    }`}
                    title={img.title}
                  >
                    <img 
                      src={img.url} 
                      alt={img.alt} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Atajos de Teclado */}
            <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono text-zinc-400">
              <span>← / → Cambiar foto</span>
              <span>•</span>
              <span>Clic: Zoom</span>
              <span>•</span>
              <span>ESC: Cerrar</span>
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
