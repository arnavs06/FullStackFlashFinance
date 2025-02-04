import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css'; // Optional: you can add specific styling here

const Navbar = () => {
  return (
    <header>
      <div className="logo">
       <Link to='/'><img src="FlashFinanceLogo.png" alt="FlashFinance Logo" /></Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="#">Categories</Link>
            <ul>
              <li><Link to="#">Accounting</Link></li>
              <li><Link to="#">Valuation</Link></li>
              <li><Link to="#">M&A</Link></li>
              <li><Link to="#">Behavioral</Link></li>
            </ul>
          </li>
          <li>
            <Link to="#">About</Link>
          </li>
          <li>
            <Link to="#">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
