import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../Header/Header';
import './Layout.css';

const Layout = ({ children }) => {
  const { loading } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="layout">
      {!isHomePage && <Header />}
      <main className={isHomePage ? 'layout-main-full' : 'layout-main'}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

