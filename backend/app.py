from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure MySQL Database
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize Database
db = SQLAlchemy(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Define the Flashcard model
class Flashcard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    mastered = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Flashcard {self.title}>'

# Routes
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

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5000)