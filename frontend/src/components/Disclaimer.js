import React from 'react';
import { AlertTriangle, Shield, Heart } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="card bg-amber-50 border-amber-200">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
        <div className="space-y-3">
          <h3 className="font-medium text-amber-800">Important Disclaimer</h3>
          
          <div className="space-y-2 text-sm text-amber-700">
            <p>
              <strong>Experimental AI:</strong> This cyberbullying detection system is experimental 
              and may not always be accurate. Results should not be considered definitive.
            </p>
            
            <p>
              <strong>Not Professional Advice:</strong> This AI is not a substitute for professional 
              mental health support, legal advice, or human judgment.
            </p>
            
            <p>
              <strong>Privacy:</strong> Your inputs are not stored or logged unless you opt in to 
              help improve the model. We prioritize your privacy and data protection.
            </p>
            
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="font-medium text-amber-800">Crisis Support</span>
              </div>
              <p className="text-xs text-amber-700">
                If you or someone you know is in crisis, please contact:
              </p>
              <div className="mt-1 text-xs text-amber-700 space-y-1">
                <p><strong>Philippines:</strong> 1553 or 0917-899-8727</p>
                <p><strong>International:</strong> 988 (US) or your local crisis hotline</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-amber-600">
            <Shield className="h-3 w-3" />
            <span>Built with ethical AI principles and user safety in mind</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer; 