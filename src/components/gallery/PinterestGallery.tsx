import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  X, 
  Car, 
  Store, 
  Palette, 
  SlidersHorizontal, 
  Check, 
  LayoutGrid,
  RotateCcw
} from 'lucide-react';
import { 
  ALL_PROJECTS, 
  GALLERY_FILTER_GROUPS, 
  type ProjectItem 
} from '../../lib/projects';

type CategoryFilter = 'todos' | 'wrap' | 'branding' | 'diseno';

export default function PinterestGallery() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sincronización inicial con URL query parameters (?categoria=... & ?q=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('categoria');
    const qParam = params.get('q');
    const tagsParam = params.get('tags');

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

    if (tagsParam) {
      setSelectedTags(tagsParam.split(',').filter(Boolean));
    }
  }, []);

  // Bloquear scroll de página cuando el drawer lateral está abierto
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Actualizar query params sin recargar página
  const updateUrlParams = (cat: CategoryFilter, tags: string[], q: string) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);

    if (cat === 'todos') {
      url.searchParams.delete('categoria');
    } else {
      url.searchParams.set('categoria', cat);
    }

    if (tags.length > 0) {
      url.searchParams.set('tags', tags.join(','));
    } else {
      url.searchParams.delete('tags');
    }

    if (q.trim()) {
      url.searchParams.set('q', q.trim());
    } else {
      url.searchParams.delete('q');
    }

    window.history.replaceState({}, '', url.toString());
  };

  const handleCategoryChange = (cat: CategoryFilter) => {
    setSelectedCategory(cat);
    updateUrlParams(cat, selectedTags, searchQuery);
  };

  const handleToggleTag = (tagId: string) => {
    setSelectedTags(prev => {
      const next = prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId];
      updateUrlParams(selectedCategory, next, searchQuery);
      return next;
    });
  };

  const handleClearAllFilters = () => {
    setSelectedCategory('todos');
    setSelectedTags([]);
    setSearchQuery('');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Helper para verificar concordancia de tags seleccionados en el proyecto
  const matchesTag = (project: ProjectItem, tagId: string): boolean => {
    const textCorpus = [
      project.title,
      project.technique,
      project.description,
      ...project.materials,
      ...project.tags
    ].join(' ').toLowerCase();

    switch (tagId) {
      case 'camionetas':
        return textCorpus.includes('camioneta') || textCorpus.includes('pickup') || textCorpus.includes('hilux') || textCorpus.includes('ranger');
      case 'flotas':
        return textCorpus.includes('flota') || textCorpus.includes('van') || textCorpus.includes('furgon') || textCorpus.includes('comercial');
      case 'deportivos':
        return textCorpus.includes('deportivo') || textCorpus.includes('porsche') || textCorpus.includes('bmw') || textCorpus.includes('audi');
      case 'letreros':
        return textCorpus.includes('letrero') || textCorpus.includes('corpóreo') || textCorpus.includes('tótem');
      case 'fachadas':
        return textCorpus.includes('fachada') || textCorpus.includes('alucobond');
      case 'vitrinas':
        return textCorpus.includes('vitrina') || textCorpus.includes('tienda') || textCorpus.includes('esmerilado') || textCorpus.includes('retail');
      case 'identidad':
        return textCorpus.includes('identidad') || textCorpus.includes('branding') || textCorpus.includes('manual de marca') || textCorpus.includes('logotipo');
      case 'packaging':
        return textCorpus.includes('packaging') || textCorpus.includes('etiqueta') || textCorpus.includes('empaque') || textCorpus.includes('troquel');
      case 'gigantografias':
        return textCorpus.includes('gigantografía') || textCorpus.includes('valla') || textCorpus.includes('gran formato') || textCorpus.includes('panel');
      case 'wrap-total':
        return textCorpus.includes('wrap total') || textCorpus.includes('total');
      case 'rotulado':
        return textCorpus.includes('rotulado') || textCorpus.includes('corte');
      case 'corporeo':
        return textCorpus.includes('corpóreo') || textCorpus.includes('3d') || textCorpus.includes('letras 3d');
      case 'neon':
        return textCorpus.includes('neón') || textCorpus.includes('led') || textCorpus.includes('luminoso') || textCorpus.includes('caja de luz');
      case 'esmerilado':
        return textCorpus.includes('esmerilado');
      case 'troquel':
        return textCorpus.includes('troquel');
      case 'avery':
        return textCorpus.includes('avery');
      case '3m':
        return textCorpus.includes('3m');
      case 'arlon':
        return textCorpus.includes('arlon');
      case 'acrilico':
        return textCorpus.includes('acrílico') || textCorpus.includes('acrilico');
      case 'alucobond':
        return textCorpus.includes('alucobond');
      case 'acero':
        return textCorpus.includes('acero');
      default:
        return textCorpus.includes(tagId.toLowerCase());
    }
  };

  // Filtrado reactivo en vivo por categoría, tags del drawer y búsqueda
  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((item) => {
      // 1. Filtro de Categoría Principal
      const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      // 2. Filtro de Tags seleccionados en el Drawer (debe cumplir todos los seleccionados)
      if (selectedTags.length > 0) {
        const matchesAllTags = selectedTags.every(tagId => matchesTag(item, tagId));
        if (!matchesAllTags) return false;
      }

      // 3. Filtro de Búsqueda
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
  }, [selectedCategory, selectedTags, searchQuery]);

  // Pestañas de categoría directas con iconos
  const categoryTabs = [
    { key: 'todos' as CategoryFilter, label: 'Todos', icon: LayoutGrid },
    { key: 'wrap' as CategoryFilter, label: 'Wrap Automotriz', icon: Car },
    { key: 'branding' as CategoryFilter, label: 'Branding Comercial', icon: Store },
    { key: 'diseno' as CategoryFilter, label: 'Diseño e Identidad', icon: Palette }
  ];

  const totalActiveFilters = (selectedCategory !== 'todos' ? 1 : 0) + selectedTags.length + (searchQuery ? 1 : 0);

  return (
    <section className="relative w-full bg-white dark:bg-zinc-950 transition-colors duration-300">
      
      {/* 1. Barra de Control Superior (Sin Hero, Sin Título ni Descripción, con espacio superior para el Navbar) */}
      <div className="pt-28 sm:pt-32 md:pt-36 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800/80">
          
          {/* Pestañas de Categoría con Iconos */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 select-none">
            {categoryTabs.map(tab => {
              const isActive = selectedCategory === tab.key;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleCategoryChange(tab.key)}
                  className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-sans font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap border shadow-none ${
                    isActive
                      ? 'bg-[#EE2737] text-white border-[#EE2737]'
                      : 'bg-zinc-100 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-white' : 'text-zinc-500'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Controles de Búsqueda y Botón de Drawer de Filtros */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto">
            
            {/* Campo de Búsqueda */}
            <div className="relative flex-1 lg:w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  updateUrlParams(selectedCategory, selectedTags, e.target.value);
                }}
                placeholder="Buscar proyectos..."
                className="w-full pl-9 pr-8 py-2 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#EE2737] dark:focus:border-[#EE2737] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    updateUrlParams(selectedCategory, selectedTags, '');
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                  title="Limpiar búsqueda"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Botón de Apertura de Drawer "Filtros" (Estilo referencia con icono y badge) */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs sm:text-sm font-sans font-semibold transition-all duration-200 cursor-pointer shrink-0 select-none ${
                selectedTags.length > 0
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-black border-transparent'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
              }`}
              title="Abrir panel de filtros avanzados"
            >
              <SlidersHorizontal size={15} />
              <span>Filtros</span>
              {selectedTags.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#EE2737] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                  {selectedTags.length}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Barra de Estado con Filtros Activos y Limpiar Todo */}
        {totalActiveFilters > 0 && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <div className="flex flex-wrap items-center gap-1.5">
              <span>Filtros activos:</span>
              {selectedCategory !== 'todos' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200">
                  {selectedCategory === 'wrap' ? 'Wrap' : selectedCategory === 'branding' ? 'Branding' : 'Diseño'}
                  <button onClick={() => handleCategoryChange('todos')} className="hover:text-[#EE2737]">
                    <X size={11} />
                  </button>
                </span>
              )}
              {selectedTags.map(tagId => (
                <span key={tagId} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200">
                  {tagId}
                  <button onClick={() => handleToggleTag(tagId)} className="hover:text-[#EE2737]">
                    <X size={11} />
                  </button>
                </span>
              ))}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-[#EE2737]">
                    <X size={11} />
                  </button>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleClearAllFilters}
              className="inline-flex items-center gap-1 text-[#EE2737] hover:underline cursor-pointer ml-auto font-sans font-medium"
            >
              <RotateCcw size={12} />
              <span>Limpiar todo</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Grilla Dinámica Estilo Pinterest (Minimalista: Sin badges, sin ubicación, SOLO título) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        
        {filteredProjects.length === 0 ? (
          <div className="text-center py-24 px-4 rounded-md border border-dashed border-zinc-300 dark:border-zinc-800">
            <p className="text-base sm:text-lg font-display font-bold text-zinc-800 dark:text-zinc-200 mb-2">
              No se encontraron proyectos con ese criterio
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-6">
              Prueba cambiando los tags seleccionados o restableciendo los filtros para ver todos los trabajos.
            </p>
            <button
              type="button"
              onClick={handleClearAllFilters}
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
                {/* Contenedor de Imagen con Proporción Natural */}
                <div className={`relative w-full ${project.aspectRatioClass || 'aspect-[4/3]'} overflow-hidden bg-zinc-950`}>
                  <img
                    src={project.featuredImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradiente Inferior Suave */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 transition-opacity duration-300 pointer-events-none"></div>

                  {/* Únicamente el Título del Proyecto (Estricto: Sin badges, sin contadores, sin ubicación) */}
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

      {/* 3. Off-Canvas Slide-Over Drawer de Filtros (Exactamente como en la captura del usuario) */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Fondo con desenfoque suave */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />

        {/* Panel Lateral Deslizable desde la Derecha */}
        <div 
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm sm:max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del Drawer */}
          <div className="p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <h2 className="font-display font-bold text-lg sm:text-xl text-zinc-950 dark:text-white">
                Filtros
              </h2>
              {selectedTags.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#EE2737] text-white text-xs font-mono font-bold">
                  {selectedTags.length}
                </span>
              )}
            </div>

            {/* Botón Circular de Cerrar (X) como en la referencia */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="w-9 h-9 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Cerrar filtros"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cuerpo Scrolleable con Grupos de Filtros */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-6 divide-y divide-zinc-200 dark:divide-zinc-800 select-none">
            {GALLERY_FILTER_GROUPS.map((group, groupIdx) => (
              <div key={group.id} className={groupIdx > 0 ? 'pt-6' : ''}>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3.5">
                  {group.title}
                </h3>

                <div className="space-y-1.5">
                  {group.options.map(option => {
                    const isGroupCategory = group.id === 'category';
                    const isSelected = isGroupCategory 
                      ? selectedCategory === option.id 
                      : selectedTags.includes(option.id);

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          if (isGroupCategory) {
                            handleCategoryChange(option.id as CategoryFilter);
                          } else {
                            handleToggleTag(option.id);
                          }
                        }}
                        className={`w-full flex items-center gap-3 py-2 px-2.5 rounded-sm text-left text-sm transition-colors cursor-pointer ${
                          isSelected
                            ? 'font-bold text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-900'
                            : 'font-normal text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/60'
                        }`}
                      >
                        {/* Checkmark a la izquierda exactamente como en la referencia */}
                        <div className="w-5 flex items-center justify-center shrink-0">
                          {isSelected && (
                            <Check size={16} className="text-[#EE2737] stroke-[2.5]" />
                          )}
                        </div>

                        <span className="flex-1 truncate">{option.label}</span>

                        {option.badge && (
                          <span className="text-[11px] font-mono text-zinc-400">
                            {option.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Fijo con Botones "Limpiar" y "Cerrar" (Píldoras redondeadas de la referencia) */}
          <div className="p-4 sm:p-5 border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xs flex items-center gap-3">
            {/* Botón Clear (Outline) */}
            <button
              type="button"
              onClick={handleClearAllFilters}
              className="flex-1 py-3 px-4 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-sans font-semibold text-xs sm:text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-center cursor-pointer"
            >
              Limpiar
            </button>

            {/* Botón Close (Solid) */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="flex-1 py-3 px-4 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-black font-sans font-bold text-xs sm:text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors text-center cursor-pointer shadow-md"
            >
              Cerrar ({filteredProjects.length})
            </button>
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