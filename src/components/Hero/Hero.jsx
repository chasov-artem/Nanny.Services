import { Link } from "react-router-dom";
import Header from "../Header/Header";
import ArrowIcon from "../Icons/ArrowIcon";
import CheckIcon from "../Icons/CheckIcon";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Header />
      <div className={styles.heroLeft}>
        <div className={styles.heroLeftContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Make Life Easier for the Family:
            </h1>
            <p className={styles.heroSubtitle}>
              Find Babysitters Online for All Occasions
            </p>
            <Link to="/nannies" className={styles.heroButton}>
              Get started
              <ArrowIcon className={styles.heroButtonIcon} />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.heroRight}>
        <div className={styles.heroStatsCard}>
          <div className={styles.heroStatsIcon}>
            <CheckIcon />
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
