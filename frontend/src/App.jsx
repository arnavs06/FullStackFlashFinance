import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Flashcards from './pages/Flashcards';
import Landing from './pages/Landing';
import Math from './pages/Math'; 
import Footer from './components/Footer';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar appears on all pages */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Landing />} /> {/* Landing page as home page */}
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/math" element={<Math />} /> {/* Add route for Math page */}
          <Route path="/login" element={< Login />} />
        </Routes>

        {/* Footer appears on all pages */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
