/**
 * Custom hook for cursor-proximity glow effects
 * Tracks cursor position and creates glow that follows it
 */
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export function useCursorGlow(elementRef) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const springX = useSpring(glowX, { stiffness: 100, damping: 20 });
  const springY = useSpring(glowY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        const maxDistance = Math.max(rect.width, rect.height) * 0.8;

        if (distance < maxDistance) {
          const intensity = 1 - distance / maxDistance;
          glowX.set((e.clientX - centerX) * intensity * 0.3);
          glowY.set((e.clientY - centerY) * intensity * 0.3);
        } else {
          glowX.set(0);
          glowY.set(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, glowX, glowY, elementRef]);

  return {
    glowX: springX,
    glowY: springY,
  };
}
