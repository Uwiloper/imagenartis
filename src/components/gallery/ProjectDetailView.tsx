import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  ArrowLeft,
  Share2,
  X,
  Check,
  Copy,
  Play,
  ExternalLink,
  MessageCircle,
  Smartphone
} from 'lucide-react';
import type { ProjectItem, MediaItem } from '../../lib/projects';

interface ProjectDetailViewProps {
  project: ProjectItem;
  relatedProjects: ProjectItem[];
}

// Icono SVG exacto de WhatsApp
export function WhatsAppIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
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
  // Construir lista de medios combinando galleryMedia si existe, o galleryImages, o featuredImage
  const mediaList: MediaItem[] = React.useMemo(() => {
    if (project.galleryMedia && project.galleryMedia.length > 0) {
      return project.galleryMedia;
    }
    if (project.galleryImages && project.galleryImages.length > 0) {
      return project.galleryImages.map(img => ({
        type: 'image' as const,
        url: img,
        title: project.title
      }));
    }
    return [
      {
        type: 'image' as const,
        url: project.featuredImage,
        title: project.title
      }
    ];
  }, [project]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  // Estado del modal de compartir
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const currentMedia = mediaList[activeIndex] || mediaList[0];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Bloquear scroll cuando el modal Lightbox está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsZoomed(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Atajos de teclado para el Lightbox modal (ESC, flechas, Z)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isShareOpen && e.key === 'Escape') {
        setIsShareOpen(false);
        return;
      }

      if (!isModalOpen) return;

      if (e.key === 'Escape') {
        setIsModalOpen(false);
      } else if (e.key === 'ArrowLeft') {
        handlePrevMedia();
      } else if (e.key === 'ArrowRight') {
        handleNextMedia();
      } else if (e.key === 'z' || e.key === 'Z') {
        setIsZoomed(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, isShareOpen, mediaList.length]);

  const handlePrevMedia = () => {
    setIsZoomed(false);
    setActiveIndex(prev => (prev - 1 + mediaList.length) % mediaList.length);
  };

  const handleNextMedia = () => {
    setIsZoomed(false);
    setActiveIndex(prev => (prev + 1) % mediaList.length);
  };

  // Toggle de zoom con origen en las coordenadas del clic del usuario
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

  const openLightbox = (index?: number) => {
    if (typeof index === 'number') {
      setActiveIndex(index);
    }
    setIsZoomed(false);
    setIsModalOpen(true);
  };

  // Manejo de compartir y copiado al portapapeles
  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: `Mira este proyecto de ${project.categoryLabel} en Imagen Artis: ${project.title}`,
          url: currentUrl
        });
      } catch (err) {
        // Usuario canceló compartir
      }
    }
  };

  // Mensaje predeterminado de WhatsApp para cotización
  const whatsappQuoteUrl = `https://wa.me/51994097417?text=${encodeURIComponent(
    `¡Hola Imagen Artis! Vi en su galería el proyecto "${project.title}" y deseo cotizar un trabajo similar.`
  )}`;

  return (
    <article className="w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
      
      {/* 1. Barra Superior con Breadcrumbs, Volver y Compartir */}
      <div className="pt-28 sm:pt-32 md:pt-36 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2 border-b border-zinc-200 dark:border-zinc-800/80">
          
          {/* Breadcrumb de navegación */}
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

          {/* Botones de Acción Superior */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Botón de Compartir con Modal */}
            <button
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-sans font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
              title="Compartir este proyecto"
            >
              <Share2 size={13} />
              <span className="hidden sm:inline">Compartir</span>
            </button>

            {/* Volver a Galería */}
            <a
              href="/galeria"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-xs font-sans font-semibold text-zinc-900 dark:text-white transition-colors"
            >
              <ArrowLeft size={13} />
              <span className="hidden sm:inline">Volver</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. Cuerpo Principal: 60% Visuales (Izquierda) / 40% Contenido (Derecha) en PC y Tablet */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          
          {/* COLUMNA IZQUIERDA (60%): Visuales, Fotos, Videos YouTube, Video MP4 */}
          <div className="w-full lg:w-[60%] shrink-0 flex flex-col gap-4">
            
            {/* Visor Principal */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-none select-none group">
              
              {/* RENDERIZADO CONDICIONAL DE MEDIOS */}
              {currentMedia.type === 'youtube' ? (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <iframe
                    src={currentMedia.url}
                    title={currentMedia.title || project.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : currentMedia.type === 'video' ? (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <video
                    src={currentMedia.url}
                    poster={currentMedia.thumbnail || project.featuredImage}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                /* Imagen con Clic para Abrir Modal Lightbox */
                <div 
                  className="w-full h-full flex items-center justify-center cursor-pointer group relative overflow-hidden"
                  onClick={() => openLightbox(activeIndex)}
                  title="Haz clic para ver de cerca y hacer zoom"
                >
                  <img
                    src={currentMedia.url}
                    alt={currentMedia.title || project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
                </div>
              )}

              {/* ÚNICO BADGE PERMITIDO: Botón de Zoom (Abre el Lightbox Modal como en Diseño Servicios) */}
              <button
                type="button"
                onClick={() => openLightbox(activeIndex)}
                className="absolute top-3.5 right-3.5 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-black/75 hover:bg-[#EE2737] text-white font-sans text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer border border-white/10"
                title="Ampliar vista en modal interactivo"
              >
                <ZoomIn size={13} />
                <span>Zoom</span>
              </button>

              {/* Flechas de Navegación de Medios (si hay más de 1) */}
              {mediaList.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevMedia}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-[#EE2737] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 border border-white/10"
                    title="Medio anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMedia}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-[#EE2737] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 border border-white/10"
                    title="Medio siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Indicador de posición de medio */}
              {mediaList.length > 1 && (
                <div className="absolute bottom-3 right-3 z-20 px-2 py-0.5 rounded-xs bg-black/75 text-white font-mono text-[10px] backdrop-blur-xs">
                  {activeIndex + 1} / {mediaList.length}
                </div>
              )}
            </div>

            {/* Miniaturas Horizontales de Selección de Medio */}
            {mediaList.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5">
                {mediaList.map((media, idx) => {
                  const isActive = idx === activeIndex;
                  const thumbSrc = media.thumbnail || (media.type === 'image' ? media.url : project.featuredImage);
                  const isVideoType = media.type === 'video' || media.type === 'youtube';

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`relative aspect-[16/11] rounded-sm overflow-hidden border-2 transition-all cursor-pointer bg-black ${
                        isActive
                          ? 'border-[#EE2737] ring-1 ring-[#EE2737]/40 opacity-100 scale-[1.02]'
                          : 'border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-400'
                      }`}
                      title={media.title || `Elemento ${idx + 1}`}
                    >
                      <img 
                        src={thumbSrc} 
                        alt={`Miniatura ${idx + 1}`} 
                        className="w-full h-full object-cover" 
                      />

                      {/* Icono de Reproducción si es Video o YouTube */}
                      {isVideoType && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <div className="w-5 h-5 rounded-full bg-[#EE2737] text-white flex items-center justify-center">
                            <Play size={10} fill="white" className="ml-0.5" />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

          </div>

          {/* COLUMNA DERECHA (40%): SOLO Título, Descripción Corta y Botón de Cotizar con Efecto WhatsApp */}
          <div className="w-full lg:w-[40%] flex flex-col justify-start">
            
            {/* 1. Título Principal (Sin badges ni categorías encima) */}
            <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] font-display font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-4">
              {project.title}
            </h1>

            {/* 2. Descripción Corta */}
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
              {project.description}
            </p>

            {/* 3. Botón de Cotizar Trabajo con Efecto WhatsApp Idéntico al Navbar y CTA */}
            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col gap-2.5">
              <a
                href={whatsappQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-center bg-[#EE2737] hover:bg-green-700 text-white font-sans font-bold tracking-wider py-4 px-6 rounded-sm text-xs sm:text-sm uppercase transition-all duration-300 overflow-hidden shadow-none cursor-pointer text-center select-none"
              >
                {/* Icono de WhatsApp con animación de expansión suave en hover */}
                <WhatsAppIcon 
                  size={18} 
                  className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover:mr-2.5 transition-all duration-300 shrink-0" 
                />
                <span>COTIZAR TRABAJO</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>

              <p className="text-[11px] font-mono text-zinc-400 text-center">
                Respuesta inmediata por WhatsApp • Asesoría personalizada
              </p>
            </div>

          </div>

        </div>

        {/* 3. PROYECTOS RELACIONADOS (Carrusel Infinito si son > 3; Estático si son <= 3) */}
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

            {relatedProjects.length > 3 ? (
              /* CARRUSEL INFINITO AUTOMÁTICO (Marquee continuo con pausa en hover) */
              <div className="relative w-full overflow-hidden group select-none py-2">
                <div className="flex items-center gap-5 w-max animate-marquee hover:[animation-play-state:paused]">
                  {/* Duplicar lista para bucle infinito sin saltos */}
                  {[...relatedProjects, ...relatedProjects].map((rel, i) => (
                    <a
                      key={rel.id + '-' + i}
                      href={`/galeria/${rel.id}`}
                      className="w-72 sm:w-80 shrink-0 block rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-black">
                        <img 
                          src={rel.featuredImage} 
                          alt={rel.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                          <h4 className="text-xs sm:text-sm font-display font-bold text-white leading-snug line-clamp-2">
                            {rel.title}
                          </h4>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              /* GRILLA ESTÁTICA SI SON <= 3 */
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
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </section>
        )}

      </div>

      {/* 4. MODAL LIGHTBOX DE ZOOM Y PANTALLA COMPLETA (Idéntico al de Diseño Servicios) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Header Superior del Modal */}
          <div 
            className="w-full border-b border-zinc-800 bg-black/60 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between z-30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Info y Contador */}
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-sm bg-[#EE2737] text-white font-mono text-xs font-bold uppercase">
                {String(activeIndex + 1).padStart(2, '0')} / {String(mediaList.length).padStart(2, '0')}
              </span>
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-white truncate max-w-[200px] sm:max-w-md">
                  {currentMedia.title || project.title}
                </h4>
              </div>
            </div>

            {/* Controles de Zoom y Cerrar */}
            <div className="flex items-center gap-2 sm:gap-3">
              {currentMedia.type === 'image' && (
                <button
                  type="button"
                  onClick={() => setIsZoomed(prev => !prev)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-zinc-800 hover:bg-zinc-700 text-white font-sans text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                  title={isZoomed ? 'Restablecer vista 100%' : 'Hacer zoom al 200%'}
                >
                  {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
                  <span className="hidden sm:inline">{isZoomed ? 'Restablecer' : 'Zoom 2x'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-sm bg-zinc-800 hover:bg-[#EE2737] text-white transition-colors cursor-pointer"
                title="Cerrar modal (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Área Central: Flechas de Navegación y Visor con Zoom */}
          <div 
            className="relative flex-1 w-full flex items-center justify-center overflow-hidden p-2 sm:p-6"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Flecha Izquierda */}
            {mediaList.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevMedia();
                }}
                className="absolute left-3 sm:left-8 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-900/80 hover:bg-[#EE2737] border border-white/10 text-white flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
                title="Elemento anterior (←)"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Contenedor del Medio con Zoom */}
            <div 
              className={`relative max-w-5xl max-h-[70vh] sm:max-h-[76vh] flex items-center justify-center overflow-hidden rounded-md transition-all duration-300 ${
                currentMedia.type === 'image' ? (isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in') : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (currentMedia.type === 'image') {
                  handleToggleZoom(e);
                }
              }}
            >
              {currentMedia.type === 'youtube' ? (
                <div className="w-[85vw] max-w-4xl aspect-video bg-black rounded-md overflow-hidden">
                  <iframe
                    src={currentMedia.url}
                    title={currentMedia.title || project.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : currentMedia.type === 'video' ? (
                <div className="w-[85vw] max-w-4xl aspect-video bg-black rounded-md overflow-hidden flex items-center justify-center">
                  <video
                    src={currentMedia.url}
                    poster={currentMedia.thumbnail || project.featuredImage}
                    controls
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <img 
                  src={currentMedia.url} 
                  alt={currentMedia.title || project.title}
                  style={{
                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`
                  }}
                  className={`max-w-full max-h-[70vh] sm:max-h-[76vh] object-contain rounded-md transition-transform duration-300 ease-out select-none ${
                    isZoomed ? 'scale-[2.1]' : 'scale-100'
                  }`}
                />
              )}
            </div>

            {/* Flecha Derecha */}
            {mediaList.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextMedia();
                }}
                className="absolute right-3 sm:right-8 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-900/80 hover:bg-[#EE2737] border border-white/10 text-white flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
                title="Elemento siguiente (→)"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Tira Inferior: Miniaturas en el Modal + Indicaciones de Teclado */}
          <div 
            className="w-full border-t border-zinc-800 bg-black/60 backdrop-blur-md px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 z-30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lista de Miniaturas Horizontales */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
              {mediaList.map((media, idx) => {
                const isActive = idx === activeIndex;
                const thumbSrc = media.thumbnail || (media.type === 'image' ? media.url : project.featuredImage);
                return (
                  <button
                    key={'modal-thumb-' + idx}
                    type="button"
                    onClick={() => {
                      setIsZoomed(false);
                      setActiveIndex(idx);
                    }}
                    className={`relative w-14 h-10 sm:w-16 sm:h-11 rounded-sm overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-black ${
                      isActive 
                        ? 'border-[#EE2737] ring-1 ring-[#EE2737]/50 scale-105 opacity-100' 
                        : 'border-transparent opacity-50 hover:opacity-90'
                    }`}
                    title={media.title}
                  >
                    <img 
                      src={thumbSrc} 
                      alt={`Miniatura ${idx + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Atajos de Teclado */}
            <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono text-zinc-400">
              <span>← / → Cambiar</span>
              <span>•</span>
              <span>Clic: Zoom</span>
              <span>•</span>
              <span>Z: Zoom</span>
              <span>•</span>
              <span>ESC: Cerrar</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL FLOTANTE DE COMPARTIR (Sin interrumpir navegación ni vista) */}
      {isShareOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-fadeIn"
          onClick={() => setIsShareOpen(false)}
        >
          <div 
            className="w-full max-w-sm sm:max-w-md bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Share2 size={16} className="text-[#EE2737]" />
                <h3 className="font-display font-bold text-base sm:text-lg text-zinc-950 dark:text-white">
                  Compartir Proyecto
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsShareOpen(false)}
                className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Opciones de Compartir en Redes */}
            <div className="py-5 space-y-4">
              <p className="text-xs font-sans text-zinc-500 dark:text-zinc-400">
                Comparte este trabajo con clientes, socios o en tus redes sociales:
              </p>

              {/* Botones de Redes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Mira este trabajo de ${project.title}: ${currentUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-sm bg-zinc-50 dark:bg-zinc-800 hover:bg-green-500/10 hover:border-green-500/30 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:text-green-600 dark:hover:text-green-400 transition-colors text-xs font-semibold"
                >
                  <WhatsAppIcon size={20} className="text-green-500" />
                  <span>WhatsApp</span>
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-sm bg-zinc-50 dark:bg-zinc-800 hover:bg-blue-500/10 hover:border-blue-500/30 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs font-semibold"
                >
                  <span className="font-bold text-base text-blue-600">f</span>
                  <span>Facebook</span>
                </a>

                {/* X (Twitter) */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(project.title)}&url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-sm bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-950/10 hover:border-zinc-500/30 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-colors text-xs font-semibold"
                >
                  <span className="font-bold text-base">𝕏</span>
                  <span>X / Twitter</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-sm bg-zinc-50 dark:bg-zinc-800 hover:bg-blue-600/10 hover:border-blue-600/30 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:text-blue-700 dark:hover:text-blue-400 transition-colors text-xs font-semibold"
                >
                  <span className="font-bold text-base text-[#0a66c2]">in</span>
                  <span>LinkedIn</span>
                </a>
              </div>

              {/* Caja de Copiar Link */}
              <div className="pt-2">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Enlace directo:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={currentUrl}
                    className="flex-1 py-2 px-3 rounded-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-200 select-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={`inline-flex items-center gap-1.5 py-2 px-3.5 rounded-sm text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                      copied 
                        ? 'bg-green-600 text-white' 
                        : 'bg-[#EE2737] hover:bg-zinc-900 dark:hover:bg-white text-white dark:hover:text-black'
                    }`}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              {/* Botón de Compartir Nativo (si el navegador lo soporta) */}
              {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs font-sans font-semibold text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
                  >
                    <Smartphone size={14} />
                    <span>Compartir con aplicaciones de tu teléfono</span>
                  </button>
                </div>
              )}
            </div>

            {/* Footer del Modal */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-right">
              <button
                type="button"
                onClick={() => setIsShareOpen(false)}
                className="px-4 py-2 rounded-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-sans font-semibold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </article>
  );
}