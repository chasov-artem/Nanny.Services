import { useState, useEffect } from 'react';
import { getNannies, getAllNannies } from '../../services/database';
import NannyCard from '../../components/NannyCard/NannyCard';
import Filters from '../../components/Filters/Filters';
import './Nannies.css';

const Nannies = () => {
  const [nannies, setNannies] = useState([]);
  const [displayedNannies, setDisplayedNannies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastKey, setLastKey] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [sortConfig, setSortConfig] = useState({ type: '', order: '' });
  const [filterConfig, setFilterConfig] = useState({ price: '' });

  useEffect(() => {
    loadInitialNannies();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [nannies, sortConfig, filterConfig]);

  const loadInitialNannies = async () => {
    try {
      setLoading(true);
      const result = await getNannies(3, null);
      setNannies(result.nannies);
      setLastKey(result.lastKey);
      setHasMore(result.lastKey !== null);
    } catch (error) {
      console.error('Error loading nannies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreNannies = async () => {
    if (!hasMore || loadingMore) return;

    try {
      setLoadingMore(true);
      const result = await getNannies(3, lastKey);
      setNannies((prev) => {
        const existingIds = new Set(prev.map(n => n.id));
        const newNannies = result.nannies.filter(n => !existingIds.has(n.id));
        return [...prev, ...newNannies];
      });
      setLastKey(result.lastKey);
      setHasMore(result.lastKey !== null);
    } catch (error) {
      console.error('Error loading more nannies:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const applyFiltersAndSort = () => {
    // Видаляємо дублікати за ID
    const uniqueNannies = Array.from(
      new Map(nannies.map(nanny => [nanny.id, nanny])).values()
    );
    
    let filtered = [...uniqueNannies];

    if (filterConfig.price) {
      filtered = filtered.filter((nanny) => {
        const price = nanny.price_per_hour;
        if (filterConfig.price.endsWith('+')) {
          const min = parseInt(filterConfig.price);
          return price >= min;
        }
        const [min, max] = filterConfig.price.split('-').map((v) => parseInt(v));
        return price >= min && price <= max;
      });
    }

    if (sortConfig.type === 'name') {
      filtered.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (sortConfig.order === 'asc') {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
    } else if (sortConfig.type === 'rating') {
      filtered.sort((a, b) => {
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        if (sortConfig.order === 'asc') {
          return ratingA - ratingB;
        } else {
          return ratingB - ratingA;
        }
      });
    }

    setDisplayedNannies(filtered);
  };

  const handleSortChange = async (config) => {
    setSortConfig(config);
    if (config.type && nannies.length < 10) {
      try {
        const allNannies = await getAllNannies();
        // Видаляємо дублікати
        const uniqueNannies = Array.from(
          new Map(allNannies.map(nanny => [nanny.id, nanny])).values()
        );
        setNannies(uniqueNannies);
      } catch (error) {
        console.error('Error loading all nannies:', error);
      }
    }
  };

  const handleFilterChange = async (config) => {
    setFilterConfig(config);
    if (config.price && nannies.length < 10) {
      try {
        const allNannies = await getAllNannies();
        // Видаляємо дублікати
        const uniqueNannies = Array.from(
          new Map(allNannies.map(nanny => [nanny.id, nanny])).values()
        );
        setNannies(uniqueNannies);
      } catch (error) {
        console.error('Error loading all nannies:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="nannies-loading">
        <div>Loading nannies...</div>
      </div>
    );
  }

  return (
    <div className="nannies">
      <Filters onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
      <div className="nannies-content">
        <div className="nannies-grid">
          {displayedNannies.length > 0 ? (
            displayedNannies.map((nanny) => <NannyCard key={nanny.id} nanny={nanny} />)
          ) : (
            <div className="nannies-empty">No nannies found</div>
          )}
        </div>
        {!sortConfig.type && !filterConfig.price && hasMore && (
          <div className="nannies-load-more">
            <button
              onClick={loadMoreNannies}
              disabled={loadingMore}
              className="nannies-load-more-button"
            >
              {loadingMore ? 'Loading...' : 'Load more'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nannies;

