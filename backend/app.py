from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

app = Flask(__name__)
CORS(app)

# Configure Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flashcards.db'  # Change this for your DB
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this in production

db = SQLAlchemy(app)
jwt = JWTManager(app)

# Define Flashcard Model
class Flashcard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.String(255), nullable=False)

# Create Tables
with app.app_context():
    db.create_all()

# Get all flashcards
@app.route('/flashcards', methods=['GET'])
@jwt_required()
def get_flashcards():
    flashcards = Flashcard.query.all()
    return jsonify([{"id": f.id, "question": f.question, "answer": f.answer} for f in flashcards])

# Add a flashcard
@app.route('/flashcards', methods=['POST'])
@jwt_required()
def add_flashcard():
    data = request.json
    new_flashcard = Flashcard(question=data['question'], answer=data['answer'])
    db.session.add(new_flashcard)
    db.session.commit()
    return jsonify({"message": "Flashcard added successfully"}), 201

# Delete a flashcard
@app.route('/flashcards/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_flashcard(id):
    flashcard = Flashcard.query.get(id)
    if flashcard:
        db.session.delete(flashcard)
        db.session.commit()
        return jsonify({"message": "Flashcard deleted successfully"}), 200
    return jsonify({"message": "Flashcard not found"}), 404

# Authentication Route (Temporary Admin Login)
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if data["username"] == "admin" and data["password"] == "password":  # Change in production
        token = create_access_token(identity="admin")
        return jsonify(access_token=token)
    return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)

