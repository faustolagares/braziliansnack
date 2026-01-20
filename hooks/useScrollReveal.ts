import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  once?: boolean;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    delay = 0,
    once = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const hasBeenShownRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let observer: IntersectionObserver | null = null;
    let fallbackTimeout: NodeJS.Timeout | null = null;

    // Verifica se o elemento já está visível na viewport inicialmente
    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect();
      const isInViewport = 
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0;
      
      if (isInViewport && !hasBeenShownRef.current) {
        hasBeenShownRef.current = true;
        setTimeout(() => {
          setIsVisible(true);
        }, delay);
        return true;
      }
      return false;
    };

    // Aguarda um pouco para garantir que o DOM está pronto
    const initTimeout = setTimeout(() => {
      // Se já está visível, marca como visível imediatamente
      if (checkInitialVisibility()) {
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasBeenShownRef.current) {
              hasBeenShownRef.current = true;
              setTimeout(() => {
                setIsVisible(true);
                if (once && observer) {
                  observer.unobserve(entry.target);
                }
              }, delay);
            } else if (!once && !entry.isIntersecting) {
              setIsVisible(false);
            }
          });
        },
        {
          threshold,
          rootMargin,
        }
      );

      observer.observe(element);

      // Fallback: se após 2 segundos o elemento ainda não foi detectado, mostra mesmo assim
      fallbackTimeout = setTimeout(() => {
        if (!hasBeenShownRef.current) {
          hasBeenShownRef.current = true;
          setIsVisible(true);
          if (once && observer) {
            observer.unobserve(element);
          }
        }
      }, 2000);
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      if (fallbackTimeout) {
        clearTimeout(fallbackTimeout);
      }
      if (observer && element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, delay, once]);

  return { isVisible, elementRef };
};

