import React, { useState, useEffect, useRef, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { Sparkles, Building2, Store, Signpost, Box } from 'lucide-react';

export interface CommercialAttribute {
  label: string;
  value: string;
  detail?: string;
}

export interface CommercialWorkItem {
  id: string;
  tabLabel: string;
  iconType: 'light' | 'facade' | 'retail' | 'sign' | 'box';
  title: string;
  subtitle: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  imageAlt?: string;
  attributes: CommercialAttribute[];
  galleryUrl: string;
  galleryBtnText?: string;
}

export interface CommercialShowcaseProps {
  badge?: string;
  titleStatic?: string;
  titleHighlight?: string;
  description?: string;
  works?: CommercialWorkItem[];
}

export const DEFAULT_COMMERCIAL_WORKS: CommercialWorkItem[] = [
  {
    id: 'letreros-3d',
    tabLabel: 'Letreros Luminosos & 3D',
    iconType: 'light',
    title: 'Letreros Corpóreos 3D & Cajas de Luz',
    subtitle: 'Impacto visual 24/7 con retroiluminación de grado arquitectónico',
    description: 'Diseño y manufactura de letras en bloque macizo, acrílico con relieve, acero quirúrgico pulido y sistemas de retroiluminación indirecta tipo halo. Ideales para fachadas comerciales, recepciones y centros comerciales.',
    beforeImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Transformación antes y después: fachada comercial previa vs letrero 3D retroiluminado',
    attributes: [
      {
        label: 'Tecnología Lumínica',
        value: 'Módulos LED Samsung IP67',
        detail: 'Bajo consumo 12V con vida útil superior a 50,000 horas'
      },
      {
        label: 'Material Estructural',
        value: 'Acero Quirúrgico / Acrílico Cast',
        detail: 'Corte láser CNC con soldadura TIG invisible de precisión'
      },
      {
        label: 'Resistencia Climática',
        value: 'Sellado Hermético Anti-Humedad',
        detail: 'Tratamiento anticorrosivo para el litoral costero peruano'
      },
      {
        label: 'Normativa & Seguridad',
        value: '100% Aprobación INDECI',
        detail: 'Cableado ignífugo libre de halógenos y fuentes certificadas'
      }
    ],
    galleryUrl: '/portafolio?categoria=letreros',
    galleryBtnText: 'VER LETREROS EN GALERIA'
  },
  {
    id: 'fachadas-acm',
    tabLabel: 'Fachadas en ACM',
    iconType: 'facade',
    title: 'Fachadas Arquitectónicas en ACM',
    subtitle: 'Revestimiento integral con paneles de aluminio compuesto de alta durabilidad',
    description: 'Transformación radical de exteriores comerciales. Estructura interna de tubo negro estructural y paneles ACM termoformados con acabado mate o metalizado, otorgando una imagen corporativa sólida y moderna.',
    beforeImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Transformación antes y después: edificación previa vs fachada integral en paneles de ACM',
    attributes: [
      {
        label: 'Material de Panel',
        value: 'ACM Núcleo Mineral FR',
        detail: '4mm de espesor con lámina de aluminio de alta resistencia'
      },
      {
        label: 'Subestructura',
        value: 'Tubo Estructural Electrosoldado',
        detail: 'Anclajes mecánicos con cálculo estructural sismorresistente'
      },
      {
        label: 'Acabado Superficial',
        value: 'Pintura PVDF Anti-Decoloración',
        detail: 'Garantía de 10 años sin pérdida de brillo ni pigmento'
      },
      {
        label: 'Ingeniería de Juntas',
        value: 'Sellado de Silicona Estructural',
        detail: 'Juntas de dilatación que absorben movimientos térmicos'
      }
    ],
    galleryUrl: '/portafolio?categoria=fachadas',
    galleryBtnText: 'VER FACHADAS EN GALERIA'
  },
  {
    id: 'vitrinas-pavonado',
    tabLabel: 'Vitrinas Retail & Pavonado',
    iconType: 'retail',
    title: 'Branding de Vitrinas & Vinil Pavonado',
    subtitle: 'Privacidad elegante y branding gráfico para retail y oficinas corporativas',
    description: 'Cortes computarizados de vinil esmerilado tipo arenado, microperforado para escaparates comerciales y gráfica publicitaria de alta resolución para mamparas y salas de directorio.',
    beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Transformación antes y después: mamparas transparentes vs mamparas con vinil pavonado de diseño',
    attributes: [
      {
        label: 'Película Principal',
        value: 'Vinil Esmerilado 3M Dusted Crystal',
        detail: 'Textura traslúcida uniforme con excelente dispersión de luz'
      },
      {
        label: 'Transmisión de Luz',
        value: '75% Paso de Luz / 100% Privacidad',
        detail: 'No oscurece los ambientes interiores ni genera sombras'
      },
      {
        label: 'Corte Computarizado',
        value: 'Plotter Graphtec de Alta Precisión',
        detail: 'Corte fino de logotipos, franjas y tramas personalizadas'
      },
      {
        label: 'Adhesivo Técnico',
        value: 'Tecnología Libre de Burbujas',
        detail: 'Removible sin dejar residuos pegajosos sobre el cristal'
      }
    ],
    galleryUrl: '/portafolio?categoria=vitrinas',
    galleryBtnText: 'VER VITRINAS EN GALERIA'
  },
  {
    id: 'senaletica-corporativa',
    tabLabel: 'Señalética & Wayfinding',
    iconType: 'sign',
    title: 'Señalética Arquitectónica & Wayfinding',
    subtitle: 'Sistemas de orientación espacial, directorios y señalética 100% normada INDECI',
    description: 'Soluciones completas de señalética interna y externa: directorios flotantes en acrílico, tótems de ingreso, placas corpóreas y señalización de evacuación fotoluminiscente conforme a normas técnicas peruanas.',
    beforeImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Transformación antes y después: pasillo sin señalización vs señalética arquitectónica y wayfinding',
    attributes: [
      {
        label: 'Directorio General',
        value: 'Acrílico Flotante con Separadores',
        detail: 'Diseño modular con pernos de acero para actualización sencilla'
      },
      {
        label: 'Señales de Seguridad',
        value: 'Vinil Fotoluminiscente Normado',
        detail: 'Visibles en casos de corte de energía conforme a NTP 399.010'
      },
      {
        label: 'Identificación de Áreas',
        value: 'Placas Corpóreas & Pictogramas',
        detail: 'Diseñadas bajo la identidad gráfica exacta de la empresa'
      },
      {
        label: 'Levantamiento Técnico',
        value: 'Mapeo de Rutas & Puntos Críticos',
        detail: 'Inspección previa in situ para definir ubicaciones óptimas'
      }
    ],
    galleryUrl: '/portafolio?categoria=senaletica',
    galleryBtnText: 'VER SEÑALÉTICA EN GALERIA'
  },
  {
    id: 'stands-modulos',
    tabLabel: 'Stands & Espacios de Marca',
    iconType: 'box',
    title: 'Stands para Ferias & Módulos Comerciales',
    subtitle: 'Presencia de marca memorable en eventos, centros comerciales y exposiciones',
    description: 'Fabricación y acondicionamiento gráfico de módulos de atención, counters publicitarios, backings fotográficos y stands desmontables para ferias comerciales y lanzamientos de producto.',
    beforeImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Transformación antes y después: área ferial vacía vs stand comercial terminado y equipado',
    attributes: [
      {
        label: 'Estructura Modular',
        value: 'Aluminio & Madera Laqueada',
        detail: 'Sistemas encastrables de fácil transporte, montaje y desmontaje'
      },
      {
        label: 'Impresión Gráfica',
        value: 'Tensado en Tela / Backing Rígido',
        detail: 'Resolución fotográfica sin reflejos molestos para cámaras'
      },
      {
        label: 'Puntos de Atención',
        value: 'Counters con Vinil Laminado',
        detail: 'Resistentes al alto tráfico con almacenamiento interior con llave'
      },
      {
        label: 'Logística de Eventos',
        value: 'Entrega Llave en Mano',
        detail: 'Nos encargamos del transporte, armado y desarmado post-feria'
      }
    ],
    galleryUrl: '/portafolio?categoria=stands',
    galleryBtnText: 'VER STANDS EN GALERIA'
  }
];

export default function CommercialShowcase({
  titleStatic = 'Nuestras soluciones en',
  titleHighlight = 'branding comercial & espacios',
  description = 'Cada proyecto es fabricado a medida en nuestro taller propio, combinando precisión técnica, materiales nobles y cumplimiento normativo.',
  works = DEFAULT_COMMERCIAL_WORKS
}: CommercialShowcaseProps) {
  const safeWorks = works && works.length > 0 ? works : DEFAULT_COMMERCIAL_WORKS;
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [mobileNavState, setMobileNavState] = useState<'hidden' | 'sticky' | 'docked'>('hidden');

  const sectionRef = useRef<HTMLElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const safeIndex = Math.min(Math.max(0, activeTab), safeWorks.length - 1);
  const currentWork = safeWorks[safeIndex];

  const beforeImg = currentWork.beforeImage || 'https://images.unsplash.com/photo-1517502166878-34c979606132?q=80&w=1200&auto=format&fit=crop';
  const afterImg = currentWork.afterImage || (currentWork as any).image || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80';

  // Al cambiar de tab, reiniciamos suavemente el slider a 50%
  useEffect(() => {
    setSliderPosition(0);
    const timeout = setTimeout(() => {
      setSliderPosition(50);
    }, 120);
    return () => clearTimeout(timeout);
  }, [safeIndex]);

  // Actualización del sliding pill (estilo Showcase / Vehicular Services)
  const updatePill = () => {
    if (navRef.current) {
      const activeBtn = navRef.current.querySelector(`[data-id="${safeWorks[safeIndex]?.id}"]`) as HTMLButtonElement;
      if (activeBtn) {
        setPillStyle({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          opacity: 1
        });
        // En móvil centrar suavemente el botón activo
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

  // Manejo de scroll para el mini-navbar en móvil (formato estricto vehicular services)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !anchorRef.current) return;
      const sRect = sectionRef.current.getBoundingClientRect();
      const aRect = anchorRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      const isSectionInView = sRect.top < vh - 60 && sRect.bottom > 40;

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

  // Lógica de arrastre interactivo del Antes y Después
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: ReactTouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  const renderIcon = (type: CommercialWorkItem['iconType'], className = 'w-4 h-4') => {
    switch (type) {
      case 'light':
        return <Sparkles className={className} />;
      case 'facade':
        return <Building2 className={className} />;
      case 'retail':
        return <Store className={className} />;
      case 'sign':
        return <Signpost className={className} />;
      case 'box':
        return <Box className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="showcase-comercial" 
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

        {/* Tarjeta Principal Dividida en 2 Columnas (Fiel al formato estricto de vehicular services) */}
        <div className="w-full bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-none transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[440px]">
            
            {/* Columna Izquierda: Información Editorial y Atributos Más Destacables */}
            <div className="lg:col-span-6 p-6 sm:p-8 md:p-9 flex flex-col justify-between bg-white dark:bg-zinc-900 transition-colors duration-300">
              <div>
                
                {/* Título Principal de la Línea */}
                <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white tracking-tight leading-snug mb-1">
                  {currentWork.title}
                </h3>
                
                {/* Subtítulo en Rojo Primario */}
                <p className="text-xs sm:text-sm font-sans font-semibold text-[#EE2737] mb-3 leading-tight">
                  {currentWork.subtitle}
                </p>

                {/* Descripción Concisa */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed mb-5">
                  {currentWork.description}
                </p>

                {/* Grilla 2x2 de Atributos Más Destacables */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {currentWork.attributes.map((attr, idx) => (
                    <div 
                      key={idx}
                      className="p-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 transition-colors"
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400 mb-0.5">
                        {attr.label}
                      </div>
                      <div className="text-xs sm:text-sm font-sans font-bold text-zinc-900 dark:text-white leading-tight">
                        {attr.value}
                      </div>
                      {attr.detail && (
                        <div className="text-[11px] font-sans text-zinc-600 dark:text-zinc-400 mt-0.5 leading-snug">
                          {attr.detail}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>

              {/* Botón Único Inferior: Ver Trabajos en Galería (Fiel al formato estricto de vehicular services) */}
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

            {/* Columna Derecha: Showcase Interactivo de Antes y Después */}
            <div className="lg:col-span-6 relative bg-zinc-950 flex flex-col justify-between overflow-hidden min-h-[320px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800">
              
              <div 
                ref={containerRef}
                className="relative flex-1 w-full h-full min-h-[320px] overflow-hidden cursor-ew-resize select-none bg-black"
                onMouseDown={(e) => {
                  setIsDragging(true);
                  handleMove(e.clientX);
                }}
                onMouseMove={handleMouseMove}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onTouchStart={(e) => {
                  setIsDragging(true);
                  handleMove(e.touches[0].clientX);
                }}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => setIsDragging(false)}
              >
                {/* Capa DESPUÉS (Base de fondo) */}
                <img 
                  src={afterImg} 
                  alt={`Resultado final - ${currentWork.title}`} 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ease-in"
                  loading="lazy"
                />
                <span className="absolute top-4 right-4 bg-[#EE2737] text-white text-[11px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-sm z-10 pointer-events-none select-none">
                  Después
                </span>

                {/* Capa ANTES recortada con clipPath */}
                <div 
                  className={`absolute inset-0 w-full h-full pointer-events-none ${isDragging ? '' : 'transition-all duration-300 ease-out'}`}
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img 
                    src={beforeImg} 
                    alt={`Estado previo - ${currentWork.title}`} 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-xs text-white text-[11px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-sm z-10 pointer-events-none select-none border border-white/10">
                    Antes
                  </span>
                </div>

                {/* Línea divisoria central con tirador */}
                <div 
                  className={`absolute top-0 bottom-0 w-[2px] bg-white z-20 flex items-center justify-center pointer-events-none ${isDragging ? '' : 'transition-all duration-300 ease-out'}`}
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="w-9 h-9 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-300 dark:border-zinc-700 pointer-events-auto cursor-grab active:cursor-grabbing select-none">
                    <div className="flex gap-[3px]">
                      <div className="w-[2px] h-[12px] bg-zinc-500 rounded-sm"></div>
                      <div className="w-[2px] h-[12px] bg-zinc-500 rounded-sm"></div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Mini Navbar Animado con Iconos (Estilo Vehicular Services con ancho alineado a la tarjeta) */}
        <div ref={anchorRef} className="relative w-full mt-3 min-h-[48px]">
          <div 
            ref={navRef}
            className={`w-full bg-gray-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800/80 rounded-md p-1 transition-all duration-300 select-none shadow-none flex items-center overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory ${
              // En pantallas medianas y grandes siempre en su posición real (relativo y ancho completo)
              'md:relative md:inset-auto md:w-full md:opacity-100 md:pointer-events-auto ' +
              // En pantallas móviles aplica sticky dock o docked en su posición real
              (mobileNavState === 'sticky'
                ? 'fixed bottom-4 inset-x-3 z-40 max-w-lg mx-auto opacity-100 pointer-events-auto shadow-xl ring-1 ring-black/10 dark:ring-white/10'
                : mobileNavState === 'docked'
                ? 'relative inset-auto w-full opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none fixed bottom-4 inset-x-3 z-40 max-w-lg mx-auto')
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
                  className={`relative z-10 flex-1 shrink-0 md:shrink flex items-center justify-center gap-2 py-2.5 px-3.5 sm:px-3 rounded-md text-xs sm:text-sm font-sans transition-colors duration-300 cursor-pointer select-none whitespace-nowrap snap-center ${
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
