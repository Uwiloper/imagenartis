import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb, Building2, Store, Compass, Box, Check, ExternalLink } from 'lucide-react';

export interface CommercialAttribute {
  label: string;
  value: string;
  detail?: string;
}

export interface CommercialWorkItem {
  id: string;
  tabLabel: string;
  iconType: 'light' | 'building' | 'store' | 'compass' | 'box';
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt?: string;
  badge?: string;
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
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Letrero 3D retroiluminado con luces LED para fachada comercial',
    badge: 'ALTA VISIBILIDAD 24/7',
    attributes: [
      {
        label: 'Tecnología Lumínica',
        value: 'Módulos LED Samsung IP68',
        detail: 'Bajo consumo energético y fuentes Mean Well herméticas'
      },
      {
        label: 'Material Estructural',
        value: 'Acrílico 5mm & Acero Inox',
        detail: 'Corte CNC milimétrico con uniones soldadas invisibles'
      },
      {
        label: 'Resistencia Intemperie',
        value: 'Tratamiento UV Industrial',
        detail: 'Protección contra radiación solar intensa y humedad marina'
      },
      {
        label: 'Normativa Municipal',
        value: 'Conforme a Licencias & INDECI',
        detail: 'Incluye diagrama unifilar y memoria descriptiva para permisos'
      }
    ],
    galleryUrl: '/portafolio?categoria=letreros',
    galleryBtnText: 'VER LETREROS EN GALERIA'
  },
  {
    id: 'fachadas-acm',
    tabLabel: 'Fachadas en ACM',
    iconType: 'building',
    title: 'Revestimiento Arquitectónico en ACM',
    subtitle: 'Modernización integral de frentes comerciales con aluminio compuesto',
    description: 'Transformación total de exteriores mediante paneles de aluminio compuesto (ACM). Brinda una imagen corporativa contemporánea, plana y de alta durabilidad, ocultando imperfecciones de la pared original.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Edificio comercial revestido con paneles de aluminio compuesto ACM',
    badge: 'DURABILIDAD +10 AÑOS',
    attributes: [
      {
        label: 'Panel Arquitectónico',
        value: 'Aluminio Compuesto 4mm',
        detail: 'Núcleo de polietileno con recubrimiento de pintura PVDF'
      },
      {
        label: 'Subestructura',
        value: 'Tubo de Acero Galvanizado',
        detail: 'Tratamiento anticorrosivo fijado con anclajes químicos Hilti'
      },
      {
        label: 'Aislamiento Térmico',
        value: 'Cámara Ventilada Eficiente',
        detail: 'Reduce la transferencia de calor solar hacia el interior'
      },
      {
        label: 'Acabados Disponibles',
        value: 'Silver, Negro Mate & Madera',
        detail: 'Amplia gama de colores de catálogo y combinaciones de marca'
      }
    ],
    galleryUrl: '/portafolio?categoria=fachadas',
    galleryBtnText: 'VER FACHADAS EN GALERIA'
  },
  {
    id: 'vitrinas-retail',
    tabLabel: 'Vitrinas Retail & Pavonado',
    iconType: 'store',
    title: 'Branding para Vitrinas & Cristales Comerciales',
    subtitle: 'Privacidad elegante, campañas de alto impacto y protección solar',
    description: 'Instalación de vinil pavonado (frosted) con troquelado de logotipos para salas de reuniones y mamparas, vinil microperforado para vidrieras exteriores con visión unidireccional y gráfica promocional.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Vitrinas de tienda retail con vinil publicitario y branding corporativo',
    badge: 'INSTALACIÓN SIN POLVO',
    attributes: [
      {
        label: 'Vinil de Privacidad',
        value: 'Pavonado / Esmerilado 3M',
        detail: 'Corte digital con calado de logotipos corporativos y tramas'
      },
      {
        label: 'Visión Unidireccional',
        value: 'Microperforado 60/40 Certificado',
        detail: 'Impresión UV de alta resolución con vista libre desde adentro'
      },
      {
        label: 'Adhesivo Removible',
        value: 'Cero Residuos en Cristales',
        detail: 'Permite renovar campañas comerciales sin maltratar los vidrios'
      },
      {
        label: 'Tiempo de Instalación',
        value: 'Horarios Nocturnos / Turnos',
        detail: 'Montaje limpio y silencioso sin interrumpir la atención al público'
      }
    ],
    galleryUrl: '/portafolio?categoria=vitrinas',
    galleryBtnText: 'VER VITRINAS EN GALERIA'
  },
  {
    id: 'senaletica-wayfinding',
    tabLabel: 'Señalética & Wayfinding',
    iconType: 'compass',
    title: 'Sistemas de Señalética Arquitectónica',
    subtitle: 'Orientación intuitiva y cumplimiento estricto de normativas de seguridad',
    description: 'Desarrollamos proyectos integrales de señalización de wayfinding para edificios corporativos, clínicas, centros comerciales y plantas industriales. Desde directorios generales hasta placas de piso y señalética fotoluminiscente INDECI.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Directorio y señalética arquitectónica en edificio corporativo',
    badge: 'NORMATIVA INDECI',
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
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Stand publicitario para feria comercial con iluminación y gráfica de marca',
    badge: 'MONTAJE RÁPIDO',
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
  badge,
  titleStatic = 'Nuestras soluciones en',
  titleHighlight = 'branding comercial & espacios',
  description = 'Cada proyecto es fabricado a medida en nuestro taller propio, combinando precisión técnica, materiales nobles y cumplimiento normativo.',
  works = DEFAULT_COMMERCIAL_WORKS
}: CommercialShowcaseProps) {
  const safeWorks = works && works.length > 0 ? works : DEFAULT_COMMERCIAL_WORKS;
  const [activeTab, setActiveTab] = useState(0);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const navRef = useRef<HTMLDivElement>(null);

  const safeIndex = Math.min(Math.max(0, activeTab), safeWorks.length - 1);
  const currentWork = safeWorks[safeIndex];

  // Cálculo del sliding pill estilo Showcase
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
  }, [safeIndex]);

  useEffect(() => {
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [safeIndex]);

  const renderIcon = (type: CommercialWorkItem['iconType'], className = 'w-4 h-4') => {
    switch (type) {
      case 'light':
        return <Lightbulb className={className} />;
      case 'building':
        return <Building2 className={className} />;
      case 'store':
        return <Store className={className} />;
      case 'compass':
        return <Compass className={className} />;
      case 'box':
        return <Box className={className} />;
      default:
        return <Building2 className={className} />;
    }
  };

  return (
    <section 
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

        {/* Tarjeta Principal Dividida en 2 Mitades (50/50: Visual + Atributos Destacables) */}
        <div className="w-full bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-none transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px]">
            
            {/* Mitad Izquierda: Fotografía de alta calidad de la solución */}
            <div className="lg:col-span-6 relative bg-zinc-950 flex flex-col justify-between overflow-hidden min-h-[300px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 group">
              
              <div className="relative flex-1 w-full h-full min-h-[280px] overflow-hidden flex items-center justify-center">
                <img
                  src={currentWork.image}
                  alt={currentWork.imageAlt || currentWork.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Sutil overlay cinematográfico */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

                {/* Badge contextual elegante */}
                {currentWork.badge && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-sm bg-black/80 backdrop-blur-xs border border-white/10 text-white text-[11px] font-mono uppercase tracking-wider font-semibold">
                    {currentWork.badge}
                  </div>
                )}
              </div>

            </div>

            {/* Mitad Derecha: Información y Atributos Más Destacables */}
            <div className="lg:col-span-6 p-6 sm:p-8 md:p-9 flex flex-col justify-between bg-white dark:bg-zinc-900 transition-colors duration-300">
              <div>
                
                {/* Título Principal */}
                <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white tracking-tight leading-snug mb-1">
                  {currentWork.title}
                </h3>
                
                {/* Subtítulo en Rojo Primario */}
                <p className="text-xs sm:text-sm font-sans font-semibold text-[#EE2737] mb-3 leading-tight">
                  {currentWork.subtitle}
                </p>

                {/* Descripción Concisa */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed mb-6">
                  {currentWork.description}
                </p>

                {/* Grilla 2x2 de Atributos Más Destacables (Specs Técnicas) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {currentWork.attributes.map((attr, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-md bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 transition-colors"
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400 mb-0.5">
                        {attr.label}
                      </div>
                      <div className="text-xs sm:text-sm font-sans font-bold text-zinc-900 dark:text-white leading-tight">
                        {attr.value}
                      </div>
                      {attr.detail && (
                        <div className="text-[11px] font-sans text-zinc-600 dark:text-zinc-400 mt-1 leading-snug">
                          {attr.detail}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

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

          </div>
        </div>

        {/* Mini Navbar con Iconos (Estilo Showcase, ancho completo igual a la tarjeta) */}
        <div className="relative w-full mt-3 min-h-[48px]">
          <div 
            ref={navRef}
            className="w-full bg-gray-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800/80 rounded-md p-1 transition-all duration-300 select-none shadow-none flex items-center overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
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
