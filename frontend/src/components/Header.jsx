import React from 'react';
import '../styles/index.css'; 

const Header = () => (
  <header>
    <div className="logo">
      <img src="/FlashFinanceLogo.png" alt="FlashFinance Logo" />
    </div>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li>
          <a href="#">Categories</a>
          <ul>
            <li><a href="#">Accounting</a></li>
            <li><a href="#">Valuation</a></li>
            <li><a href="#">M&A</a></li>
            <li><a href="#">Behavioral</a></li>
          </ul>
        </li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
);

export default Header;
