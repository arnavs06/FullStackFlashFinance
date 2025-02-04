import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/index.css'; 

const FlashcardsLink = () => (
  <div className="content">
    <h2>Prepare for Technical Questions</h2>
    <div className="card-container">
      <Link to="/flashcards" className="card flashcards-card"> {/* Use Link for Flashcards */}
        <h3>Flashcards</h3>
        <p>Learn all the vocabulary necessary for IB/PE through easy-to-digest flashcards.</p>
      </Link>
      <Link to="/math" className="card"> {/* Use Link for Interview Style Questions */}
        <h3>Accounting Problems</h3>
        <p>Sharpen your accounting skills through open ended math questions</p>
      </Link>
      <a href="/ma-strategies" className="card">
        <h3>M&A Strategies</h3>
        <p>Dive into merger models and accretion/dilution analysis.</p>
      </a>
      <a href="/behavioral-questions" className="card">
        <h3>Behavioral Questions</h3>
        <p>Prepare for the fit interview with confidence.</p>
      </a>
    </div>
  </div>
);

export default FlashcardsLink;

