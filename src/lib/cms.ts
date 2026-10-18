import defaultHero from '../content/hero/data.json';
import defaultSiteSettings from '../content/siteSettings/data.json';
import defaultProceso from '../content/proceso/data.json';
import defaultClientLogos from '../content/clientLogos/data.json';
import defaultShowcase from '../content/showcase/data.json';
import defaultMiniGallery from '../content/miniGallery/data.json';
import defaultNavbar from '../content/navbar/data.json';
import defaultFooter from '../content/footer/data.json';
import defaultEngagement from '../content/engagement/data.json';
import defaultHomeLayout from '../content/homeLayout/data.json';
import { supabase } from './supabase';

export interface ProcessStep {
  stepNumber?: string;
  timeBadge?: string;
  title: string;
  description: string;
  image: string;
  linkText?: string;
  linkUrl?: string;
}

export interface ProcessData {
  badge?: string;
  titleStatic: string;
  titleHighlight: string;
  subtitle: string;
  steps: ProcessStep[];
}

export interface ClientLogo {
  name: string;
  image?: string;
  logoUrl?: string;
}

export interface ClientLogosData {
  heading?: string;
  titleStatic?: string;
  titleHighlight?: string;
  titleSuffix?: string;
  logos: ClientLogo[];
}

export interface MiniGalleryItem {
  title: string;
  location: string;
  image: string;
  linkUrl?: string;
}

