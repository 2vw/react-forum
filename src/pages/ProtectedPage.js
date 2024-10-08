// src/pages/ProtectedPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/protected');
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  return isAuthenticated ? <div>Protected Content</div> : null;
};

export default ProtectedPage;
