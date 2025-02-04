import React, { useState, useEffect } from 'react';
import '../styles/Flashcards.css';

const Flashcard = () => {
  const [cards, setCards] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [isFlipped, setIsFlipped] = useState(false); 
  const [switchingCard, setSwitchingCard] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch('/api/flashcards')  // ✅ Fetch from Flask backend
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCards(data);  // ✅ Store fetched flashcards
        setError(null);
      })
      .catch((err) => {
        console.error('Error loading flashcards:', err);
        setError('Failed to load flashcards. Please try again later.');
      });
  }, []);
  
  const flipCard = () => {
    setIsFlipped((prevState) => !prevState);
  };

  const navigateFlashcards = (direction) => {
    if (switchingCard || cards.length === 0) return;

    let newIndex = currentIndex;
    if (direction === 'next' && currentIndex < cards.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === 'prev' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }

    if (newIndex !== currentIndex) {
      setSwitchingCard(true); // Start animation
      setTimeout(() => {
        setCurrentIndex(newIndex); // Update index
        setIsFlipped(false); // Reset flip state
        setSwitchingCard(false); // End animation
      }, 300); // Match animation duration
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        flipCard();
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        navigateFlashcards('next');
      } else if (e.key === 'ArrowLeft') {
        navigateFlashcards('prev');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isFlipped, cards]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (cards.length === 0) {
    return <p>Loading flashcards...</p>;
  }

  const flashcard = cards[currentIndex];

  return (
    <main>
      <div className="flashcard-container">
        <div
          className={`flashcard ${isFlipped ? 'flipped' : ''} ${
            switchingCard ? 'next-card' : ''
          }`}
          onClick={flipCard}
        >
          <div className="front">{flashcard.title}</div>
          <div className="back">{flashcard.description}</div>
        </div>
      </div>

      <div className="button-controls">
        <button
          id="prev-btn"
          className="control-btn"
          onClick={() => navigateFlashcards('prev')}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          id="flip-btn"
          className="control-btn"
          onClick={flipCard}
        >
          Flip
        </button>
        <button
          id="next-btn"
          className="control-btn"
          onClick={() => navigateFlashcards('next')}
          disabled={currentIndex === cards.length - 1}
        >
          Next
        </button>
      </div>

      <p className="instructions">
        Click the card or press space to flip it. Use the left and right arrow keys to navigate.
      </p>
    </main>
  );
};

export default Flashcard;
