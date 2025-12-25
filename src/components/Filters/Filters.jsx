import { useState, useEffect, useRef } from 'react';
import './Filters.css';

const Filters = ({ onSortChange, onFilterChange }) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('A to Z');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSortChange = (type, order) => {
    onSortChange({ type, order });
  };

  const handlePriceFilter = (filter) => {
    onFilterChange({ price: filter });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    
    if (option === 'A to Z') {
      handleSortChange('name', 'asc');
    } else if (option === 'Z to A') {
      handleSortChange('name', 'desc');
    } else if (option === 'Less than 10$') {
      handlePriceFilter('0-10');
    } else if (option === 'Greater than 10$') {
      handlePriceFilter('10+');
    } else if (option === 'Popular') {
      handleSortChange('rating', 'desc');
    } else if (option === 'Not popular') {
      handleSortChange('rating', 'asc');
    } else if (option === 'Show all') {
      onSortChange({ type: '', order: '' });
      onFilterChange({ price: '' });
    }
  };

  return (
    <div className="filters">
      <h2 className="filters-title">Filters</h2>
      <div className="filters-dropdown-wrapper" ref={dropdownRef}>
        <button
          className="filters-dropdown-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedOption}
          <svg
            className={`filters-dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="filters-dropdown-menu">
            <button
              className="filters-dropdown-item"
              onClick={() => handleOptionSelect('A to Z')}
            >
              A to Z
            </button>
            <button
              className="filters-dropdown-item"
              onClick={() => handleOptionSelect('Z to A')}
            >
              Z to A
            </button>
            <button
              className="filters-dropdown-item"
              onClick={() => handleOptionSelect('Less than 10$')}
            >
              Less than 10$
            </button>
            <button
              className="filters-dropdown-item"
              onClick={() => handleOptionSelect('Greater than 10$')}
            >
              Greater than 10$
            </button>
            <button
              className="filters-dropdown-item"
              onClick={() => handleOptionSelect('Popular')}
            >
              Popular
            </button>
            <button
              className="filters-dropdown-item"
              onClick={() => handleOptionSelect('Not popular')}
            >
              Not popular
            </button>
            <button
              className="filters-dropdown-item"
              onClick={() => handleOptionSelect('Show all')}
            >
              Show all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;

