import fs from 'node:fs';
import path from 'node:path';

export interface AuditLogItem {
  id: string;
  name: string;
  category: 'universal' | 'home' | 'servicios';
  categoryLabel: string;
  categoryBadgeColor: string;
  icon: string;
  path: string;
  editUrl: string;
  mtime: Date;
  timeAgo: string;
  formattedDate: string;
  summary: string;
  details: Record<string, any>;
}

export interface SectionCard {
  id: string;
  name: string;
  description: string;
  category: 'universal' | 'home' | 'servicios';
  categoryLabel: string;
  icon: string;
  editUrl: string;
  previewHash?: string;
  lastModified: string;
  mtime: Date;
  summary: string;
  isUniversal?: boolean;
}

export interface AdminDashboardData {
  stats: {
    totalSections: number;
    totalUniversales: number;
    totalHomeSections: number;
    totalPortfolioItems: number;
    lastUpdated: string;
    lastUpdatedSection: string;
  };
  history: AuditLogItem[];
  universales: SectionCard[];
  homeSections: SectionCard[];
  portfolioItems: SectionCard[];
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSec < 60) return 'Hace un momento';
  if (diffMin === 1) return 'Hace 1 minuto';
  if (diffMin < 60) return `Hace ${diffMin} minutos`;
  if (diffHours === 1) return 'Hace 1 hora';
  if (diffHours < 24) return `Hace ${diffHours} horas`;
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;

  return date.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDateFull(date: Date): string {
  return date.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getAdminDashboardData(rootDir: string = process.cwd()): AdminDashboardData {
  const contentDir = path.join(rootDir, 'src', 'content');
  const items: AuditLogItem[] = [];

  const definitions: Record<
    string,
    {
      name: string;
      category: 'universal' | 'home' | 'servicios';
      categoryLabel: string;
      categoryBadgeColor: string;
      icon: string;
      editUrl: string;
      previewHash?: string;
      description: string;
      getSummary: (data: any) => string;
    }
  > = {
    'navbar/data.json': {
      name: 'Menú de Navegación (Navbar)',
      category: 'universal',
      categoryLabel: 'Universal (Header)',
      categoryBadgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: 'Navigation',
      editUrl: '/keystatic/singleton/navbar',
      previewHash: '#',
      description: 'Enlaces principales, dropdown de servicios y botón de cotización WhatsApp con animación.',
      getSummary: (d) => `Botón CTA: "${d.ctaText || 'COTIZAR'}" | ${d.navLinks?.length || 4} enlaces de menú | ${d.services?.length || 4} servicios`,
    },
    'footer/data.json': {
      name: 'Pie de Página (Footer)',
      category: 'universal',
      categoryLabel: 'Universal (Footer)',
      categoryBadgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: 'LayoutBottom',
      editUrl: '/keystatic/singleton/footer',
      previewHash: '#contacto',
      description: 'Enlaces a servicios, políticas legales, copyright y créditos de la empresa.',
      getSummary: (d) => `${d.services?.length || 4} enlaces de servicios | ${d.legalLinks?.length || 2} enlaces legales | Copyright actualizado`,
    },
    'siteSettings/data.json': {
      name: 'Configuración General & Contacto',
      category: 'universal',
      categoryLabel: 'Universal (Empresa)',
      categoryBadgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: 'Building2',
      editUrl: '/keystatic/singleton/siteSettings',
      previewHash: '#contacto',
      description: 'Teléfono oficial, WhatsApp de ventas, RUC, dirección de taller y horarios de atención.',
      getSummary: (d) => `Tel: ${d.phone || '+51 994 097 417'} | RUC: ${d.ruc || '20XXXXXXXXX'} | Sede: Balconcillo, La Victoria`,
    },
    'homeLayout/data.json': {
      name: 'Diseño y Orden de Secciones (Home)',
      category: 'home',
      categoryLabel: 'Página de Inicio',
      categoryBadgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: 'Layers',
      editUrl: '/keystatic/singleton/homeLayout',
      previewHash: '',
      description: 'Controlador de arquitectura visual: define el orden de aparición o activa/desactiva módulos.',
      getSummary: (d) => `${d.sections?.length || 6} secciones activas: ${Array.isArray(d.sections) ? d.sections.join(' → ') : ''}`,
    },
    'hero/data.json': {
      name: 'Hero Principal (Cabecera)',
      category: 'home',
      categoryLabel: 'Página de Inicio',
      categoryBadgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: 'Sparkles',
      editUrl: '/keystatic/singleton/hero',
      previewHash: '',
      description: 'Impacto principal con video background, palabras animadas typewriter y botones principales.',
      getSummary: (d) => `Título: "${d.titleStatic || 'Creciendo'}" | Palabras animadas: ${d.typewriterWords?.length || 3} | Botón: "${d.primaryBtnText || 'COTIZAR'}"`,
    },
    'clientLogos/data.json': {
      name: 'Marcas y Clientes (Carousel)',
      category: 'home',
      categoryLabel: 'Página de Inicio',
      categoryBadgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: 'ShieldCheck',
      editUrl: '/keystatic/singleton/marcas',
      previewHash: '#marcas',
      description: 'Barra continua de logotipos de empresas y marcas aliadas que confían en Imagenartis.',
      getSummary: (d) => `${d.logos?.length || 8} logotipos de marcas corporativas configuradas`,
    },
    'proceso/data.json': {
      name: 'Nuestro Proceso de Trabajo',
      category: 'home',
      categoryLabel: 'Página de Inicio',
      categoryBadgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: 'Workflow',
      editUrl: '/keystatic/singleton/proceso',
      previewHash: '#proceso',
      description: 'Metodología en pasos (Asesoría, Diseño Milimétrico, Impresión 3M, Instalación Experta).',
      getSummary: (d) => `Título: "${d.titleStatic} ${d.titleHighlight}" | ${d.steps?.length || 4} pasos metodológicos con imágenes`,
    },
    'miniGallery/data.json': {
      name: 'Mini Galería de Proyectos',
      category: 'home',
      categoryLabel: 'Página de Inicio',
      categoryBadgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: 'Images',
      editUrl: '/keystatic/singleton/miniGallery',
      previewHash: '#galeria-inicio',
      description: 'Muestra curada de 6 proyectos destacados que conecta con el portafolio completo.',
      getSummary: (d) => `Título: "${d.titleStatic} ${d.titleHighlight}" | ${d.items?.length || 6} proyectos con badge de ubicación`,
    },
    'engagement/data.json': {
      name: 'Sección Cotizar (Engagement CTA)',
      category: 'home',
      categoryLabel: 'Página de Inicio',
      categoryBadgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: 'PhoneCall',
      editUrl: '/keystatic/singleton/engagement',
      previewHash: '#cotizar',
      description: 'Banner rojo a ancho completo con video, lienzo de puntos con efecto gota de agua y botón WhatsApp.',
      getSummary: (d) => `Fondo: ${d.bgType || 'video'} | Botón: "${d.primaryBtnText || 'COTIZAR POR WHATSAPP'}" | Título: "${d.titleStatic} ${d.titleHighlight}"`,
    },
  };

  // 1. Escanear singletons conocidos
  for (const [relPath, def] of Object.entries(definitions)) {
    const fullPath = path.join(contentDir, relPath);
    if (fs.existsSync(fullPath)) {
      try {
        const stat = fs.statSync(fullPath);
        const raw = fs.readFileSync(fullPath, 'utf-8');
        const data = JSON.parse(raw);
        const summary = def.getSummary(data);

        items.push({
          id: relPath.replace('/data.json', ''),
          name: def.name,
          category: def.category,
          categoryLabel: def.categoryLabel,
          categoryBadgeColor: def.categoryBadgeColor,
          icon: def.icon,
          path: relPath,
          editUrl: def.editUrl,
          mtime: stat.mtime,
          timeAgo: formatTimeAgo(stat.mtime),
          formattedDate: formatDateFull(stat.mtime),
          summary,
          details: data,
        });
      } catch (err) {
        console.error(`Error leyendo ${fullPath}:`, err);
      }
    }
  }

  // 2. Escanear colección de showcase
  const showcaseDir = path.join(contentDir, 'showcase');
  if (fs.existsSync(showcaseDir)) {
    const files = fs.readdirSync(showcaseDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      const fullPath = path.join(showcaseDir, file);
      try {
        const stat = fs.statSync(fullPath);
        const raw = fs.readFileSync(fullPath, 'utf-8');
        const data = JSON.parse(raw);
        const slug = file.replace('.json', '');

        items.push({
          id: `showcase-${slug}`,
          name: `Caso de Éxito: ${data.category || slug}`,
          category: 'servicios',
          categoryLabel: 'Servicios & Portafolio',
          categoryBadgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          icon: 'FolderCheck',
          path: `showcase/${file}`,
          editUrl: `/keystatic/collection/showcase/item/${slug}`,
          mtime: stat.mtime,
          timeAgo: formatTimeAgo(stat.mtime),
          formattedDate: formatDateFull(stat.mtime),
          summary: `Cliente: ${data.clientName || 'Cliente'} | Categoría: ${data.category} | Testimonio: "${(data.testimonial || '').substring(0, 45)}..."`,
          details: data,
        });
      } catch (err) {
        console.error(`Error leyendo showcase ${file}:`, err);
      }
    }
  }

  // Ordenar por última modificación (descendente)
  items.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

  // Separar en secciones para tarjetas de vista de dashboard
  const universales: SectionCard[] = [];
  const homeSections: SectionCard[] = [];
  const portfolioItems: SectionCard[] = [];

  for (const item of items) {
    const card: SectionCard = {
      id: item.id,
      name: item.name,
      description: definitions[item.path]?.description || item.summary,
      category: item.category,
      categoryLabel: item.categoryLabel,
      icon: item.icon,
      editUrl: item.editUrl,
      previewHash: definitions[item.path]?.previewHash || '',
      lastModified: item.timeAgo,
      mtime: item.mtime,
      summary: item.summary,
      isUniversal: item.category === 'universal',
    };

    if (item.category === 'universal') {
      universales.push(card);
    } else if (item.category === 'home') {
      homeSections.push(card);
    } else {
      portfolioItems.push(card);
    }
  }

  const latest = items[0];

  return {
    stats: {
      totalSections: homeSections.length,
      totalUniversales: universales.length,
      totalHomeSections: homeSections.length,
      totalPortfolioItems: portfolioItems.length,
      lastUpdated: latest ? latest.timeAgo : 'Hoy',
      lastUpdatedSection: latest ? latest.name : 'N/A',
    },
    history: items,
    universales,
    homeSections,
    portfolioItems,
  };
}
