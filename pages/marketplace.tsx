import React from 'react';
import { Layout } from '../components/layout/Layout';
import { DesignerListing } from '../components/DesignerListing';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// Mock data - In a real app, this would come from an API
const mockListings = [
  {
    id: '1',
    title: 'Custom Denim Jacket',
    imageUrl: '/mock-images/denim-jacket.jpg',
    designer: {
      name: 'Alex Design',
      tags: [
        {
          id: '1',
          category: 'FabricSpecialty',
          value: 'Denim',
          tier: 'Diamond',
          projectsCompleted: 28,
          nextTierThreshold: 50,
        },
        {
          id: '2',
          category: 'Style',
          value: 'Casual',
          tier: 'Gold',
          projectsCompleted: 12,
          nextTierThreshold: 25,
        },
      ],
    },
    score: {
      designQuality: 9.4,
      materialUse: 9.0,
      sustainability: 8.8,
      totalReviews: 15,
    },
    materials: [
      {
        name: 'Organic Cotton',
        quality: 9.2,
        sustainability: 8.8,
      },
    ],
    price: 299.99,
  },
  // Add more mock listings as needed
];

export default function Marketplace() {
  const [filters, setFilters] = React.useState({
    search: '',
    fabricSpecialty: '',
    clothingType: '',
    style: '',
    minTier: '',
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReview = (listingId: string) => {
    console.log('Review listing:', listingId);
    // In a real app, this would open a review modal
  };

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
                Marketplace
              </h1>
              <p className="text-lg text-cosmic-100">
                Discover unique designs from talented creators
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div variants={fadeIn}>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Search */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-cosmic-100">
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search listings..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-cosmic-300 focus:outline-none focus:ring-2 focus:ring-cosmic-500/50"
                      />
                      <MagnifyingGlassIcon className="absolute right-3 top-3 h-5 w-5 text-cosmic-300" />
                    </div>
                  </div>

                  {/* Fabric Specialty */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-cosmic-100">
                      Fabric Specialty
                    </label>
                    <select
                      value={filters.fabricSpecialty}
                      onChange={(e) => handleFilterChange('fabricSpecialty', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cosmic-500/50"
                    >
                      <option value="">All fabrics</option>
                      <option value="Linen">Linen</option>
                      <option value="Cotton">Cotton</option>
                      <option value="Silk">Silk</option>
                      <option value="Wool">Wool</option>
                      <option value="Denim">Denim</option>
                      <option value="Cashmere">Cashmere</option>
                      <option value="Tweed/Hemp">Tweed/Hemp</option>
                      <option value="Recycled">Recycled Materials</option>
                    </select>
                  </div>

                  {/* Clothing Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-cosmic-100">
                      Clothing Type
                    </label>
                    <select
                      value={filters.clothingType}
                      onChange={(e) => handleFilterChange('clothingType', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cosmic-500/50"
                    >
                      <option value="">All types</option>
                      <option value="Shirts">Shirts</option>
                      <option value="Pants">Pants</option>
                      <option value="Dresses">Dresses</option>
                      <option value="Jackets">Jackets</option>
                      <option value="Wedding">Wedding Wear</option>
                      <option value="Professional">Professional Wear</option>
                      <option value="Blouses">Blouses</option>
                      <option value="Jewelry">Jewelry</option>
                    </select>
                  </div>

                  {/* Minimum Tier */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-cosmic-100">
                      Minimum Tier
                    </label>
                    <select
                      value={filters.minTier}
                      onChange={(e) => handleFilterChange('minTier', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cosmic-500/50"
                    >
                      <option value="">Any tier</option>
                      <option value="Gold">Gold</option>
                      <option value="Diamond">Diamond</option>
                      <option value="Cosmic">Cosmic</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Listings Grid */}
            <motion.div variants={fadeIn}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockListings.map(listing => (
                  <DesignerListing
                    key={listing.id}
                    {...listing}
                    canReview={true}
                    onReview={handleReview}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}