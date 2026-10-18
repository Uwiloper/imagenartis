import React, { useRef, useState, useEffect, useCallback, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';

export interface CommercialProjectItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  imageAlt?: string;
  client?: string;
  url?: string;
}

export interface CommercialGalleryMarqueeProps {
  badge?: string;
  titleStatic?: string;
  titleHighlight?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: CommercialProjectItem[];
  autoSpeed?: number;
}

export const DEFAULT_COMMERCIAL_PROJECTS: CommercialProjectItem[] = [
  {
    id: 'letrero-artisan-cafe',
    title: 'Letrero 3D Retroiluminado Artisan Café',
    category: 'letreros',
    categoryLabel: 'Letreros Luminosos',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Letrero luminoso corpóreo para cafetería gourmet',
    client: 'San Isidro, Lima',
    url: '/portafolio?proyecto=letrero-artisan-cafe&categoria=letreros'
  },
  {
    id: 'fachada-acm-corporativa',
    title: 'Fachada Arquitectónica en ACM Sede Alpha',
    category: 'fachadas',
    categoryLabel: 'Fachadas en ACM',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Revestimiento en paneles de aluminio compuesto para edificio de oficinas',
    client: 'Miraflores, Lima',
    url: '/portafolio?proyecto=fachada-acm-corporativa&categoria=fachadas'
  },
  {
    id: 'vitrinas-banco-real',
    title: 'Branding de Vitrinas con Vinil Pavonado 3M',
    category: 'vitrinas',
    categoryLabel: 'Vitrinas Retail',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Mamparas y cristales corporativos con vinil esmerilado de privacidad',
    client: 'San Borja, Lima',
    url: '/portafolio?proyecto=vitrinas-banco-real&categoria=vitrinas'
  },
  {
    id: 'senaletica-clinica-sanitas',
    title: 'Directorio Flotante & Wayfinding Clínica Sanitas',
    category: 'senaletica',
    categoryLabel: 'Señalética Corporativa',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Directorio general de acrílico y señalética arquitectónica',
    client: 'Surco, Lima',
    url: '/portafolio?proyecto=senaletica-clinica-sanitas&categoria=senaletica'
  },
  {
    id: 'stand-expo-tech',
    title: 'Stand Modular Desmontable Expo Minería & Tech',
    category: 'stands',
    categoryLabel: 'Stands para Ferias',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Stand publicitario con counter de atención y backing tensado',
    client: 'Jockey Plaza, Lima',
    url: '/portafolio?proyecto=stand-expo-tech&categoria=stands'
  },
  {
    id: 'letrero-neoled-bistrot',
    title: 'Letras de Acero Pulido & Neón LED Vintage',
    category: 'letreros',
    categoryLabel: 'Letreros Luminosos',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Letrero de acero inoxidable con luz cálida para restaurante bistró',
    client: 'Barranco, Lima',
    url: '/portafolio?proyecto=letrero-neoled-bistrot&categoria=letreros'
  }
];

