import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Back2Me</Link>
    </nav>
  );
}

export default Navbar;
