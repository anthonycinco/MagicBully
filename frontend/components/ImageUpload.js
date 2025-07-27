import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { createWorker } from 'tesseract.js';
import { Upload, Image, FileText, Loader, X } from 'lucide-react';

const ImageUpload = ({ onImageUpload, onTextExtracted, isAnalyzing, extractedText }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      onImageUpload(file);
      setExtractionError(null);
      
      // Start OCR extraction
      setIsExtracting(true);
      try {
        const worker = await createWorker('eng');
        const { data: { text } } = await worker.recognize(file);
        await worker.terminate();
        
        const cleanedText = text.trim();
        if (cleanedText) {
          onTextExtracted(cleanedText);
        } else {
          setExtractionError('No text could be extracted from this image.');
        }
      } catch (error) {
        console.error('OCR Error:', error);
        setExtractionError('Failed to extract text from image. Please try again.');
      } finally {
        setIsExtracting(false);
      }
    }
  }, [onImageUpload, onTextExtracted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    disabled: isAnalyzing || isExtracting
  });

  const removeFile = () => {
    setUploadedFile(null);
    onImageUpload(null);
    setExtractionError(null);
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-400 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        } ${(isAnalyzing || isExtracting) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          {uploadedFile ? (
            <div className="flex items-center justify-center space-x-2">
              <Image className="h-8 w-8 text-primary-600" />
              <span className="text-sm font-medium text-gray-900">
                {uploadedFile.name}
              </span>
            </div>
          ) : (
            <Upload className="h-8 w-8 mx-auto text-gray-400" />
          )}
          <p className="text-sm text-gray-600">
            {isDragActive
              ? 'Drop the image here...'
              : 'Drag & drop an image here, or click to select'}
          </p>
          <p className="text-xs text-gray-500">
            Supports PNG, JPG, JPEG (max 10MB)
          </p>
        </div>
      </div>

      {/* File Preview */}
      {uploadedFile && (
        <div className="relative">
          <img
            src={URL.createObjectURL(uploadedFile)}
            alt="Uploaded content"
            className="w-full h-48 object-contain rounded-lg border border-gray-200"
          />
          <button
            onClick={removeFile}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            disabled={isAnalyzing || isExtracting}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Extraction Status */}
      {isExtracting && (
        <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Loader className="h-5 w-5 text-blue-500 animate-spin" />
          <p className="text-blue-700">Extracting text from image...</p>
        </div>
      )}

      {extractionError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{extractionError}</p>
        </div>
      )}

      {/* Extracted Text Preview */}
      {extractedText && !isExtracting && !extractionError && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Extracted Text:</span>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-800 whitespace-pre-wrap">
              {extractedText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 