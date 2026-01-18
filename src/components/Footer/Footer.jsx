import { motion } from 'framer-motion';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.brand}>
            <h3 className={styles.logo}>FluentShop</h3>
            <p className={styles.tagline}>
              Premium products. Verified deals. Trusted recommendations.
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Products</h4>
              <a href="#products" className={styles.link}>Featured</a>
              <a href="#products" className={styles.link}>All Products</a>
            </div>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>About</h4>
              <a href="#why" className={styles.link}>Why Us</a>
              <a href="#reviews" className={styles.link}>Reviews</a>
            </div>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Connect</h4>
              <a
                href="https://www.youtube.com/@Affiliator-VS"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                YouTube
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.bottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} FluentShop. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
