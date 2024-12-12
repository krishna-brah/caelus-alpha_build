'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { FabricScore } from '../types/tags';
import { BeakerIcon, LeafIcon } from '@heroicons/react/24/outline';

interface FabricGalleryProps {
  fabrics: {
    id: string;
    name: string;
    imageUrl: string;
    description?: string;
    score: FabricScore;
    supplier: {
      name: string;
      origin: string;
      certifications: string[];
    };
    environmental: {
      waterUsage: number; // L/kg
      carbonFootprint: number; // kg CO₂/kg
      recycled: boolean;
      organic: boolean;
    };
  }[];
  canScore: boolean;
  onScoreFabric: (fabricId: string) => void;
  onImageLoad: () => void;
}

const fabricTypes = ['All', 'Linen', 'Cotton', 'Wool', 'Denim', 'Silk'];

export default function FabricGallery({
  fabrics,
  canScore,
  onScoreFabric,
  onImageLoad,
}: FabricGalleryProps) {
  const [selectedType, setSelectedType] = React.useState('All');
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [loadedImages, setLoadedImages] = React.useState<{ [key: string]: boolean }>({}); 

  const handleImageLoad = (fabricId: string) => {
    setLoadedImages(prev => ({ ...prev, [fabricId]: true }));
    onImageLoad();
  };

  return (
    <div className="py-12 px-6 bg-gradient-to-b from-cosmic-50 to-white dark:from-cosmic-950 dark:to-cosmic-900">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cosmic-900 dark:text-cosmic-50 mb-3 font-space-grotesk">
            Sustainable Fabric Gallery
          </h1>
          <p className="text-cosmic-600 dark:text-cosmic-300 text-lg max-w-2xl mx-auto">
            Explore our curated collection of eco-conscious fabrics, each carefully selected 
            for their quality and environmental impact.
          </p>
        </div>

        {/* Fabric Type Filter */}
        <div className="flex justify-center space-x-2 overflow-x-auto py-4">
          {fabricTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedType === type
                  ? 'bg-cosmic-900 text-white shadow-lg'
                  : 'bg-cream-50 text-cosmic-900 hover:bg-cosmic-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fabrics.map((fabric, index) => (
            <motion.div
              key={fabric.id}
              onClick={() => setSelectedId(selectedId === fabric.id ? null : fabric.id)}
              className="cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: loadedImages[fabric.id] ? 1 : 0,
                y: loadedImages[fabric.id] ? 0 : 20 
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="relative bg-white dark:bg-cosmic-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image section */}
                <div className="relative w-full h-52">
                  {!loadedImages[fabric.id] && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-cosmic-100 dark:bg-cosmic-800">
                      <div className="w-8 h-8 rounded-full border-2 border-cosmic-500 border-t-transparent animate-spin" />
                    </div>
                  )}
                  
                  <img
                    src={fabric.imageUrl}
                    alt={fabric.name}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      loadedImages[fabric.id] ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(fabric.id)}
                    onError={() => handleImageLoad(fabric.id)}
                  />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex gap-2">
                    {fabric.environmental.organic && (
                      <span className="px-2 py-1 rounded-full bg-green-500/90 text-white text-xs font-medium shadow-sm">
                        Organic
                      </span>
                    )}
                    {fabric.environmental.recycled && (
                      <span className="px-2 py-1 rounded-full bg-blue-500/90 text-white text-xs font-medium shadow-sm">
                        Recycled
                      </span>
                    )}
                  </div>

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                </div>

                {/* Content section */}
                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-cosmic-900 dark:text-cosmic-50">
                      {fabric.name}
                    </h2>
                    {fabric.description && (
                      <p className="mt-2 text-sm text-cosmic-600 dark:text-cosmic-300 line-clamp-2">
                        {fabric.description}
                      </p>
                    )}
                  </div>

                  {/* Rating bars */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-medium text-cosmic-600 dark:text-cosmic-300 mb-1">
                        Quality Score
                      </div>
                      <div className="h-2 bg-cosmic-100 dark:bg-cosmic-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cosmic-500 rounded-full transition-all duration-300"
                          style={{ width: `${fabric.score.qualityRating * 10}%` }}
                        />
                      </div>
                      <div className="mt-1 text-xs font-medium text-cosmic-900 dark:text-cosmic-50">
                        {fabric.score.qualityRating.toFixed(1)}/10
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-cosmic-600 dark:text-cosmic-300 mb-1">
                        Sustainability
                      </div>
                      <div className="h-2 bg-cosmic-100 dark:bg-cosmic-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all duration-300"
                          style={{ width: `${fabric.score.sustainabilityScore * 10}%` }}
                        />
                      </div>
                      <div className="mt-1 text-xs font-medium text-cosmic-900 dark:text-cosmic-50">
                        {fabric.score.sustainabilityScore.toFixed(1)}/10
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cosmic-100 dark:border-cosmic-700">
                    <div className="flex items-center gap-1.5 text-sm text-cosmic-600 dark:text-cosmic-300">
                      <BeakerIcon className="w-4 h-4 text-blue-500" />
                      <span>{fabric.environmental.waterUsage}L/kg</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-cosmic-600 dark:text-cosmic-300">
                      <LeafIcon className="w-4 h-4 text-green-500" />
                      <span>{fabric.environmental.carbonFootprint}kg CO₂/kg</span>
                    </div>
                  </div>

                  {canScore && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onScoreFabric(fabric.id);
                      }}
                      className="mt-4 w-full py-2 bg-cosmic-500 hover:bg-cosmic-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      Rate Fabric ({fabric.score.ratedByDesigners} ratings)
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}



export default FabricGallery;