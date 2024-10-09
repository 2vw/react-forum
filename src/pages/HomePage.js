// src/pages/HomePage.js
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <div class="hero">
        <h1>Home Page</h1>
        <p>Welcome to the Home Page!</p>
        <hr></hr>
      </div>
      <div class="middle">
        <button onClick={() => window.location.href = '/browse'}>Browse Threads</button>
      </div>
    </div>
  );
};

export default HomePage;
