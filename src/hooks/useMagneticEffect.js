/**
 * Custom hook for magnetic button effect
 * Creates smooth attraction effect as cursor approaches
 */
import { useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

export function useMagneticEffect(strength = 0.3) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    x: springX,
    y: springY,
    handleMouseMove,
    handleMouseLeave,
  };
}
