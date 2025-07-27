# MagicBully - AI Cyberbullying Detection System

A comprehensive full-stack AI website that detects cyberbullying from user-submitted text or images using a custom-trained machine learning model. The system analyzes English-language inputs for themes such as racial slurs, gender-based harassment, suicidal ideation, and general bullying behavior.

## 🌟 Features

- **Multi-Modal Input**: Analyze text directly or extract text from images using OCR
- **Custom AI Model**: Trained specifically for cyberbullying detection patterns
- **Theme Classification**: Detects multiple types of harmful content:
  - Racial slurs and discrimination
  - Gender-based harassment
  - Suicidal ideation and self-harm
  - General bullying and abuse
- **Confidence Scoring**: Provides 0-100% confidence levels for predictions
- **Keyword Highlighting**: Shows specific words/phrases that triggered detection
- **Ethical Design**: Built-in disclaimers and crisis support information
- **User Feedback**: Collect feedback to improve model accuracy
- **Mobile Responsive**: Works seamlessly on all devices

## 🏗️ Architecture

The project is built in clear development phases for smooth Git versioning and modular development:

### Phase 1: Frontend User Interface ✅
- React with Tailwind CSS
- Text input and image upload functionality
- Results panel for analysis output
- Mobile-responsive design

### Phase 2: Backend and AI Model ✅
- Flask API with custom machine learning model
- PyTorch/TensorFlow-based classification
- Multi-theme detection capabilities
- Model training and persistence

### Phase 3: OCR Integration ✅
- Tesseract.js for image text extraction
- Automatic text processing pipeline
- Image preview and validation

### Phase 4: Enhanced Results ✅
- Detailed classification results
- Confidence score visualization
- Theme detection and explanation
- Keyword highlighting

### Phase 5: Ethical Considerations ✅
- Prominent disclaimers about AI limitations
- Crisis support hotline information
- Privacy protection notices
- Professional mental health disclaimers

### Phase 6: Deployment Ready ✅
- Production-ready configuration
- Docker support
- Environment variable management
- Comprehensive documentation

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (3.8 or higher)
- **npm** or **yarn**
- **pip**

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd MagicBully
   ```

2. **Set up the Backend:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```

3. **Set up the Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
MagicBully/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.js          # Main application
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies
│   └── README.md           # Frontend documentation
├── backend/                 # Flask backend API
│   ├── models/             # AI model implementation
│   ├── app.py             # Main Flask application
│   ├── requirements.txt   # Python dependencies
│   └── README.md          # Backend documentation
├── models/                 # Trained model files
├── datasets/              # Training datasets
├── docs/                  # Project documentation
└── README.md             # This file
```

## 🔧 Configuration

### Environment Variables

Create `.env` files in both frontend and backend directories:

**Backend (.env):**
```env
FLASK_ENV=development
PORT=5000
MODEL_PATH=models/cyberbully_model.pkl
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🤖 AI Model Details

### Model Architecture

- **Algorithm**: Random Forest Classifier with TF-IDF features
- **Training Data**: Custom-labeled datasets for cyberbullying detection
- **Features**: Text preprocessing, n-gram extraction, custom feature engineering
- **Accuracy**: Continuously improved through user feedback

### Supported Themes

1. **Racial Slurs**: Ethnic and racial discriminatory language
2. **Gender Slurs**: Gender-based harassment and discrimination  
3. **Suicidal Ideation**: Self-harm and suicide-related content
4. **General Bullying**: General abusive and harmful language
5. **Safe Content**: Non-harmful, normal communication

### Model Training

The model is trained on:
- Synthetic training data (for demonstration)
- Real-world cyberbullying examples
- Balanced datasets for fair classification
- Cross-validation for robust performance

## 🌐 API Endpoints

### Text Classification
```
POST /api/classify-text
Content-Type: application/json

{
  "text": "Text to analyze"
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

### Health Check
```
GET /api/health
```

### Feedback Submission
```
POST /api/feedback
```

## 🎨 User Interface

### Key Features

- **Clean Design**: Modern, intuitive interface
- **Dual Input Modes**: Text input and image upload
- **Real-time Analysis**: Instant results with loading states
- **Visual Feedback**: Color-coded results and confidence bars
- **Mobile Responsive**: Optimized for all screen sizes

### Components

- **TextInput**: Direct text analysis interface
- **ImageUpload**: Drag-and-drop image processing with OCR
- **ResultsPanel**: Detailed analysis results display
- **Disclaimer**: Ethical considerations and crisis support

## 🔒 Privacy & Ethics

### Privacy Protection

- **No Data Storage**: User inputs are not stored unless explicitly opted in
- **Local Processing**: OCR processing happens client-side
- **Secure API**: HTTPS encryption for all communications
- **Anonymous Feedback**: Optional feedback collection without personal data

### Ethical Considerations

- **AI Limitations**: Clear disclaimers about model accuracy
- **Crisis Support**: Prominent hotline information for suicidal content
- **Professional Disclaimer**: Not a substitute for mental health support
- **Transparent Classification**: Explainable AI with keyword highlighting

## 🚀 Deployment

### Frontend Deployment

**Vercel:**
```bash
cd frontend
npm run build
vercel --prod
```

**Netlify:**
```bash
cd frontend
npm run build
netlify deploy --prod
```

### Backend Deployment

**Render:**
```bash
# Connect GitHub repository
# Set environment variables
# Deploy automatically
```

**Railway:**
```bash
railway login
railway init
railway up
```

**Docker:**
```bash
docker build -t magicbully-backend .
docker run -p 5000:5000 magicbully-backend
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
pytest tests/
```

### API Testing
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test classification
curl -X POST http://localhost:5000/api/classify-text \
  -H "Content-Type: application/json" \
  -d '{"text": "Test message"}'
```

## 📊 Performance

### Optimization Features

- **Model Caching**: Pre-loaded models for fast inference
- **Image Compression**: Optimized image processing
- **Lazy Loading**: Efficient component loading
- **CDN Ready**: Static asset optimization

### Monitoring

- **Health Checks**: API endpoint monitoring
- **Error Logging**: Comprehensive error tracking
- **Performance Metrics**: Response time monitoring
- **User Analytics**: Anonymous usage statistics

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow React best practices for frontend
- Use Python PEP 8 style guide for backend
- Write comprehensive tests for new features
- Update documentation for API changes
- Ensure mobile responsiveness

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Crisis Support

If you or someone you know is in crisis:

- **Philippines**: 1553 or 0917-899-8727
- **International**: 988 (US) or your local crisis hotline
- **Emergency**: 911 or your local emergency number

### Technical Support

- **Issues**: Create an issue in the repository
- **Documentation**: Check the docs/ directory
- **Email**: [Your contact email]

## 🙏 Acknowledgments

- **NLTK**: Natural language processing toolkit
- **Tesseract.js**: OCR capabilities
- **React Community**: Frontend framework
- **Flask**: Backend framework
- **Scikit-learn**: Machine learning library

## 📈 Roadmap

### Future Enhancements

- [ ] **Multi-language Support**: Expand beyond English
- [ ] **Advanced NLP**: BERT-based classification
- [ ] **Real-time Monitoring**: Live content analysis
- [ ] **API Rate Limiting**: Enhanced security
- [ ] **Model Retraining**: Automated model updates
- [ ] **Dashboard**: Admin interface for model management
- [ ] **Mobile App**: Native iOS/Android applications
- [ ] **Integration APIs**: Third-party platform integration

---

**Built with ❤️ for a safer online environment** 