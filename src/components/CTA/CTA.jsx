import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import ParticleSystem from './ParticleSystem';
import styles from './CTA.module.css';

function CTA() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [cursorPos, setCursorPos] = useState(null);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      mouseX.set(x);
      mouseY.set(y);
      
      // Update cursor position for particles
      setCursorPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    setCursorPos(null);
  };

  return (
    <section
      id="cta"
      ref={containerRef}
      className={styles.cta}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive Particle System */}
      <ParticleSystem 
        containerRef={containerRef} 
        cursorPos={cursorPos}
        particleCount={40}
      />

      <motion.div
        className={styles.background}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      />

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Ready to Find Your
            <br />
            <span className={styles.gradientText}>Perfect Product?</span>
          </motion.h2>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Join thousands of satisfied customers. Start shopping with confidence today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <MagneticButton href="#products">
              Explore Products
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MagneticButton({ children, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={styles.button}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <motion.div
        className={styles.buttonGlow}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.a>
  );
}

export default CTA;
