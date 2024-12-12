import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Layout } from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { searchPexelsPhotos, getFabricImageUrl, type PexelsPhoto } from '../lib/utils/pexels';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// Use simple component first to test
const SimpleFabricGallery = dynamic(() => import('components/SimpleFabricGallery'), {
  ssr: false,
});

// Sustainable fabric types and their search terms
const FABRIC_TYPES = [
  {
    id: '1',
    name: 'Organic Cotton',
    searchTerm: 'cotton fabric texture',
    description: 'Premium organic cotton sourced from sustainable farms in India.',
    score: {
      qualityRating: 9.2,
      sustainabilityScore: 8.8,
      ratedByDesigners: 12,
    },
    supplier: {
      name: 'EcoThreads Co.',
      origin: 'India',
      certifications: ['Fair Trade', 'Organic'],
    },
    environmental: {
      waterUsage: 2100, // L/kg
      carbonFootprint: 3.2, // kg CO₂/kg
      recycled: false,
      organic: true,
    },
  },
  {
    id: '2',
    name: 'Recycled Polyester',
    searchTerm: 'recycled polyester fabric',
    description: 'Made from post-consumer plastic bottles, reducing landfill waste.',
    score: {
      qualityRating: 8.5,
      sustainabilityScore: 9.0,
      ratedByDesigners: 8,
    },
    supplier: {
      name: 'GreenFiber Solutions',
      origin: 'Taiwan',
      certifications: ['GRS', 'Recycled'],
    },
    environmental: {
      waterUsage: 35, // L/kg
      carbonFootprint: 2.8, // kg CO₂/kg
      recycled: true,
      organic: false,
    },
  },
  {
    id: '3',
    name: 'Hemp Textile',
    searchTerm: 'hemp fabric texture',
    description: 'Sustainable hemp fabric with minimal environmental impact.',
    score: {
      qualityRating: 8.8,
      sustainabilityScore: 9.5,
      ratedByDesigners: 15,
    },
    supplier: {
      name: 'Natural Fiber Co.',
      origin: 'Netherlands',
      certifications: ['Organic', 'Sustainable'],
    },
    environmental: {
      waterUsage: 300, // L/kg
      carbonFootprint: 1.8, // kg CO₂/kg
      recycled: false,
      organic: true,
    },
  },
  {
    id: '4',
    name: 'Bamboo Fabric',
    searchTerm: 'bamboo fabric texture',
    description: 'Soft and sustainable bamboo-based textile with natural antibacterial properties.',
    score: {
      qualityRating: 9.0,
      sustainabilityScore: 8.9,
      ratedByDesigners: 10,
    },
    supplier: {
      name: 'EcoAsia Textiles',
      origin: 'China',
      certifications: ['OEKO-TEX', 'Bamboo Certified'],
    },
    environmental: {
      waterUsage: 400, // L/kg
      carbonFootprint: 2.1, // kg CO₂/kg
      recycled: false,
      organic: true,
    },
  },
];

