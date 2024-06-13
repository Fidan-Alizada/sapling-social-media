import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">Sapling Social Media</Link>
          </div>
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create-post">Create Post</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
