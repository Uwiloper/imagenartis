import React, { useState, useEffect, useRef } from 'react';
import { Truck, Car, ShieldCheck, Shield, Sun, Film, Check, ExternalLink } from 'lucide-react';

export interface VehicularServiceItem {
  id: string;
  tabLabel: string;
  iconType: 'truck' | 'car' | 'ppf' | 'shield' | 'polarizado';
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  galleryUrl: string;
  galleryBtnText?: string;
  quoteUrl?: string;
  quoteBtnText?: string;
  videoUrl?: string;
  fallbackImage: string;
  imageAlt?: string;
}

export interface VehicularServicesProps {
  badge?: string;
  titleStatic?: string;
  titleHighlight?: string;
  description?: string;
  services?: VehicularServiceItem[];
}

export const DEFAULT_VEHICULAR_SERVICES: VehicularServiceItem[] = [
  {
    id: 'corporativo',
    tabLabel: 'Corporativo para flotas',
    iconType: 'truck',
    title: 'Vinil Corporativo para Flotas',
    subtitle: 'Uniformidad comercial y rotulado publicitario de alto impacto',
    description: 'Desarrollamos e implementamos branding vehicular a gran escala para furgonetas, camiones de reparto y flotas comerciales. Diseñado sobre plantillas a escala milimétrica para garantizar uniformidad corporativa y resistencia extrema al trabajo continuo.',
    features: [
      'Adaptación precisa a las plantillas técnicas de cada fabricante vehicular',
      'Laminado protector UV de grado industrial resistente a hidrolavado',
      'Cronograma coordinado por turnos para no frenar tu operación comercial'
    ],
    galleryUrl: '/portafolio?categoria=flotas',
    galleryBtnText: 'VER TRABAJOS EN GALERIA',
    quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Vinil%20Corporativo%20para%20Flotas%20Comerciales',
    quoteBtnText: 'Cotizar Flota',
    videoUrl: '/videos/fondo-hero.mp4',
    fallbackImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Flota de vehículos comerciales rotulados con vinil corporativo'
  },
  {
    id: 'wrap',
    tabLabel: 'Wrap',
    iconType: 'car',
    title: 'Vinil Automotriz al Gusto del Cliente',
    subtitle: 'Cambio de color integral o por piezas con acabados exclusivos',
    description: 'Transforma la estética de tu auto según tu estilo personal sin alterar la pintura original. Contamos con acabados satinados, mate profundo, ultra gloss brillante, tornasol y fibra de carbono con remates invisibles sin cortes en carrocería.',
    features: [
      'Desmontaje minucioso de manijas, ópticas y molduras para remates ocultos',
      'Películas 3M Serie 2080 y Avery Supreme Wrap con canales anti-burbujas',
      'Protege la pintura original de fábrica preservando el valor de reventa'
    ],
    galleryUrl: '/portafolio?categoria=wrap-personalizado',
    galleryBtnText: 'VER TRABAJOS EN GALERIA',
    quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Vinil%20Automotriz%20Personalizado%20(Cambio%20de%20Color)',
    quoteBtnText: 'Cotizar Wrap',
    videoUrl: '/videos/fondo-hero.mp4',
    fallbackImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Auto de lujo con wrap automotriz personalizado en acabado negro satinado'
  },
  {
    id: 'ppf',
    tabLabel: 'PPF',
    iconType: 'ppf',
    title: 'Protección PPF (Paint Protection Film)',
    subtitle: 'Escudo invisible de uretano óptico autorregenerable',
    description: 'La máxima protección contra piedras de carretera, gravilla, raspaduras de estacionamiento y radiación solar. Película transparente de poliuretano de alta tecnología que absorbe los impactos y se autorregenera con el calor ambiental.',
    features: [
      'Propiedad hidrofóbica que repele agua, suciedad y agentes químicos',
      'Capa autorreparable ante micro-rayas y arañazos cotidianos con calor',
      'Hasta 10 años de garantía contra decoloración y amarilleamiento'
    ],
    galleryUrl: '/portafolio?categoria=ppf',
    galleryBtnText: 'VER TRABAJOS EN GALERIA',
    quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Protección%20PPF%20(Paint%20Protection%20Film)',
    quoteBtnText: 'Cotizar PPF',
    videoUrl: '/videos/fondo-hero.mp4',
    fallbackImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Vehículo deportivo de alta gama con película de protección PPF transparente'
  },
  {
    id: 'laminas-seguridad',
    tabLabel: 'Láminas de Seguridad',
    iconType: 'shield',
    title: 'Láminas de Seguridad Certificadas',
    subtitle: 'Blindaje multicapa anti-impacto y prevención ante asaltos',
    description: 'Tratamiento estructural para lunas y cristales laterales. Láminas multicapa de alta resistencia de 8 a 12 micras que contienen fragmentos de vidrio ante impactos contundentes, intentos de robo y accidentes viales.',
    features: [
      'Resistencia extrema a impactos mecánicos y golpes reiterados en lunas',
      'Película adhesiva de grado estructural que evita esquirlas volantes',
      'Transparencia cristalina de alta definición con certificación oficial'
    ],
    galleryUrl: '/portafolio?categoria=laminas-seguridad',
    galleryBtnText: 'VER TRABAJOS EN GALERIA',
    quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Láminas%20de%20Seguridad%20Vehiculares',
    quoteBtnText: 'Cotizar Láminas',
    videoUrl: '/videos/fondo-hero.mp4',
    fallbackImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Vehículo con láminas de seguridad certificadas anti-impacto'
  },
  {
    id: 'polarizados',
    tabLabel: 'Polarizados',
    iconType: 'polarizado',
    title: 'Polarizados Nano-Cerámicos',
    subtitle: 'Máximo rechazo térmico solar, protección UV y privacidad',
    description: 'Películas con tecnología nano-cerámica que bloquean hasta el 95% del calor por rayos infrarrojos sin necesidad de oscurecer excesivamente. Máximo confort térmico para el habitáculo y privacidad exterior conforme a normativa legal.',
    features: [
      'Rechazo térmico superior de hasta 95% de radiación infrarroja (IR)',
      'Bloqueo del 99% de rayos ultravioleta protegiendo interiores y piel',
      'No interfiere con señales electromagnéticas de GPS, radio ni telepeaje'
    ],
    galleryUrl: '/portafolio?categoria=polarizados',
    galleryBtnText: 'VER TRABAJOS EN GALERIA',
    quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Polarizados%20Nano-Cerámicos',
    quoteBtnText: 'Cotizar Polarizado',
    videoUrl: '/videos/fondo-hero.mp4',
    fallbackImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Vehículo con lunas polarizadas nano-cerámicas de alto rechazo térmico'
  }
];

