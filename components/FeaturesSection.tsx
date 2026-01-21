
import React, { useRef, useState, useEffect } from 'react';
import { Translation } from '../types';
import { Truck, Snowflake, Clock, Package } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Props {
  t: Translation['features'];
}

export const FeaturesSection: React.FC<Props> = ({ t }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { isVisible: isHeaderVisible, elementRef: headerElementRef } = useScrollReveal({ delay: 200 });
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  React.useEffect(() => {
    if (headerRef.current) {
      (headerElementRef as React.MutableRefObject<HTMLElement | null>).current = headerRef.current;
    }
  }, [headerElementRef]);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('[data-index]');
    
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

  const features = [
    {
      icon: <Truck size={48} strokeWidth={2} />,
      title: t.delivery.title,
      desc: t.delivery.desc,
      bg: 'bg-brand-yellow',
      text: 'text-brand-onyx'
    },
    {
      icon: <Package size={48} strokeWidth={2} />,
      title: t.packages.title,
      desc: t.packages.desc,
      bg: 'bg-brand-sea',
      text: 'text-brand-porcelain'
    },
    {
      icon: <Snowflake size={48} strokeWidth={2} />,
      title: t.frozen.title,
      desc: t.frozen.desc,
      bg: 'bg-brand-blue',
      text: 'text-brand-porcelain'
    },
    {
      icon: <Clock size={48} strokeWidth={2} />,
      title: t.madeToOrder.title,
      desc: t.madeToOrder.desc,
      bg: 'bg-brand-porcelain',
      text: 'text-brand-onyx'
    }
  ];

  return (
    <section className="py-24 bg-brand-porcelain relative">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
         backgroundImage: 'linear-gradient(var(--onyx) 1px, transparent 1px), linear-gradient(90deg, var(--onyx) 1px, transparent 1px)',
         backgroundSize: '60px 60px'
      }}></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
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
        </div>

        {/* Features Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`${feature.bg} border-2 border-brand-onyx p-6 md:p-8 shadow-[6px_6px_0px_0px_#0f0f0f] hover:translate-y-1 hover:shadow-none transition-all duration-200 scroll-reveal-fade-up ${
                visibleCards.has(index) ? 'visible' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <div className={`${feature.text} mb-4`}>
                {feature.icon}
              </div>
              <h3 className={`text-2xl font-display font-bold mb-3 uppercase leading-tight ${feature.text}`}>
                {feature.title}
              </h3>
              <p className={`text-sm font-medium leading-relaxed opacity-90 ${feature.text}`}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

