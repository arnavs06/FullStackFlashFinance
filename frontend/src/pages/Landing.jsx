import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import JobPostings from '../components/JobPostings';
import FlashcardsLink from '../components/FlashcardsLink';
import '../styles/index.css'; 

const Landing = () => (
  <div>
    <Header />
    <Hero />
    <JobPostings />
    <FlashcardsLink />
  </div>
);

export default Landing;
