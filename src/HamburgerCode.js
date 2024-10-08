import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Use Link for navigation
import './HamburgerMenu.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      
      <nav className={`menu ${isOpen ? 'show' : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
          <li><Link to="/create" onClick={toggleMenu}>Create</Link></li>
          <li><Link to="/browse" onClick={toggleMenu}>Browse</Link></li>
          <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
          <li><Link to="/signup" onClick={toggleMenu}>Sign Up</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
