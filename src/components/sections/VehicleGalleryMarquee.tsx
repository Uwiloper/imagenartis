import React, { useRef, useState, useEffect, useCallback, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';

export interface VehicleProjectItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  imageAlt?: string;
  client?: string;
  url?: string;
}

export interface VehicleGalleryMarqueeProps {
  badge?: string;
  titleStatic?: string;
  titleHighlight?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: VehicleProjectItem[];
  autoSpeed?: number;
}

export const DEFAULT_MARQUEE_ITEMS: VehicleProjectItem[] = [
  {
    id: 'van-comercial-rush',
    title: 'Van Comercial Rush Bowls',
    category: 'flotas',
    categoryLabel: 'Flota Comercial',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Rotulado integral de van comercial para flota de distribución',
    client: 'San Isidro, Lima',
    url: '/galeria?proyecto=van-comercial-rush&categoria=flotas'
  },
  {
    id: 'pickup-camo-4x4',
    title: 'Pickup Silverado 4x4 Camo Graphics',
    category: 'wrap-personalizado',
    categoryLabel: 'Personalizado 4x4',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Pickup con diseño gráfico camuflado de alto impacto',
    client: 'Surco, Lima',
    url: '/galeria?proyecto=pickup-camo-4x4&categoria=wrap-personalizado'
  },
  {
    id: 'van-rotulada-plumber',
    title: 'Furgón Comercial The Happy Plumber',
    category: 'flotas',
    categoryLabel: 'Rotulado B2B',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Furgón comercial con branding corporativo y datos de contacto',
    client: 'Miraflores, Lima',
    url: '/galeria?proyecto=van-rotulada-plumber&categoria=flotas'
  },
  {
    id: 'sports-satin-black',
    title: 'Porsche Cayman Satin Black Wrap',
    category: 'wrap-personalizado',
    categoryLabel: 'Cambio de Color',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Auto deportivo con wrap integral en vinil negro satinado',
    client: 'San Borja, Lima',
    url: '/galeria?proyecto=sports-satin-black&categoria=wrap-personalizado'
  },
  {
    id: 'suv-ppf-hydro',
    title: 'Toyota Hilux Blindaje PPF Completo',
    category: 'ppf',
    categoryLabel: 'Protección PPF',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Camioneta protegida con film PPF transparente autorregenerativo',
    client: 'La Molina, Lima',
    url: '/galeria?proyecto=suv-ppf-hydro&categoria=ppf'
  },
  {
    id: 'furgon-classic-bins',
    title: 'Camión de Carga Classic Bins',
    category: 'flotas',
    categoryLabel: 'Flota Pesada',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Camión de carga con rotulación corporativa para transporte',
    client: 'Callao, Lima',
    url: '/galeria?proyecto=furgon-classic-bins&categoria=flotas'
  }
];

