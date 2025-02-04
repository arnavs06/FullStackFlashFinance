import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Question from '../components/Question';  // Corrected import to 'Question'
import '../styles/index.css';
import '../styles/Math.css';

const Math = () => (
  <div>
    <Header />
    <Navbar />
    <Question />  {/* Render the Question component */}
  </div>
);

export default Math;
