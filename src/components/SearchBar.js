// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Pass the search query to the parent component
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title, message, or tags..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
