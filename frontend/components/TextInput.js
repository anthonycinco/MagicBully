    import React from 'react';
import { Send, Loader } from 'lucide-react';

const TextInput = ({ value, onChange, onSubmit, isAnalyzing }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !isAnalyzing) {
      onSubmit(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter text to analyze
        </label>
        <textarea
          id="text-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste or type the text you want to analyze for cyberbullying content..."
          className="input-field min-h-[120px] resize-none"
          disabled={isAnalyzing}
        />
        <p className="text-xs text-gray-500 mt-1">
          {value.length} characters
        </p>
      </div>

      <button
        type="submit"
        disabled={!value.trim() || isAnalyzing}
        className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <>
            <Loader className="h-4 w-4 animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Analyze Text</span>
          </>
        )}
      </button>
    </form>
  );
};

export default TextInput; 