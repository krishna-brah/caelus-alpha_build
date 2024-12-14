import React, { useState } from 'react';
import { generateDesignImage } from '../lib/imageGeneration';

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';

const styleOptions = [
  'Minimalist',
  'Avant-garde',
  'Sustainable Chic',
  'Urban Contemporary',
  'Bohemian',
  'Classic Elegance',
  'Streetwear',
  'Eco-conscious',
];

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleGenerate = async () => {
    if (!prompt || !style) {
      setError('Please provide both a prompt and style');
      return;
    }

    if (!OPENAI_API_KEY) {
      setError('OpenAI API key is not configured');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Generating image...');
      const url = await generateDesignImage(prompt, style, OPENAI_API_KEY);
      console.log('Generated image URL:', url);
      setImageUrl(url);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10">
        <div className="absolute inset-0 bg-[url('/patterns/stars.svg')] bg-repeat opacity-5" />
        <div className="relative z-10 p-8">
          <h2 className="text-3xl font-bold text-white mb-8 font-space-grotesk">
            AI Fashion Design Generator
          </h2>

          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-cosmic-100 mb-3">
                Describe your fashion design concept
              </label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., A sustainable summer dress with floral patterns..."
                className="w-full px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-cosmic-500/50 focus:border-transparent resize-none bg-white/5 backdrop-blur-sm text-white placeholder-cosmic-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cosmic-100 mb-3">
                Design Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-cosmic-500/50 focus:border-transparent bg-white/5 backdrop-blur-sm text-white"
              >
                <option value="" className="bg-cosmic-900">Select a style</option>
                {styleOptions.map((option) => (
                  <option key={option} value={option} className="bg-cosmic-900">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating your design...
                </span>
              ) : (
                'Generate Design'
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-500/10 text-red-200 rounded-xl border border-red-500/20">
                {error}
              </div>
            )}
          </div>

          {/* Results Section */}
          {imageUrl && (
            <div className="mt-12">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="relative aspect-square">
                  <img
                    src={imageUrl}
                    alt="Generated design"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;