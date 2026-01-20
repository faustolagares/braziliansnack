import { useEffect, useRef, useState } from 'react';

interface UseStaggerAnimationOptions {
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const useStaggerAnimation = (
  count: number,
  options: UseStaggerAnimationOptions = {}
) => {
  const {
    delay = 100,
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    once = true,
  } = options;

  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            
            setTimeout(() => {
              setVisibleIndices((prev) => new Set([...prev, index]));
              if (once) {
                observer.unobserve(entry.target);
              }
            }, index * delay);
          } else if (!once) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setVisibleIndices((prev) => {
              const next = new Set(prev);
              next.delete(index);
              return next;
            });
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Observe all child elements
    const children = container.querySelectorAll('[data-index]');
    children.forEach((child) => observer.observe(child));

    return () => {
      children.forEach((child) => observer.unobserve(child));
    };
  }, [count, delay, threshold, rootMargin, once]);

  return { visibleIndices, containerRef };
};