export interface MiniGalleryData {
  titleStatic: string;
  titleHighlight: string;
  titleSuffix?: string;
  subtitle?: string;
  buttonText: string;
  buttonUrl: string;
  items: MiniGalleryItem[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceLink {
  name: string;
  href: string;
}

export interface NavbarData {
  navLinks: NavLink[];
  services: ServiceLink[];
  ctaText: string;
  ctaUrl: string;
}

export interface FooterData {
  description: string;
  services: ServiceLink[];
  legalLinks: { name: string; href: string }[];
  copyrightText: string;
}

export interface EngagementData {
  badge?: string;
  titleStatic: string;
  titleHighlight: string;
  titleSuffix?: string;
  description: string;
  bgType?: 'video' | 'image';
  bgVideo?: string;
  bgImage?: string;
  primaryBtnText: string;
  primaryBtnUrl: string;
  secondaryBtnText?: string;
  secondaryBtnUrl?: string;
}

export interface HomeLayoutData {
  sections: string[];
}

export interface HeroData {
  badge?: string;
  titleStatic: string;
  typewriterWords: string[];
  description: string;
  primaryBtnText?: string;
  primaryBtnUrl?: string;
  secondaryBtnText?: string;
  secondaryBtnUrl?: string;
}

export interface ShowcaseItem {
  id: string;
  title?: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  testimonial: string;
  clientName: string;
  order?: number;
}

export interface ShowcaseData {
  titleStatic?: string;
  titleHighlight?: string;
  subtitle?: string;
  items: ShowcaseItem[];
}

export interface SiteSettings {
  phone: string;
  address: string;
  hours: string;
  ruc: string;
}

export interface VehicularServicesData {
  titleStatic?: string;
  titleHighlight?: string;
  description?: string;
  services?: any[];
}

export interface VehicleGalleryMarqueeData {
  badge?: string;
  titleStatic?: string;
  titleHighlight?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: any[];
}

export interface AllCmsData {
  hero: HeroData;
  siteSettings: SiteSettings;
  proceso: ProcessData;
  marcas: ClientLogosData;
  showcase: ShowcaseData;
  miniGallery: MiniGalleryData;
  navbar: NavbarData;
  footer: FooterData;
  engagement: EngagementData;
  homeLayout: string[];
  vehicularServices?: VehicularServicesData;
  vehicleGalleryMarquee?: VehicleGalleryMarqueeData;
}

// Fallback por defecto (100% resiliente a fallos de red)
export function getDefaultCmsData(): AllCmsData {
  return {
    hero: defaultHero as HeroData,
    siteSettings: defaultSiteSettings as SiteSettings,
    proceso: defaultProceso as unknown as ProcessData,
    marcas: defaultClientLogos as ClientLogosData,
    showcase: defaultShowcase as ShowcaseData,
    miniGallery: defaultMiniGallery as MiniGalleryData,
    navbar: defaultNavbar as NavbarData,
    footer: defaultFooter as FooterData,
    engagement: defaultEngagement as EngagementData,
    homeLayout: (defaultHomeLayout as HomeLayoutData)?.sections || [
      'hero',
      'marcas',
      'proceso',
      'showcase',
      'miniGallery',
      'cta',
    ],
  };
}

// Lector en vivo desde Supabase (1 sola consulta en paralelo para toda la web)
export async function fetchAllSections(): Promise<AllCmsData> {
  const defaults = getDefaultCmsData();

  try {
    const { data, error } = await supabase
      .from('site_sections')
      .select('id, data');

    if (error || !data || data.length === 0) {
      return defaults;
    }

    const map: Record<string, any> = {};
    for (const row of data) {
      map[row.id] = row.data;
    }

    // Soporte unificado de showcase en site_sections
    let showcaseData = defaults.showcase;
    if (map.showcase && Array.isArray(map.showcase.items) && map.showcase.items.length > 0) {
      showcaseData = { ...defaults.showcase, ...map.showcase };
    }

    return {
      hero: { ...defaults.hero, ...(map.hero || {}) },
      siteSettings: { ...defaults.siteSettings, ...(map.siteSettings || {}) },
      proceso: { ...defaults.proceso, ...(map.proceso || {}) },
      marcas: { ...defaults.marcas, ...(map.marcas || {}) },
      showcase: showcaseData,
      miniGallery: { ...defaults.miniGallery, ...(map.miniGallery || {}) },
      navbar: { ...defaults.navbar, ...(map.navbar || {}) },
      footer: { ...defaults.footer, ...(map.footer || {}) },
      engagement: { ...defaults.engagement, ...(map.engagement || {}) },
      homeLayout: map.homeLayout?.sections || defaults.homeLayout,
      vehicularServices: map.vehicularServices || undefined,
      vehicleGalleryMarquee: map.vehicleGalleryMarquee || undefined,
    };
  } catch (err) {
    console.error('Error al conectar con Supabase en fetchAllSections, usando respaldo:', err);
    return defaults;
  }
}

// Lector de casos de éxito con respaldo unificado
export async function fetchShowcaseProjects(): Promise<ShowcaseItem[]> {
  try {
    const { data } = await supabase
      .from('site_sections')
      .select('data')
      .eq('id', 'showcase')
      .single();

    if (data?.data?.items && Array.isArray(data.data.items) && data.data.items.length > 0) {
      return data.data.items;
    }
    return getShowcaseItems();
  } catch (err) {
    return getShowcaseItems();
  }
}

// Getters síncronos de compatibilidad
export function getHeroData(): HeroData {
  return defaultHero as HeroData;
}

export function getSiteSettings(): SiteSettings {
  return defaultSiteSettings as SiteSettings;
}

export function getProcesoData(): ProcessData {
  return defaultProceso as unknown as ProcessData;
}

export function getClientLogosData(): ClientLogosData {
  return defaultClientLogos as ClientLogosData;
}

export function getMiniGalleryData(): MiniGalleryData {
  return defaultMiniGallery as MiniGalleryData;
}

export function getNavbarData(): NavbarData {
  return defaultNavbar as NavbarData;
}

export function getFooterData(): FooterData {
  return defaultFooter as FooterData;
}

export function getEngagementData(): EngagementData {
  return defaultEngagement as EngagementData;
}

export function getHomeLayout(): string[] {
  const layout = defaultHomeLayout as HomeLayoutData;
  if (layout && Array.isArray(layout.sections) && layout.sections.length > 0) {
    return layout.sections;
  }
  return ['hero', 'marcas', 'proceso', 'showcase', 'miniGallery', 'cta'];
}

export function getShowcaseItems(): ShowcaseItem[] {
  const modules = import.meta.glob<{ default: ShowcaseItem }>('../content/showcase/*.json', {
    eager: true,
  });

  const items = Object.entries(modules).map(([path, mod]) => {
    const data = mod.default || (mod as unknown as ShowcaseItem);
    const slug = path.split('/').pop()?.replace('.json', '') || data.title || 'item';
    return {
      ...data,
      id: slug,
    };
  });

  return items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
