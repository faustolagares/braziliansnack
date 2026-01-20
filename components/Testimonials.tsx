import React, { useRef, useEffect, useState } from 'react';
import { Translation } from '../types';
import { Star, Quote } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Props {
  t: Translation['testimonials'];
}

export const Testimonials: React.FC<Props> = ({ t }) => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const { isVisible: isHeaderVisible, elementRef: headerElementRef } = useScrollReveal({ delay: 200 });

  useEffect(() => {
    if (headerRef.current) {
      (headerElementRef as React.MutableRefObject<HTMLElement | null>).current = headerRef.current;
    }
  }, [headerElementRef]);

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
  }, []);

  return (
    <section className="py-32 bg-brand-mustard border-t-2 border-brand-onyx relative overflow-hidden">
      
      {/* Background Pattern - Polka Dots */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(var(--onyx) 2px, transparent 2px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div 
          ref={headerRef}
          className={`flex flex-col items-center text-center mb-20 scroll-reveal-fade-up ${isHeaderVisible ? 'visible' : ''}`}
        >
           <div className="bg-brand-onyx text-brand-yellow px-4 py-1 font-bold uppercase tracking-widest text-sm mb-6 -rotate-2">
              Reviews
           </div>
           <h2 className="text-5xl md:text-7xl font-display font-black text-brand-onyx uppercase leading-none mb-6">
             {t.title}
           </h2>
           <p className="text-xl text-brand-onyx/80 font-medium max-w-2xl">
             {t.subtitle}
           </p>
        </div>

        {/* Grid of Reviews */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.items.map((item, idx) => (
            <div 
              key={idx}
              data-index={idx}
              className={`relative bg-brand-porcelain p-8 border-2 border-brand-onyx shadow-[8px_8px_0px_0px_rgba(15,15,15,1)] flex flex-col hover:-translate-y-1 transition-transform duration-200 scroll-reveal-fade-up scroll-reveal-scale ${
                visibleCards.has(idx) ? 'visible' : ''
              }`}
            >
              {/* Quote Icon */}
              <div className="absolute -top-6 -left-2 bg-brand-yellow border-2 border-brand-onyx p-2 shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]">
                <Quote size={24} className="fill-brand-onyx text-brand-onyx" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 text-brand-yellow">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" strokeWidth={2} className="text-brand-onyx" />
                ))}
              </div>

              {/* Text */}
              <p className="text-lg font-medium text-brand-onyx mb-8 leading-relaxed flex-grow">
                "{item.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 mt-auto border-t-2 border-brand-onyx pt-6 border-dashed">
                <div className="w-10 h-10 rounded-full bg-brand-sea border-2 border-brand-onyx flex items-center justify-center font-bold text-brand-porcelain uppercase">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-brand-onyx uppercase leading-none mb-1">{item.name}</h4>
                  <p className="text-xs font-mono text-brand-onyx/60 uppercase">{item.location}</p>
                </div>
                
                {/* Verified Badge */}
                <div className="ml-auto">
                    <div className="w-6 h-6 rounded-full bg-brand-jungle border border-brand-onyx flex items-center justify-center text-white text-[10px]">
                        ✓
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};