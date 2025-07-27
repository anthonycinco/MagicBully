import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Shield, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';

const ResultsPanel = ({ results, originalText, onReset }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const isCyberbullying = results.classification === 'Cyberbullying';
  const confidence = Math.round(results.confidence * 100);

  const getThemeColor = (theme) => {
    const themeColors = {
      'racial_slurs': 'bg-red-100 text-red-800 border-red-200',
      'gender_slurs': 'bg-pink-100 text-pink-800 border-pink-200',
      'suicidal_ideation': 'bg-orange-100 text-orange-800 border-orange-200',
      'general_bullying': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'safe': 'bg-green-100 text-green-800 border-green-200'
    };
    return themeColors[theme] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getThemeLabel = (theme) => {
    const themeLabels = {
      'racial_slurs': 'Racial Slurs',
      'gender_slurs': 'Gender-based Harassment',
      'suicidal_ideation': 'Suicidal Ideation',
      'general_bullying': 'General Bullying',
      'safe': 'Safe Content'
    };
    return themeLabels[theme] || theme;
  };

  const handleFeedback = (isCorrect) => {
    // In a real implementation, this would send feedback to the backend
    console.log('Feedback submitted:', { isCorrect, results, originalText });
    setFeedbackSubmitted(true);
    setShowFeedback(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Result */}
      <div className={`p-6 rounded-lg border-2 ${
        isCyberbullying 
          ? 'bg-red-50 border-red-200' 
          : 'bg-green-50 border-green-200'
      }`}>
        <div className="flex items-center space-x-3 mb-4">
          {isCyberbullying ? (
            <XCircle className="h-8 w-8 text-red-500" />
          ) : (
            <CheckCircle className="h-8 w-8 text-green-500" />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {isCyberbullying ? 'Cyberbullying Detected' : 'Safe Content'}
            </h3>
            <p className="text-sm text-gray-600">
              Confidence: {confidence}%
            </p>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              isCyberbullying ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${confidence}%` }}
          />
        </div>

        {/* Detected Theme */}
        {results.theme && (
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getThemeColor(results.theme)}`}>
            <Shield className="h-4 w-4 mr-1" />
            {getThemeLabel(results.theme)}
          </div>
        )}
      </div>

      {/* Keywords/Phrases */}
      {results.keywords && results.keywords.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Detected Keywords:</h4>
          <div className="flex flex-wrap gap-2">
            {results.keywords.map((keyword, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-md border border-yellow-200"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Suicide Warning */}
      {results.theme === 'suicidal_ideation' && (
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-800">Important Notice</h4>
              <p className="text-sm text-orange-700 mt-1">
                This content contains language that may indicate suicidal thoughts. 
                If you or someone you know is struggling, please reach out for help:
              </p>
              <div className="mt-2 space-y-1 text-sm">
                <p className="text-orange-700">
                  <strong>Philippines:</strong> 1553 or 0917-899-8727
                </p>
                <p className="text-orange-700">
                  <strong>International:</strong> 988 (US) or your local crisis hotline
                </p>
              </div>
              <p className="text-xs text-orange-600 mt-2">
                This AI is not a substitute for professional mental health support.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Section */}
      {!feedbackSubmitted && (
        <div className="border-t pt-4">
          <button
            onClick={() => setShowFeedback(!showFeedback)}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Was this analysis helpful?
          </button>
          
          {showFeedback && (
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => handleFeedback(true)}
                className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>Yes</span>
              </button>
              <button
                onClick={() => handleFeedback(false)}
                className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                <ThumbsDown className="h-4 w-4" />
                <span>No</span>
              </button>
            </div>
          )}
        </div>
      )}

      {feedbackSubmitted && (
        <div className="text-sm text-green-600">
          Thank you for your feedback!
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="btn-secondary w-full flex items-center justify-center space-x-2"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Analyze New Content</span>
      </button>
    </div>
  );
};

export default ResultsPanel; 