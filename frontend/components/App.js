import React, { useState } from 'react';
import { Shield, Upload, FileText, AlertTriangle, CheckCircle, XCircle, Loader } from 'lucide-react';
import TextInput from './TextInput';
import ImageUpload from './ImageUpload';
import ResultsPanel from './ResultsPanel';
import Disclaimer from './Disclaimer';

function App() {
  const [inputType, setInputType] = useState('text'); // 'text' or 'image'
  const [inputText, setInputText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleTextSubmit = async (text) => {
    setIsAnalyzing(true);
    setError(null);
    setResults(null);
    
    try {
      const response = await fetch('/api/classify-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze text');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to analyze text. Please try again.');
      console.error('Error analyzing text:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageTextExtracted = async (text) => {
    setExtractedText(text);
    if (text.trim()) {
      await handleTextSubmit(text);
    }
  };

  const resetForm = () => {
    setInputText('');
    setUploadedImage(null);
    setExtractedText('');
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">MagicBully</h1>
            </div>
            <p className="text-sm text-gray-600">AI Cyberbullying Detection</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Analyze Content
              </h2>
              
              {/* Input Type Toggle */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
                <button
                  onClick={() => setInputType('text')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                    inputType === 'text'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Text Input</span>
                </button>
                <button
                  onClick={() => setInputType('image')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                    inputType === 'image'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  <span>Image Upload</span>
                </button>
              </div>

              {/* Input Forms */}
              {inputType === 'text' ? (
                <TextInput
                  value={inputText}
                  onChange={setInputText}
                  onSubmit={handleTextSubmit}
                  isAnalyzing={isAnalyzing}
                />
              ) : (
                <ImageUpload
                  onImageUpload={setUploadedImage}
                  onTextExtracted={handleImageTextExtracted}
                  isAnalyzing={isAnalyzing}
                  extractedText={extractedText}
                />
              )}
            </div>

            {/* Disclaimer */}
            <Disclaimer />
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Analysis Results
              </h2>
              
              {isAnalyzing && (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Loader className="loading-spinner mx-auto mb-4" />
                    <p className="text-gray-600">Analyzing content...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {results && (
                <ResultsPanel 
                  results={results} 
                  originalText={inputText || extractedText}
                  onReset={resetForm}
                />
              )}

              {!isAnalyzing && !results && !error && (
                <div className="text-center py-12 text-gray-500">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Enter text or upload an image to begin analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 