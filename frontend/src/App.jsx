import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Flashcards from './pages/Flashcards';
import Landing from './pages/Landing';
import Math from './pages/Math'; 
import Footer from './components/Footer';
import Login from './pages/Login';

const App = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
      fetch('/api/flashcards')
      .then(response => response.json())
      .then(data => setFlashcards(data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/flashcards" element={<Flashcards flashcards={flashcards} />} />
          <Route path="/math" element={<Math />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

