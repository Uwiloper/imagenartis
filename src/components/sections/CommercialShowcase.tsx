import React, { useState, useEffect, useRef, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { Truck, Car, Shield, Sparkles, Building2, Store, Film } from 'lucide-react';

export interface CommercialWorkItem {
  id: string;
  tabLabel: string;
  iconType: 'truck' | 'car' | 'shield' | 'roll' | string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  beforeImage: string;
  afterImage: string;
  imageAlt?: string;
  galleryUrl: string;
  galleryBtnText?: string;
  attributes?: { label: string; value: string; detail?: string }[];
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
    id: 'letreros-luminosos',
    tabLabel: 'Letreros Luminosos',
    iconType: 'truck',
    title: 'Letreros Corpóreos 3D & Cajas de Luz',
    subtitle: 'Impacto visual 24/7 con retroiluminación de grado arquitectónico',
    description: 'Diseño y manufactura de cajas de luz, letras corpóreas 3D y sistemas LED de alta visibilidad para fachadas comerciales y recepciones corporativas.',
    features: [
      'Módulos LED Samsung IP67 con retroiluminación indirecta tipo halo',
      'Manufactura de precisión en acero quirúrgico y acrílico fundido',
      'Cableado ignífugo certificado y 100% de cumplimiento normativo INDECI'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Letreros luminosos antes y después',
    galleryUrl: '/portafolio?categoria=letreros',
    galleryBtnText: 'VER TRABAJOS EN GALERIA'
  },
  {
    id: 'interiores-exteriores',
    tabLabel: 'Interiores y Exteriores',
    iconType: 'car',
    title: 'Interiores y Exteriores en ACM',
    subtitle: 'Revestimiento arquitectónico en paneles de aluminio compuesto',
    description: 'Transformación integral de fachadas comerciales y ambientación interior de sedes corporativas con paneles termoformados de alta resistencia climática.',
    features: [
      'Paneles ACM de 4mm con núcleo mineral FR y sellado estructural',
      'Subestructura en tubo electrosoldado con cálculo sismorresistente',
      'Pintura arquitectónica PVDF resistente a radiación UV y salinidad'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Fachadas arquitectónicas en ACM antes y después',
    galleryUrl: '/portafolio?categoria=fachadas',
    galleryBtnText: 'VER TRABAJOS EN GALERIA'
  },
  {
    id: 'senalizaciones',
    tabLabel: 'Señalizaciones',
    iconType: 'shield',
    title: 'Señalizaciones & Wayfinding',
    subtitle: 'Directorios flotantes, tótems y señalética normativa INDECI',
    description: 'Sistemas completos de orientación espacial y directorios para edificios de oficinas, clínicas y centros comerciales, cumpliendo con las normas técnicas peruanas.',
    features: [
      'Directorio modular flotante en acrílico con pernos de acero inoxidable',
      'Señalética de seguridad fotoluminiscente bajo norma NTP 399.010',
      'Levantamiento técnico en obra y mapeo de rutas críticas de evacuación'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Señalizaciones y directorios antes y después',
    galleryUrl: '/portafolio?categoria=senaletica',
    galleryBtnText: 'VER TRABAJOS EN GALERIA'
  },
  {
    id: 'pavonados-arenados',
    tabLabel: 'Pavonados y Arenados',
    iconType: 'roll',
    title: 'Pavonados y Arenados',
    subtitle: 'Privacidad elegante y diseño gráfico para mamparas de vidrio',
    description: 'Películas de vinil esmerilado de alta gama para mamparas de oficinas, salas de reuniones y locales. Diseños continuos o franjas de privacidad personalizadas.',
    features: [
      'Película de vinil esmerilado 3M Dusted Crystal de máxima uniformidad',
      'Bloqueo visual directo conservando hasta un 75% de paso de luz natural',
      'Corte computarizado de alta precisión y remoción limpia sin residuos'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Pavonados y arenados en mamparas de vidrio antes y después',
    galleryUrl: '/portafolio?categoria=vitrinas',
    galleryBtnText: 'VER TRABAJOS EN GALERIA'
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

  const beforeImg = currentWork.beforeImage || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80';
  const afterImg = currentWork.afterImage || (currentWork as any).image || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80';

  // Soporte para features unificadas o atributos de compatibilidad CMS
  const safeFeatures = currentWork.features && currentWork.features.length > 0
    ? currentWork.features
    : currentWork.attributes?.map(a => `${a.label}: ${a.value}`) || [
        'Materiales certificados de alta durabilidad',
        'Ingeniería y manufactura en taller propio',
        'Cumplimiento de estándares técnicos de seguridad'
      ];

  // Al cambiar de tab, ejecutamos animación suave de apertura (de 0% a 50%)
  useEffect(() => {
    setSliderPosition(0);
    const timeout = setTimeout(() => {
      setSliderPosition(50);
    }, 120);
    return () => clearTimeout(timeout);
  }, [safeIndex]);

  // Actualización del sliding pill animado estilo Showcase / Vehicular Services
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

  // Manejo de scroll para la barra de navegación en móvil:
  // - Oculto (hidden con slide out) antes de la sección
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

  const renderIcon = (type: string, className = 'w-4 h-4') => {
    switch (type) {
      case 'truck':
        return <Truck className={className} />;
      case 'car':
        return <Car className={className} />;
      case 'shield':
        return <Shield className={className} />;
      case 'roll':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="7" rx="7" ry="3" />
            <path d="M5 7v10c0 1.66 3.13 3 7 3s7-1.34 7-3V7" />
            <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
          </svg>
        );
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

        {/* Tarjeta Principal Dividida en 2 Columnas con Altura Estandarizada (No salta ni desborda) */}
        <div className="w-full bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-none transition-colors duration-300 md:h-[460px]">
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

              {/* Botón Único Inferior: Ver Trabajos en Galería */}
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
            <div className="lg:col-span-6 relative bg-zinc-950 flex flex-col justify-between overflow-hidden h-[340px] lg:h-full border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800">
              
              <div 
                ref={containerRef}
                className="relative flex-1 w-full h-full overflow-hidden cursor-ew-resize select-none bg-black"
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
                {/* Capa DESPUÉS (Fondo base) */}
                <img 
                  src={afterImg} 
                  alt={`Resultado final - ${currentWork.title}`} 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ease-in"
                  loading="lazy"
                />
                
                {/* Badge DESPUÉS en Rojo Fiel al Boceto */}
                <span className="absolute top-4 right-4 bg-[#EE2737] text-white text-xs font-sans font-bold px-3 py-1 rounded-md z-10 pointer-events-none select-none shadow-none">
                  Después
                </span>

                {/* Capa ANTES recortada con clipPath */}
                <div 
                  className={`absolute inset-0 w-full h-full pointer-events-none ${isDragging ? '' : 'transition-all duration-700 ease-out'}`}
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img 
                    src={beforeImg} 
                    alt={`Estado previo - ${currentWork.title}`} 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                  />
                  
                  {/* Badge ANTES en Rojo Fiel al Boceto */}
                  <span className="absolute top-4 left-4 bg-[#EE2737] text-white text-xs font-sans font-bold px-3 py-1 rounded-md z-10 pointer-events-none select-none shadow-none">
                    Antes
                  </span>
                </div>

                {/* Línea divisoria central con tirador || */}
                <div 
                  className={`absolute top-0 bottom-0 w-[2px] bg-white z-20 flex items-center justify-center pointer-events-none ${isDragging ? '' : 'transition-all duration-700 ease-out'}`}
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="w-9 h-9 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-300 dark:border-zinc-700 pointer-events-auto cursor-grab active:cursor-grabbing select-none shadow-md">
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

        {/* Mini Navbar Animado con Iconos (Estilo Showcase / Vehicular Services) */}
        <div ref={anchorRef} className="relative w-full mt-3 min-h-[48px]">
          <div 
            ref={navRef}
            className={`w-full bg-gray-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800/80 rounded-md p-1 select-none shadow-none flex items-center overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory ${
              // En desktop siempre relativo y ancho completo
              'md:relative md:inset-auto md:w-full md:opacity-100 md:pointer-events-auto md:translate-y-0 ' +
              // En pantallas móviles aplica sticky dock o docked en su posición real con transiciones
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
