import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const backdropBlur = useTransform(scrollY, [0, 100], [10, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Products', href: '#products' },
    { label: 'Why Us', href: '#why' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <motion.nav
      className={styles.navbar}
      style={{
        opacity,
        backdropFilter: `blur(${backdropBlur}px)`,
      }}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.logo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={styles.logoText}>FluentShop</span>
        </motion.div>

        <ul className={styles.navList}>
          {navItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <motion.a
                href={item.href}
                className={styles.navLink}
                whileHover={{ y: -2 }}
              >
                {item.label}
                <motion.span
                  className={styles.underline}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.li>
          ))}
        </ul>

        <motion.a
          href="#cta"
          className={styles.ctaButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          Get Started
        </motion.a>
      </div>
    </motion.nav>
  );
}

export default Navbar;
