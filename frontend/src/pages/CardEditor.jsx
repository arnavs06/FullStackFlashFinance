import React, { useState, useEffect } from "react";

const FlashcardApp = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch flashcards from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/flashcards")
      .then((res) => res.json())
      .then((data) => setFlashcards(data))
      .catch((err) => console.error("Error fetching flashcards:", err));
  }, []);

  // Add new flashcard
  const handleAddFlashcard = () => {
    const newFlashcard = { category, title, description, mastered: false };

    fetch("http://localhost:5000/api/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFlashcard),
    })
      .then((res) => res.json())
      .then((data) => {
        setFlashcards([...flashcards, { ...newFlashcard, id: data.id }]);
        setCategory("");
        setTitle("");
        setDescription("");
      })
      .catch((err) => console.error("Error adding flashcard:", err));
  };

  // Delete flashcard
  const handleDeleteFlashcard = (id) => {
    fetch(`http://localhost:5000/api/flashcards/${id}`, { method: "DELETE" })
      .then(() => {
        setFlashcards(flashcards.filter((card) => card.id !== id));
      })
      .catch((err) => console.error("Error deleting flashcard:", err));
  };

  return (
    <div className="flashcard-container">
      <h1>Flashcard Manager</h1>

      {/* Flashcard Input Form */}
      <div className="flashcard-form">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddFlashcard}>Add Flashcard</button>
      </div>

      {/* Flashcards List */}
      <div className="flashcard-list">
        {flashcards.map((card) => (
          <div key={card.id} className="flashcard">
            <div className="flashcard-front">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <p><strong>Category:</strong> {card.category}</p>
              <button onClick={() => handleDeleteFlashcard(card.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardApp;
