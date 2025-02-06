import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css'; // Separate CSS for styling
import Dropdown from './DropDown';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">
        <Link to='/'>
          <img src="FlashFinanceLogo.png" alt="FlashFinance Logo" />
        </Link>
      </div>
      
      <nav className="nav-links">
      </nav>

      {/* Menu Icon for mobile users */}
      <Dropdown />
    </header>
  );
};

export default Navbar;

