import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import Link from 'next/link';
import ImageGenerator from '../components/ImageGenerator';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

// Import fabric data
import fabricsData from '../public/images/fabrics-data.json';

const fabricTypes = ['All', 'Linen', 'Cotton', 'Wool', 'Denim', 'Silk'];

// Use the imported data
const dummyFabrics = fabricsData;

const Gallery = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [fabrics, setFabrics] = useState(dummyFabrics);
  const [isAdmin, setIsAdmin] = useState(false); // In production, this would be based on user role

  const handleImageGenerated = (imageUrl: string) => {
    // Add new fabric with generated image
    const newFabric = {
      id: fabrics.length + 1,
      name: 'New Generated Fabric',
      type: selectedType === 'All' ? 'Linen' : selectedType,
      image: imageUrl,
      description: 'AI-generated sustainable fabric',
      sustainability: 'Pending sustainability information',
      origin: 'Custom Creation',
      bestFor: ['Custom pieces'],
    };

    setFabrics([...fabrics, newFabric]);
  };

  const toggleFavorite = (fabricId: number) => {
    setFavorites(prev =>
      prev.includes(fabricId)
        ? prev.filter(id => id !== fabricId)
        : [...prev, fabricId]
    );
  };

  const filteredFabrics = dummyFabrics.filter(
    fabric => selectedType === 'All' || fabric.type === selectedType
  );

  return (
    <Layout>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cosmic-900 dark:text-cosmic-50 mb-4 font-space-grotesk">
            Sustainable Fabric Gallery
          </h1>
          <div className="flex justify-center items-center gap-4">
            <Link href="/bazaar">
              <button className="px-6 py-2 text-sm font-medium bg-cosmic-900/10 hover:bg-cosmic-900/20 text-cosmic-900 dark:text-cosmic-50 rounded-lg transition-all duration-200 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.707 3.293a1 1 0 010 1.414L6.414 9H17a1 1 0 110 2H6.414l4.293 4.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to Bazaar
              </button>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-cosmic-900 dark:text-cosmic-50">
                Filter by Type:
              </h2>
            </div>
            {isAdmin && (
              <div>
                <ImageGenerator
                  onImageGenerated={handleImageGenerated}
                  type="fabric"
                />
              </div>
            )}
          </div>

          <div className="flex space-x-2 overflow-x-auto py-2">
            {fabricTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  selectedType === type
                    ? 'bg-cosmic-900 text-white shadow-lg'
                    : 'bg-cosmic-100 text-cosmic-900 hover:bg-cosmic-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFabrics.map((fabric, index) => (
            <motion.div
              key={fabric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white dark:bg-cosmic-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="relative">
                  <img
                    src={fabric.image}
                    alt={fabric.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(fabric.id);
                    }}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                  >
                    {favorites.includes(fabric.id) 
                      ? <HeartIconSolid className="w-6 h-6 text-red-500" />
                      : <HeartIconOutline className="w-6 h-6 text-cosmic-600" />
                    }
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-cosmic-900 dark:text-cosmic-50 mb-2">
                    {fabric.name}
                  </h3>
                  <p className="text-cosmic-600 dark:text-cosmic-300 text-sm">
                    {fabric.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {fabric.bestFor.map((use, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full bg-cosmic-100 dark:bg-cosmic-700 text-cosmic-900 dark:text-cosmic-100 text-xs"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                  <button
                    className="mt-4 w-full py-2 bg-cosmic-500 hover:bg-cosmic-600 text-white rounded-lg transition-colors duration-200"
                  >
                    Request Sample
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;