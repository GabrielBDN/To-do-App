import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="logo">Ma To-Do App</h1>
      <nav>
        <Link to="/" className="nav-link">Accueil</Link>
        <Link to="/projects" className="nav-link">Projets</Link>
      </nav>
    </header>
  );
}

export default Header;
