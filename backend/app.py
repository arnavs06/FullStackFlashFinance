from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

# App configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flashcards.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Define the Flashcard Model
class Flashcard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.String(255), nullable=False)

# Route to initialize the database
@app.route('/initdb')
def init_db():
    db.create_all()
    return "Database initialized!"

# Route to get all flashcards
@app.route('/api/flashcards', methods=['GET'])
def get_flashcards():
    flashcards = Flashcard.query.all()
    return jsonify([{"id": f.id, "question": f.question, "answer": f.answer} for f in flashcards])

# Route to add a flashcard
@app.route('/api/flashcards', methods=['POST'])
def add_flashcard():
    data = request.json
    new_flashcard = Flashcard(question=data['question'], answer=data['answer'])
    db.session.add(new_flashcard)
    db.session.commit()
    return jsonify({"message": "Flashcard added successfully"}), 201

# Route to delete a flashcard
@app.route('/api/flashcards/<int:id>', methods=['DELETE'])
def delete_flashcard(id):
    flashcard = Flashcard.query.get(id)
    if flashcard:
        db.session.delete(flashcard)
        db.session.commit()
        return jsonify({"message": "Flashcard deleted successfully"}), 200
    return jsonify({"message": "Flashcard not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
