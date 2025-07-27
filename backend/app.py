from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from models.cyberbully_detector import CyberbullyDetector
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Initialize the cyberbullying detector
detector = None

def initialize_model():
    """Initialize the cyberbullying detection model"""
    global detector
    try:
        detector = CyberbullyDetector()
        logger.info("Cyberbullying detection model initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize model: {e}")
        raise

@app.before_first_request
def setup():
    """Initialize the model before the first request"""
    initialize_model()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': detector is not None
    })

@app.route('/api/classify-text', methods=['POST'])
def classify_text():
    """Classify text for cyberbullying content"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({
                'error': 'Text field is required'
            }), 400
        
        text = data['text'].strip()
        
        if not text:
            return jsonify({
                'error': 'Text cannot be empty'
            }), 400
        
        # Perform classification
        result = detector.classify(text)
        
        logger.info(f"Classification completed for text: {text[:50]}...")
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error in text classification: {e}")
        return jsonify({
            'error': 'Internal server error during classification'
        }), 500

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    """Submit user feedback on classification results"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'error': 'Feedback data is required'
            }), 400
        
        # Log feedback for model improvement (in production, store in database)
        logger.info(f"Feedback received: {data}")
        
        # In a real implementation, you would:
        # 1. Store feedback in a database
        # 2. Use it to retrain/improve the model
        # 3. Track accuracy metrics
        
        return jsonify({
            'message': 'Feedback received successfully',
            'status': 'success'
        })
        
    except Exception as e:
        logger.error(f"Error processing feedback: {e}")
        return jsonify({
            'error': 'Internal server error processing feedback'
        }), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Endpoint not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Internal server error'
    }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    app.run(host='0.0.0.0', port=port, debug=debug) 