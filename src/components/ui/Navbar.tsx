import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Zap } from 'lucide-react';

export function WhatsAppIcon({ size = 24, className = '', ...props }) {
  return (
    <svg
      xmlns="http://w3.org"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      /* fill="currentColor" hace que use el color de texto de Tailwind (ej: text-[#EE2737] y hover:text-white) */
      fill="currentColor" 
      className={className}
      {...props}
    >
      <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.764.46 3.42 1.268 4.868L2 22l5.244-1.376A9.96 9.96 0 0 0 12.004 22c5.524 0 10.004-4.48 10.004-10.004C22.008 6.48 17.528 2 12.004 2zm0 18.336c-1.576 0-3.1-.424-4.436-1.228l-.316-.188-3.296.864.88-3.212-.208-.332A8.28 8.28 0 0 1 3.664 12c0-4.596 3.74-8.336 8.34-8.336 4.596 0 8.336 3.74 8.336 8.336 0 4.596-3.74 8.336-8.336 8.336zm4.568-6.236c-.252-.124-1.484-.732-1.712-.816-.228-.084-.396-.124-.56.124-.168.252-.648.816-.796.984-.148.168-.296.188-.548.064-.252-.124-1.064-.392-2.028-1.252-.748-.668-1.256-1.492-1.404-1.744-.148-.252-.016-.388.108-.512.112-.112.252-.296.38-.444.124-.148.168-.252.252-.42.084-.168.04-.316-.02-.44-.06-.124-.56-1.348-.768-1.848-.2-.488-.404-.424-.56-.432l-.476-.008c-.168 0-.44.064-.672.316-.228.252-.876.856-.876 2.088s.896 2.42 1.02 2.588c.124.168 1.764 2.692 4.272 3.776.596.256 1.064.408 1.428.524.6.192 1.144.164 1.576.1.48-.072 1.484-.608 1.692-1.196.208-.588.208-1.092.148-1.196-.06-.104-.224-.168-.476-.292z" />
    </svg>
  );
}

// Subrayado ajustado (bottom-0) para que esté más pegado al texto
const CurvedUnderline = () => (
  <span className="absolute bottom-0 left-0 w-0 h-1 overflow-hidden transition-all duration-300 ease-in group-hover:w-full">
    <svg className="w-[50px] h-full text-white" viewBox="0 0 100 10" preserveAspectRatio="none">
      <path d="M0 8 Q 50 0 100 8" stroke="currentColor" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  </span>
);

import type { NavbarData } from '../../lib/cms';

