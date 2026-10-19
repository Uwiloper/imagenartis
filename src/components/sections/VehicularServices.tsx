import React, { useState, useEffect, useRef } from 'react';
import { Truck, Car, ShieldCheck, Shield, Film } from 'lucide-react';

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
    subtitle: 'Uniformidad corporativa y publicidad móvil de alto impacto',
    description: 'Branding vehicular a gran escala para furgonetas, camiones y flotas comerciales. Diseñado sobre plantillas a escala milimétrica para garantizar resistencia extrema al trabajo diario.',
    features: [
      'Adaptación a plantillas técnicas de cada fabricante vehicular',
      'Vinil fundido con laminado UV resistente a hidrolavado continuo',
      'Rotulado coordinado por turnos para no frenar tu operación comercial'
    ],
    galleryUrl: '/galeria?categoria=flotas',
    galleryBtnText: 'VER TRABAJOS EN GALERIA',
    quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Vinil%20Corporativo%20para%20Flotas%20Comerciales',
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
    description: 'Transforma la estética de tu auto según tu estilo personal sin alterar la pintura original. Acabados satinados, mate profundo, ultra gloss brillante y texturados con remates invisibles.',
    features: [
      'Desmontaje minucioso de ópticas y molduras para remates ocultos',
      'Películas 3M Serie 2080 y Avery Supreme Wrap con canales anti-burbujas',
      'Protege la pintura original de fábrica preservando el valor de reventa'
    ],
    galleryUrl: '/galeria?categoria=wrap-personalizado',
    galleryBtnText: 'VER TRABAJOS EN GALERIA',
    quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Vinil%20Automotriz%20Personalizado',
    videoUrl: '/videos/fondo-hero.mp4',
    fallbackImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Auto con wrap automotriz personalizado'
  },
  {
    id: 'ppf',
    tabLabel: 'PPF',
    iconType: 'ppf',
    title: 'Protección PPF (Paint Protection Film)',
    subtitle: 'Escudo invisible de uretano óptico autorregenerable',
    description: 'La máxima defensa contra piedras de carretera, gravilla, raspaduras cotidianas y rayos solares. Película transparente de poliuretano de alta tecnología con autorregeneración por calor.',
    features: [
      'Capa autorreparable ante micro-rayas cotidianas con calor solar',
      'Propiedad hidrofóbica que repele agua, grasas y contaminantes',
      'Hasta 10 años de garantía oficial contra amarilleamiento y fisuras'
    ],
    galleryUrl: '/galeria?categoria=ppf',
    galleryBtnText: 'VER TRABAJOS EN GALERIA',
    quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Protección%20PPF',
    videoUrl: '/videos/fondo-hero.mp4',
    fallbackImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Vehículo deportivo con protección PPF transparente'
  },
  {
    id: 'laminas-seguridad',
    tabLabel: 'Láminas de Seguridad',
    iconType: 'shield',
    title: 'Láminas de Seguridad Certificadas',
    subtitle: 'Blindaje multicapa anti-impacto y prevención ante asaltos',
    description: 'Refuerzo estructural para lunas y cristales laterales. Películas multicapa de alta resistencia de 8 a 12 micras que contienen fragmentos de vidrio ante impactos, golpes y accidentes.',
    features: [
      'Alta resistencia mecánica contra impactos contundentes y golpes en lunas',
      'Adhesivo de grado estructural que retiene esquirlas cortantes de vidrio',
      'Transparencia óptica con certificación y homologación legal oficial'
    ],
    galleryUrl: '/galeria?categoria=laminas-seguridad',
    galleryBtnText: 'VER TRABAJOS EN GALERIA',
    quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Láminas%20de%20Seguridad',
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
    description: 'Películas nano-cerámicas que bloquean hasta el 95% del calor infrarrojo sin oscurecer en exceso. Confort térmico superior para el habitáculo y privacidad exterior reglamentaria.',
    features: [
      'Rechazo térmico superior de hasta 95% de radiación infrarroja (IR)',
      'Bloqueo del 99% de rayos UV protegiendo interiores y tapicería',
      'Cero interferencia con señales de GPS, radiofrecuencia y telepeajes'
    ],
    galleryUrl: '/galeria?categoria=polarizados',
    galleryBtnText: 'VER TRABAJOS EN GALERIA',
    quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Polarizados%20Nano-Cerámicos',
    videoUrl: '/videos/fondo-hero.mp4',
    fallbackImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Vehículo con polarizado nano-cerámico de alto rechazo térmico'
  }
];

