
import { useRef, useEffect } from 'react';

export const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };
  
  useEffect(() => {
    const element = elementRef.current;
    
    if (!element) return;
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.classList.add('animate-fade-in');
        }
      });
    }, defaultOptions);
    
    observerRef.current.observe(element);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [defaultOptions]);
  
  return elementRef;
};

export const staggeredAnimation = (delay: number = 100) => {
  return {
    style: {
      '--delay': `${delay}ms`,
    } as React.CSSProperties,
    className: 'animate-delayed animate-slide-in opacity-0',
  };
};

export const easeInOutQuart = (t: number) => 
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

export const getAnimationStyles = (startY: number = 20, duration: number = 800) => {
  return {
    initial: { opacity: 0, y: startY },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: duration / 1000,
      ease: [0.165, 0.84, 0.44, 1],
    },
  };
};

export const fadeInAnimation = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }
  }
};

export const scaleInAnimation = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }
  }
};

export const staggeredChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Fixed floatAnimation to work with React's style prop types
export const floatAnimation = {
  initial: {
    transform: "translateY(0px)"
  },
  animate: {
    transform: ["translateY(-10px)", "translateY(10px)", "translateY(-10px)"],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }
};
