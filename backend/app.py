from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import logging

app = Flask(__name__)

# More explicit CORS configuration
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Set up logging
logging.basicConfig(level=logging.DEBUG)

flashcards = [
    {"id": 1, "category": "Programming", "title": "What is SMA?", "description": "Simple Moving Average", "mastered": False},
    {"id": 2, "category": "Programming", "title": "Define React", "description": "A JavaScript library for building user interfaces", "mastered": False}
]

@app.route('/api/flashcards', methods=['GET', 'OPTIONS'])
def get_flashcards():
    app.logger.info('Flashcards route accessed')
    
    # Handle preflight request
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', '*')
        return response
        
    response = make_response(jsonify(flashcards))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.after_request
def after_request(response):
    app.logger.info(f'Request headers: {dict(request.headers)}')
    app.logger.info(f'Response headers: {dict(response.headers)}')
    return response

if __name__ == '__main__':
    app.logger.info('Starting Flask server...')
    app.run(debug=True, port=5000)