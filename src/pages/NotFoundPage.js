// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>Go Back Home</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
