import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface StyleOption {
  category: string;
  choices: string[];
}

const styleOptions: StyleOption[] = [
  {
    category: 'Style Preference',
    choices: [
      'Minimalist',
      'Bohemian',
      'Classic',
      'Avant-garde',
      'Streetwear',
      'Sustainable Chic'
    ]
  },
  {
    category: 'Color Palette',
    choices: [
      'Neutral Tones',
      'Earth Colors',
      'Bold & Vibrant',
      'Pastels',
      'Monochrome',
      'Jewel Tones'
    ]
  },
  {
    category: 'Material Preference',
    choices: [
      'Organic Cotton',
      'Recycled Fabrics',
      'Bamboo',
      'Hemp',
      'Natural Linen',
      'Eco-synthetics'
    ]
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const AIStyleQuestionnaire: React.FC = () => {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelection = (category: string, choice: string) => {
    setSelections(prev => ({
      ...prev,
      [category]: choice
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(selections).length === styleOptions.length) {
      setShowResults(true);
    }
  };

  return (
    <div className="w-full space-y-8">
      {!showResults ? (
        <>
          {styleOptions.map((option) => (
            <div key={option.category} className="space-y-4">
              <h3 className="text-lg font-medium text-white font-space-grotesk">
                {option.category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {option.choices.map((choice) => (
                  <button
                    key={choice}
                    onClick={() => handleSelection(option.category, choice)}
                    className={`p-3 text-sm rounded-xl transition-all duration-200 ${
                      selections[option.category] === choice
                        ? 'bg-cosmic-500 text-white'
                        : 'bg-white/5 text-cosmic-100 hover:bg-white/10 hover:text-white'
                    } backdrop-blur-sm border border-white/10`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selections).length !== styleOptions.length}
            className="w-full px-4 py-3 text-base font-medium bg-gradient-to-r from-cosmic-500 to-cosmic-600 hover:from-cosmic-600 hover:to-cosmic-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-cosmic-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Recommendations
          </button>
        </>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="space-y-6"
        >
          <h3 className="text-xl font-bold text-white font-space-grotesk">
            AI Style Analysis
          </h3>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Core Style Elements</h4>
                <p className="text-cosmic-100">
                  Based on your preferences for {selections['Style Preference']} design 
                  with {selections['Color Palette'].toLowerCase()} and focus 
                  on {selections['Material Preference'].toLowerCase()}, we recommend:
                </p>
              </div>
              
              <div className="grid gap-4 mt-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-cosmic-200 mb-1">Design Direction</h5>
                  <p className="text-white">
                    Create pieces that combine {selections['Style Preference'].toLowerCase()} aesthetics 
                    with sustainable materials, emphasizing clean lines and natural textures.
                  </p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-cosmic-200 mb-1">Material Selection</h5>
                  <p className="text-white">
                    Focus on {selections['Material Preference']} as your primary material, 
                    incorporating natural dyes and sustainable processing methods.
                  </p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h5 className="text-sm font-medium text-cosmic-200 mb-1">Color Strategy</h5>
                  <p className="text-white">
                    Utilize {selections['Color Palette'].toLowerCase()} to create a cohesive collection 
                    that reflects both sustainability and style.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowResults(false)}
            className="w-full px-4 py-3 text-base font-medium border border-white/10 text-white rounded-xl hover:bg-white/5 transition-all duration-200"
          >
            Start New Analysis
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default AIStyleQuestionnaire;