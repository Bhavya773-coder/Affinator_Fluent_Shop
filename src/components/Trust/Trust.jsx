import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { depthReveal, staggerContainerSlow } from '../../utils/animations';
import styles from './Trust.module.css';

const trustPoints = [
  {
    icon: '✓',
    title: 'Verified Only',
    description: 'Every product personally tested',
  },
  {
    icon: '✓',
    title: 'Best Prices',
    description: 'Exclusive deals & discounts',
  },
  {
    icon: '✓',
    title: 'Secure Shopping',
    description: 'Trusted retailers only',
  },
];

function Trust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.trust}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={staggerContainerSlow}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              className={styles.point}
              variants={depthReveal}
              whileHover={{ 
                y: -8, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className={styles.icon}
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: index * 0.2, type: 'spring', stiffness: 200 }}
              >
                {point.icon}
              </motion.div>
              <h3 className={styles.title}>{point.title}</h3>
              <p className={styles.description}>{point.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Trust;
