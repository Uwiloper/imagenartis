import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Car, Store, Palette } from 'lucide-react';
import { ALL_PROJECTS, type ProjectItem } from '../../lib/projects';

type CategoryFilter = 'todos' | 'wrap' | 'branding' | 'diseno';

export default function PinterestGallery() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Sincronización inicial con URL query parameters (?categoria=... & ?q=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('categoria');
    const qParam = params.get('q');

    if (catParam) {
      if (['wrap', 'branding', 'diseno', 'todos'].includes(catParam)) {
        setSelectedCategory(catParam as CategoryFilter);
      } else if (catParam.includes('wrap') || catParam.includes('flotas') || catParam.includes('ppf') || catParam.includes('auto')) {
        setSelectedCategory('wrap');
      } else if (catParam.includes('brand') || catParam.includes('letrero') || catParam.includes('fachada') || catParam.includes('vitrina')) {
        setSelectedCategory('branding');
      } else if (catParam.includes('diseno') || catParam.includes('digital') || catParam.includes('impresion') || catParam.includes('packaging')) {
        setSelectedCategory('diseno');
      }
    }

    if (qParam) {
      setSearchQuery(qParam);
    }
  }, []);

  // Actualizar query params sin recargar página
  const handleCategoryChange = (cat: CategoryFilter) => {
    setSelectedCategory(cat);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (cat === 'todos') {
        url.searchParams.delete('categoria');
      } else {
        url.searchParams.set('categoria', cat);
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Filtrado reactivo en vivo por categoría y término de búsqueda
  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((item) => {
      // 1. Filtro de Categoría
      const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      // 2. Filtro de Búsqueda
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const inTitle = item.title.toLowerCase().includes(q);
      const inClient = item.client.toLowerCase().includes(q);
      const inLocation = item.location ? item.location.toLowerCase().includes(q) : false;
      const inDescription = item.description.toLowerCase().includes(q);
      const inTechnique = item.technique.toLowerCase().includes(q);
      const inMaterials = item.materials.some(m => m.toLowerCase().includes(q));
      const inTags = item.tags.some(t => t.toLowerCase().includes(q));

      return inTitle || inClient || inLocation || inDescription || inTechnique || inMaterials || inTags;
    });
  }, [selectedCategory, searchQuery]);

  // Pestañas de categoría (sin contadores numéricos, manteniendo diseño limpio)
  const categoryTabs = [
    { key: 'todos' as CategoryFilter, label: 'Todos', icon: null },
    { key: 'wrap' as CategoryFilter, label: 'Wrap Automotriz', icon: Car },
    { key: 'branding' as CategoryFilter, label: 'Branding Comercial', icon: Store },
    { key: 'diseno' as CategoryFilter, label: 'Diseño e Identidad', icon: Palette }
  ];

  return (
    <section className="relative w-full bg-white dark:bg-zinc-950 transition-colors duration-300">
      
      {/* 1. Barra de Control Directa (Sin Hero, Sin Título ni Descripción, con espacio superior para el Navbar) */}
      <div className="pt-28 sm:pt-32 md:pt-36 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800/80">
          
          {/* Pestañas de Filtro por Servicio */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 select-none">
            {categoryTabs.map(tab => {
              const isActive = selectedCategory === tab.key;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleCategoryChange(tab.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs sm:text-sm font-sans font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap border shadow-none ${
                    isActive
                      ? 'bg-[#EE2737] text-white border-[#EE2737]'
                      : 'bg-zinc-100 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  {Icon && <Icon size={15} className={isActive ? 'text-white' : 'text-zinc-500'} />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Campo de Búsqueda Reactiva */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar proyectos o materiales..."
              className="w-full pl-9 pr-9 py-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#EE2737] dark:focus:border-[#EE2737] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                title="Limpiar búsqueda"
              >
                <X size={14} />
              </button>
            )}
          </div>

        </div>

        {/* Enlace sutil para limpiar filtros si hay búsqueda o filtro activo */}
        {(searchQuery || selectedCategory !== 'todos') && (
          <div className="mt-3 flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span>
              {searchQuery && <span>Buscando: "{searchQuery}"</span>}
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
                if (typeof window !== 'undefined') {
                  const url = new URL(window.location.href);
                  url.search = '';
                  window.history.replaceState({}, '', url.toString());
                }
              }}
              className="text-[#EE2737] hover:underline cursor-pointer ml-auto"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </div>

      {/* 2. Grilla Dinámica Estilo Pinterest (Masonry Grid sin Badges, sin Ubicación, solo Título y navegación a página de detalle) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        
        {filteredProjects.length === 0 ? (
          <div className="text-center py-24 px-4 rounded-md border border-dashed border-zinc-300 dark:border-zinc-800">
            <p className="text-base sm:text-lg font-display font-bold text-zinc-800 dark:text-zinc-200 mb-2">
              No se encontraron proyectos con ese criterio
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-6">
              Prueba con otros términos como "Hilux", "Letrero", "Acrílico", "3M" o "Packaging".
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-sm bg-[#EE2737] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
            >
              Ver todos los proyectos
            </button>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 [column-fill:_balance]">
            {filteredProjects.map((project) => (
              <a
                key={project.id}
                href={`/galeria/${project.id}`}
                className="block break-inside-avoid mb-4 sm:mb-5 group rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-none relative select-none"
              >
                {/* Contenedor de Imagen con Proporción Natural (Estilo Pinterest) */}
                <div className={`relative w-full ${project.aspectRatioClass || 'aspect-[4/3]'} overflow-hidden bg-zinc-950`}>
                  <img
                    src={project.featuredImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradiente Inferior Suave */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 transition-opacity duration-300 pointer-events-none"></div>

                  {/* Únicamente el Título del Proyecto (Sin badges, sin contadores, sin ubicación) */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 pointer-events-none">
                    <h3 className="text-xs sm:text-sm font-display font-bold text-white leading-snug drop-shadow-sm group-hover:text-[#EE2737] transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

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
