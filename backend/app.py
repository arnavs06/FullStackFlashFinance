from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import logging
from models import db, Flashcard

app = Flask(__name__)

# Use PostgreSQL instead of SQLite if in production
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flashcards.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

CORS(app, resources={r"/api/*": {"origins": "*"}})

logging.basicConfig(level=logging.DEBUG)

@app.route('/api/flashcards', methods=['GET'])
def get_flashcards():
    flashcards = Flashcard.query.all()
    return jsonify([{
        'id': card.id,
        'category': card.category,
        'title': card.title,
        'description': card.description,
        'mastered': card.mastered
    } for card in flashcards])

@app.route('/api/flashcards', methods=['POST'])
def create_flashcard():
    data = request.json
    new_flashcard = Flashcard(
        category=data['category'],
        title=data['title'],
        description=data['description'],
        mastered=data.get('mastered', False)
    )
    db.session.add(new_flashcard)
    db.session.commit()
    return jsonify({'message': 'Flashcard created', 'id': new_flashcard.id}), 201

@app.route('/api/flashcards/<int:card_id>', methods=['DELETE'])
def delete_flashcard(card_id):
    flashcard = Flashcard.query.get(card_id)
    if not flashcard:
        return jsonify({'error': 'Flashcard not found'}), 404
    db.session.delete(flashcard)
    db.session.commit()
    return jsonify({'message': 'Flashcard deleted'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
