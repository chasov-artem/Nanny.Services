import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getFavorites } from '../../services/database';
import NannyCard from '../../components/NannyCard/NannyCard';
import './Favorites.css';

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const favoriteNannies = await getFavorites(user.uid);
      setFavorites(favoriteNannies);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="favorites-loading">
        <div>Loading favorites...</div>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h1 className="favorites-title">My Favorites</h1>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((nanny) => (
            <NannyCard key={nanny.id} nanny={nanny} />
          ))}
        </div>
      ) : (
        <div className="favorites-empty">
          <p>You haven't added any nannies to favorites yet.</p>
          <p>Start exploring our nannies and add your favorites!</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;

