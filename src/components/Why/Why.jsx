import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import styles from './Why.module.css';

const benefits = [
  {
    title: 'Curated Selection',
    description: 'Every product is personally tested and verified before recommendation.',
  },
  {
    title: 'Best Deals',
    description: 'We negotiate exclusive discounts and track prices daily.',
  },
  {
    title: 'Trusted Partners',
    description: 'Only reputable retailers with secure payment systems.',
  },
  {
    title: 'Honest Reviews',
    description: 'Real experiences, no fake reviews or paid promotions.',
  },
];

function Why() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, -50]);

  return (
    <section id="why" ref={containerRef} className={styles.why}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          style={{ opacity, y }}
        >
          <motion.div
            className={styles.textSection}
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className={styles.title}>
              Why Choose
              <span className={styles.gradientText}> Our Platform</span>
            </h2>
            <p className={styles.description}>
              We do the research so you don't have to. Every product is carefully
              selected for quality, value, and reliability.
            </p>
          </motion.div>

          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className={styles.benefitCard}
                initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
                transition={{ delay: index * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  borderColor: 'rgba(165, 255, 0, 0.3)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(165, 255, 0, 0.2)',
                  transition: { duration: 0.3 }
                }}
              >
                <div className={styles.benefitNumber}>0{index + 1}</div>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDescription}>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Why;