export default function Navbar({ data }: { data?: NavbarData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Resetea menús móviles y dropdowns en transiciones de página
    const handlePageLoad = () => {
      setIsOpen(false);
      setIsDropdownOpen(false);
      // Revalida posición de scroll de la nueva página
      setScrolled(window.scrollY > 40);
    };
    document.addEventListener('astro:page-load', handlePageLoad);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('astro:page-load', handlePageLoad);
    };
  }, []);

  const navLinks = data?.navLinks && data.navLinks.length > 0 ? data.navLinks : [
    { label: 'Inicio', href: '/' },
    { label: 'Proceso', href: '/#proceso' },
    { label: 'Galería', href: '/galeria' },
    { label: 'Nosotros', href: '/nosotros' },
  ];

  const servicios = data?.services && data.services.length > 0 ? data.services : [
    { name: 'Branding Automotriz', href: '/servicios/automotriz' },
    { name: 'Interiores Comerciales', href: '/servicios/interiores' },
    { name: 'Letreros Corporativos', href: '/servicios/letreros' },
    { name: 'Diseño e Identidad', href: '/servicios/diseno' },
  ];

  const ctaText = data?.ctaText || 'COTIZAR';
  const ctaUrl = data?.ctaUrl || 'https://wa.me/51994097417?text=¡Hola!%20Me%20gustaría%20cotizar%20unos%20stickers%20para%20mi%20';

  // Separar primer enlace (ej: Inicio) del resto para ubicar el dropdown de servicios
  const firstLink = navLinks[0] || { label: 'Inicio', href: '/' };
  const otherLinks = navLinks.slice(1);

  return (
    <header className={`fixed w-full z-50 flex justify-center transition-all duration-500 ease-in-out ${scrolled ? 'top-2 sm:top-3 px-3 sm:px-4' : 'top-0 px-0'}`}>
      
      {/* --- MAIN NAVBAR (Efecto Morph Restablecido) --- */}
      <nav 
        className={`w-full transition-all duration-500 ease-in-out ${
          scrolled 
            ? 'max-w-6xl bg-[#EE2737]/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl border border-white/10' 
            : 'max-w-full bg-[#EE2737] rounded-none border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-13 sm:h-14' : 'h-14 sm:h-16'}`}>
            
            {/* Logo en Imagen */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/">
                <img 
                  src="/logo-horizontal.svg" 
                  alt="Imagenartis Logo" 
                  className={`transition-all duration-300 ${scrolled ? 'h-5 sm:h-5.5' : 'h-6 sm:h-6.5'} w-auto`}
                />
              </a>
            </div>

            {/* Menú Desktop */}
            <div className="hidden lg:flex items-center space-x-7 font-heading">
              <a href={firstLink.href} className="group relative text-white py-2 text-sm font-semibold tracking-wide">
                {firstLink.label}
                <CurvedUnderline />
              </a>
              
              {/* Dropdown Servicios */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-white py-3.5 text-sm font-semibold tracking-wide relative">
                  Servicios <ChevronDown size={15} className="group-hover:rotate-180 transition-transform" />
                  <CurvedUnderline />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-sm">
                  <div className="py-2">
                    {servicios.map((s) => (
                      <a key={s.name} href={s.href} className="block px-4 py-2.5 text-sm font-sans text-gray-800 hover:bg-gray-50 hover:text-[#EE2737] transition-colors">
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {otherLinks.map((link) => (
                <a key={link.label} href={link.href} className="group relative text-white py-2 text-sm font-semibold tracking-wide">
                  {link.label}
                  <CurvedUnderline />
                </a>
              ))}
            </div>

            {/* --- Botón CTA Desktop (Animación de Icono) --- */}
            <div className="hidden lg:block font-heading">
              <a 
                href={ctaUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center justify-center bg-white text-[#EE2737] hover:bg-green-700 hover:text-white transition-all duration-300 px-5 py-2 rounded-sm text-xs sm:text-sm font-bold tracking-wider shadow-md overflow-hidden"
              >
                <WhatsAppIcon size={16} className="w-0 opacity-0 group-hover:w-[16px] group-hover:opacity-100 group-hover:mr-1.5 transition-all duration-300" />
                <span>{ctaText}</span>
              </a>
            </div>

            {/* Menú Móvil Hamburger */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none p-1.5" aria-label="Abrir menú">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- MENÚ MÓVIL DESPLEGABLE --- */}
        {isOpen && (
          <div className={`lg:hidden bg-[#EE2737] absolute w-full transition-all duration-300 shadow-2xl ${scrolled ? 'rounded-b-2xl border-t border-white/20' : 'border-t border-white/20'}`}>
            <div className="px-4 pt-4 pb-6 space-y-4 font-heading">
              <a href={firstLink.href} onClick={() => setIsOpen(false)} className="block text-white hover:text-black text-lg font-medium">{firstLink.label}</a>
              <div>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex justify-between w-full text-white hover:text-black text-lg font-medium">
                  Servicios <ChevronDown size={20} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-3 border-l-2 border-white/40 font-sans">
                    {servicios.map((s) => (
                      <a key={s.name} href={s.href} onClick={() => setIsOpen(false)} className="block text-white/90 hover:text-white text-base">{s.name}</a>
                    ))}
                  </div>
                )}
              </div>

              {otherLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="block text-white hover:text-black text-lg font-medium">{link.label}</a>
              ))}
              
              {/* --- Botón CTA Móvil (Animación de Icono) --- */}
              <a 
                href={ctaUrl} 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group w-full flex justify-center items-center mt-4 bg-white text-[#EE2737] hover:bg-green-700 hover:text-white font-bold px-4 py-3 rounded-sm text-sm tracking-wider shadow-md transition-all duration-300 overflow-hidden"
              >
                <WhatsAppIcon size={18} className="w-0 opacity-0 group-hover:w-[18px] group-hover:opacity-100 group-hover:mr-2 transition-all duration-300" />
                <span>{ctaText}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}