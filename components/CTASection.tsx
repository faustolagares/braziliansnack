import React, { useRef, useEffect } from 'react';
import { Translation } from '../types';
import { MessageCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Props {
  t: Translation['ctaSection'];
  onOrderClick: () => void;
}

export const CTASection: React.FC<Props> = ({ t, onOrderClick }) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { isVisible: isIconVisible, elementRef: iconElementRef } = useScrollReveal({ 
    delay: 0,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });
  const { isVisible: isTitleVisible, elementRef: titleElementRef } = useScrollReveal({ 
    delay: 200,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });
  const { isVisible: isSubtitleVisible, elementRef: subtitleElementRef } = useScrollReveal({ 
    delay: 400,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });
  const { isVisible: isButtonVisible, elementRef: buttonElementRef } = useScrollReveal({ 
    delay: 600,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  useEffect(() => {
    if (iconRef.current) {
      (iconElementRef as React.MutableRefObject<HTMLElement | null>).current = iconRef.current;
    }
    if (titleRef.current) {
      (titleElementRef as React.MutableRefObject<HTMLElement | null>).current = titleRef.current;
    }
    if (subtitleRef.current) {
      (subtitleElementRef as React.MutableRefObject<HTMLElement | null>).current = subtitleRef.current;
    }
    if (buttonRef.current) {
      (buttonElementRef as React.MutableRefObject<HTMLElement | null>).current = buttonRef.current;
    }
  }, [iconElementRef, titleElementRef, subtitleElementRef, buttonElementRef]);

  return (
    <section className="bg-brand-sea border-y-2 border-brand-onyx py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <div 
            ref={iconRef}
            className={`inline-block mb-6 scroll-reveal-scale ${isIconVisible ? 'visible' : ''}`}
            style={{ animation: isIconVisible ? 'bounce 1s infinite 0.6s' : 'none' }}
          >
             <MessageCircle size={48} className="text-brand-yellow" strokeWidth={2.5} />
          </div>

          <h2 
            ref={titleRef}
            className={`text-5xl md:text-7xl lg:text-8xl font-display font-black text-brand-yellow mb-8 uppercase leading-none tracking-tight scroll-reveal-fade-up ${isTitleVisible ? 'visible' : ''}`}
          >
            {t.title}
          </h2>
          
          <p 
            ref={subtitleRef}
            className={`text-xl md:text-2xl text-brand-porcelain/90 font-medium mb-12 max-w-2xl mx-auto leading-relaxed scroll-reveal-fade-up ${isSubtitleVisible ? 'visible' : ''}`}
          >
            {t.subtitle}
          </p>
          
          <button 
            ref={buttonRef}
            onClick={onOrderClick}
            className={`bg-brand-yellow text-brand-onyx text-xl md:text-2xl font-bold px-12 py-6 uppercase tracking-wider border-2 border-brand-onyx shadow-[8px_8px_0px_0px_rgba(15,15,15,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-200 scroll-reveal-scale ${isButtonVisible ? 'visible' : ''}`}
          >
            {t.button}
          </button>
        </div>
      </div>

      {/* Background Decorative Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{ 
            backgroundImage: 'radial-gradient(var(--porcelain) 2px, transparent 2px)', 
            backgroundSize: '40px 40px' 
        }}></div>
      </div>
    </section>
  );
};
