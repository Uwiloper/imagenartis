import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  ShieldCheck, 
  Clock, 
  Layers, 
  MapPin, 
  Calendar, 
  Check, 
  ArrowLeft,
  Share2,
  ExternalLink
} from 'lucide-react';
import type { ProjectItem } from '../../lib/projects';

interface ProjectDetailViewProps {
  project: ProjectItem;
  relatedProjects: ProjectItem[];
}

export function WhatsAppIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.764.46 3.42 1.268 4.868L2 22l5.244-1.376A9.96 9.96 0 0 0 12.004 22c5.524 0 10.004-4.48 10.004-10.004C22.008 6.48 17.528 2 12.004 2zm0 18.336c-1.576 0-3.1-.424-4.436-1.228l-.316-.188-3.296.864.88-3.212-.208-.332A8.28 8.28 0 0 1 3.664 12c0-4.596 3.74-8.336 8.34-8.336 4.596 0 8.336 3.74 8.336 8.336 0 4.596-3.74 8.336-8.336 8.336zm4.568-6.236c-.252-.124-1.484-.732-1.712-.816-.228-.084-.396-.124-.56.124-.168.252-.648.816-.796.984-.148.168-.296.188-.548.064-.252-.124-1.064-.392-2.028-1.252-.748-.668-1.256-1.492-1.404-1.744-.148-.252-.016-.388.108-.512.112-.112.252-.296.38-.444.124-.148.168-.252.252-.42.084-.168.04-.316-.02-.44-.06-.124-.56-1.348-.768-1.848-.2-.488-.404-.424-.56-.432l-.476-.008c-.168 0-.44.064-.672.316-.228.252-.876.856-.876 2.088s.896 2.42 1.02 2.588c.124.168 1.764 2.692 4.272 3.776.596.256 1.064.408 1.428.524.6.192 1.144.164 1.576.1.48-.072 1.484-.608 1.692-1.196.208-.588.208-1.092.148-1.196-.06-.104-.224-.168-.476-.292z" />
    </svg>
  );
}

