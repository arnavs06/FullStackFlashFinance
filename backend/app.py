from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Flashcard

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flashcards.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Allow frontend access from Vite's development server
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
