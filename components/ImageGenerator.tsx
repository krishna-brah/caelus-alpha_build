import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { generateImage, enhanceImagePrompt, analyzeGeneratedDesign } from '../lib/imageGeneration';

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
  const [generatedImage, setGeneratedImage] = useState('');
  const [designAnalysis, setDesignAnalysis] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');

  const handleGenerate = async () => {
    if (!prompt || !style) {
      setError('Please provide both a prompt and style');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // First, enhance the prompt
      const enhanced = await enhanceImagePrompt(
        prompt,
        style,
        process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''
      );
      setEnhancedPrompt(enhanced);

      // Generate the image
      const { url } = await generateImage(
        enhanced,
        style,
        process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''
      );
      setGeneratedImage(url);

      // Analyze the generated design
      const analysis = await analyzeGeneratedDesign(
        url,
        enhanced,
        process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''
      );
      setDesignAnalysis(analysis);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Error:', err);
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
              className="w-full bg-gradient-to-r from-cosmic-500 to-cosmic-600 hover:from-cosmic-600 hover:to-cosmic-700 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-cosmic-500/25"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </div>
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

          <AnimatePresence>
            {(enhancedPrompt || generatedImage) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12 space-y-8"
              >
                {enhancedPrompt && (
                  <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <h3 className="text-lg font-medium text-white mb-3 font-space-grotesk">
                      Enhanced Prompt:
                    </h3>
                    <p className="text-cosmic-100">
                      {enhancedPrompt}
                    </p>
                  </div>
                )}

                {generatedImage && (
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="relative aspect-square">
                      <img
                        src={generatedImage}
                        alt="Generated design"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    {designAnalysis && (
                      <div className="p-6 border-t border-white/10">
                        <h3 className="text-xl font-medium text-white mb-4 font-space-grotesk">
                          Design Analysis
                        </h3>
                        <p className="text-cosmic-100 whitespace-pre-line">
                          {designAnalysis}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;