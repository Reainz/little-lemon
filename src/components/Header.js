import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" aria-label="Little Lemon Restaurant - Home">
            <img src="/logo.png" alt="Little Lemon" onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'inline';
            }} />
            <span style={{display: 'none'}}>Little Lemon</span>
          </Link>
        </div>
        <nav className="nav" role="navigation" aria-label="Main navigation">
          <ul className="nav-list">
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/booking" className="nav-link">Reservations</Link>
            </li>
            <li>
              <a href="#menu" className="nav-link">Menu</a>
            </li>
            <li>
              <a href="#about" className="nav-link">About</a>
            </li>
            <li>
              <a href="#contact" className="nav-link">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 