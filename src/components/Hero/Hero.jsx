import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { wordReveal, staggerContainer, smoothSpring } from '../../utils/animations';
import { useMagneticEffect } from '../../hooks/useMagneticEffect';
import styles from './Hero.module.css';

function Hero() {
  const containerRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const orbX = useMotionValue(0);
  const orbY = useMotionValue(0);

  const springX = useSpring(mouseX, smoothSpring);
  const springY = useSpring(mouseY, smoothSpring);
  const orbSpringX = useSpring(orbX, { stiffness: 50, damping: 20 });
  const orbSpringY = useSpring(orbY, { stiffness: 50, damping: 20 });

  // Enhanced parallax with multiple depth layers
  const rotateX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg']);
  const translateZ = useTransform(
    springY,
    [-0.5, 0.5],
    ['-20px', '20px']
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);
        mouseX.set(x);
        mouseY.set(y);
        
        // Orb follows cursor with delay
        orbX.set((e.clientX - centerX) * 0.1);
        orbY.set((e.clientY - centerY) * 0.1);
        
        setCursorPos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, orbX, orbY]);

  const headline = "Curated Products".split(' ');
  const subheadline = "You Can Trust".split(' ');

  return (
    <section ref={containerRef} className={styles.hero}>
      {/* Enhanced Animated Background Orbs with cursor tracking */}
      <div className={styles.backgroundOrbs}>
        <motion.div
          className={styles.orb1}
          style={{
            x: orbSpringX,
            y: orbSpringY,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className={styles.orb2}
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className={styles.orb3}
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          style={{
            rotateX,
            rotateY,
            z: translateZ,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Enhanced Headline with glow effect */}
          <motion.h1
            className={styles.headline}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {headline.map((word, index) => (
              <motion.span
                key={index}
                className={styles.word}
                variants={wordReveal}
                style={{ display: 'inline-block', marginRight: '0.5em' }}
                whileHover={{
                  textShadow: '0 0 20px rgba(165, 255, 0, 0.5)',
                  scale: 1.05,
                }}
                transition={{ duration: 0.3 }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            {subheadline.map((word, index) => (
              <motion.span
                key={`sub-${index}`}
                className={`${styles.word} ${styles.gradientText}`}
                variants={wordReveal}
                style={{ display: 'inline-block', marginRight: '0.5em' }}
                whileHover={{
                  filter: 'brightness(1.2) drop-shadow(0 0 30px rgba(165, 255, 0, 0.6))',
                  scale: 1.05,
                }}
                transition={{ duration: 0.3 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Description */}
          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Handpicked premium products from trusted brands.
            <br />
            Every item tested. Every deal verified. Shop with confidence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <MagneticButton href="#products" variant="primary">
              Explore Products
            </MagneticButton>
            <MagneticButton href="#why" variant="secondary">
              Why Choose Us
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Enhanced Magnetic Button with glow intensity
function MagneticButton({ children, href, variant = 'primary' }) {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.4);
  const [glowIntensity, setGlowIntensity] = useState(0);

  const handleMouseMoveWithGlow = (e) => {
    handleMouseMove(e);
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      const maxDistance = Math.max(rect.width, rect.height) * 2;
      const intensity = Math.max(0, 1 - distance / maxDistance);
      setGlowIntensity(intensity);
    }
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`${styles.button} ${styles[variant]}`}
      onMouseMove={handleMouseMoveWithGlow}
      onMouseLeave={() => {
        handleMouseLeave();
        setGlowIntensity(0);
      }}
      style={{ 
        x, 
        y,
        boxShadow: variant === 'primary' 
          ? `0 8px 40px rgba(165, 255, 0, ${0.3 + glowIntensity * 0.4})`
          : undefined,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {variant === 'primary' && (
        <motion.div
          className={styles.buttonRipple}
          animate={{ scale: glowIntensity > 0 ? [1, 1.5, 1] : 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      {variant === 'secondary' && (
        <motion.span
          className={styles.buttonUnderline}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.a>
  );
}

export default Hero;
