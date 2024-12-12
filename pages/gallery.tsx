import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import Link from 'next/link';
import ImageGenerator from '../components/ImageGenerator';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

// Gallery categories
const categories = ['All', 'Sustainable Fashion', 'Artisanal Fashion', 'Eco Designs', 'Upcycled Fashion'];

// Sample gallery data
const galleryItems = categories.slice(1).map((category, catIndex) => {
  return Array.from({ length: 6 }, (_, i) => ({
    id: `${category.toLowerCase().replace(/ /g, '-')}-${i + 1}`,
    image: `/images/gallery/${category.toLowerCase().replace(/ /g, '-')}-${i + 1}.jpg`,
    title: `${category} Design ${i + 1}`,
    category: category,
    description: getDescriptionForCategory(category),
    tags: getTagsForCategory(category)
  }));
}).flat();

function getDescriptionForCategory(category: string): string {
  const descriptions = {
    'Sustainable Fashion': 'Eco-friendly designs using sustainable materials and practices',
    'Artisanal Fashion': 'Handcrafted pieces showcasing traditional craftsmanship',
    'Eco Designs': 'Environmentally conscious fashion that makes a statement',
    'Upcycled Fashion': 'Creative designs giving new life to existing materials'
  };
  return descriptions[category] || '';
}

function getTagsForCategory(category: string): string[] {
  const tags = {
    'Sustainable Fashion': ['Eco-friendly', 'Sustainable', 'Green Fashion'],
    'Artisanal Fashion': ['Handmade', 'Artisanal', 'Crafted'],
    'Eco Designs': ['Zero Waste', 'Sustainable', 'Eco-conscious'],
    'Upcycled Fashion': ['Upcycled', 'Recycled', 'Creative']
  };
  return tags[category] || [];

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

  const filteredItems = selectedType === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedType);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-cosmic-900 to-cosmic-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 font-space-grotesk">
              Fashion Design Gallery
            </h1>
            <div className="flex justify-center items-center gap-4 mb-4">
              <Link href="/fabric-gallery">
                <button className="px-6 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 flex items-center gap-2 backdrop-blur-sm">
                  View Fabric Gallery
                </button>
              </Link>
            </div>
            <p className="text-lg text-cosmic-100">
              Explore our collection of sustainable fashion designs and artisanal creations
            </p>
          </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-white">
              Filter by Type
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {fabricTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedType === type
                    ? 'bg-cosmic-500 text-white shadow-lg'
                    : 'bg-white/5 text-cosmic-100 hover:bg-white/10 border border-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300">
                <div className="relative">
                  <div className="aspect-[2/3]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-2 right-2 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors duration-200"
                  >
                    {favorites.includes(item.id) 
                      ? <HeartIconSolid className="w-6 h-6 text-red-500" />
                      : <HeartIconOutline className="w-6 h-6 text-white" />
                    }
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-cosmic-100 text-sm mb-4">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full text-xs bg-white/10 text-cosmic-100 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="w-full py-2 bg-cosmic-500 hover:bg-cosmic-600 text-white rounded-lg transition-colors duration-200">
                    View Details
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