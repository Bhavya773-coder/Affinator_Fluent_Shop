import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Tech Enthusiast',
    content: 'Found the perfect headphones here. The reviews were spot-on and the deal was unbeatable.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Photographer',
    content: 'Trustworthy recommendations. Every product I\'ve bought has exceeded expectations.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Johnson',
    role: 'Fitness Coach',
    content: 'The fitness watch I got here is amazing. Great price and fast shipping.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Designer',
    content: 'Love the curated selection. Saves me hours of research.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lisa Wang',
    role: 'Entrepreneur',
    content: 'Best affiliate platform I\'ve used. Honest reviews and great deals.',
    rating: 5,
  },
];

function Testimonials() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleLoopReset = () => {
    const el = scrollRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) {
      el.scrollLeft = el.scrollLeft - half;
    }
  };

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (el) {
        el.scrollBy({
          left: 1,
          behavior: 'auto',
        });
        handleLoopReset();
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section id="reviews" ref={sectionRef} className={styles.testimonials}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>What People Say</h2>
          <p className={styles.subtitle}>Real reviews from real customers</p>
        </motion.div>

        <div
          ref={scrollRef}
          className={styles.scrollContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={() => setIsHovered(true)}
          onPointerUp={() => setIsHovered(false)}
          onPointerCancel={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          onTouchCancel={() => setIsHovered(false)}
          onScroll={handleLoopReset}
        >
          <div className={styles.scrollContent}>
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className={styles.card}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <div className={styles.rating}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className={styles.star}>★</span>
                  ))}
                </div>
                <p className={styles.content}>"{testimonial.content}"</p>
                <div className={styles.author}>
                  <div className={styles.name}>{testimonial.name}</div>
                  <div className={styles.role}>{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
