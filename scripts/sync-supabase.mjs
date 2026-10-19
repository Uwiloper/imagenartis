import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';

// 1. Cargar variables de entorno de forma segura desde .env (sin exponer tokens en código)
let supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
let supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const urlMatch = envContent.match(/PUBLIC_SUPABASE_URL=(.*)/);
    const keyMatch = envContent.match(/PUBLIC_SUPABASE_ANON_KEY=(.*)/);
    if (urlMatch) supabaseUrl = urlMatch[1].trim();
    if (keyMatch) supabaseAnonKey = keyMatch[1].trim();
  }
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: PUBLIC_SUPABASE_URL o PUBLIC_SUPABASE_ANON_KEY no encontradas.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Datos de Servicios Vehiculares (5 especialidades con mini navbar)
const vehicularServicesData = {
  titleStatic: 'Nuestras soluciones en',
  titleHighlight: 'wrap y protección vehicular',
  description: 'Cada especialidad cuenta con materiales certificados, procesos técnicos homologados y garantía oficial.',
  services: [
    {
      id: 'corporativo',
      tabLabel: 'Corporativo para flotas',
      iconType: 'truck',
      title: 'Vinil Corporativo para Flotas',
      subtitle: 'Uniformidad corporativa y publicidad móvil de alto impacto',
      description: 'Branding vehicular a gran escala para furgonetas, camiones y flotas comerciales. Diseñado sobre plantillas a escala milimétrica para garantizar resistencia extrema al trabajo diario.',
      features: [
        'Adaptación a plantillas técnicas de cada fabricante vehicular',
        'Vinil fundido con laminado UV resistente a hidrolavado continuo',
        'Rotulado coordinado por turnos para no frenar tu operación comercial'
      ],
      galleryUrl: '/portafolio?categoria=flotas',
      galleryBtnText: 'VER TRABAJOS EN GALERIA',
      quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Vinil%20Corporativo%20para%20Flotas%20Comerciales',
      videoUrl: '/videos/fondo-hero.mp4',
      fallbackImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Flota de vehículos comerciales rotulados con vinil corporativo'
    },
    {
      id: 'wrap',
      tabLabel: 'Wrap',
      iconType: 'car',
      title: 'Vinil Automotriz al Gusto del Cliente',
      subtitle: 'Cambio de color integral o por piezas con acabados exclusivos',
      description: 'Transforma la estética de tu auto según tu estilo personal sin alterar la pintura original. Acabados satinados, mate profundo, ultra gloss brillante y texturados con remates invisibles.',
      features: [
        'Desmontaje minucioso de ópticas y molduras para remates ocultos',
        'Películas 3M Serie 2080 y Avery Supreme Wrap con canales anti-burbujas',
        'Protege la pintura original de fábrica preservando el valor de reventa'
      ],
      galleryUrl: '/portafolio?categoria=wrap-personalizado',
      galleryBtnText: 'VER TRABAJOS EN GALERIA',
      quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Vinil%20Automotriz%20Personalizado',
      videoUrl: '/videos/fondo-hero.mp4',
      fallbackImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Auto con wrap automotriz personalizado'
    },
    {
      id: 'ppf',
      tabLabel: 'PPF',
      iconType: 'ppf',
      title: 'Protección PPF (Paint Protection Film)',
      subtitle: 'Escudo invisible de uretano óptico autorregenerable',
      description: 'La máxima defensa contra piedras de carretera, gravilla, raspaduras cotidianas y rayos solares. Película transparente de poliuretano de alta tecnología con autorregeneración por calor.',
      features: [
        'Capa autorreparable ante micro-rayas cotidianas con calor solar',
        'Propiedad hidrofóbica que repele agua, grasas y contaminantes',
        'Hasta 10 años de garantía oficial contra amarilleamiento y fisuras'
      ],
      galleryUrl: '/portafolio?categoria=ppf',
      galleryBtnText: 'VER TRABAJOS EN GALERIA',
      quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Protección%20PPF',
      videoUrl: '/videos/fondo-hero.mp4',
      fallbackImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Vehículo deportivo con protección PPF transparente'
    },
    {
      id: 'laminas-seguridad',
      tabLabel: 'Láminas de Seguridad',
      iconType: 'shield',
      title: 'Láminas de Seguridad Certificadas',
      subtitle: 'Blindaje multicapa anti-impacto y prevención ante asaltos',
      description: 'Refuerzo estructural para lunas y cristales laterales. Películas multicapa de alta resistencia de 8 a 12 micras que contienen fragmentos de vidrio ante impactos, golpes y accidentes.',
      features: [
        'Alta resistencia mecánica contra impactos contundentes y golpes en lunas',
        'Adhesivo de grado estructural que retiene esquirlas cortantes de vidrio',
        'Transparencia óptica con certificación y homologación legal oficial'
      ],
      galleryUrl: '/portafolio?categoria=laminas-seguridad',
      galleryBtnText: 'VER TRABAJOS EN GALERIA',
      quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Láminas%20de%20Seguridad',
      videoUrl: '/videos/fondo-hero.mp4',
      fallbackImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Vehículo con láminas de seguridad certificadas anti-impacto'
    },
    {
      id: 'polarizados',
      tabLabel: 'Polarizados',
      iconType: 'polarizado',
      title: 'Polarizados Nano-Cerámicos',
      subtitle: 'Máximo rechazo térmico solar, protección UV y privacidad',
      description: 'Películas nano-cerámicas que bloquean hasta el 95% del calor infrarrojo sin oscurecer en exceso. Confort térmico superior para el habitáculo y privacidad exterior reglamentaria.',
      features: [
        'Rechazo térmico superior de hasta 95% de radiación infrarroja (IR)',
        'Bloqueo del 99% de rayos UV protegiendo interiores y tapicería',
        'Cero interferencia con señales de GPS, radiofrecuencia y telepeajes'
      ],
      galleryUrl: '/portafolio?categoria=polarizados',
      galleryBtnText: 'VER TRABAJOS EN GALERIA',
      quoteUrl: 'https://wa.me/51994097417?text=¡Hola!%20Deseo%20cotizar%20el%20servicio%20de%20Polarizados%20Nano-Cerámicos',
      videoUrl: '/videos/fondo-hero.mp4',
      fallbackImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Vehículo con polarizado nano-cerámico de alto rechazo térmico'
    }
  ]
};