export default function CommercialGalleryMarquee({
  badge,
  titleStatic = 'Espacios comerciales que proyectan',
  titleHighlight = 'autoridad de marca',
  description = 'Fabricación con ingeniería propia y montaje profesional en todo el Perú. Desde la identidad en recepción hasta la fachada monumental de tu sede corporativa.',
  buttonText = 'Conoce nuestro portafolio de branding comercial',
  buttonUrl = '/portafolio?categoria=branding',
  items = DEFAULT_COMMERCIAL_PROJECTS,
  autoSpeed = 0.8
}: CommercialGalleryMarqueeProps) {
  const safeItems = items && items.length > 0 ? items : DEFAULT_COMMERCIAL_PROJECTS;
  
  // Triplicamos los elementos para permitir arrastrar horizontalmente de forma infinita
  const displayItems = [...safeItems, ...safeItems, ...safeItems];

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);

  // Wrapper para wrapping de scroll infinito suave
  const checkScrollWrap = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const thirdWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= thirdWidth * 2) {
      el.scrollLeft -= thirdWidth;
    } else if (el.scrollLeft <= 5) {
      el.scrollLeft += thirdWidth;
    }
  }, []);

  // Bucle suave de desplazamiento automático
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Inicializar el scroll en el segundo tercio para permitir arrastre bidireccional inmediato
    if (el.scrollLeft === 0) {
      el.scrollLeft = el.scrollWidth / 3;
    }

    const step = () => {
      if (!isDraggingRef.current && !isHoveredRef.current && el) {
        el.scrollLeft += autoSpeed;
        checkScrollWrap();
      }
      animFrameIdRef.current = requestAnimationFrame(step);
    };

    animFrameIdRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [autoSpeed, checkScrollWrap]);

  // Manejo de eventos de Mouse (Arrastrar con clic)
  const onMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftStartRef.current = el.scrollLeft;
  };

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!isDraggingRef.current || !el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    el.scrollLeft = scrollLeftStartRef.current - walk;
    checkScrollWrap();
  };

  const onMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Manejo de eventos Touch (Deslizar en móvil)
  const onTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.touches[0].pageX - el.offsetLeft;
    scrollLeftStartRef.current = el.scrollLeft;
  };

  const onTouchMove = (e: ReactTouchEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!isDraggingRef.current || !el) return;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    el.scrollLeft = scrollLeftStartRef.current - walk;
    checkScrollWrap();
  };

  const onTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Prevenir navegación accidental si se arrastró el mouse o pantalla
  const handleLinkClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section 
      id="galeria-marquee-comercial"
      className="relative py-20 md:py-28 bg-white dark:bg-zinc-950 transition-colors duration-300 overflow-hidden border-t border-zinc-200 dark:border-zinc-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-14">
        
        {badge && (
          <div className="text-center mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EE2737]"></span>
              {badge}
            </span>
          </div>
        )}

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-display font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.2]">
            {titleStatic} <span className="text-[#EE2737]">{titleHighlight}</span>
          </h2>
          {description && (
            <p className="mt-3 text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          )}

          {buttonText && buttonUrl && (
            <div className="mt-6">
              <a
                href={buttonUrl}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white text-zinc-900 dark:text-white font-sans text-xs font-semibold tracking-wide transition-all duration-200 select-none shadow-none"
              >
                <span className="w-4 h-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center text-[10px] leading-none">→</span>
                <span>{buttonText}</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Contenedor del Carrusel Infinito con Arrastre Manual */}
      <div 
        className="relative w-full cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => (isHoveredRef.current = true)}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          onMouseUpOrLeave();
        }}
      >
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 px-4 sm:px-6 cursor-grab active:cursor-grabbing select-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {displayItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-none w-[280px] sm:w-[360px] md:w-[420px] group"
            >
              <a
                href={item.url || `/portafolio?categoria=${item.category}`}
                onClick={handleLinkClick}
                className="block relative aspect-[16/10] sm:aspect-[16/10] rounded-md overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 select-none shadow-none"
              >
                {/* Imagen del Proyecto */}
                <img
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
                />

                {/* Overlay Cinematográfico para Legibilidad de Textos */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-300 group-hover:from-black/95"></div>

                {/* Badge Superior de Categoría */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-xs text-[10px] font-mono uppercase tracking-wider font-semibold bg-black/75 backdrop-blur-xs text-white border border-white/10 shadow-none select-none">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Información Inferior */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex flex-col justify-end text-left select-none">
                  <h3 className="text-sm sm:text-base md:text-lg font-display font-bold text-white tracking-tight leading-snug line-clamp-1 group-hover:text-zinc-100 transition-colors">
                    {item.title}
                  </h3>

                  <div className="mt-1 flex items-center justify-between text-[11px] sm:text-xs text-zinc-400 font-sans">
                    {item.client && (
                      <span className="truncate pr-2">{item.client}</span>
                    )}
                    <span className="inline-flex items-center gap-1 font-semibold text-white/90 group-hover:text-white transition-colors shrink-0">
                      <span>Ver trabajo</span>
                      <span className="text-xs">↗</span>
                    </span>
                  </div>
                </div>

              </a>
            </div>
          ))}
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
