import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logOut } from '../../services/auth';
import AuthModal from '../AuthModal/AuthModal';
import { useState } from 'react';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="layout">
      <header className="layout-header">
        <nav className="layout-nav">
          <Link to="/" className="layout-logo">
            Nanny Services
          </Link>
          <div className="layout-links">
            <Link to="/" className="layout-link">
              Home
            </Link>
            <Link to="/nannies" className="layout-link">
              Nannies
            </Link>
            {user && (
              <Link to="/favorites" className="layout-link">
                Favorites
              </Link>
            )}
          </div>
          <div className="layout-auth">
            {user ? (
              <>
                <span className="layout-user">{user.displayName || user.email}</span>
                <button onClick={handleLogout} className="layout-button">
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="layout-button"
              >
                Sign In
              </button>
            )}
          </div>
        </nav>
      </header>
      <main className="layout-main">{children}</main>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Layout;

