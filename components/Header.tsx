
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Language, Translation } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';

interface Props {
  lang: Language;
  t: Translation['nav'];
  setLang: (l: Language) => void;
  onOrderClick: () => void;
}

export const Header: React.FC<Props> = ({ lang, t, setLang, onOrderClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 border-b-2 border-brand-onyx transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0C5832]/95 backdrop-blur-sm shadow-lg' 
          : 'bg-[#0C5832]'
      }`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer flex items-center gap-3" onClick={() => scrollToSection('hero')}>
              <img 
                src="/images/brazilian-snack-logo.png" 
                alt="Brazilian's Snack Logo" 
                className="h-10 w-10 md:h-12 md:w-12 object-contain"
              />
              <span className="font-display font-semibold text-2xl md:text-3xl text-brand-porcelain leading-none tracking-tight">
                Brazilian's Snack
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('menu')} className="text-brand-porcelain hover:text-brand-yellow font-bold uppercase tracking-wide text-sm transition-colors">
                {t.menu}
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-brand-porcelain hover:text-brand-yellow font-bold uppercase tracking-wide text-sm transition-colors">
                {t.howItWorks}
              </button>
              <button onClick={() => scrollToSection('footer')} className="text-brand-porcelain hover:text-brand-yellow font-bold uppercase tracking-wide text-sm transition-colors">
                {t.about}
              </button>
              
              <LanguageSwitcher current={lang} onChange={setLang} variant="dark" />

              <button 
                onClick={onOrderClick}
                className="bg-brand-yellow text-brand-onyx px-6 py-2.5 font-bold uppercase tracking-wider border-2 border-brand-onyx shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] hover:shadow-none hover:translate-x-0 hover:translate-y-1 transition-all duration-200"
              >
                {t.orderBtn}
              </button>
            </nav>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-brand-yellow p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={32} strokeWidth={2.5} /> : <Menu size={32} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-porcelain pt-24 px-4">
           <div className="flex flex-col space-y-6 text-center">
              <button onClick={() => scrollToSection('menu')} className="text-4xl font-display font-bold text-brand-onyx hover:text-brand-sea">
                {t.menu}
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-4xl font-display font-bold text-brand-onyx hover:text-brand-sea">
                {t.howItWorks}
              </button>
              <button onClick={() => scrollToSection('footer')} className="text-4xl font-display font-bold text-brand-onyx hover:text-brand-sea">
                {t.about}
              </button>
              
              <div className="flex justify-center py-6">
                <LanguageSwitcher current={lang} onChange={setLang} variant="light" />
              </div>

              <button 
                onClick={() => {
                  onOrderClick();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-brand-dark text-brand-yellow w-full py-4 text-xl font-bold uppercase border-2 border-brand-onyx"
              >
                {t.orderBtn}
              </button>
            </div>
        </div>
      )}
    </>
  );
};
