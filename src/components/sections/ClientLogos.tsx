import { useRef, useEffect } from 'react';
import type { ClientLogosData } from '../../lib/cms';

// URLs de respaldo en caso de que CMS no tenga datos
const FALLBACK_ROW_1 = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
];

const FALLBACK_ROW_2 = [
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
];


const DraggableRow = ({ logos, speed = 1 }: { logos: string[], speed?: number }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let animationId: number;
    
    // Mueve el carrusel a la mitad inicialmente si va en reversa para evitar trabas
    if (speed < 0) slider.scrollLeft = slider.scrollWidth / 3;

    const scroll = () => {
      if (!isDown.current && slider) {
        slider.scrollLeft += speed;
        const segmentWidth = slider.scrollWidth / 3;
        
        // Lógica de reseteo para bucle infinito
        if (speed > 0 && slider.scrollLeft >= segmentWidth) {
          slider.scrollLeft -= segmentWidth;
        } else if (speed < 0 && slider.scrollLeft <= 0) {
          slider.scrollLeft += segmentWidth;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  const handleDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDown.current = true;
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    startX.current = pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeft.current = sliderRef.current?.scrollLeft || 0;
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDown.current || !sliderRef.current) return;
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const x = pageX - sliderRef.current.offsetLeft;
    const walk = (startX.current - x) * 1.5; 
    sliderRef.current.scrollLeft = scrollLeft.current + walk;
  };

  const handleUp = () => {
    isDown.current = false;
  };

  return (
    <div 
      ref={sliderRef}
      className="flex overflow-x-hidden cursor-grab active:cursor-grabbing w-full gap-16 px-4 py-8 items-center"
      style={{ touchAction: 'pan-y' }} // Permite scroll vertical táctil pero captura el horizontal
      onMouseDown={handleDown}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
      onMouseLeave={handleUp}
      onTouchStart={handleDown}
      onTouchMove={handleMove}
      onTouchEnd={handleUp}
    >
      {/* Triplicamos el arreglo para garantizar el efecto infinito sin cortes */}
      {[...logos, ...logos, ...logos].map((src, i) => (
        <img 
          key={i} 
          src={src} 
          alt="Logotipo de Cliente"
          draggable={false} // Evita el bug visual de arrastrar la imagen nativamente
          className="h-10 md:h-12 w-auto object-contain shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-[1.25] transition-all duration-300 cursor-pointer relative z-10 hover:z-20 dark:brightness-0 dark:invert dark:opacity-70 dark:hover:filter-none dark:hover:opacity-100" 
        />
      ))}
    </div>
  );
};

export default function ClientLogos({ data }: { data?: ClientLogosData }) {
  const titleStatic = data?.titleStatic || 'Marcas que';
  const titleHighlight = data?.titleHighlight || 'confían';
  const titleSuffix = data?.titleSuffix || 'en nosotros';

  const logoList = data?.logos && data.logos.length > 0
    ? (data.logos.map(l => l.logoUrl || l.image).filter(Boolean) as string[])
    : [...FALLBACK_ROW_1, ...FALLBACK_ROW_2];

  const mid = Math.ceil(logoList.length / 2);
  const row1 = logoList.slice(0, mid);
  const row2 = logoList.slice(mid);

  return (
    <section id="marcas" className="py-20 bg-bg dark:bg-dark border-b border-gray-200 dark:border-[#1a1a1a] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-center text-text-main dark:text-white transition-colors duration-300">
          {titleStatic} <span className="text-[#EE2737]">{titleHighlight}</span> {titleSuffix}
        </h2>
      </div>
      
      <div className="relative w-full flex flex-col gap-4">
        {/* Máscaras de degradado lateral */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-bg dark:from-dark to-transparent z-20 pointer-events-none transition-colors duration-300"></div>
        <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-bg dark:from-dark to-transparent z-20 pointer-events-none transition-colors duration-300"></div>

        {/* Fila superior hacia la izquierda, fila inferior hacia la derecha */}
        <DraggableRow logos={row1.length > 0 ? row1 : FALLBACK_ROW_1} speed={1.2} />
        <DraggableRow logos={row2.length > 0 ? row2 : FALLBACK_ROW_2} speed={-1.2} />
      </div>
    </section>
  );
}