import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../AuthModal/AuthModal";
import { logOut } from "../../services/auth";
import { useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <header className={`${styles.header} ${!isHomePage ? styles.headerStatic : ''}`}>
        <nav className={styles.nav}>
          <div className={styles.navLeft}>
            <Link to="/" className={styles.logo}>
              Nanny.Services
            </Link>
          </div>
          <nav className={styles.navigation}>
            <Link to="/" className={styles.link}>
              Home
            </Link>
            <Link to="/nannies" className={`${styles.link} ${location.pathname === '/nannies' ? styles.linkActive : ''}`}>
              Nannies
            </Link>
            {user && (
              <Link to="/favorites" className={`${styles.link} ${location.pathname === '/favorites' ? styles.linkActive : ''}`}>
                Favorites
              </Link>
            )}
          </nav>
          <div className={styles.navRight}>
            <div className={styles.authButtons}>
              {!user ? (
                <>
                  <button
                    onClick={() => {
                      setAuthModalMode("login");
                      setIsAuthModalOpen(true);
                    }}
                    className={styles.buttonSecondary}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setAuthModalMode("signup");
                      setIsAuthModalOpen(true);
                    }}
                    className={styles.buttonPrimary}
                  >
                    Registration
                  </button>
                </>
              ) : (
                <div className={styles.userSection}>
                  <div className={styles.userAvatar}>
                    <img src="/icons/user-icon.svg" alt="User" className={styles.userIcon} />
                  </div>
                  <span className={styles.userName}>{user.displayName || user.email}</span>
                  <button
                    onClick={handleLogout}
                    className={styles.buttonLogout}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
            <button
              className={`${styles.menuButton} ${isMobileMenuOpen ? styles.menuButtonActive : ''}`}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <div className={styles.mobileMenuContent}>
            <nav className={styles.mobileNavigation}>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className={styles.link}>
                Home
              </Link>
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                to="/nannies"
                className={`${styles.link} ${location.pathname === '/nannies' ? styles.linkActive : ''}`}
              >
                Nannies
              </Link>
              {user && (
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  to="/favorites"
                  className={`${styles.link} ${location.pathname === '/favorites' ? styles.linkActive : ''}`}
                >
                  Favorites
                </Link>
              )}
            </nav>
            <div className={styles.mobileAuth}>
              {!user ? (
                <>
                  <button
                    onClick={() => {
                      setAuthModalMode("login");
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className={styles.buttonSecondary}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setAuthModalMode("signup");
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className={styles.buttonPrimary}
                  >
                    Registration
                  </button>
                </>
              ) : (
                <>
                  <div className={styles.userSection}>
                    <div className={styles.userAvatar}>
                      <img src="/icons/user-icon.svg" alt="User" className={styles.userIcon} />
                    </div>
                    <span className={styles.userName}>{user.displayName || user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className={styles.buttonLogout}
                  >
                    Log out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authModalMode}
      />
    </>
  );
};

export default Header;
