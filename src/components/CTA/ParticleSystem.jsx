import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import styles from './ParticleSystem.module.css';

/**
 * Individual particle that reacts to cursor proximity
 */
function Particle({ x, y, index, containerRef, cursorPos }) {
  const particleRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const particleX = useMotionValue(x);
  const particleY = useMotionValue(y);
  const springX = useSpring(particleX, { stiffness: 300, damping: 40 });
  const springY = useSpring(particleY, { stiffness: 300, damping: 40 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateParticle = () => {
      if (!particleRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const currentX = particleX.get();
      const currentY = particleY.get();
      
      if (!cursorPos) {
        // Return to original position when cursor leaves
        if (isHovered) {
          setIsHovered(false);
          particleX.set(x);
          particleY.set(y);
        }
        return;
      }

      const particleScreenX = containerRect.left + currentX;
      const particleScreenY = containerRect.top + currentY;
      
      const dx = cursorPos.x - particleScreenX;
      const dy = cursorPos.y - particleScreenY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const repulsionRadius = 100;
      const repulsionStrength = 80;
      
      if (distance < repulsionRadius && distance > 0) {
        setIsHovered(true);
        const angle = Math.atan2(dy, dx);
        const force = Math.pow((repulsionRadius - distance) / repulsionRadius, 1.5);
        const newX = currentX - Math.cos(angle) * repulsionStrength * force;
        const newY = currentY - Math.sin(angle) * repulsionStrength * force;
        
        // Clamp to container bounds
        const clampedX = Math.max(0, Math.min(containerRect.width, newX));
        const clampedY = Math.max(0, Math.min(containerRect.height, newY));
        
        particleX.set(clampedX);
        particleY.set(clampedY);
      } else {
        if (isHovered) {
          setIsHovered(false);
          // Smoothly return to original position
          particleX.set(x);
          particleY.set(y);
        }
      }
    };

    const rafId = requestAnimationFrame(function animate() {
      updateParticle();
      requestAnimationFrame(animate);
    });
    
    return () => cancelAnimationFrame(rafId);
  }, [cursorPos, x, y, particleX, particleY, containerRef, isHovered]);

  // Random size and animation delay for variety
  const size = 3 + Math.random() * 3; // 3-6px
  const delay = index * 0.05;
  const duration = 3 + Math.random() * 2; // 3-5 seconds

  return (
    <motion.div
      ref={particleRef}
      className={styles.particle}
      style={{
        x: springX,
        y: springY,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isHovered ? 0.9 : 0.5,
        scale: isHovered ? 1.8 : 1,
      }}
      transition={{
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      }}
    >
      <motion.div
        className={styles.particleGlow}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}

/**
 * Particle System Component
 * Creates multiple particles that react to cursor
 */
export default function ParticleSystem({ containerRef, cursorPos, particleCount = 40 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newParticles = [];

    // Generate random particle positions within container
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
      });
    }

    setParticles(newParticles);

    // Update particles on resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newRect = containerRef.current.getBoundingClientRect();
      setParticles(prev => prev.map(p => ({
        ...p,
        x: Math.min(p.x, newRect.width),
        y: Math.min(p.y, newRect.height),
      })));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [containerRef, particleCount]);

  return (
    <div className={styles.particleSystem}>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          index={particle.id}
          containerRef={containerRef}
          cursorPos={cursorPos}
        />
      ))}
    </div>
  );
}