// 3. Datos del Carrusel de Galería Vehicular (Marquee arrastrable)
const vehicleGalleryMarqueeData = {
  titleStatic: 'El camino más inteligente para un',
  titleHighlight: 'wrap vehicular perfecto',
  description: 'Imagenartis gestiona el diseño, la impresión y la instalación certificada de principio a fin en todo el país. Ya sea un solo vehículo o una flota a nivel nacional, entregamos un resultado impecable y de alta gama en cada entrega.',
  buttonText: 'Conoce nuestro portafolio de proyectos',
  buttonUrl: '/portafolio',
  items: [
    {
      id: 'van-comercial-rush',
      title: 'Van Comercial Rush Bowls',
      category: 'flotas',
      categoryLabel: 'Flota Comercial',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Rotulado integral de van comercial para flota de distribución',
      client: 'San Isidro, Lima',
      url: '/portafolio?proyecto=van-comercial-rush&categoria=flotas'
    },
    {
      id: 'pickup-camo-4x4',
      title: 'Pickup Silverado 4x4 Camo Graphics',
      category: 'wrap-personalizado',
      categoryLabel: 'Personalizado 4x4',
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Pickup con diseño gráfico camuflado de alto impacto',
      client: 'Surco, Lima',
      url: '/portafolio?proyecto=pickup-camo-4x4&categoria=wrap-personalizado'
    },
    {
      id: 'van-rotulada-plumber',
      title: 'Furgón Comercial The Happy Plumber',
      category: 'flotas',
      categoryLabel: 'Rotulado B2B',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Furgón comercial con branding corporativo y datos de contacto',
      client: 'Miraflores, Lima',
      url: '/portafolio?proyecto=van-rotulada-plumber&categoria=flotas'
    },
    {
      id: 'sports-satin-black',
      title: 'Porsche Cayman Satin Black Wrap',
      category: 'wrap-personalizado',
      categoryLabel: 'Cambio de Color',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Auto deportivo con wrap integral en vinil negro satinado',
      client: 'San Borja, Lima',
      url: '/portafolio?proyecto=sports-satin-black&categoria=wrap-personalizado'
    },
    {
      id: 'suv-ppf-hydro',
      title: 'Toyota Hilux Blindaje PPF Completo',
      category: 'ppf',
      categoryLabel: 'Protección PPF',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Camioneta protegida con film PPF transparente autorregenerativo',
      client: 'La Molina, Lima',
      url: '/portafolio?proyecto=suv-ppf-hydro&categoria=ppf'
    },
    {
      id: 'furgon-classic-bins',
      title: 'Camión de Carga Classic Bins',
      category: 'flotas',
      categoryLabel: 'Flota Pesada',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Camión de carga con rotulación corporativa para transporte',
      client: 'Callao, Lima',
      url: '/portafolio?proyecto=furgon-classic-bins&categoria=flotas'
    }
  ]
};

async function sync() {
  console.log('--- Subiendo secciones a Supabase (site_sections) ---');

  // 1. Subir Vehicular Services
  const { data: d1, error: e1 } = await supabase.from('site_sections').upsert({
    id: 'vehicularServices',
    name: 'Servicios Vehiculares (Líneas Especializadas)',
    category: 'wrapauto',
    data: vehicularServicesData,
    updated_at: new Date().toISOString()
  }).select();

  if (e1) {
    console.error('Error al subir vehicularServices:', e1.message);
  } else {
    console.log('✓ vehicularServices subido con éxito:', d1[0]?.id);
  }

  // 2. Subir Vehicle Gallery Marquee
  const { data: d2, error: e2 } = await supabase.from('site_sections').upsert({
    id: 'vehicleGalleryMarquee',
    name: 'Galería Marquee Vehicular Arrastrable',
    category: 'wrapauto',
    data: vehicleGalleryMarqueeData,
    updated_at: new Date().toISOString()
  }).select();

  if (e2) {
    console.error('Error al subir vehicleGalleryMarquee:', e2.message);
  } else {
    console.log('✓ vehicleGalleryMarquee subido con éxito:', d2[0]?.id);
  }

  // 3. Subir Marcas y Clientes (30 logos SVG de clientes reales)
  const clientLogosPath = path.resolve('src/content/clientLogos/data.json');
  if (fs.existsSync(clientLogosPath)) {
    const clientLogosData = JSON.parse(fs.readFileSync(clientLogosPath, 'utf-8'));
    const { data: d3, error: e3 } = await supabase.from('site_sections').upsert({
      id: 'marcas',
      name: 'Marcas y Clientes',
      category: 'home',
      data: clientLogosData,
      updated_at: new Date().toISOString()
    }).select();

    if (e3) {
      console.error('Error al subir marcas:', e3.message);
    } else {
      console.log('✓ marcas subido con éxito:', d3[0]?.id, `(${clientLogosData.logos?.length || 0} logos)`);
    }
  }

  console.log('--- Sincronización completada exitosamente ---');
}

sync();
