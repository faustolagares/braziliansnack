
import React, { useRef } from 'react';
import { Translation } from '../types';
import { ArrowRight, Check } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Props {
  t: Translation['calculatorCTA'];
  onOpenCalculator: () => void;
}

export const CalculatorCTA: React.FC<Props> = ({ t, onOpenCalculator }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Elementos só aparecem quando entram na viewport durante o scroll
  const { isVisible: isHeaderVisible, elementRef: headerElementRef } = useScrollReveal({ 
    delay: 0,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });
  const { isVisible: isSubtitleVisible, elementRef: subtitleElementRef } = useScrollReveal({ 
    delay: 50,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });
  const { isVisible: isImageVisible, elementRef: imageElementRef } = useScrollReveal({ 
    delay: 100,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });
  const { isVisible: isFeaturesVisible, elementRef: featuresElementRef } = useScrollReveal({ 
    delay: 50,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });
  const { isVisible: isButtonVisible, elementRef: buttonElementRef } = useScrollReveal({ 
    delay: 150,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  React.useEffect(() => {
    if (headerRef.current) {
      (headerElementRef as React.MutableRefObject<HTMLElement | null>).current = headerRef.current;
    }
    if (subtitleRef.current) {
      (subtitleElementRef as React.MutableRefObject<HTMLElement | null>).current = subtitleRef.current;
    }
    if (imageRef.current) {
      (imageElementRef as React.MutableRefObject<HTMLElement | null>).current = imageRef.current;
    }
    if (featuresRef.current) {
      (featuresElementRef as React.MutableRefObject<HTMLElement | null>).current = featuresRef.current;
    }
    if (buttonRef.current) {
      (buttonElementRef as React.MutableRefObject<HTMLElement | null>).current = buttonRef.current;
    }
  }, [headerElementRef, subtitleElementRef, imageElementRef, featuresElementRef, buttonElementRef]);

  return (
    <section className="py-24 bg-brand-sea relative">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
         backgroundImage: 'linear-gradient(var(--porcelain) 1px, transparent 1px), linear-gradient(90deg, var(--porcelain) 1px, transparent 1px)',
         backgroundSize: '40px 40px'
      }}></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header - Fora das colunas, ocupa toda a largura */}
        <div 
          ref={headerRef}
          className={`mb-12 scroll-reveal-fade-up ${isHeaderVisible ? 'visible' : ''}`}
        >
          <h2 className="text-6xl md:text-8xl font-display font-black text-brand-porcelain mb-4 uppercase leading-none max-w-6xl">
            {t.title}
          </h2>
        </div>

        {/* Grid: Conteúdo (esquerda) + Calculadora (direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start mb-8">
          
          {/* Conteúdo - Lado Esquerdo */}
          <div className="lg:col-span-3">
            {/* Subtitle */}
            <p 
              ref={subtitleRef}
              className={`text-xl text-brand-porcelain/90 font-medium mb-10 scroll-reveal-fade-up ${isSubtitleVisible ? 'visible' : ''}`}
            >
              {t.subtitle}
            </p>

            {/* Features List */}
            <div 
              ref={featuresRef}
              className={`space-y-3 mb-16 scroll-reveal-fade-up ${isFeaturesVisible ? 'visible' : ''}`}
            >
              {t.features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3"
                >
                  <Check className="text-brand-yellow shrink-0 mt-0.5" size={20} strokeWidth={3} />
                  <p className="text-brand-porcelain font-medium text-base leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              ref={buttonRef}
              onClick={onOpenCalculator}
              className={`bg-brand-yellow text-brand-onyx text-lg md:text-xl font-bold px-8 py-4 uppercase tracking-wider border-2 border-brand-onyx shadow-[6px_6px_0px_0px_rgba(15,15,15,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex items-center gap-3 scroll-reveal-fade-up ${isButtonVisible ? 'visible' : ''}`}
            >
              {t.button}
              <ArrowRight size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Imagem - Lado Direito */}
          <div 
            ref={imageRef}
            className={`lg:col-span-2 scroll-reveal-fade-right ${isImageVisible ? 'visible' : ''} flex justify-center`}
          >
            <img 
              src="/images/snack-calculator.png" 
              alt="Calculadora de Festa" 
              className="w-full max-w-md h-auto object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

