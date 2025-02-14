import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Flashcards from './pages/Flashcards';
import Landing from './pages/Landing';
import Math from './pages/Math'; 
import Footer from './components/Footer';
import Login from './pages/Login';
import CardEditor from './pages/CardEditor';
import FlashcardDashboard from './pages/FlashcardDashboard';
import AIQuestions from './pages/AIQuestions';

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
          <Route path="edit-cards" element={<CardEditor />}/>
          <Route path="/cardboard" element={<FlashcardDashboard />} />
          <Royte path="/testing" element={<AIQuestions />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

