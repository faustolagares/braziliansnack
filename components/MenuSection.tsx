
import React, { useState, useRef, useEffect } from 'react';
import { Translation, Product, Language } from '../types';
import { PRODUCTS } from '../constants';
import { Tag, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Props {
  t: Translation['menu'];
  lang: Language;
  onOrderClick: () => void;
  onProductClick: (product: Product) => void;
}

export const MenuSection: React.FC<Props> = ({ t, lang, onOrderClick, onProductClick }) => {
  const [activeTab, setActiveTab] = useState<'savory' | 'sweet'>('savory');
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  const filteredProducts = PRODUCTS.filter(p => p.category === activeTab);

  const headerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const { isVisible: isHeaderVisible, elementRef: headerElementRef } = useScrollReveal({ delay: 200 });
  const { isVisible: isToggleVisible, elementRef: toggleElementRef } = useScrollReveal({ delay: 400 });

  useEffect(() => {
    if (headerRef.current) {
      (headerElementRef as React.MutableRefObject<HTMLElement | null>).current = headerRef.current;
    }
    if (toggleRef.current) {
      (toggleElementRef as React.MutableRefObject<HTMLElement | null>).current = toggleRef.current;
    }
  }, [headerElementRef, toggleElementRef]);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('[data-index]');
    
    // Verifica quais cards já estão visíveis inicialmente
    const checkInitialVisibility = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const isInViewport = 
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.left < window.innerWidth &&
          rect.right > 0;
        
        if (isInViewport) {
          const index = parseInt(card.getAttribute('data-index') || '0', 10);
          setTimeout(() => {
            setVisibleCards((prev) => new Set([...prev, index]));
          }, index * 100);
        }
      });
    };

    checkInitialVisibility();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setTimeout(() => {
              setVisibleCards((prev) => new Set([...prev, index]));
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    cards.forEach((card) => observer.observe(card));

    // Fallback: mostra todos os cards após 2 segundos se não foram detectados
    const fallbackTimeout = setTimeout(() => {
      cards.forEach((card) => {
        const index = parseInt(card.getAttribute('data-index') || '0', 10);
        setVisibleCards((prev) => {
          if (!prev.has(index)) {
            return new Set([...prev, index]);
          }
          return prev;
        });
      });
    }, 2000);

    return () => {
      clearTimeout(fallbackTimeout);
      cards.forEach((card) => observer.unobserve(card));
    };
  }, [filteredProducts]);

  return (
    <section id="menu" className="py-24 bg-brand-porcelain relative">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
         backgroundImage: 'linear-gradient(var(--onyx) 1px, transparent 1px), linear-gradient(90deg, var(--onyx) 1px, transparent 1px)',
         backgroundSize: '60px 60px'
      }}></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-center md:justify-between mb-16 gap-8">
          <div 
            ref={headerRef}
            className={`max-w-2xl scroll-reveal-fade-up ${isHeaderVisible ? 'visible' : ''}`}
          >
            <h2 className="text-6xl md:text-8xl font-display font-black text-brand-onyx mb-4 uppercase leading-none">
              {t.title}
            </h2>
            <p className="text-xl text-brand-onyx font-medium max-w-md">
              {t.subtitle}
            </p>
          </div>

          {/* Clean Toggle Switch */}
          <div 
            ref={toggleRef}
            className={`w-full md:w-auto flex justify-center scroll-reveal-fade-right ${isToggleVisible ? 'visible' : ''}`}
          >
            <div className="flex bg-white rounded-full p-1 border-2 border-brand-onyx shadow-[4px_4px_0px_0px_#0f0f0f] w-full md:w-auto max-w-sm md:max-w-none">
              <button
                onClick={() => setActiveTab('savory')}
                className={`flex-1 md:flex-none px-4 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-lg font-bold uppercase transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'savory'
                    ? 'bg-brand-onyx text-brand-yellow'
                    : 'text-brand-onyx hover:bg-brand-porcelain'
                }`}
              >
                {t.savoryTab}
              </button>
              <button
                onClick={() => setActiveTab('sweet')}
                className={`flex-1 md:flex-none px-4 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-lg font-bold uppercase transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'sweet'
                    ? 'bg-brand-onyx text-brand-yellow'
                    : 'text-brand-onyx hover:bg-brand-porcelain'
                }`}
              >
                {t.sweetTab}
              </button>
            </div>
          </div>
        </div>

        {/* Clean Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              data-index={index}
              className={`group flex flex-col bg-white rounded-none border-2 border-brand-onyx shadow-[8px_8px_0px_0px_#0f0f0f] overflow-hidden hover:translate-y-1 hover:shadow-none transition-all duration-300 scroll-reveal-fade-up ${
                visibleCards.has(index) ? 'visible' : ''
              }`}
            >
              {/* Image Container - Clickable */}
              <div 
                onClick={() => onProductClick(product)}
                className="relative aspect-[4/3] overflow-hidden border-b-2 border-brand-onyx cursor-pointer"
              >
                <img 
                  src="/images/coxinha-sample.png" 
                  alt={product.name[lang]} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Badges Container (Top Left) */}
                <div className="absolute top-4 left-4 flex flex-col items-start gap-2 z-10">
                  {/* Category Badge */}
                  <div className="bg-brand-porcelain text-brand-onyx text-[10px] font-black px-3 py-1.5 rounded-none border-2 border-brand-onyx uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    <Tag size={12} strokeWidth={3} />
                    {product.category === 'savory' ? 'Salgado' : 'Doce'}
                  </div>

                  {/* Popular Badge */}
                  {product.isPopular && (
                    <div className="bg-brand-yellow text-brand-onyx text-[10px] font-black px-3 py-1.5 rounded-none border-2 border-brand-onyx uppercase tracking-wider shadow-sm">
                      Best Seller
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="mb-6 flex-grow cursor-pointer" onClick={() => onProductClick(product)}>
                  <h3 className="text-4xl font-display font-bold text-brand-onyx mb-3 uppercase leading-none group-hover:text-brand-sea transition-colors">
                    {product.name[lang]}
                  </h3>
                  <p className="text-brand-onyx/70 font-medium text-sm leading-relaxed mb-4">
                    {product.description[lang]}
                  </p>
                </div>
                
                {/* Action Area - Saiba Mais */}
                <div className="pt-6 border-t border-dashed border-brand-onyx/20">
                  <button 
                    onClick={() => onProductClick(product)}
                    className="w-full flex items-center justify-center gap-2 bg-brand-onyx text-brand-yellow px-6 py-3 rounded-none font-bold text-sm uppercase tracking-wide hover:bg-brand-sea hover:text-white transition-colors duration-200 group/btn"
                  >
                    {t.learnMore}
                    <ArrowRight size={16} strokeWidth={3} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
