import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { fadeInUp, staggerContainer, depthReveal } from '../../utils/animations';
import { useTilt3D } from '../../hooks/useTilt3D';
import styles from './Products.module.css';

// Product data - replace with your actual affiliate products
const products = [
  {
    id: 1,
    title: 'Premium Wireless Headphones',
    description: 'High-quality noise-cancelling headphones with 30-hour battery life.',
    price: 79.99,
    originalPrice: 129.99,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    affiliateLink: '#',
    category: 'Electronics',
  },
  {
    id: 2,
    title: 'Smart Fitness Watch',
    description: 'Track your health with advanced sensors and AMOLED display.',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    affiliateLink: '#',
    category: 'Fitness',
  },
  {
    id: 3,
    title: 'Professional Camera Lens',
    description: 'Professional-grade 50mm f/1.8 lens for stunning photos.',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600',
    affiliateLink: '#',
    category: 'Photography',
  },
  {
    id: 4,
    title: 'Ergonomic Office Chair',
    description: 'Comfortable and supportive chair for long work sessions.',
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600',
    affiliateLink: '#',
    category: 'Furniture',
  },
  {
    id: 5,
    title: 'Portable Power Bank',
    description: 'Fast-charging 20000mAh power bank with USB-C and wireless.',
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    affiliateLink: '#',
    category: 'Accessories',
  },
  {
    id: 6,
    title: 'Mechanical Gaming Keyboard',
    description: 'RGB backlit mechanical keyboard with Cherry MX switches.',
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600',
    affiliateLink: '#',
    category: 'Gaming',
  },
];

function ProductCard({ product, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  // Enhanced 3D Tilt with useTilt3D hook
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt3D(10);

  // Cursor position for neon glow effect
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowSpringX = useSpring(glowX, { stiffness: 300, damping: 30 });
  const glowSpringY = useSpring(glowY, { stiffness: 300, damping: 30 });

  // Image Z-axis float
  const imageZ = useTransform(
    useSpring(isHovered ? 20 : 0, { stiffness: 200, damping: 25 }),
    [0, 20],
    ['0px', '20px']
  );

  // Enhanced mouse move with glow tracking
  const handleEnhancedMouseMove = (e) => {
    handleMouseMove(e);
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursorPos({ x, y });
      
      // Glow follows cursor
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      glowX.set((x - centerX) / rect.width);
      glowY.set((y - centerY) / rect.height);
    }
  };

  const handleEnhancedMouseLeave = () => {
    handleMouseLeave();
    setIsHovered(false);
    glowX.set(0);
    glowY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      initial={{ opacity: 0, y: 50, scale: 0.95, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleEnhancedMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleEnhancedMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Neon edge glow that follows cursor */}
        <motion.div
          className={styles.neonGlow}
          style={{
            x: useTransform(glowSpringX, [-0.5, 0.5], [-50, 50]),
            y: useTransform(glowSpringY, [-0.5, 0.5], [-50, 50]),
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

      {/* Animated gradient overlay */}
      <motion.div
        className={styles.gradientOverlay}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
        }}
        transition={{ 
          opacity: { duration: 0.3 },
          backgroundPosition: { duration: 3, repeat: Infinity, repeatType: 'reverse' },
        }}
      />

      {product.discount && (
        <motion.div
          className={styles.badge}
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
        >
          -{product.discount}%
        </motion.div>
      )}

      <motion.div
        className={styles.imageContainer}
        style={{
          translateZ: imageZ,
        }}
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <img src={product.image} alt={product.title} />
        {/* Light reflection effect */}
        <motion.div
          className={styles.lightReflection}
          style={{
            x: useTransform(glowSpringX, [-0.5, 0.5], [-100, 100]),
            y: useTransform(glowSpringY, [-0.5, 0.5], [-100, 100]),
          }}
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className={styles.imageOverlay}
          animate={{ opacity: isHovered ? 0.2 : 0 }}
        />
      </motion.div>

      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.cardTitle}>{product.title}</h3>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.priceContainer}>
          {product.originalPrice && (
            <span className={styles.originalPrice}>${product.originalPrice}</span>
          )}
          <span className={styles.price}>${product.price}</span>
        </div>

        <motion.a
          href={product.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: isHovered ? 0 : 20, 
            opacity: isHovered ? 1 : 0.8 
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <span>Shop Now</span>
          <motion.span
            className={styles.buttonArrow}
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            →
          </motion.span>
          {/* Glow underline */}
          <motion.span
            className={styles.buttonGlow}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.a>
      </div>
    </motion.div>
  );
}

function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="products" ref={ref} className={styles.products}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Featured Products</h2>
          <p className={styles.subtitle}>
            Handpicked premium products with verified deals
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Products;
