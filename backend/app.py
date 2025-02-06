from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt

app = Flask(__name__)

# App configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flashcards.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change to a secure key

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

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

# Custom decorator to require admin role
def admin_required(fn):
    @jwt_required()
    def decorated_function(*args, **kwargs):
        claims = get_jwt()
        if claims["role"] != "admin":
            return jsonify({"message": "Admin privileges required."}), 403
        return fn(*args, **kwargs)
    return decorated_function

# Route to get all flashcards (accessible by everyone)
@app.route('/api/flashcards', methods=['GET'])
@jwt_required()
def get_flashcards():
    flashcards = Flashcard.query.all()
    return jsonify([{"id": f.id, "question": f.question, "answer": f.answer} for f in flashcards])

# Route to add a flashcard (admin only)
@app.route('/api/flashcards', methods=['POST'])
@admin_required
def add_flashcard():
    data = request.json
    new_flashcard = Flashcard(question=data['question'], answer=data['answer'])
    db.session.add(new_flashcard)
    db.session.commit()
    return jsonify({"message": "Flashcard added successfully"}), 201

# Route to delete a flashcard (admin only)
@app.route('/api/flashcards/<int:id>', methods=['DELETE'])
@admin_required
def delete_flashcard(id):
    flashcard = Flashcard.query.get(id)
    if flashcard:
        db.session.delete(flashcard)
        db.session.commit()
        return jsonify({"message": "Flashcard deleted successfully"}), 200
    return jsonify({"message": "Flashcard not found"}), 404

# Authentication Route (for admin login and JWT generation)
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    if data["username"] == "admin" and data["password"] == "password":  # Change in production
        token = create_access_token(identity="admin", additional_claims={"role": "admin"})
        return jsonify(access_token=token)
    elif data["username"] == "user" and data["password"] == "password":
        token = create_access_token(identity="user", additional_claims={"role": "user"})
        return jsonify(access_token=token)
    return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)