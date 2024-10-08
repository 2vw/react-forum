// src/components/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css'; // Optional: Import CSS for styling

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Call the onSearch prop whenever the input changes
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
