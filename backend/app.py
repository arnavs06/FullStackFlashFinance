from flask import Flask, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)

# Allow CORS for all origins (for debugging)
CORS(app)

# Logging setup
logging.basicConfig(level=logging.DEBUG)

flashcards = [
    {"id": 1, "category": "Finance", "title": "What is SMA?", "description": "Simple Moving Average", "mastered": False},
    {"id": 2, "category": "Programming", "title": "Define React", "description": "A JavaScript library for building user interfaces", "mastered": False}
]

@app.route('/api/flashcards', methods=['GET'])
def get_flashcards():
    app.logger.info('Flashcards route accessed')
    response = jsonify(flashcards)
    
    # Add CORS headers manually
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')

    return response

if __name__ == '__main__':
    app.logger.info('Starting Flask server...')
    app.run(debug=True, port=5000)