export default function VehicleGalleryMarquee({
  badge,
  titleStatic = 'El camino más inteligente para un',
  titleHighlight = 'wrap vehicular perfecto',
  description = 'Imagenartis gestiona el diseño, la impresión y la instalación certificada de principio a fin en todo el país. Ya sea un solo vehículo o una flota a nivel nacional, entregamos un resultado impecable y de alta gama en cada entrega.',
  buttonText = 'Conoce nuestro portafolio de proyectos',
  buttonUrl = '/galeria',
  items = DEFAULT_MARQUEE_ITEMS,
  autoSpeed = 0.8
}: VehicleGalleryMarqueeProps) {
  const safeItems = items && items.length > 0 ? items : DEFAULT_MARQUEE_ITEMS;
  
  // Triplicamos los elementos para permitir arrastrar a la izquierda o derecha infinitamente
  const displayItems = [...safeItems, ...safeItems, ...safeItems];

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);

  const [cursorClass, setCursorClass] = useState('cursor-grab');

  // Loop de desplazamiento automático continuo
  const animate = useCallback(() => {
    const el = containerRef.current;
    if (el) {
      if (!isDraggingRef.current && !isHoveredRef.current) {
        el.scrollLeft += autoSpeed;

        const singleSetWidth = el.scrollWidth / 3;
        // Si avanzamos más allá del segundo set, retrocedemos al primer set sin salto visible
        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft -= singleSetWidth;
        }
        // Si retrocedemos arrastrando hacia la izquierda antes del set 1, avanzamos un set
        if (el.scrollLeft <= 0) {
          el.scrollLeft += singleSetWidth;
        }
      }
    }
    animFrameIdRef.current = requestAnimationFrame(animate);
  }, [autoSpeed]);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      // Iniciar centrado en el segundo bloque
      el.scrollLeft = el.scrollWidth / 3;
    }
    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [animate]);

  // Manejadores de Mouse (Desktop Drag)
  const handleMouseDown = (e: ReactMouseEvent) => {
    const el = containerRef.current;
    if (!el) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX;
    scrollLeftStartRef.current = el.scrollLeft;
    setCursorClass('cursor-grabbing');
  };

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = containerRef.current;
    if (!el) return;

    e.preventDefault();
    const dx = e.pageX - startXRef.current;
    if (Math.abs(dx) > 6) {
      hasDraggedRef.current = true;
    }

    el.scrollLeft = scrollLeftStartRef.current - dx;

    // Control de wrap infinito durante el arrastre manual
    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
      scrollLeftStartRef.current -= singleSetWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += singleSetWidth;
      scrollLeftStartRef.current += singleSetWidth;
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setCursorClass('cursor-grab');
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    isHoveredRef.current = false;
    setCursorClass('cursor-grab');
  };

  // Manejadores Touch (Móviles y Tablets)
  const handleTouchStart = (e: ReactTouchEvent) => {
    const el = containerRef.current;
    if (!el) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.touches[0].pageX;
    scrollLeftStartRef.current = el.scrollLeft;
  };

  const handleTouchMove = (e: ReactTouchEvent) => {
    if (!isDraggingRef.current) return;
    const el = containerRef.current;
    if (!el) return;

    const dx = e.touches[0].pageX - startXRef.current;
    if (Math.abs(dx) > 6) {
      hasDraggedRef.current = true;
    }

    el.scrollLeft = scrollLeftStartRef.current - dx;

    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
      scrollLeftStartRef.current -= singleSetWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += singleSetWidth;
      scrollLeftStartRef.current += singleSetWidth;
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Evita abrir el enlace si el usuario arrastró la foto en vez de hacer click
  const handleCardClick = (e: ReactMouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section id="galeria-marquee" className="py-20 md:py-28 bg-white dark:bg-zinc-950 transition-colors duration-300 border-t border-zinc-200 dark:border-zinc-800/80 overflow-hidden">
      
      {/* Encabezado Centrado (Fiel a la referencia, con tipografía cuidada y sin sombras) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-14">
        
        {badge && (
          <div className="mb-3.5 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EE2737]"></span>
            {badge}
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-display font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.18] max-w-3xl mx-auto">
          {titleStatic} <span className="text-[#EE2737]">{titleHighlight}</span>
        </h2>

        {description && (
          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {buttonText && (
          <div className="mt-7 flex justify-center">
            <a
              href={buttonUrl}
              className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white hover:border-[#EE2737] hover:text-[#EE2737] font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 select-none shadow-none"
            >
              <span className="w-6 h-6 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-[10px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:bg-[#EE2737] group-hover:text-white">
                ➔
              </span>
              <span>{buttonText}</span>
            </a>
          </div>
        )}

      </div>

      {/* Contenedor Arrastrable con Pista Infinita */}
      <div className="relative w-full overflow-hidden select-none py-2">
        
        {/* Degradados sutiles en los extremos */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-4 ${cursorClass}`}
          style={{ userSelect: 'none' }}
        >
          {displayItems.map((item, idx) => (
            <a
              key={`${item.id}-${idx}`}
              href={item.url || `/galeria?proyecto=${item.id}&categoria=${item.category}`}
              onClick={handleCardClick}
              draggable={false}
              className="group relative block w-[280px] sm:w-[340px] md:w-[380px] shrink-0 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#EE2737]/70 dark:hover:border-[#EE2737]/80 transition-all duration-300 select-none shadow-none"
              title={`Ver ${item.title}`}
            >
              {/* Fotografía del Trabajo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 pointer-events-none">
                <img
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  draggable={false}
                  loading="lazy"
                  className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Tag de Categoría en esquina superior */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded-sm text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider text-white border border-white/10 uppercase">
                  {item.categoryLabel}
                </div>

                {/* Sombreado de legibilidad inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Información superpuesta */}
                <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col justify-end text-left">
                  <h3 className="text-sm sm:text-base font-bold font-display text-white tracking-tight leading-snug line-clamp-1 group-hover:text-[#EE2737] transition-colors duration-200">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-1 text-[11px] text-zinc-300 font-sans">
                    <span>{item.client || 'Lima, Perú'}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-white/90 group-hover:text-white transition-colors">
                      Ver trabajo <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
                    </span>
                  </div>
                </div>

              </div>
            </a>
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
