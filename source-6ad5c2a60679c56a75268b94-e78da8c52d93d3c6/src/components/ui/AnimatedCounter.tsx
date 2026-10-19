import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // ms, default 1200ms
  className?: string;
  ariaLabel?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 1200,
  className = '',
  ariaLabel,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(value);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    // Set initial display to 0 before animation begins
    setDisplayValue(0);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.unobserve(el);

          const startTime = performance.now();
          const startVal = 0;
          const endVal = value;

          // easeOutCubic
          const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

          const step = (now: number): void => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const current = Math.round(startVal + (endVal - startVal) * easedProgress);

            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(endVal);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  const fullText = `${prefix}${value}${suffix}`;

  return (
    <span
      ref={elementRef}
      className={`tabular-nums ${className}`}
      aria-label={ariaLabel || fullText}
    >
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
