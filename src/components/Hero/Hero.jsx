import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroLeft}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Make Life Easier for the Family:
          </h1>
          <p className={styles.heroSubtitle}>
            Find Babysitters Online for All Occasions
          </p>
          <Link to="/nannies" className={styles.heroButton}>
            Get started
            <svg
              className={styles.heroButtonIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      <div className={styles.heroRight}>
        <div className={styles.heroStatsCard}>
          <div className={styles.heroStatsIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className={styles.heroStatsContent}>
            <p className={styles.heroStatsLabel}>Experienced nannies</p>
            <p className={styles.heroStatsNumber}>15,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