export default function FabricGalleryPage() {
  const [fabricPhotos, setFabricPhotos] = useState<{ [key: string]: PexelsPhoto[] }>({});
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Function to get more specific fabric images
  const getFabricSpecificQuery = (fabric: any) => {
    const baseQueries = {
      'Organic Cotton': ['organic cotton fabric texture', 'cotton textile closeup', 'sustainable cotton fabric'],
      'Recycled Polyester': ['recycled polyester fabric', 'sustainable polyester textile', 'eco friendly fabric'],
      'Hemp Textile': ['hemp fabric texture', 'natural hemp textile', 'sustainable hemp fabric'],
      'Bamboo Fabric': ['bamboo fabric texture', 'bamboo textile closeup', 'eco bamboo fabric']
    };
    return baseQueries[fabric.name] || [fabric.searchTerm];
  };
  const [filters, setFilters] = useState({
    search: '',
    minQuality: '',
    minSustainability: '',
    certification: '',
  });

  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchFabricImages = async () => {
      setLoading(true);
      setImagesLoaded(0);
      
      const photoPromises = FABRIC_TYPES.map(async (fabric) => {
        try {
          // Get multiple search queries for each fabric
          const queries = getFabricSpecificQuery(fabric);
          const allPhotos = [];
          
          // Try each query until we get enough photos
          for (const query of queries) {
            const photos = await searchPexelsPhotos(query, 1, 5);
            const validPhotos = photos.filter(photo => 
              photo?.src?.large && 
              typeof photo.src.large === 'string' &&
              photo.src.large.startsWith('http')
            );
            allPhotos.push(...validPhotos);
            
            // If we have enough photos, break
            if (allPhotos.length >= 5) break;
          }
          
          // Deduplicate photos by ID
          const uniquePhotos = Array.from(new Map(allPhotos.map(photo => [photo.id, photo])).values());
          
          return { id: fabric.id, photos: uniquePhotos };
        } catch (error) {
          console.error(`Error fetching photos for ${fabric.name}:`, error);
          return { id: fabric.id, photos: [] };
        }
      });

      try {
        const results = await Promise.all(photoPromises);
        
        if (controller.signal.aborted) return;
        
        const photoMap = results.reduce((acc, { id, photos }) => {
          acc[id] = photos;
          return acc;
        }, {} as { [key: string]: PexelsPhoto[] });

        setFabricPhotos(photoMap);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Error fetching fabric images:', error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchFabricImages();
    
    return () => {
      controller.abort();
    };
  }, []);

  const handleScoreFabric = (fabricId: string) => {
    console.log('Score fabric:', fabricId);
    // In a real app, this would open the scoring modal
  };

  // Mock function - In a real app, this would check the user's designer tags
  const canScoreFabrics = true;

  const [imageLoadErrors, setImageLoadErrors] = useState<{ [key: string]: boolean }>({});

  // Convert fabric types to gallery format with proper images
  // Filter and process fabrics for the gallery
  const galleryFabrics = FABRIC_TYPES
    .filter(fabric => {
      const searchMatch = fabric.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        fabric.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const qualityMatch = !filters.minQuality || 
        fabric.score.qualityRating >= parseFloat(filters.minQuality);
      
      const sustainabilityMatch = !filters.minSustainability || 
        fabric.score.sustainabilityScore >= parseFloat(filters.minSustainability);
      
      const certificationMatch = !filters.certification || 
        fabric.supplier.certifications.includes(filters.certification);

      return searchMatch && qualityMatch && sustainabilityMatch && certificationMatch;
    })
    .map(fabric => ({
      ...fabric,
      imageUrl: getFabricImageUrl(fabricPhotos[fabric.id] || [], 0, 'large'),
    }));

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-cosmic-900 to-cosmic-800">
        {/* Background Logo */}
        <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
          <img
            src="/images/logo.webp"
            alt=""
            className="w-full h-full object-cover scale-150 rotate-12"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Header */}
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4 font-space-grotesk">
                Sustainable Fabric Gallery
              </h1>
              <p className="text-lg text-cosmic-100">
                Explore and evaluate our curated collection of sustainable fabrics
              </p>
            </motion.div>

            {/* Filters Section */}
            <motion.div variants={fadeIn}>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6 font-space-grotesk">
                  Filter Fabrics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-cosmic-100 mb-2">
                      Search
                    </label>
                    <input
                      type="text"
                      placeholder="Search fabrics..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-cosmic-300
                        focus:outline-none focus:ring-2 focus:ring-cosmic-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cosmic-100 mb-2">
                      Minimum Quality Rating
                    </label>
                    <select
                      value={filters.minQuality}
                      onChange={(e) => handleFilterChange('minQuality', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                        focus:outline-none focus:ring-2 focus:ring-cosmic-500"
                    >
                      <option value="">Any quality</option>
                      <option value="7">7+</option>
                      <option value="8">8+</option>
                      <option value="9">9+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cosmic-100 mb-2">
                      Minimum Sustainability Score
                    </label>
                    <select
                      value={filters.minSustainability}
                      onChange={(e) => handleFilterChange('minSustainability', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                        focus:outline-none focus:ring-2 focus:ring-cosmic-500"
                    >
                      <option value="">Any sustainability</option>
                      <option value="7">7+</option>
                      <option value="8">8+</option>
                      <option value="9">9+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cosmic-100 mb-2">
                      Certification
                    </label>
                    <select
                      value={filters.certification}
                      onChange={(e) => handleFilterChange('certification', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                        focus:outline-none focus:ring-2 focus:ring-cosmic-500"
                    >
                      <option value="">Any certification</option>
                      <option value="Fair Trade">Fair Trade</option>
                      <option value="Organic">Organic</option>
                      <option value="Recycled">Recycled</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Gallery Section */}
            <motion.div variants={fadeIn}>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-2 border-cosmic-500 border-t-transparent"></div>
                    <span className="ml-3 text-cosmic-100">Loading fabrics...</span>
                  </div>
                ) : Object.keys(fabricPhotos).length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-cosmic-100">No fabric images available. Please try again later.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryFabrics.map((fabric, index) => (
                      <motion.div
                        key={fabric.id}
                        variants={fadeIn}
                        className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 
                          hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="relative aspect-square rounded-lg bg-cosmic-800/50 mb-4 overflow-hidden">
                          <img
                            src={fabric.imageUrl}
                            alt={fabric.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{fabric.name}</h3>
                        <p className="text-cosmic-100">{fabric.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {fabric.supplier.certifications.map((cert, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-full text-xs bg-cosmic-800 text-cosmic-100 border border-cosmic-700"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                        {canScoreFabrics && (
                          <button
                            onClick={() => handleScoreFabric(fabric.id)}
                            className="mt-4 w-full py-2 bg-cosmic-500 hover:bg-cosmic-600 text-white rounded-lg 
                              transition-colors duration-200 text-sm font-medium"
                          >
                            Rate Fabric ({fabric.score.ratedByDesigners} ratings)
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}