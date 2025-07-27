# MagicBully Backend

A Flask-based backend API for the MagicBully AI cyberbullying detection system. This backend provides a custom-trained machine learning model for analyzing text content and detecting various forms of cyberbullying.

## Features

- **Custom AI Model**: Trained specifically for cyberbullying detection
- **Multi-theme Classification**: Detects racial slurs, gender harassment, suicidal ideation, and general bullying
- **RESTful API**: Clean endpoints for text classification and feedback
- **Real-time Analysis**: Fast classification with confidence scores
- **Keyword Extraction**: Identifies specific words/phrases that triggered detection
- **Model Persistence**: Saves and loads trained models

## Technologies Used

- **Flask**: Lightweight web framework for API development
- **Scikit-learn**: Machine learning library for classification
- **NLTK**: Natural language processing toolkit
- **NumPy/Pandas**: Data manipulation and analysis
- **PyTorch**: Deep learning framework (optional for advanced models)
- **Gunicorn**: WSGI server for production deployment

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip package manager

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the development server:
   ```bash
   python app.py
   ```

5. The API will be available at `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```
Returns the health status of the API and model.

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### Text Classification
```
POST /api/classify-text
```
Analyzes text for cyberbullying content.

**Request Body:**
```json
{
  "text": "Text to analyze for cyberbullying"
}
```

**Response:**
```json
{
  "classification": "Cyberbullying",
  "confidence": 0.85,
  "theme": "general_bullying",
  "keywords": ["ugly", "stupid", "worthless"]
}
```

### Feedback Submission
```
POST /api/feedback
```
Submit user feedback on classification results.

**Request Body:**
```json
{
  "text": "Original text",
  "classification": "Cyberbullying",
  "user_feedback": true,
  "comments": "Optional feedback"
}
```

**Response:**
```json
{
  "message": "Feedback received successfully",
  "status": "success"
}
```

## Model Architecture

### CyberbullyDetector Class

The main model class provides:

- **Text Preprocessing**: Tokenization, lemmatization, stopword removal
- **Feature Extraction**: TF-IDF vectorization and custom features
- **Classification**: Random Forest classifier with fallback rule-based system
- **Theme Detection**: Multi-category classification for different types of cyberbullying
- **Keyword Extraction**: Identifies specific terms that triggered detection

### Supported Themes

1. **Racial Slurs**: Ethnic and racial discriminatory language
2. **Gender Slurs**: Gender-based harassment and discrimination
3. **Suicidal Ideation**: Self-harm and suicide-related content
4. **General Bullying**: General abusive and harmful language
5. **Safe Content**: Non-harmful, normal communication

### Model Training

The model is trained on:
- Synthetic training data (for demonstration)
- TF-IDF features with n-gram extraction
- Random Forest classifier with hyperparameter tuning
- Cross-validation for model evaluation

## Project Structure

```
backend/
├── app.py                     # Main Flask application
├── requirements.txt           # Python dependencies
├── models/
│   ├── __init__.py           # Models package
│   └── cyberbully_detector.py # Main AI model class
├── tests/                    # Unit tests
└── README.md                 # This file
```

## Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
FLASK_ENV=development
PORT=5000
MODEL_PATH=models/cyberbully_model.pkl
```

### Model Configuration

The model can be configured through the `CyberbullyDetector` class:

- **Training Data**: Modify `create_training_data()` for custom datasets
- **Keywords**: Update `theme_keywords` for different detection categories
- **Thresholds**: Adjust classification thresholds in `_rule_based_classification()`
- **Features**: Customize feature extraction in `extract_features()`

## Development

### Running Tests

```bash
pytest tests/
```

### Code Formatting

```bash
black .
flake8 .
```

### Model Training

The model automatically trains on startup if no pre-trained model is found. To retrain:

```python
from models.cyberbully_detector import CyberbullyDetector

detector = CyberbullyDetector()
detector.train_model()
detector.save_model('path/to/save/model.pkl')
```

## Production Deployment

### Using Gunicorn

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Docker Deployment

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

### Environment Variables for Production

```env
FLASK_ENV=production
PORT=5000
MODEL_PATH=/app/models/cyberbully_model.pkl
```

## Performance Considerations

- **Model Loading**: Models are loaded once at startup for fast inference
- **Caching**: Consider implementing Redis for request caching
- **Scaling**: Use load balancers for horizontal scaling
- **Monitoring**: Implement logging and metrics collection

## Security Considerations

- **Input Validation**: All inputs are validated and sanitized
- **Rate Limiting**: Consider implementing rate limiting for API endpoints
- **CORS**: Configured for frontend communication
- **Error Handling**: Comprehensive error handling without exposing internals

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is part of the MagicBully AI system and follows the same licensing terms.

## Support

For support or questions about the backend, please refer to the main project documentation or create an issue in the repository. 