export default function VehicularServices({
  badge = 'LÍNEAS ESPECIALIZADAS',
  titleStatic = 'Nuestras soluciones en',
  titleHighlight = 'wrap y protección vehicular',
  description = 'Cada especialidad cuenta con materiales certificados, procesos técnicos homologados y garantía oficial.',
  services = DEFAULT_VEHICULAR_SERVICES
}: VehicularServicesProps) {
  const safeServices = services && services.length > 0 ? services : DEFAULT_VEHICULAR_SERVICES;
  const [activeTab, setActiveTab] = useState(1); // Default to 'Wrap' (item 1) as in user mockup
  const [progress, setProgress] = useState(0);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Clamped index for safety if CMS modifies array length
  const safeIndex = Math.min(Math.max(0, activeTab), safeServices.length - 1);
  const currentService = safeServices[safeIndex];

  // Observador de intersección para fijar el mini-navbar en móvil SOLO mientras se está en la sección
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSectionInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-5% 0px -5% 0px'
      }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Control del avance del video y barra de progreso
  useEffect(() => {
    setProgress(0);
    setVideoLoaded(false);

    let timer: NodeJS.Timeout | null = null;
    const v = videoRef.current;

    if (v) {
      v.currentTime = 0;
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Si el navegador bloquea autoplay, simulamos barra de progreso suave
        });
      }
    }

    // Timer de respaldo en caso de que el video tarde o se use imagen estática
    const intervalMs = 50;
    const durationMs = 6000;
    let elapsed = 0;

    timer = setInterval(() => {
      if (v && v.duration && !v.paused) {
        // Avance exacto del video
        const p = (v.currentTime / v.duration) * 100;
        setProgress(Math.min(100, p));
      } else {
        // Avance de respaldo suave
        elapsed += intervalMs;
        const p = (elapsed / durationMs) * 100;
        setProgress(Math.min(100, p));
        if (elapsed >= durationMs) {
          elapsed = 0;
        }
      }
    }, intervalMs);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [safeIndex]);

  const renderIcon = (type: VehicularServiceItem['iconType'], className = 'w-4 h-4') => {
    switch (type) {
      case 'truck':
        return <Truck className={className} />;
      case 'car':
        return <Car className={className} />;
      case 'ppf':
        return <ShieldCheck className={className} />;
      case 'shield':
        return <Shield className={className} />;
      case 'polarizado':
        return <Film className={className} />;
      default:
        return <Car className={className} />;
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="servicios-vehiculares" 
      className="relative py-20 md:py-28 bg-white dark:bg-zinc-950 transition-colors duration-300 border-t border-zinc-200 dark:border-zinc-800/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Opcional Proporcional */}
        {(titleStatic || titleHighlight) && (
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            {badge && (
              <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EE2737]"></span>
                {badge}
              </div>
            )}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.2]">
              {titleStatic} <span className="text-[#EE2737]">{titleHighlight}</span>
            </h2>
            {description && (
              <p className="mt-3 text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Tarjeta Principal Dividida en 2 Columnas (Fiel al boceto del usuario) */}
        <div className="w-full bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-none transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[440px]">
            
            {/* Columna Izquierda: Información Editorial y Características */}
            <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-white dark:bg-zinc-900 transition-colors duration-300">
              <div>
                
                {/* Título Principal de la Línea */}
                <h3 className="text-xl sm:text-2xl md:text-[1.75rem] font-display font-bold text-zinc-900 dark:text-white tracking-tight leading-snug mb-2">
                  {currentService.title}
                </h3>
                
                {/* Subtítulo en Rojo Primario */}
                <p className="text-xs sm:text-sm font-sans font-semibold text-[#EE2737] mb-5 leading-relaxed">
                  {currentService.subtitle}
                </p>

                {/* Descripción Detallada */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed mb-6">
                  {currentService.description}
                </p>

                {/* 3 Viñetas con Checkmark Rojo */}
                <ul className="space-y-3 mb-8">
                  {currentService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                      <span className="text-[#EE2737] font-bold shrink-0 mt-0.5 text-sm select-none">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Botón Inferior: Ver Trabajos en Galería (Outline con esquinas poco redondeadas) */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={currentService.galleryUrl}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm border border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-white text-zinc-900 dark:text-white bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/60 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 select-none shadow-none text-center"
                >
                  <span>{currentService.galleryBtnText || 'VER TRABAJOS EN GALERIA'}</span>
                  <span className="text-sm leading-none transition-transform duration-200 hover:translate-x-0.5">↗</span>
                </a>

                {currentService.quoteUrl && (
                  <a
                    href={currentService.quoteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-[#EE2737] hover:bg-[#d61e2e] text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 select-none shadow-none text-center"
                  >
                    <span>{currentService.quoteBtnText || 'COTIZAR SERVICIO'}</span>
                    <span className="text-sm leading-none">→</span>
                  </a>
                )}
              </div>

            </div>

            {/* Columna Derecha: Video en Bucle con Barrita de Avance */}
            <div className="lg:col-span-6 relative bg-zinc-950 flex flex-col justify-between overflow-hidden min-h-[300px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800">
              
              {/* Contenedor del Video o Imagen de Respaldo */}
              <div className="relative flex-1 w-full h-full min-h-[260px] overflow-hidden flex items-center justify-center">
                
                {/* Imagen de respaldo si no hay video o está cargando */}
                <img
                  src={currentService.fallbackImage}
                  alt={currentService.imageAlt || currentService.title}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                    videoLoaded ? 'opacity-0' : 'opacity-100'
                  }`}
                  loading="lazy"
                />

                {/* Video en bucle */}
                {currentService.videoUrl && (
                  <video
                    ref={videoRef}
                    key={currentService.id}
                    src={currentService.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={() => setVideoLoaded(true)}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                )}

                {/* Overlay cinematográfico sutil para contraste */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

                {/* Badge contextual de servicio en la esquina superior */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-sm bg-black/75 backdrop-blur-xs border border-white/10 text-white text-[11px] font-mono uppercase tracking-wider font-semibold">
                  {currentService.tabLabel}
                </div>

                {/* Texto explicativo discreto centrado si no hay video activo */}
                {!currentService.videoUrl && (
                  <div className="relative z-10 text-center px-4 max-w-sm">
                    <p className="text-xs font-mono text-zinc-300 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-sm border border-white/10 inline-block">
                      Demostración visual de {currentService.title}
                    </p>
                  </div>
                )}

              </div>

              {/* Barrita que muestra el avance del video (Fiel a la referencia) */}
              <div className="relative w-full bg-zinc-900 border-t border-white/10 select-none">
                <div className="w-full h-1.5 bg-zinc-800 overflow-hidden">
                  <div 
                    className="h-full bg-[#EE2737] transition-[width] duration-150 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="px-4 py-2 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="truncate pr-2">Barrita que muestra el avance del video</span>
                  <span className="font-semibold text-zinc-300 shrink-0">{Math.round(progress)}%</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Mini Navbar Animado con Iconos (Dockeado en escritorio, sticky en móvil durante la sección) */}
        {/* 1. VERSIÓN ESCRITORIO (Siempre visible debajo de la tarjeta) */}
        <div className="hidden md:flex mt-4 w-full justify-center">
          <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-zinc-200/90 dark:bg-zinc-800/90 border border-zinc-300 dark:border-zinc-700/80 backdrop-blur-md overflow-x-auto max-w-full select-none shadow-none">
            {safeServices.map((service, index) => {
              const isActive = index === safeIndex;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(index)}
                  type="button"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs font-heading font-semibold transition-all duration-200 cursor-pointer shrink-0 select-none shadow-none ${
                    isActive
                      ? 'bg-[#EE2737] text-white shadow-none font-bold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-zinc-600 dark:text-zinc-400'}>
                    {renderIcon(service.iconType, 'w-4 h-4')}
                  </span>
                  <span>{service.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. VERSIÓN MÓVIL: Sticky en la parte inferior mientras se está en la sección */}
        <div 
          className={`md:hidden transition-all duration-300 select-none ${
            isSectionInView 
              ? 'fixed bottom-4 inset-x-3 z-40 max-w-lg mx-auto'
              : 'relative mt-4 w-full'
          }`}
        >
          <div className="flex items-center gap-1 p-1 rounded-md bg-zinc-900/95 dark:bg-zinc-900/95 text-white border border-zinc-700/90 backdrop-blur-md overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory shadow-lg">
            {safeServices.map((service, index) => {
              const isActive = index === safeIndex;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(index)}
                  type="button"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-heading font-medium snap-center shrink-0 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#EE2737] text-white font-bold'
                      : 'text-zinc-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="shrink-0">
                    {renderIcon(service.iconType, 'w-3.5 h-3.5')}
                  </span>
                  <span className="whitespace-nowrap">{service.tabLabel}</span>
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
