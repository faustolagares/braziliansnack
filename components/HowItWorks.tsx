import React, { useRef, useEffect, useState } from 'react';
import { Translation } from '../types';
import { Utensils, MessageCircle, PartyPopper, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Props {
  t: Translation['steps'];
}

export const HowItWorks: React.FC<Props> = ({ t }) => {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const { isVisible: isHeaderVisible, elementRef: headerElementRef } = useScrollReveal({ 
    delay: 0,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  useEffect(() => {
    if (headerRef.current) {
      (headerElementRef as React.MutableRefObject<HTMLElement | null>).current = headerRef.current;
    }
  }, [headerElementRef]);

  useEffect(() => {
    if (!stepsRef.current) return;

    const stepCards = stepsRef.current.querySelectorAll('[data-index]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setTimeout(() => {
              setVisibleSteps((prev) => new Set([...prev, index]));
            }, index * 150);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px 50px 0px',
      }
    );

    stepCards.forEach((card) => observer.observe(card));

    // Fallback: mostra todos os steps após 2 segundos se não foram detectados
    const fallbackTimeout = setTimeout(() => {
      stepCards.forEach((card) => {
        const index = parseInt(card.getAttribute('data-index') || '0', 10);
        setVisibleSteps((prev) => {
          if (!prev.has(index)) {
            return new Set([...prev, index]);
          }
          return prev;
        });
      });
    }, 2000);

    return () => {
      clearTimeout(fallbackTimeout);
      stepCards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const steps = [
    {
      num: "01",
      title: t.step1Title,
      desc: t.step1Desc,
      icon: <Utensils size={48} strokeWidth={1.5} />,
      bg: "bg-brand-porcelain",
      text: "text-brand-onyx",
      border: "border-brand-onyx"
    },
    {
      num: "02",
      title: t.step2Title,
      desc: t.step2Desc,
      icon: <MessageCircle size={48} strokeWidth={1.5} />,
      bg: "bg-brand-yellow",
      text: "text-brand-onyx",
      border: "border-brand-onyx"
    },
    {
      num: "03",
      title: t.step3Title,
      desc: t.step3Desc,
      icon: <PartyPopper size={48} strokeWidth={1.5} />,
      bg: "bg-brand-jungle",
      text: "text-brand-porcelain",
      border: "border-brand-porcelain" // Contrast border for dark card
    }
  ];

  return (
    <section id="how-it-works" className="py-32 lg:py-40 bg-brand-dark border-t-2 border-brand-onyx relative overflow-hidden">
      
      {/* Background Graphic Element */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 100 100">
           <circle cx="100" cy="0" r="50" stroke="white" strokeWidth="2" fill="none" />
           <circle cx="100" cy="0" r="30" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-20 gap-8">
           <div 
             ref={headerRef}
             className={`scroll-reveal-fade-up ${isHeaderVisible ? 'visible' : ''}`}
           >
             <div className="text-brand-yellow font-bold uppercase tracking-[0.2em] mb-4 text-sm">
                Passo a Passo
             </div>
             <h2 className="text-6xl md:text-8xl font-display font-black text-brand-porcelain uppercase leading-[0.85]">
              {t.title}
            </h2>
           </div>
           
           <div className="hidden lg:block pb-4 scroll-reveal-scale" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <ArrowRight className="text-brand-yellow w-24 h-24 -rotate-45" />
           </div>
        </div>

        {/* Steps Grid */}
        <div ref={stepsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              data-index={idx}
              className={`relative group ${step.bg} border-2 border-brand-onyx p-8 md:p-12 flex flex-col justify-between min-h-[400px] shadow-[8px_8px_0px_0px_#0f0f0f] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 scroll-reveal-fade-left ${
                visibleSteps.has(idx) ? 'visible' : ''
              }`}
            >
              {/* Number Badge */}
              <div className={`absolute top-0 right-0 bg-brand-onyx text-brand-yellow px-6 py-4 font-display font-black text-3xl border-l-2 border-b-2 border-brand-onyx scroll-reveal-scale ${
                visibleSteps.has(idx) ? 'visible' : ''
              }`} style={{ transitionDelay: `${idx * 150 + 200}ms` }}>
                {step.num}
              </div>

              {/* Icon Area */}
              <div className={`mb-8 p-4 border-2 border-current rounded-full w-fit ${step.text} scroll-reveal-scale ${
                visibleSteps.has(idx) ? 'visible' : ''
              }`} style={{ transitionDelay: `${idx * 150 + 300}ms` }}>
                {step.icon}
              </div>

              {/* Text Content */}
              <div>
                <h3 className={`text-4xl font-display font-black mb-6 uppercase leading-none ${step.text}`}>
                  {step.title}
                </h3>
                <p className={`text-lg font-medium leading-relaxed opacity-90 ${step.text}`}>
                  {step.desc}
                </p>
              </div>

              {/* Decorative Line */}
              <div className={`w-full h-1 mt-8 ${step.text === 'text-brand-onyx' ? 'bg-brand-onyx/20' : 'bg-brand-porcelain/30'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};