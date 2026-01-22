import React, { useEffect, useState } from 'react';
import { Translation } from '../types';
import { ArrowRight } from 'lucide-react';

interface Props {
  t: Translation['hero'];
  onOrderClick: () => void;
}

export const Hero: React.FC<Props> = ({ t, onOrderClick }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative pt-32 bg-brand-dark text-brand-porcelain min-h-[110vh] flex flex-col items-center justify-start overflow-hidden">
      
      {/* Background Pattern (Grid) */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0">
         <div className="w-full h-full" style={{ 
            backgroundImage: 'linear-gradient(var(--porcelain) 1px, transparent 1px), linear-gradient(90deg, var(--porcelain) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
         }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="inline-block border-2 border-brand-yellow text-brand-yellow px-6 py-2 text-sm font-bold uppercase tracking-[0.2em] mb-8 bg-brand-dark/80 backdrop-blur-sm rounded-full shadow-lg animate-fadeInDown">
          {t.deliveryBadge}
        </div>
        
        {/* Title */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[0.9] text-brand-yellow mb-8 uppercase drop-shadow-sm max-w-7xl animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          {t.title}
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-xl lg:text-2xl text-brand-porcelain font-light mb-10 max-w-2xl leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          {t.subtitle}
        </p>
        
        {/* CTA */}
        <button 
          onClick={onOrderClick}
          className="bg-brand-yellow text-brand-onyx text-lg md:text-xl font-bold px-10 py-5 uppercase tracking-wider border-2 border-brand-onyx shadow-[8px_8px_0px_0px_rgba(15,15,15,1)] hover:shadow-none hover:translate-x-0 hover:translate-y-1 transition-all duration-200 flex items-center gap-3 z-20 animate-scaleIn"
          style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
        >
          {t.cta}
          <ArrowRight />
        </button>

        {/* Parallax Image Container */}
        <div 
            className="relative w-full max-w-[500px] aspect-square mt-12 z-10 pointer-events-none pb-0"
            style={{ 
                transform: `translateY(${scrollY * 0.2}px)`, // Efeito Parallax (move mais devagar que o scroll)
                opacity: Math.max(0, 1 - scrollY / 4000) // Desaparece suavemente ao rolar muito
            }}
        >
           <img 
            src="/images/coxinha.avif" 
            alt="Brazilian's Snack" 
            className="w-full h-full object-cover"
           />
        </div>

      </div>
    </section>
  );
};