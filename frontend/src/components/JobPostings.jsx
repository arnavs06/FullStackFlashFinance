import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css'; 

const JobPostings = () => (
  <div className="new-job-postings">
    <h2>Partnered Services</h2>
    <div className="job-card-container">
      <Link to="https://www.ibinternships.com" className="job-card">
        <div>
          <h3>IBInternships.com</h3>
          <p>Search for new internships to kickstart your career in finance</p>
        </div>
      </Link>
      <Link to="https://www.searchfundfellows.com" className="job-card">
        <div>
          <h3>Search Fund Fellows</h3>
          <p>Develop technical skills and internship experience through our program.</p>
        </div>
      </Link>
    </div>
  </div>
);

export default JobPostings;