export default function ProjectDetailView({ project, relatedProjects }: ProjectDetailViewProps) {
  const images = project.galleryImages && project.galleryImages.length > 0 
    ? project.galleryImages 
    : [project.featuredImage];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [copied, setCopied] = useState(false);

  const activeImage = images[activeImageIndex] || project.featuredImage;

  const handleToggleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomOrigin({ x, y });
      setIsZoomed(true);
    } else {
      setIsZoomed(false);
    }
  };

  const handlePrevImage = () => {
    setIsZoomed(false);
    setActiveImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setIsZoomed(false);
    setActiveImageIndex(prev => (prev + 1) % images.length);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola Imagen Artis! Vi en su galería el proyecto "${project.title}" (ID: ${project.id}) y me gustaría cotizar un trabajo similar para mi empresa/vehículo.`
  );

  return (
    <article className="w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
      
      {/* 1. Barra Superior con Breadcrumbs y Botón de Volver */}
      <div className="pt-28 sm:pt-32 md:pt-36 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2 border-b border-zinc-200 dark:border-zinc-800/80">
          
          {/* Navegación Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-sans text-zinc-500 dark:text-zinc-400 overflow-x-auto no-scrollbar whitespace-nowrap">
            <a href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Inicio
            </a>
            <span>/</span>
            <a href="/galeria" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Galería
            </a>
            <span>/</span>
            <a 
              href={`/galeria?categoria=${project.category}`} 
              className="text-[#EE2737] hover:underline transition-colors font-medium"
            >
              {project.categoryLabel}
            </a>
          </nav>

          {/* Botones de Acción Superior (Volver y Compartir) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-sans text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
              title="Copiar enlace"
            >
              <Share2 size={13} />
              <span className="hidden sm:inline">{copied ? '¡Copiado!' : 'Compartir'}</span>
            </button>

            <a
              href="/galeria"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-xs font-sans font-semibold text-zinc-900 dark:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Volver a Galería</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. Cuerpo Principal Estilo Ficha de Producto E-Commerce */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* COLUMNA IZQUIERDA (7 Columnas): Galería de Imágenes de Producto con Zoom */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Visor Principal de Foto en Alta Resolución */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-black rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-none select-none group">
              
              {/* Contenedor con Zoom Interactivo */}
              <div 
                className={`w-full h-full flex items-center justify-center overflow-hidden ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={handleToggleZoom}
                title={isZoomed ? 'Haz clic para restablecer tamaño' : 'Haz clic para zoom 2x'}
              >
                <img
                  src={activeImage}
                  alt={project.title}
                  style={{ transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }}
                  className={`w-full h-full object-cover transition-transform duration-300 ease-out ${
                    isZoomed ? 'scale-[2.1]' : 'scale-100'
                  }`}
                  loading="eager"
                />
              </div>

              {/* Botón Flotante de Zoom */}
              <button
                type="button"
                onClick={() => setIsZoomed(prev => !prev)}
                className="absolute top-3.5 right-3.5 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black/75 hover:bg-[#EE2737] text-white font-sans text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer border border-white/10"
              >
                {isZoomed ? <ZoomOut size={13} /> : <ZoomIn size={13} />}
                <span>{isZoomed ? 'Restablecer' : 'Zoom 2x'}</span>
              </button>

              {/* Flechas de Navegación de Fotos (si hay más de 1 imagen) */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-[#EE2737] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 border border-white/10"
                    title="Foto anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-[#EE2737] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 border border-white/10"
                    title="Foto siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Indicador de posición de foto */}
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 z-20 px-2 py-0.5 rounded-xs bg-black/70 text-white font-mono text-[10px] backdrop-blur-xs">
                  {activeImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Miniaturas Horizontales de Selección de Foto */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                {images.map((img, idx) => {
                  const isActive = idx === activeImageIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setIsZoomed(false);
                        setActiveImageIndex(idx);
                      }}
                      className={`relative aspect-[16/11] rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#EE2737] ring-1 ring-[#EE2737]/40 opacity-100 scale-[1.02]'
                          : 'border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-400'
                      }`}
                    >
                      <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Bloque Destacado de Garantía y Confianza */}
            <div className="p-4 sm:p-5 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <div className="flex items-start gap-2.5">
                <ShieldCheck size={20} className="text-[#EE2737] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white font-sans">Materiales Originales</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans mt-0.5">3M, Avery Dennison y Arlon certificados</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock size={20} className="text-[#EE2737] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white font-sans">Entrega Puntual</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans mt-0.5">Cronograma de producción garantizado</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Layers size={20} className="text-[#EE2737] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white font-sans">Taller Propio</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans mt-0.5">Instalación y fabricación sin intermediarios</p>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA (5 Columnas): Ficha de Producto, Especificaciones y Botón de Cotización */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-28">
            
            {/* Tag de Categoría */}
            <div className="mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-[#EE2737]/10 text-[#EE2737] border border-[#EE2737]/25 text-xs font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EE2737]"></span>
                {project.categoryLabel}
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="text-2xl sm:text-3xl md:text-[2rem] font-display font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.2] mb-3">
              {project.title}
            </h1>

            {/* Metadatos (Cliente, Ubicación, Año) */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                Cliente: {project.client}
              </span>
              {project.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-[#EE2737]" />
                  {project.location}
                </span>
              )}
              {project.year && (
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {project.year}
                </span>
              )}
            </div>

            {/* Indicador de Cotización a Medida */}
            <div className="py-4 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                Modalidad del Servicio
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white">
                  {project.priceEstimate || 'Cotización Personalizada'}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans mt-1">
                Presupuesto adaptado a las dimensiones, materiales y requerimientos específicos de tu marca o vehículo.
              </p>
            </div>

            {/* Descripción del Proyecto */}
            <div className="py-4 border-b border-zinc-200 dark:border-zinc-800">
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                {project.description}
              </p>

              {/* Puntos Destacados */}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-sans">
                      <span className="text-[#EE2737] font-bold shrink-0 mt-0.5">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Ficha Técnica (Especificaciones de Materiales y Técnica) */}
            <div className="py-4 space-y-4 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                Ficha Técnica del Proyecto
              </h3>

              {/* Materiales */}
              <div>
                <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 block mb-1.5">
                  Materiales Certificados:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.materials.map((mat, i) => (
                    <span 
                      key={i}
                      className="inline-block px-2.5 py-1 rounded-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-sans font-medium text-zinc-800 dark:text-zinc-200"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Técnica */}
              <div>
                <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 block mb-0.5">
                  Técnica Aplicada:
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 font-sans leading-snug">
                  {project.technique}
                </p>
              </div>

              {/* Tiempo y Garantía */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Tiempo de Ejecución</span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white block mt-0.5">
                    {project.executionTime}
                  </span>
                </div>
                <div className="p-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Garantía Escrita</span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white block mt-0.5 truncate" title={project.warranty}>
                    {project.warranty}
                  </span>
                </div>
              </div>

            </div>

            {/* 3. CAJA DE COMPRA / COTIZACIÓN DIRECTA (High Conversion Buy Box) */}
            <div className="pt-6 flex flex-col gap-3">
              
              {/* Botón Primario de WhatsApp (Estilo Add-to-Cart) */}
              <a
                href={`https://wa.me/51994097417?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-sm bg-[#EE2737] hover:bg-zinc-900 dark:hover:bg-white text-white dark:hover:text-black font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-none text-center select-none group"
              >
                <WhatsAppIcon size={18} />
                <span>COTIZAR ESTE PROYECTO</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>

              {/* Botón Secundario de Consulta Técnica */}
              <a
                href="https://wa.me/51994097417?text=¡Hola!%20Deseo%20hacer%20una%20consulta%20técnica%20sobre%20materiales%20y%20factibilidad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-sans text-xs font-semibold tracking-wide transition-colors text-center"
              >
                <span>Consultar dudas con un asesor técnico</span>
                <ExternalLink size={13} />
              </a>

              <p className="text-[11px] font-mono text-zinc-400 text-center mt-1">
                Atención rápida • Asesoría de materiales en nuestro taller o por videollamada
              </p>

            </div>

          </div>

        </div>

        {/* 4. PROYECTOS RELACIONADOS DE LA MISMA CATEGORÍA */}
        {relatedProjects && relatedProjects.length > 0 && (
          <section className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#EE2737]">
                  Explora Más Opciones
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white">
                  Otros proyectos en {project.categoryLabel}
                </h3>
              </div>
              <a 
                href={`/galeria?categoria=${project.category}`}
                className="text-xs font-sans font-semibold text-zinc-600 dark:text-zinc-400 hover:text-[#EE2737] transition-colors"
              >
                Ver todos →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map(rel => (
                <a
                  key={rel.id}
                  href={`/galeria/${rel.id}`}
                  className="group block rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img 
                      src={rel.featuredImage} 
                      alt={rel.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                      <h4 className="text-xs sm:text-sm font-display font-bold text-white leading-snug line-clamp-2 group-hover:text-[#EE2737] transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-zinc-300 font-sans mt-0.5 truncate">
                        {rel.client}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

      </div>

    </article>
  );
}
