from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import logging
from models import db, Flashcard  # Import database and model

app = Flask(__name__)

# Configure SQLite database (use PostgreSQL for production)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flashcards.db'  # SQLite file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking

db.init_app(app)  # Initialize the database

# Allow CORS from localhost:5173 (React app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Logging setup
logging.basicConfig(level=logging.DEBUG)

@app.route('/api/flashcards', methods=['GET'])
def get_flashcards():
    app.logger.info('Flashcards route accessed')
    flashcards = Flashcard.query.all()  # Query all flashcards from the database
    return jsonify([{
        'id': card.id,
        'category': card.category,
        'title': card.title,
        'description': card.description,
        'mastered': card.mastered
    } for card in flashcards])

@app.route('/api/flashcards', methods=['POST'])
def create_flashcard():
    # Here you would handle the logic for creating a new flashcard
    pass

if __name__ == '__main__':
    app.logger.info('Starting Flask server...')
    app.run(debug=True, port=5000)


