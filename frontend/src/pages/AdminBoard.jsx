import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
    const [flashcards, setFlashcards] = useState([]);
    const [newFlashcard, setNewFlashcard] = useState({ question: "", answer: "" });
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        if (token) fetchFlashcards();
    }, [token]);

    const fetchFlashcards = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:5000/flashcards", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFlashcards(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogin = async () => {
        const username = prompt("Enter username:");
        const password = prompt("Enter password:");
        try {
            const res = await axios.post("http://127.0.0.1:5000/login", { username, password });
            localStorage.setItem("token", res.data.access_token);
            setToken(res.data.access_token);
            fetchFlashcards();
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    const addFlashcard = async () => {
        try {
            await axios.post("http://127.0.0.1:5000/flashcards", newFlashcard, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchFlashcards();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteFlashcard = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/flashcards/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchFlashcards();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl mb-4">Admin Dashboard</h1>
            {!token ? (
                <button onClick={handleLogin} className="p-2 bg-blue-500 rounded">Login</button>
            ) : (
                <>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Question"
                            value={newFlashcard.question}
                            onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
                            className="p-2 text-black"
                        />
                        <input
                            type="text"
                            placeholder="Answer"
                            value={newFlashcard.answer}
                            onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
                            className="p-2 text-black"
                        />
                        <button onClick={addFlashcard} className="p-2 bg-green-500 ml-2 rounded">Add Flashcard</button>
                    </div>
                    <ul>
                        {flashcards.map((flashcard) => (
                            <li key={flashcard.id} className="p-2 bg-gray-800 my-2 flex justify-between">
                                {flashcard.question} - {flashcard.answer}
                                <button onClick={() => deleteFlashcard(flashcard.id)} className="p-2 bg-red-500 rounded">Delete</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
