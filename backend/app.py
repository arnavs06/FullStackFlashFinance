from flask import Flask, jsonify, request
from flask_cors import CORS
import logging

app = Flask(__name__)

# Proper CORS handling
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})

# Logging setup
logging.basicConfig(level=logging.DEBUG)

flashcards = [
    {"id": 1, "category": "Finance", "title": "What is SMA?", "description": "Simple Moving Average", "mastered": False},
    {"id": 2, "category": "Programming", "title": "Define React", "description": "A JavaScript library for building user interfaces", "mastered": False}
]

@app.route('/api/flashcards', methods=['GET'])
def get_flashcards():
    app.logger.info('Flashcards route accessed')
    return jsonify(flashcards)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    return response

if __name__ == '__main__':
    app.logger.info('Starting Flask server...')
    app.run(debug=True, port=5000)
