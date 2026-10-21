import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhaseItem {
  number: string;
  name: string;
  description: string;
  image: string;
}

const PHASES: PhaseItem[] = [
  {
    number: "Fase 1",
    name: "Diagnóstico & Medición Láser",
    description: "Inspección técnica de superficies y levantamiento de medidas milimétricas con distanciómetro láser para prevenir cualquier descalce.",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80"
  },
  {
    number: "Fase 2",
    name: "Preprensa & Calibración de Color",
    description: "Modelado a escala real 1:1 y pruebas de color impresas bajo norma Fogra y Pantone antes de realizar cualquier corte en taller.",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
  },
  {
    number: "Fase 3",
    name: "Producción en Taller Propio",
    description: "Impresión en tintas látex y UV resistentes a la intemperie, laminado protector contra rayaduras y corte computarizado CNC.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
  },
  {
    number: "Fase 4",
    name: "Instalación Técnica & Garantía",
    description: "Aplicadores certificados, uso de cintas Knifeless y post-calentado a 95°C para fijación molecular con acta de garantía escrita.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function AboutProcessInteractive() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const DURATION_MS = 6000;
  const INTERVAL_MS = 60;

  // Temporizador interactivo con barra de avance suave
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (INTERVAL_MS / DURATION_MS) * 100;
        if (next >= 100) {
          setCurrentIdx((c) => (c + 1) % PHASES.length);
          return 0;
        }
        return next;
      });
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isPaused, currentIdx]);

  const handlePrev = () => {
    setProgress(0);
    setCurrentIdx((prev) => (prev - 1 + PHASES.length) % PHASES.length);
  };

  const handleNext = () => {
    setProgress(0);
    setCurrentIdx((prev) => (prev + 1) % PHASES.length);
  };

  const currentPhase = PHASES[currentIdx];

  return (
    <section id="proceso" className="relative w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white py-14 sm:py-16 md:py-20 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ENCABEZADO SIMPLIFICADO (Sin badge) */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight mb-3">
            Nuestro proceso: <span className="text-[#EE2737]">de la idea al montaje</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            Un flujo estandarizado en 4 etapas que asegura máxima repetibilidad y cero improvisaciones en obra.
          </p>
        </div>

        {/* CONTENEDOR PRINCIPAL IDÉNTICO AL DISEÑO DE LA FOTO DEL USUARIO */}
        <div 
          className="relative w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-none select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          <div className="flex flex-col md:flex-row items-stretch min-h-[380px] sm:min-h-[440px]">
            
            {/* COLUMNA IZQUIERDA (~42%): FASE, TEXTO CONCISO Y BOTONES FLANQUEANTES */}
            <div className="w-full md:w-[42%] p-6 sm:p-10 flex flex-col justify-center items-center text-center relative bg-white dark:bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
              
              {/* Botón Anterior Flotante a la Izquierda */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center hover:border-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                title="Fase anterior"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Contenido Central: Título de Fase y Descripción Breve */}
              <div className="max-w-xs sm:max-w-sm px-8">
                
                {/* Título "Fase X" en Rojo Destacado como en la referencia */}
                <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-[#EE2737] tracking-tight leading-none mb-2">
                  {currentPhase.number}
                </h3>

                {/* Nombre de la fase */}
                <h4 className="text-base sm:text-lg font-display font-bold text-zinc-950 dark:text-white mb-3">
                  {currentPhase.name}
                </h4>

                {/* Descripción breve */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                  {currentPhase.description}
                </p>

                {/* Indicador de posición de fase */}
                <div className="mt-5 flex items-center justify-center gap-1.5">
                  {PHASES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setProgress(0);
                        setCurrentIdx(i);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === currentIdx
                          ? 'w-7 bg-[#EE2737]'
                          : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
                      }`}
                      title={`Ir a ${PHASES[i].number}`}
                    />
                  ))}
                </div>

              </div>

              {/* Botón Siguiente Flotante a la Derecha (Círculo Rojo con Flecha como en la referencia) */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EE2737] text-white flex items-center justify-center hover:bg-zinc-950 dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                title="Siguiente fase"
              >
                <ChevronRight size={20} />
              </button>

            </div>

            {/* COLUMNA DERECHA (~58%): FOTO GRANDE DEL PROCESO */}
            <div className="w-full md:w-[58%] relative min-h-[260px] sm:min-h-[360px] md:min-h-[440px] bg-black overflow-hidden">
              <img
                key={currentPhase.image}
                src={currentPhase.image}
                alt={`${currentPhase.number} - ${currentPhase.name}`}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 pointer-events-none" />
            </div>

          </div>

          {/* BARRITA INFERIOR QUE MUESTRA EL AVANCE PARA LA SIGUIENTE FASE (Exactamente como en la referencia) */}
          <div className="relative w-full h-1.5 sm:h-2 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div 
              className="h-full bg-[#EE2737] transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

      </div>
    </section>
  );
}