export default function VehicularServices({
  titleStatic = 'Nuestras soluciones en',
  titleHighlight = 'wrap y protección vehicular',
  description = 'Cada especialidad cuenta con materiales certificados, procesos técnicos homologados y garantía oficial.',
  services = DEFAULT_VEHICULAR_SERVICES
}: VehicularServicesProps) {
  const safeServices = services && services.length > 0 ? services : DEFAULT_VEHICULAR_SERVICES;
  const [activeTab, setActiveTab] = useState(1); // Default to 'Wrap' (item 1) as in user mockup
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [mobileNavState, setMobileNavState] = useState<'hidden' | 'sticky' | 'docked'>('hidden');

  const sectionRef = useRef<HTMLElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Clamped index for safety if CMS modifies array length
  const safeIndex = Math.min(Math.max(0, activeTab), safeServices.length - 1);
  const currentService = safeServices[safeIndex];

  // Actualización del sliding pill (estilo Showcase)
  const updatePill = () => {
    if (navRef.current) {
      const activeBtn = navRef.current.querySelector(`[data-id="${safeServices[safeIndex]?.id}"]`) as HTMLButtonElement;
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

  // Manejo de scroll para el mini-navbar en móvil:
  // - Oculto antes de la sección
  // - Sticky en la parte inferior mientras se navega dentro de la sección
  // - Al llegar a su posición natural al pie de la sección, se queda ahí (docked)
  // - Al salir de la sección, desaparece
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
        // La posición real al pie de la tarjeta llegó a la vista inferior -> se acopla (docked)
        setMobileNavState('docked');
      } else {
        // En la sección pero aún no llega a la posición real -> sticky inferior
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
        playPromise.catch(() => {});
      }
    }

    const intervalMs = 40;
    const durationMs = 5000;
    let elapsed = 0;

    timer = setInterval(() => {
      if (v && v.duration && !v.paused) {
        const p = (v.currentTime / v.duration) * 100;
        setProgress(Math.min(100, p));
      } else {
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

        {/* Tarjeta Principal Dividida en 2 Columnas (Fiel al boceto del usuario) */}
        <div className="w-full bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-none transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[420px]">
            
            {/* Columna Izquierda: Información Editorial y Características (Contenido controlado sin desborde) */}
            <div className="lg:col-span-6 p-6 sm:p-8 md:p-9 flex flex-col justify-between bg-white dark:bg-zinc-900 transition-colors duration-300">
              <div>
                
                {/* Título Principal de la Línea */}
                <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white tracking-tight leading-snug mb-1">
                  {currentService.title}
                </h3>
                
                {/* Subtítulo en Rojo Primario */}
                <p className="text-xs sm:text-sm font-sans font-semibold text-[#EE2737] mb-3 leading-tight">
                  {currentService.subtitle}
                </p>

                {/* Descripción Concisa */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed mb-5">
                  {currentService.description}
                </p>

                {/* 3 Viñetas con Checkmark Rojo */}
                <ul className="space-y-2.5 mb-6">
                  {currentService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-snug">
                      <span className="text-[#EE2737] font-bold shrink-0 mt-0.5 text-sm select-none">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Botón Único Inferior: Ver Trabajos en Galería (Fiel al boceto) */}
              <div className="pt-2">
                <a
                  href={currentService.galleryUrl}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm border border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-white text-zinc-900 dark:text-white bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/60 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 select-none shadow-none text-center"
                >
                  <span>{currentService.galleryBtnText || 'VER TRABAJOS EN GALERIA'}</span>
                  <span className="text-sm leading-none transition-transform duration-200 hover:translate-x-0.5">↗</span>
                </a>
              </div>

            </div>

            {/* Columna Derecha: Video en Bucle con Barrita de Avance (Sin badge, sin textos extra) */}
            <div className="lg:col-span-6 relative bg-zinc-950 flex flex-col justify-between overflow-hidden min-h-[280px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800">
              
              {/* Contenedor del Video o Imagen de Respaldo */}
              <div className="relative flex-1 w-full h-full min-h-[250px] overflow-hidden flex items-center justify-center">
                
                {/* Imagen de respaldo mientras carga el video */}
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
                    defaultMuted
                    playsInline
                    onLoadedData={() => setVideoLoaded(true)}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                )}

                {/* Overlay sutil para equilibrio de luz */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none"></div>

              </div>

              {/* Barrita que muestra el avance del video en bucle (Solo la barrita, sin textos ni porcentaje) */}
              <div className="w-full h-1 bg-zinc-800/80 overflow-hidden select-none">
                <div 
                  className="h-full bg-[#EE2737] transition-[width] duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

            </div>

          </div>
        </div>

        {/* Mini Navbar Animado con Iconos (Estilo Showcase con ancho alineado a la tarjeta) */}
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
                : 'fixed bottom-4 inset-x-3 z-40 max-w-lg mx-auto opacity-0 pointer-events-none translate-y-3')
            }`}
          >
            {/* Sliding Pill animado rojo (#EE2737) */}
            <div 
              className="absolute top-1 bottom-1 bg-[#EE2737] rounded-md transition-all duration-300 ease-out pointer-events-none"
              style={{ 
                left: pillStyle.left, 
                width: pillStyle.width, 
                opacity: pillStyle.opacity 
              }}
            />

            {safeServices.map((service, index) => {
              const isActive = index === safeIndex;
              return (
                <button
                  key={service.id}
                  data-id={service.id}
                  onClick={() => setActiveTab(index)}
                  type="button"
                  className={`relative z-10 flex-1 shrink-0 md:shrink flex items-center justify-center gap-2 py-2.5 px-3.5 sm:px-3 rounded-md text-xs sm:text-sm font-sans transition-colors duration-300 cursor-pointer select-none whitespace-nowrap snap-center ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium'
                  }`}
                >
                  <span className="shrink-0">{renderIcon(service.iconType, 'w-4 h-4')}</span>
                  <span>{service.tabLabel}</span>
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
