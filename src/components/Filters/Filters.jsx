import { useState } from 'react';
import './Filters.css';

const Filters = ({ onSortChange, onFilterChange }) => {
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const handleSortChange = (type, order) => {
    setSortBy(type);
    setSortOrder(order);
    onSortChange({ type, order });
  };

  const handlePriceFilter = (filter) => {
    setPriceFilter(filter);
    onFilterChange({ price: filter });
  };

  return (
    <div className="filters">
      <div className="filters-group">
        <label className="filters-label">Sort by name:</label>
        <div className="filters-buttons">
          <button
            className={`filters-button ${sortBy === 'name' && sortOrder === 'asc' ? 'active' : ''}`}
            onClick={() => handleSortChange('name', 'asc')}
          >
            A-Z
          </button>
          <button
            className={`filters-button ${sortBy === 'name' && sortOrder === 'desc' ? 'active' : ''}`}
            onClick={() => handleSortChange('name', 'desc')}
          >
            Z-A
          </button>
        </div>
      </div>

      <div className="filters-group">
        <label className="filters-label">Sort by rating:</label>
        <div className="filters-buttons">
          <button
            className={`filters-button ${sortBy === 'rating' && sortOrder === 'asc' ? 'active' : ''}`}
            onClick={() => handleSortChange('rating', 'asc')}
          >
            Low to High
          </button>
          <button
            className={`filters-button ${sortBy === 'rating' && sortOrder === 'desc' ? 'active' : ''}`}
            onClick={() => handleSortChange('rating', 'desc')}
          >
            High to Low
          </button>
        </div>
      </div>

      <div className="filters-group">
        <label className="filters-label">Filter by price:</label>
        <select
          className="filters-select"
          value={priceFilter}
          onChange={(e) => handlePriceFilter(e.target.value)}
        >
          <option value="">All prices</option>
          <option value="0-15">$0 - $15/hour</option>
          <option value="15-18">$15 - $18/hour</option>
          <option value="18-20">$18 - $20/hour</option>
          <option value="20+">$20+/hour</option>
        </select>
      </div>

      {(sortBy || priceFilter) && (
        <button
          className="filters-clear"
          onClick={() => {
            setSortBy('');
            setSortOrder('');
            setPriceFilter('');
            onSortChange({ type: '', order: '' });
            onFilterChange({ price: '' });
          }}
        >
          Clear filters
        </button>
      )}
    </div>
  );
};

export default Filters;

