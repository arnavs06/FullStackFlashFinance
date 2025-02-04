import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Flashcard from '../components/Flashcard';
import '../styles/index.css';
import '../styles/Flashcards.css';

const Flashcards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/flashcards') 
      .then((response) => {
        const formattedCards = response.data.map((card) => ({
          id: card.id,
          frontHTML: <div className="flashcard-content">{card.title}</div>,
          backHTML: <div className="flashcard-content">{card.description}</div>,
        }));
        setCards(formattedCards);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching flashcards:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading flashcards...</div>;
  }

  return (
    <div>
      <Navbar />
      <Flashcard cards={cards} />
    </div>
  );
};

export default Flashcards;
