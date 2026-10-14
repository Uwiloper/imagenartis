import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';

const PORTFOLIO_DATA = [
  {
    id: 'vehiculo',
    category: 'Vehículo',
    beforeImage: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=1200&auto=format&fit=crop',
    testimonial: '"El diseño quedó exactamente como lo imaginé. La instalación fue impecable y rápida."',
    clientName: 'Carlos M. - Flota Express'
  },
  {
    id: 'oficina',
    category: 'Interior Oficina',
    beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1503853585905-d54d6824490d?q=80&w=1200&auto=format&fit=crop',
    testimonial: '"El vinil pavonado y los acrílicos le dieron una cara completamente profesional a nuestra nueva sede."',
    clientName: 'Estudio Jurídico R&A'
  },
  {
    id: 'fachada',
    category: 'Fachada Comercial',
    beforeImage: 'https://images.unsplash.com/photo-1517502166878-34c979606132?q=80&w=1200&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1200&auto=format&fit=crop',
    testimonial: '"Desde que instalamos el letrero luminoso 3D, el flujo de clientes en la noche ha aumentado un 40%."',
    clientName: 'Restaurante La Casona'
  }
];

export interface PortfolioItem {
  id: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  testimonial: string;
  clientName: string;
}

export default function ShowcasePortfolio({ items }: { items?: PortfolioItem[] }) {
  const dataList = items && items.length > 0 ? items : PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState(dataList[0]?.id || 'vehiculo');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const activeData = dataList.find(item => item.id === activeCategory) || dataList[0];

  useEffect(() => {
    if (navRef.current) {
      const activeBtn = navRef.current.querySelector(`[data-id="${activeCategory}"]`) as HTMLButtonElement;
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
    
    setSliderPosition(0);
    const timeout = setTimeout(() => {
      setSliderPosition(50);
    }, 100); 
    return () => clearTimeout(timeout);
  }, [activeCategory]);

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

  return (
    <section className="py-20 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8 text-center text-text-main dark:text-white transition-colors duration-300">
          <span className="text-[#EE2737]">Trabajos</span> que hablan por sí solos
        </h2>

        {dataList.length > 1 && (
          <div 
            ref={navRef}
            className="relative flex w-full md:w-auto overflow-x-auto no-scrollbar scroll-smooth bg-gray-100 dark:bg-[#1a1a1a] rounded-md p-1 mb-10 transition-colors duration-300 snap-x snap-mandatory md:justify-center"
          >
            <div 
              className="absolute top-1 bottom-1 bg-black dark:bg-white rounded-md transition-all duration-300 ease-out"
              style={{ left: pillStyle.left, width: pillStyle.width, opacity: pillStyle.opacity }}
            />

            {dataList.map((item) => (
              <button
                key={item.id}
                data-id={item.id}
                onClick={() => setActiveCategory(item.id)}
                className={`relative z-10 flex-shrink-0 snap-center px-6 py-2 rounded-md text-sm font-sans transition-colors duration-300 ${
                  activeCategory === item.id 
                    ? 'text-white dark:text-black font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>
        )}

        <div className="w-full bg-white dark:bg-[#0a0a0a] rounded-xl overflow-hidden transition-colors duration-300">
          
          <div 
            ref={containerRef}
            className="relative w-full aspect-video overflow-hidden cursor-ew-resize select-none bg-black rounded-xl"
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
          >
            <img 
              src={activeData.afterImage} 
              alt={`Resultado - ${activeData.category}`} 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ease-in"
            />
            <span className="absolute top-4 right-4 bg-[#EE2737] text-white text-xs font-sans font-medium px-3 py-1 rounded-md z-10 pointer-events-none transition-opacity duration-300">
              Después
            </span>

            {/* SE APLICA TRANSICIÓN SÓLO CUANDO NO SE ESTÁ ARRASTRANDO */}
            <div 
              className={`absolute inset-0 w-full h-full pointer-events-none ${isDragging ? '' : 'transition-all duration-700 ease-out'}`}
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img 
                src={activeData.beforeImage} 
                alt={`Original - ${activeData.category}`} 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <span className="absolute top-4 left-4 bg-[#EE2737] text-white text-xs font-sans font-medium px-3 py-1 rounded-md z-10 transition-opacity duration-300">
                Antes
              </span>
            </div>

            {/* SE APLICA TRANSICIÓN SÓLO CUANDO NO SE ESTÁ ARRASTRANDO */}
            <div 
              className={`absolute top-0 bottom-0 w-[2px] bg-white z-20 flex items-center justify-center ${isDragging ? '' : 'transition-all duration-700 ease-out'}`}
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
            >
              {/* SE AGREGÓ 'absolute' PARA EVITAR QUE SE DEFORME Y 'shadow-md' PARA MEJOR VISIBILIDAD */}
              <div className="absolute w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing">
                <div className="flex gap-[3px]">
                  <div className="w-[2px] h-[12px] bg-gray-500 rounded-sm"></div>
                  <div className="w-[2px] h-[12px] bg-gray-500 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-6 md:py-8 text-center bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
            <p className="font-sans text-sm md:text-base text-gray-500 dark:text-gray-400 italic mb-1 transition-colors duration-300">
              {activeData.testimonial}
            </p>
            <p className="font-display text-sm md:text-base font-bold text-text-main dark:text-white transition-colors duration-300">
              - {activeData.clientName}
            </p>
          </div>

        </div>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}