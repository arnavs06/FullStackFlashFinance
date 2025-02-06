import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import JobPostings from '../components/JobPostings';
import FlashcardsLink from '../components/FlashcardsLink';
import '../styles/index.css'; 

const Landing = () => (
  <div>
    <Navbar />
    <Hero />
    <JobPostings />
    <FlashcardsLink />
  </div>
);

export default Landing;
