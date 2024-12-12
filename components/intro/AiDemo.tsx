import React, { useState } from 'react';
import { Button } from '../ui/Button';

const demoPrompts = [
  {
    title: 'Sustainable Summer Dress',
    prompt: 'Design a lightweight summer dress using eco-friendly materials, featuring flowing lines and natural dyes.',
    style: 'Minimalist'
  },
  {
    title: 'Upcycled Denim Collection',
    prompt: 'Create a streetwear collection using upcycled denim with modern, urban aesthetics.',
    style: 'Streetwear'
  },
  {
    title: 'Zero-Waste Evening Wear',
    prompt: 'Design an elegant evening gown using zero-waste pattern cutting techniques.',
    style: 'Avant-Garde'
  }
];

interface GeneratedContent {
  image?: string;
  analysis?: string;
  loading: boolean;
}

export const AiDemo: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [generated, setGenerated] = useState<GeneratedContent>({ loading: false });

  const handleGenerate = async () => {
    setGenerated({ loading: true });
    try {
      const prompt = demoPrompts[selectedPrompt];
      
      // Fetch a relevant image from Pexels as a placeholder
      const searchTerm = prompt.title.toLowerCase();
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchTerm + " fashion")}&per_page=1`,
        {
          headers: {
            'Authorization': 'SGSwVbUEUb6bu4cUfAO6N3HGHfeLyDdIAF1bwnLBaA4vUbLRDsnMAQKD'
          }
        }
      );
      
      const data = await response.json();
      const imageUrl = data.photos[0]?.src?.large || data.photos[0]?.src?.medium;
      
      // Add artificial delay to simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setGenerated({
        loading: false,
        image: imageUrl,
        analysis: `Sustainability Analysis for ${prompt.title}:

1. Material Efficiency
- Primary material: Organic cotton
- Zero waste pattern cutting achieved
- Estimated material savings: 15%

2. Environmental Impact
- Carbon footprint: Low
- Water usage: Minimal
- Biodegradability: High

3. Design Innovation
- Innovative seam construction
- Modular components
- Adaptable sizing

4. Market Potential
- Target market: Eco-conscious millennials
- Price point: Premium sustainable
- Production scalability: Medium

Recommendations:
1. Consider hemp blend for durability
2. Implement modular design elements
3. Add natural dye options`
      });
    } catch (error) {
      console.error('Demo generation error:', error);
      setGenerated({
        loading: false,
        image: undefined,
        analysis: 'Failed to generate design. Please try again.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0b2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-16">
          <div>
            <h2 className="text-5xl font-bold text-white mb-4">
              Experience AI-Powered Design
            </h2>
            <p className="text-xl text-purple-200">
              See how our AI assistant transforms design concepts into sustainable fashion
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="space-y-8">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg">
              <h3 className="text-xl font-bold text-purple-100 mb-4">
                Select a Design Prompt
              </h3>
              <div className="space-y-4">
                {demoPrompts.map((prompt, index) => (
                  <div
                    key={prompt.title}
                    className={`relative p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedPrompt === index
                        ? 'bg-cosmic-900/30 backdrop-blur-sm'
                        : 'bg-cosmic-900/10 hover:bg-cosmic-900/20 backdrop-blur-sm'
                    }`}
                    onClick={() => setSelectedPrompt(index)}
                  >
                    <h4 className="font-bold text-white">
                      {prompt.title}
                    </h4>
                    <p className="text-sm text-purple-200 mt-1">
                      {prompt.prompt}
                    </p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200">
                        {prompt.style}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className="w-full mt-6"
                onClick={handleGenerate}
                disabled={generated.loading}
              >
                {generated.loading ? 'Generating...' : 'Generate Design'}
              </Button>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-8">
            {generated.loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cosmic-500 border-t-transparent" />
                  <p className="mt-4 text-cosmic-100">
                    AI is working its magic...
                  </p>
                </div>
              </div>
            ) : generated.image ? (
              <div className="transition-opacity duration-500">
                <div className="relative bg-purple-900/20 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
                  {/* Gradient border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/10 via-purple-300/5 to-purple-200/10" style={{ padding: '1px' }}>
                    <div className="absolute inset-0 rounded-2xl bg-[#1a0b2e]" />
                  </div>
                  <div className="relative z-10">
                    <div className="relative aspect-square">
                      <img
                        src={generated.image}
                        alt="Generated design"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cosmic-900/50" />
                    </div>
                    {generated.analysis && (
                      <div className="p-6 border-t border-white/10">
                        <h3 className="text-lg font-bold text-white mb-4 font-space-grotesk">
                          AI Analysis
                        </h3>
                        <pre className="text-sm text-cosmic-100/90 whitespace-pre-wrap font-inter leading-relaxed">
                          {generated.analysis}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-cosmic-100/80">
                Select a prompt and generate a design to see the AI in action
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};