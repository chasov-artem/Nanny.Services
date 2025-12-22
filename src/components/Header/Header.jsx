import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../AuthModal/AuthModal';
import { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.navLeft}>
            <Link to="/" className={styles.logo}>
              Nanny.Services
            </Link>
          </div>
          <div className={styles.navRight}>
            <div className={styles.links}>
              <Link to="/" className={styles.link}>
                Home
              </Link>
              <Link to="/nannies" className={styles.link}>
                Nannies
              </Link>
              {user ? (
                <Link to="/favorites" className={styles.link}>
                  Favorites
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className={styles.buttonSecondary}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className={styles.buttonPrimary}
                  >
                    Registration
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Header;

