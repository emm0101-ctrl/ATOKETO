import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

interface NavigationProps {
  logo: string;
}

export const Navigation: React.FC<NavigationProps> = ({ logo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Story', href: '#story' },
    { name: 'Contact', href: '#franchise' },
  ];

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center w-full transition-all duration-300 ${scrolled ? 'py-2' : 'py-6'}`}>
        <nav className={`
          flex items-center justify-between w-full max-w-[1400px] px-6 md:px-12 rounded-full transition-all duration-500
          ${scrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-lg py-3' 
            : 'bg-transparent py-2'
          }
        `}>
          
          {/* Logo */}
          <a 
            href="#main" 
            className="hover:opacity-80 transition-opacity duration-300"
          >
             <img 
               src={logo} 
               alt="ATOKETO Logo" 
               className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'}`}
               // When transparent (on hero), invert colors to make logo white for sophistication
               style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
             />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
             <div className={`flex items-center space-x-8 px-8 py-2 rounded-full border transition-colors duration-300 ${
                 scrolled ? 'bg-white/50 border-gray-200' : 'bg-black/10 border-white/20 backdrop-blur-sm'
             }`}>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`group relative text-sm font-bold uppercase tracking-widest transition-colors ${
                        scrolled ? 'text-brand-dark hover:text-brand-main' : 'text-white hover:text-white/80'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
             </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
             <a 
                href="#franchise" 
                className={`flex items-center gap-2 font-bold px-6 py-3 rounded-full transition-all text-xs uppercase tracking-widest border ${
                    scrolled 
                    ? 'bg-brand-main text-white border-transparent hover:bg-brand-dark shadow-md' 
                    : 'bg-white text-brand-dark border-transparent hover:bg-white/90 shadow-xl'
                }`}
             >
                 <span>Start Franchise</span>
             </a>
          </div>

          {/* Mobile Toggle */}
          <button 
             className={`md:hidden p-2 rounded-full ${scrolled ? 'text-brand-dark' : 'text-white'}`}
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
           >
             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>

        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-brand-dark/95 backdrop-blur-xl z-40 transition-all duration-500 ease-in-out transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'} md:hidden flex flex-col items-center justify-center space-y-8`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-4xl font-black text-white hover:text-brand-main transition-colors uppercase tracking-tighter"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
         <a href="#franchise" onClick={() => setMobileMenuOpen(false)} className="bg-white text-brand-dark px-10 py-5 rounded-full font-bold text-xl shadow-xl mt-8 flex items-center gap-2">
            <ShoppingBag size={24} />
            가맹 상담 신청하기
         </a>
      </div>
    </>
  );
};