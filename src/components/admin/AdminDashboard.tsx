import { useState, useRef, useEffect } from 'react';
import type { AdminDashboardData, AuditLogItem, SectionCard } from '../../lib/admin';
import {
  LayoutDashboard,
  History,
  Sparkles,
  Layers,
  Workflow,
  Images,
  PhoneCall,
  Navigation,
  PanelBottom,
  Building2,
  ExternalLink,
  RefreshCw,
  Monitor,
  Tablet,
  Smartphone,
  ChevronDown,
  ChevronRight,
  Clock,
  ArrowUpRight,
  Edit3,
  Sliders,
  CheckCircle2,
  FolderGit2,
  Menu,
  X,
  Eye,
  ShieldCheck,
  Globe,
  Compass,
} from 'lucide-react';

interface Props {
  initialData: AdminDashboardData;
}

export default function AdminDashboard({ initialData }: Props) {
  // Estado de navegación principal
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'customizer'>('dashboard');
  
  // Barra lateral desglosable
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    universales: true,
    home: true,
    servicios: false,
  });

  // Estado para el Personalizador en Tiempo Real
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedEditorUrl, setSelectedEditorUrl] = useState<string>('/keystatic/singleton/homeLayout');
  const [selectedEditorName, setSelectedEditorName] = useState<string>('Diseño y Orden de Secciones');
  const [previewKey, setPreviewKey] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOpenCustomizer = (editUrl: string, name: string) => {
    setSelectedEditorUrl(editUrl);
    setSelectedEditorName(name);
    setActiveTab('customizer');
  };

  const reloadPreview = () => {
    setPreviewKey((k) => k + 1);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans antialiased">
      
      {/* ========================================================================= */}
      {/* BARRA IZQUIERDA DESGLOSABLE (ESTILO WORDPRESS CON BRANDING DE IMAGENARTIS) */}
      {/* ========================================================================= */}
      <aside
        className={`flex flex-col border-r border-zinc-800 bg-[#0d0d0f] transition-all duration-300 z-30 select-none ${
          sidebarCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Cabecera de la Barra: Logo Imagenartis + CMS Panel */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-zinc-800/80">
          <a href="/admin" className="flex items-center gap-3 overflow-hidden group">
            <img
              src="/logo-horizontal.svg"
              alt="Imagenartis"
              className="h-7 w-auto object-contain shrink-0"
            />
            {!sidebarCollapsed && (
              <div className="flex flex-col leading-none">
                <span className="font-heading font-black tracking-widest text-sm text-white flex items-center gap-1.5">
                  CMS <span className="text-[#ff0032] text-[10px] px-1 py-0.5 rounded-xs bg-[#ff0032]/10 border border-[#ff0032]/20">PRO</span>
                </span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-wider mt-0.5">
                  PANEL ADMIN
                </span>
              </div>
            )}
          </a>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
            title={sidebarCollapsed ? 'Expandir barra lateral' : 'Contraer barra lateral'}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Enlace Rápido al Sitio Web en Vivo */}
        <div className="px-3 pt-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 border border-zinc-800/50 transition-colors ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            <Globe size={15} className="text-[#ff0032]" />
            {!sidebarCollapsed && (
              <div className="flex items-center justify-between w-full">
                <span>Ver Sitio Web</span>
                <ArrowUpRight size={13} className="text-zinc-500" />
              </div>
            )}
          </a>
        </div>

        {/* Menú de Navegación con Acordeón Desglosable */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin scrollbar-thumb-zinc-800">
          
          {/* Navegación Principal */}
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-[#ff0032] text-white font-semibold shadow-sm'
                  : 'text-zinc-300 hover:bg-zinc-800/70 hover:text-white'
              }`}
              title="Escritorio / Dashboard"
            >
              <LayoutDashboard size={18} className="shrink-0" />
              {!sidebarCollapsed && <span>Escritorio (Dashboard)</span>}
            </button>

            <button
              onClick={() => setActiveTab('customizer')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'customizer'
                  ? 'bg-[#ff0032] text-white font-semibold shadow-sm'
                  : 'text-zinc-300 hover:bg-zinc-800/70 hover:text-white'
              }`}
              title="Personalizador en Tiempo Real"
            >
              <Eye size={18} className="shrink-0 text-emerald-400" />
              {!sidebarCollapsed && (
                <div className="flex items-center justify-between w-full">
                  <span>Personalizador en Vivo</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-xs font-mono">
                    LIVE
                  </span>
                </div>
              )}
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-[#ff0032] text-white font-semibold shadow-sm'
                  : 'text-zinc-300 hover:bg-zinc-800/70 hover:text-white'
              }`}
              title="Historial de Cambios"
            >
              <History size={18} className="shrink-0 text-amber-400" />
              {!sidebarCollapsed && <span>Historial de Cambios</span>}
            </button>
          </div>

          {/* GRUPO 1: UNIVERSALES (Prioritarios / Afectan toda la web) */}
          <div className="pt-2">
            {!sidebarCollapsed ? (
              <button
                onClick={() => toggleGroup('universales')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span className="flex items-center gap-1.5 font-bold">
                  🌟 Universales (Global)
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    openGroups.universales ? 'rotate-180' : ''
                  }`}
                />
              </button>
            ) : (
              <div className="h-px bg-zinc-800 my-2" />
            )}

            {(openGroups.universales || sidebarCollapsed) && (
              <div className="mt-1 space-y-0.5">
                {initialData.universales.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleOpenCustomizer(item.editUrl, item.name)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors group text-left"
                    title={item.name}
                  >
                    <Navigation size={15} className="shrink-0 text-emerald-400 group-hover:scale-110 transition-transform" />
                    {!sidebarCollapsed && (
                      <span className="truncate flex-1">{item.name}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* GRUPO 2: PÁGINA DE INICIO (Home y sus secciones) */}
          <div className="pt-1">
            {!sidebarCollapsed ? (
              <button
                onClick={() => toggleGroup('home')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span className="flex items-center gap-1.5 font-bold">
                  🏠 Página de Inicio
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    openGroups.home ? 'rotate-180' : ''
                  }`}
                />
              </button>
            ) : (
              <div className="h-px bg-zinc-800 my-2" />
            )}

            {(openGroups.home || sidebarCollapsed) && (
              <div className="mt-1 space-y-0.5">
                {initialData.homeSections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleOpenCustomizer(item.editUrl, item.name)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors group text-left"
                    title={item.name}
                  >
                    <Layers size={15} className="shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
                    {!sidebarCollapsed && (
                      <span className="truncate flex-1">{item.name}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* GRUPO 3: SERVICIOS Y PORTAFOLIO */}
          <div className="pt-1">
            {!sidebarCollapsed ? (
              <button
                onClick={() => toggleGroup('servicios')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors"
              >
                <span className="flex items-center gap-1.5 font-bold">
                  💼 Servicios & Portafolio
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    openGroups.servicios ? 'rotate-180' : ''
                  }`}
                />
              </button>
            ) : (
              <div className="h-px bg-zinc-800 my-2" />
            )}

            {(openGroups.servicios || sidebarCollapsed) && (
              <div className="mt-1 space-y-0.5">
                <a
                  href="/keystatic/collection/showcase"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-colors group text-left"
                  title="Gestionar Todos los Proyectos"
                >
                  <Sparkles size={15} className="shrink-0 text-purple-400 group-hover:scale-110 transition-transform" />
                  {!sidebarCollapsed && (
                    <span className="truncate flex-1">Ver Todos los Proyectos</span>
                  )}
                </a>
              </div>
            )}
          </div>

        </div>

        {/* Pie de Barra Lateral: Estado y Atajos */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/80 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {!sidebarCollapsed && (
              <span className="font-mono text-[11px] text-zinc-300">
                Sincronización Local
              </span>
            )}
          </div>
          {!sidebarCollapsed && (
            <a
              href="/keystatic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 font-mono"
            >
              <span>Panel Base</span>
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* ÁREA PRINCIPAL: DASHBOARD / HISTORIAL / PERSONALIZADOR EN TIEMPO REAL     */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-900/40">
        
        {/* BARRA SUPERIOR DE ACCIÓN (ESTILO WORDPRESS ADMIN TOPBAR) */}
        <header className="h-14 border-b border-zinc-800/90 bg-[#0d0d0f]/90 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-base font-heading font-bold text-white tracking-wide flex items-center gap-2.5">
              <span>{activeTab === 'dashboard' ? 'Escritorio de Contenidos' : activeTab === 'history' ? 'Historial de Modificaciones' : 'Personalizador en Tiempo Real'}</span>
            </h1>
            <span className="text-zinc-600">/</span>
            <span className="text-xs text-zinc-400 font-mono">
              {activeTab === 'dashboard' ? 'Visión General y Singletons' : activeTab === 'history' ? 'Registro de Auditoría' : selectedEditorName}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('customizer')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              <Eye size={14} />
              <span>Ver en Tiempo Real</span>
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 transition-colors"
            >
              <span>Abrir Web</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </header>

        {/* CUERPO DEL CONTENIDO SEGÚN LA PESTAÑA ACTIVA */}
        <div className="flex-1 overflow-y-auto">
          
          {/* ===================================================================== */}
          {/* VISTA 1: DASHBOARD / ESCRITORIO CON SINGLETONS POR PÁGINA             */}
          {/* ===================================================================== */}
          {activeTab === 'dashboard' && (
            <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
              
              {/* Tarjetas de Métricas Rápidas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold">Secciones Home</span>
                    <Layers size={18} className="text-blue-400" />
                  </div>
                  <div className="mt-3">
                    <span className="text-3xl font-display font-bold text-white">
                      {initialData.stats.totalHomeSections}
                    </span>
                    <span className="text-xs text-zinc-400 block mt-1 font-sans">
                      Módulos reordenables en inicio
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold">Universales</span>
                    <Navigation size={18} className="text-emerald-400" />
                  </div>
                  <div className="mt-3">
                    <span className="text-3xl font-display font-bold text-white">
                      {initialData.stats.totalUniversales}
                    </span>
                    <span className="text-xs text-zinc-400 block mt-1 font-sans">
                      Navbar, Footer y Contacto Global
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold">Portafolio</span>
                    <Sparkles size={18} className="text-purple-400" />
                  </div>
                  <div className="mt-3">
                    <span className="text-3xl font-display font-bold text-white">
                      {initialData.stats.totalPortfolioItems}
                    </span>
                    <span className="text-xs text-zinc-400 block mt-1 font-sans">
                      Casos de éxito antes y después
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold">Último Cambio</span>
                    <Clock size={18} className="text-amber-400" />
                  </div>
                  <div className="mt-3">
                    <span className="text-base font-display font-bold text-white truncate block">
                      {initialData.stats.lastUpdatedSection}
                    </span>
                    <span className="text-xs text-emerald-400 block mt-1 font-mono">
                      {initialData.stats.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>

              {/* =============================================================== */}
              {/* BLOQUE PRIORITARIO: ELEMENTOS UNIVERSALES (NAVBAR / FOOTER / ETC) */}
              {/* =============================================================== */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800/90 pb-3">
                  <div>
                    <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                      <span className="text-emerald-400">🌟</span> Elementos Universales
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Configuración global que impacta en cada una de las páginas del sitio web
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-sm">
                    {initialData.universales.length} Módulos Globales
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {initialData.universales.map((item) => (
                    <div
                      key={item.id}
                      className="bg-zinc-950 border border-zinc-800/90 hover:border-emerald-500/50 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono px-2 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Universal
                          </span>
                          <span className="text-xs font-mono text-zinc-500">
                            {item.lastModified}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-2 line-clamp-2 font-sans leading-relaxed">
                          {item.description}
                        </p>
                        <div className="mt-3.5 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400 font-mono truncate">
                          {item.summary}
                        </div>
                      </div>

                      <div className="mt-5 pt-3 flex items-center gap-2 border-t border-zinc-800/80">
                        <button
                          onClick={() => handleOpenCustomizer(item.editUrl, item.name)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm text-xs font-bold bg-[#ff0032] hover:bg-[#d60029] text-white transition-colors uppercase tracking-wider"
                        >
                          <Edit3 size={13} />
                          <span>Editar en Vivo</span>
                        </button>
                        <a
                          href={item.editUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-sm border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                          title="Abrir formulario completo en nueva pestaña"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* =============================================================== */}
              {/* BLOQUE: PÁGINA DE INICIO (HOME Y SUS 6 SECCIONES REORDENABLES)     */}
              {/* =============================================================== */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800/90 pb-3">
                  <div>
                    <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                      <span className="text-blue-400">🏠</span> Página de Inicio (Home)
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Arquitectura, títulos, videos, galerías y llamado a cotización interactivo
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-sm">
                    {initialData.homeSections.length} Secciones
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {initialData.homeSections.map((item) => (
                    <div
                      key={item.id}
                      className="bg-zinc-950 border border-zinc-800/90 hover:border-blue-500/50 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono px-2 py-0.5 rounded-sm bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            Página de Inicio
                          </span>
                          <span className="text-xs font-mono text-zinc-500">
                            {item.lastModified}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-base text-white group-hover:text-blue-400 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-2 line-clamp-2 font-sans leading-relaxed">
                          {item.description}
                        </p>
                        <div className="mt-3.5 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400 font-mono truncate">
                          {item.summary}
                        </div>
                      </div>

                      <div className="mt-5 pt-3 flex items-center gap-2 border-t border-zinc-800/80">
                        <button
                          onClick={() => handleOpenCustomizer(item.editUrl, item.name)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm text-xs font-bold bg-[#ff0032] hover:bg-[#d60029] text-white transition-colors uppercase tracking-wider"
                        >
                          <Edit3 size={13} />
                          <span>Editar en Vivo</span>
                        </button>
                        <a
                          href={item.editUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-sm border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                          title="Abrir en panel de edición"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* =============================================================== */}
              {/* BLOQUE: ÚLTIMOS CAMBIOS REALIZADOS (HISTORIAL EN VIVO)          */}
              {/* =============================================================== */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between border-b border-zinc-800/90 pb-3">
                  <div>
                    <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                      <Clock size={18} className="text-amber-400" />
                      Últimos Cambios Realizados
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Registro de fecha, hora y resumen del contenido editado recientemente
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('history')}
                    className="text-xs font-mono text-[#ff0032] hover:underline flex items-center gap-1"
                  >
                    <span>Ver Historial Completo</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>

                <div className="bg-zinc-950 border border-zinc-800/90 rounded-xl overflow-hidden divide-y divide-zinc-800/80">
                  {initialData.history.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-900/50 transition-colors"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-8 h-8 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">
                              {item.name}
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm border ${item.categoryBadgeColor}`}>
                              {item.categoryLabel}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-1 line-clamp-1 font-mono">
                            {item.summary}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 sm:self-center">
                        <div className="text-right">
                          <span className="text-xs font-mono text-zinc-300 block">
                            {item.timeAgo}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-mono block">
                            {item.formattedDate}
                          </span>
                        </div>
                        <button
                          onClick={() => handleOpenCustomizer(item.editUrl, item.name)}
                          className="px-3 py-1.5 rounded-sm text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* VISTA 2: HISTORIAL DE CAMBIOS COMPLETO (AUDIT LOG DETALLADO)           */}
          {/* ===================================================================== */}
          {activeTab === 'history' && (
            <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                    <History size={20} className="text-amber-400" />
                    Historial de Modificaciones
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Auditoría de todos los archivos JSON y módulos editados en el CMS
                  </p>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  {initialData.history.length} Registros totales
                </span>
              </div>

              <div className="space-y-3">
                {initialData.history.map((log) => (
                  <div
                    key={log.id}
                    className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-heading font-bold text-sm text-white">
                          {log.name}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm border ${log.categoryBadgeColor}`}>
                          {log.categoryLabel}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {log.path}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 font-sans">
                        {log.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-left md:text-right font-mono">
                        <span className="text-xs text-emerald-400 block font-semibold">
                          {log.timeAgo}
                        </span>
                        <span className="text-[10px] text-zinc-400 block">
                          {log.formattedDate}
                        </span>
                      </div>
                      <button
                        onClick={() => handleOpenCustomizer(log.editUrl, log.name)}
                        className="px-3.5 py-1.5 rounded-sm text-xs font-bold bg-[#ff0032] hover:bg-[#d60029] text-white transition-colors uppercase tracking-wider"
                      >
                        Abrir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* VISTA 3: PERSONALIZADOR EN TIEMPO REAL (WORDPRESS CUSTOMIZER STYLE)   */}
          {/* ===================================================================== */}
          {activeTab === 'customizer' && (
            <div className="h-full flex flex-col overflow-hidden bg-zinc-950">
              
              {/* Barra de Controles del Personalizador */}
              <div className="h-12 border-b border-zinc-800 bg-[#121215] px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Editando:
                  </span>
                  <span className="text-xs font-heading font-bold text-white bg-zinc-800 px-2.5 py-1 rounded-sm border border-zinc-700">
                    {selectedEditorName}
                  </span>
                </div>

                {/* Selector de Dispositivos Responsivos (Desktop / Tablet / Móvil) */}
                <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-md p-1">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-1.5 rounded-sm transition-colors ${
                      previewDevice === 'desktop'
                        ? 'bg-zinc-800 text-white shadow-xs'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                    title="Vista de Escritorio (100%)"
                  >
                    <Monitor size={16} />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`p-1.5 rounded-sm transition-colors ${
                      previewDevice === 'tablet'
                        ? 'bg-zinc-800 text-white shadow-xs'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                    title="Vista de Tablet (768px)"
                  >
                    <Tablet size={16} />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-1.5 rounded-sm transition-colors ${
                      previewDevice === 'mobile'
                        ? 'bg-zinc-800 text-white shadow-xs'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                    title="Vista de Móvil (390px)"
                  >
                    <Smartphone size={16} />
                  </button>
                </div>

                {/* Acciones de Recarga y Salida */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={reloadPreview}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                    title="Recargar vista previa"
                  >
                    <RefreshCw size={13} />
                    <span>Recargar</span>
                  </button>
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-sm border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                    title="Abrir sitio web en ventana nueva"
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>

              {/* Área Split-Screen: Editor a la Izquierda / Vista Previa a la Derecha */}
              <div className="flex-1 flex overflow-hidden">
                
                {/* Panel Izquierdo: Formulario de Edición Keystatic */}
                <div className="w-1/2 border-r border-zinc-800 h-full flex flex-col bg-[#0f0f12]">
                  <iframe
                    src={selectedEditorUrl}
                    className="w-full h-full border-0"
                    title="Editor Keystatic"
                  />
                </div>

                {/* Panel Derecho: Vista Previa en Vivo de la Web con Contenedor Adaptable */}
                <div className="w-1/2 h-full flex items-center justify-center p-4 bg-zinc-950 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 bg-black rounded-lg overflow-hidden border border-zinc-800 shadow-2xl flex flex-col ${
                      previewDevice === 'desktop'
                        ? 'w-full'
                        : previewDevice === 'tablet'
                        ? 'w-[768px]'
                        : 'w-[390px]'
                    }`}
                  >
                    <iframe
                      key={previewKey}
                      ref={iframeRef}
                      src="/"
                      className="w-full h-full border-0 bg-white"
                      title="Vista Previa de la Página"
                    />
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </main>

    </div>
  );
}
