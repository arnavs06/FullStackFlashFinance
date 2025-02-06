import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/index.css';
import '../styles/FlashcardCRUD.css';

const FlashcardCRUD = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [newFlashcard, setNewFlashcard] = useState({ category: '', title: '', description: '', mastered: false });

    useEffect(() => {
        axios.get('http://localhost:5000/api/flashcards')
            .then(response => setFlashcards(response.data))
            .catch(error => console.error('Error fetching flashcards:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFlashcard({ ...newFlashcard, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/flashcards', newFlashcard)
            .then(response => {
                setFlashcards([...flashcards, { ...newFlashcard, id: response.data.id }]);
                setNewFlashcard({ category: '', title: '', description: '', mastered: false });
            })
            .catch(error => console.error('Error adding flashcard:', error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/flashcards/${id}`)
            .then(() => setFlashcards(flashcards.filter(card => card.id !== id)))
            .catch(error => console.error('Error deleting flashcard:', error));
    };

    return (
        <div className="flashcard-crud-container">
            <h2>Flashcard Manager</h2>
            <form onSubmit={handleSubmit} className="flashcard-form">
                <input type="text" name="category" placeholder="Category" value={newFlashcard.category} onChange={handleInputChange} required />
                <input type="text" name="title" placeholder="Title" value={newFlashcard.title} onChange={handleInputChange} required />
                <textarea name="description" placeholder="Description" value={newFlashcard.description} onChange={handleInputChange} required />
                <button type="submit">Add Flashcard</button>
            </form>
            <div className="flashcard-list">
                {flashcards.map((card) => (
                    <div key={card.id} className="flashcard">
                        <h3>{card.title}</h3>
                        <p><strong>Category:</strong> {card.category}</p>
                        <p>{card.description}</p>
                        <button onClick={() => handleDelete(card.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlashcardCRUD;
