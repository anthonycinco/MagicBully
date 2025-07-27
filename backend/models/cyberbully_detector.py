import numpy as np
import pandas as pd
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import pickle
import os
import logging
from typing import Dict, List, Tuple, Any

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

try:
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('wordnet')

logger = logging.getLogger(__name__)

class CyberbullyDetector:
    """
    Custom cyberbullying detection model trained on labeled datasets
    """
    
    def __init__(self, model_path: str = None):
        """
        Initialize the cyberbullying detector
        
        Args:
            model_path: Path to pre-trained model file
        """
        self.vectorizer = None
        self.classifier = None
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))
        
        # Define cyberbullying themes and their keywords
        self.theme_keywords = {
            'racial_slurs': [
                'nigger', 'nigga', 'chink', 'spic', 'wetback', 'gook', 'kike', 'jap',
                'towelhead', 'sandnigger', 'beaner', 'coon', 'jungle bunny', 'porch monkey'
            ],
            'gender_slurs': [
                'bitch', 'slut', 'whore', 'cunt', 'pussy', 'dick', 'cock', 'faggot',
                'dyke', 'lesbo', 'tranny', 'shemale', 'fag', 'queer', 'homo'
            ],
            'suicidal_ideation': [
                'kill myself', 'want to die', 'end it all', 'no reason to live',
                'better off dead', 'suicide', 'self harm', 'cut myself', 'overdose',
                'hang myself', 'jump off', 'swallow pills', 'bleed out'
            ],
            'general_bullying': [
                'ugly', 'fat', 'stupid', 'idiot', 'moron', 'retard', 'loser',
                'worthless', 'nobody', 'hate you', 'wish you were dead',
                'kill yourself', 'go die', 'you suck', 'pathetic'
            ]
        }
        
        if model_path and os.path.exists(model_path):
            self.load_model(model_path)
        else:
            self.train_model()
    
    def preprocess_text(self, text: str) -> str:
        """
        Preprocess text for analysis
        
        Args:
            text: Input text
            
        Returns:
            Preprocessed text
        """
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters and numbers
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        
        # Tokenize
        tokens = word_tokenize(text)
        
        # Remove stopwords and lemmatize
        tokens = [
            self.lemmatizer.lemmatize(token) 
            for token in tokens 
            if token not in self.stop_words and len(token) > 2
        ]
        
        return ' '.join(tokens)
    
    def extract_features(self, text: str) -> Dict[str, Any]:
        """
        Extract features from text for classification
        
        Args:
            text: Input text
            
        Returns:
            Dictionary of extracted features
        """
        features = {}
        
        # Basic text features
        features['length'] = len(text)
        features['word_count'] = len(text.split())
        features['avg_word_length'] = np.mean([len(word) for word in text.split()]) if text.split() else 0
        
        # Capitalization features
        features['uppercase_ratio'] = sum(1 for c in text if c.isupper()) / len(text) if text else 0
        features['exclamation_count'] = text.count('!')
        features['question_count'] = text.count('?')
        
        # Theme-specific keyword counts
        for theme, keywords in self.theme_keywords.items():
            count = sum(1 for keyword in keywords if keyword.lower() in text.lower())
            features[f'{theme}_keyword_count'] = count
        
        return features
    
    def detect_theme(self, text: str) -> Tuple[str, float]:
        """
        Detect the dominant theme in the text
        
        Args:
            text: Input text
            
        Returns:
            Tuple of (theme, confidence)
        """
        text_lower = text.lower()
        theme_scores = {}
        
        for theme, keywords in self.theme_keywords.items():
            score = 0
            for keyword in keywords:
                if keyword.lower() in text_lower:
                    score += 1
            theme_scores[theme] = score
        
        if not any(theme_scores.values()):
            return 'safe', 1.0
        
        # Find theme with highest score
        dominant_theme = max(theme_scores, key=theme_scores.get)
        max_score = theme_scores[dominant_theme]
        
        # Calculate confidence based on keyword density
        total_keywords = sum(theme_scores.values())
        confidence = max_score / total_keywords if total_keywords > 0 else 0
        
        return dominant_theme, confidence
    
    def extract_keywords(self, text: str) -> List[str]:
        """
        Extract relevant keywords that contributed to classification
        
        Args:
            text: Input text
            
        Returns:
            List of detected keywords
        """
        text_lower = text.lower()
        detected_keywords = []
        
        for theme, keywords in self.theme_keywords.items():
            for keyword in keywords:
                if keyword.lower() in text_lower:
                    detected_keywords.append(keyword)
        
        return list(set(detected_keywords))  # Remove duplicates
    
    def create_training_data(self) -> Tuple[List[str], List[int]]:
        """
        Create synthetic training data for the model
        
        Returns:
            Tuple of (texts, labels)
        """
        texts = []
        labels = []
        
        # Safe content examples
        safe_texts = [
            "Hello, how are you today?",
            "I love this weather, it's so nice outside.",
            "Thank you for your help with the project.",
            "Have a great day!",
            "The movie was really good, I enjoyed it.",
            "Let's meet for coffee tomorrow.",
            "Happy birthday! Hope you have a wonderful day.",
            "The food at that restaurant was delicious.",
            "I'm looking forward to the weekend.",
            "Great job on the presentation!"
        ]
        
        # Cyberbullying examples (synthetic for demonstration)
        cyberbully_texts = [
            "You're so ugly and stupid, nobody likes you.",
            "Go kill yourself, you worthless piece of trash.",
            "You're such a fat loser, why don't you just die?",
            "I hate you, you're the worst person ever.",
            "You should just disappear, nobody would miss you.",
            "You're so pathetic, I can't believe anyone talks to you.",
            "Why don't you just end it all? The world would be better off.",
            "You're such an idiot, I can't stand you.",
            "Nobody cares about you, you're worthless.",
            "You should just give up, you'll never amount to anything."
        ]
        
        # Add safe texts
        for text in safe_texts:
            texts.append(text)
            labels.append(0)  # Safe
        
        # Add cyberbullying texts
        for text in cyberbully_texts:
            texts.append(text)
            labels.append(1)  # Cyberbullying
        
        return texts, labels
    
    def train_model(self):
        """
        Train the cyberbullying detection model
        """
        logger.info("Training cyberbullying detection model...")
        
        # Create training data
        texts, labels = self.create_training_data()
        
        # Preprocess texts
        processed_texts = [self.preprocess_text(text) for text in texts]
        
        # Create TF-IDF vectorizer
        self.vectorizer = TfidfVectorizer(
            max_features=1000,
            ngram_range=(1, 2),
            min_df=1,
            max_df=0.9
        )
        
        # Fit and transform the texts
        X = self.vectorizer.fit_transform(processed_texts)
        y = np.array(labels)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Train classifier
        self.classifier = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42
        )
        
        self.classifier.fit(X_train, y_train)
        
        # Evaluate model
        y_pred = self.classifier.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        logger.info(f"Model training completed. Accuracy: {accuracy:.3f}")
        
        # Save model
        self.save_model()
    
    def classify(self, text: str) -> Dict[str, Any]:
        """
        Classify text for cyberbullying content
        
        Args:
            text: Input text to classify
            
        Returns:
            Dictionary with classification results
        """
        if not text.strip():
            return {
                'classification': 'Safe',
                'confidence': 1.0,
                'theme': 'safe',
                'keywords': []
            }
        
        # Preprocess text
        processed_text = self.preprocess_text(text)
        
        # Vectorize text
        if self.vectorizer and self.classifier:
            X = self.vectorizer.transform([processed_text])
            prediction = self.classifier.predict(X)[0]
            confidence = self.classifier.predict_proba(X)[0].max()
        else:
            # Fallback to rule-based classification
            prediction, confidence = self._rule_based_classification(text)
        
        # Detect theme
        theme, theme_confidence = self.detect_theme(text)
        
        # Extract keywords
        keywords = self.extract_keywords(text)
        
        # Combine confidence scores
        final_confidence = (confidence + theme_confidence) / 2
        
        return {
            'classification': 'Cyberbullying' if prediction == 1 else 'Safe',
            'confidence': final_confidence,
            'theme': theme,
            'keywords': keywords
        }
    
    def _rule_based_classification(self, text: str) -> Tuple[int, float]:
        """
        Rule-based classification as fallback
        
        Args:
            text: Input text
            
        Returns:
            Tuple of (prediction, confidence)
        """
        text_lower = text.lower()
        
        # Count offensive keywords
        offensive_count = 0
        total_keywords = 0
        
        for theme, keywords in self.theme_keywords.items():
            for keyword in keywords:
                total_keywords += 1
                if keyword.lower() in text_lower:
                    offensive_count += 1
        
        # Calculate offensive ratio
        offensive_ratio = offensive_count / total_keywords if total_keywords > 0 else 0
        
        # Classification threshold
        if offensive_ratio > 0.01:  # 1% threshold
            return 1, offensive_ratio
        else:
            return 0, 1 - offensive_ratio
    
    def save_model(self, path: str = 'models/cyberbully_model.pkl'):
        """
        Save the trained model
        
        Args:
            path: Path to save the model
        """
        os.makedirs(os.path.dirname(path), exist_ok=True)
        
        model_data = {
            'vectorizer': self.vectorizer,
            'classifier': self.classifier
        }
        
        with open(path, 'wb') as f:
            pickle.dump(model_data, f)
        
        logger.info(f"Model saved to {path}")
    
    def load_model(self, path: str):
        """
        Load a pre-trained model
        
        Args:
            path: Path to the model file
        """
        with open(path, 'rb') as f:
            model_data = pickle.load(f)
        
        self.vectorizer = model_data['vectorizer']
        self.classifier = model_data['classifier']
        
        logger.info(f"Model loaded from {path}") 