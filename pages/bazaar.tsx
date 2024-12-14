import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import Link from 'next/link';
import { cn } from '../lib/utils/cn';
import { Dialog } from '@headlessui/react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// Sample listings using our categorized images
const listings = [
  {
    id: 1,
    title: 'Eco-Conscious Evening Dress',
    designer: 'Elena Sustainae',
    price: 299,
    image: '/images/listings/sustainable-dresses-1.jpg',
    description: 'Elegant sustainable evening dress made with organic materials',
    materials: ['Organic Silk', 'Peace Silk'],
    size: 'M',
  },
  {
    id: 2,
    title: 'Natural Cotton Blouse',
    designer: 'Verde Fashion',
    price: 129,
    image: '/images/listings/eco-friendly-tops-1.jpg',
    description: 'Breathable organic cotton blouse with natural dyes',
    materials: ['Organic Cotton', 'Natural Dyes'],
    size: 'S',
  },
  {
    id: 3,
    title: 'Sustainable Winter Coat',
    designer: 'EcoWear',
    price: 399,
    image: '/images/listings/sustainable-outerwear-1.jpg',
    description: 'Warm and stylish coat made from recycled materials',
    materials: ['Recycled Wool', 'Organic Cotton Lining'],
    size: 'L',
  },
  {
    id: 4,
    title: 'Handcrafted Accessories Set',
    designer: 'Artisanal Collective',
    price: 159,
    image: '/images/listings/ethical-accessories-1.jpg',
    description: 'Ethically made accessories using sustainable materials',
    materials: ['Recycled Metals', 'Sustainable Leather'],
    size: 'One Size',
  },
  {
    id: 5,
    title: 'Upcycled Denim Collection',
    designer: 'ReNew Fashion',
    price: 199,
    image: '/images/listings/upcycled-fashion-1.jpg',
    description: 'Unique pieces created from upcycled denim',
    materials: ['Upcycled Denim', 'Organic Cotton'],
    size: 'M',
  },
  {
    id: 6,
    title: 'Sustainable Fabric Bundle',
    designer: 'EcoTextiles',
    price: 89,
    image: '/images/listings/sustainable-fabrics-1.jpg',
    description: 'Selection of sustainable fabrics for DIY projects',
    materials: ['Organic Cotton', 'Hemp', 'Bamboo'],
    size: 'N/A',
  }
];

const bounties = [
  {
    id: 1,
    title: 'Sustainable Wedding Dress',
    budget: '500-800',
    description: 'Looking for a sustainable wedding dress made from peace silk and organic materials',
    requirements: ['Peace Silk', 'Natural Dyes', 'Size M', 'Ethical Production'],
    status: 'Open',
  },
  {
    id: 2,
    title: 'Eco-Friendly Business Suit',
    budget: '400-600',
    description: 'Need a professional suit made from sustainable materials for corporate settings',
    requirements: ['Recycled Wool', 'Size L', 'Professional Style', 'Zero Waste'],
    status: 'Open',
  },
  {
    id: 3,
    title: 'Upcycled Denim Collection',
    budget: '300-500',
    description: 'Looking for creative designs using upcycled denim for a sustainable fashion show',
    requirements: ['Upcycled Materials', 'Creative Design', 'Size Range S-L'],
    status: 'Open',
  },
  {
    id: 4,
    title: 'Sustainable Activewear Set',
    budget: '150-250',
    description: 'Need eco-friendly workout clothes made from recycled materials',
    requirements: ['Recycled Polyester', 'Moisture Wicking', 'Size S'],
    status: 'Open',
  }
];

const Bazaar = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openNewBounty, setOpenNewBounty] = useState(false);
  const [openNewListing, setOpenNewListing] = useState(false);

  const handleTabChange = (event: React.MouseEvent<HTMLButtonElement>, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCreateBounty = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle bounty creation
    setOpenNewBounty(false);
  };

  const handleCreateListing = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle listing creation
    setOpenNewListing(false);
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
                Caelus Bazaar
              </h1>
              <p className="text-lg text-cosmic-100">
                Discover and trade sustainable fashion designs, materials, and custom requests.
              </p>
              <div className="mt-6 flex justify-center items-center gap-4">
                <Link href="/gallery">
                  <button className="px-6 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 backdrop-blur-sm flex items-center gap-2 border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    Browse Fabric Gallery
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={fadeIn} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-2">
              <div className="flex justify-center gap-2">
                <button
                  className={cn(
                    "px-6 py-2 font-medium rounded-xl transition-all duration-200",
                    tabValue === 0
                      ? "bg-white/10 text-white"
                      : "text-cosmic-100 hover:bg-white/5 hover:text-white"
                  )}
                  onClick={(e) => handleTabChange(e, 0)}
                >
                  Marketplace
                </button>
                <button
                  className={cn(
                    "px-6 py-2 font-medium rounded-xl transition-all duration-200",
                    tabValue === 1
                      ? "bg-white/10 text-white"
                      : "text-cosmic-100 hover:bg-white/5 hover:text-white"
                  )}
                  onClick={(e) => handleTabChange(e, 1)}
                >
                  Bounties
                </button>
              </div>
            </motion.div>

            {/* Marketplace Panel */}
            <motion.div variants={fadeIn} className={tabValue === 0 ? "block" : "hidden"}>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white font-space-grotesk">
                    Available Items
                  </h2>
                  <button
                    onClick={() => setOpenNewListing(true)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/10"
                  >
                    Create New Listing
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map((listing, index) => (
                    <motion.div
                      key={listing.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="aspect-square">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-white mb-1 font-space-grotesk">
                          {listing.title}
                        </h3>
                        <p className="text-sm text-cosmic-100">
                          By {listing.designer}
                        </p>
                        <p className="text-2xl font-bold text-cosmic-100 my-2">
                          ${listing.price}
                        </p>
                        <p className="text-cosmic-100 mb-4">
                          {listing.description}
                        </p>
                        <div className="mb-4 flex flex-wrap gap-2">
                          {listing.materials.map((material) => (
                            <span
                              key={material}
                              className="px-2 py-1 text-sm bg-white/5 text-cosmic-100 rounded-full border border-white/10"
                            >
                              {material}
                            </span>
                          ))}
                          <span className="px-2 py-1 text-sm bg-white/5 text-cosmic-100 rounded-full border border-white/10">
                            Size {listing.size}
                          </span>
                        </div>
                        <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/10">
                          Purchase
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Bounties Panel */}
            <motion.div variants={fadeIn} className={tabValue === 1 ? "block" : "hidden"}>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white font-space-grotesk">
                    Active Bounties
                  </h2>
                  <button
                    onClick={() => setOpenNewBounty(true)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/10"
                  >
                    Create New Bounty
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {bounties.map((bounty, index) => (
                    <motion.div
                      key={bounty.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <h3 className="text-xl font-bold text-white mb-2 font-space-grotesk">
                        {bounty.title}
                      </h3>
                      <p className="text-lg font-medium text-cosmic-100">
                        Budget: ${bounty.budget}
                      </p>
                      <p className="text-cosmic-100 my-4">
                        {bounty.description}
                      </p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {bounty.requirements.map((req) => (
                          <span
                            key={req}
                            className="px-2 py-1 text-sm bg-white/5 text-cosmic-100 rounded-full border border-white/10"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                      <button
                        className={cn(
                          "w-full px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/10",
                          bounty.status === "Open"
                            ? "bg-white/10 hover:bg-white/20 text-white"
                            : "bg-white/5 text-cosmic-100 cursor-not-allowed"
                        )}
                        disabled={bounty.status !== "Open"}
                      >
                        Accept Bounty
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* New Bounty Dialog */}
            <Dialog
              open={openNewBounty}
              onClose={() => setOpenNewBounty(false)}
              className="relative z-50"
            >
              <div className="fixed inset-0 bg-cosmic-900/80 backdrop-blur-sm" aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-cosmic-800/90 backdrop-blur-lg border border-white/10 p-6 shadow-2xl">
                  <Dialog.Title className="text-xl font-bold text-white mb-6 font-space-grotesk">
                    Create New Bounty
                  </Dialog.Title>
                  <form onSubmit={handleCreateBounty} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-cosmic-100 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder-cosmic-300 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="Enter bounty title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cosmic-100 mb-2">
                        Budget Range
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder-cosmic-300 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="e.g., $500-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cosmic-100 mb-2">
                        Description
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder-cosmic-300 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                        placeholder="Describe what you're looking for"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cosmic-100 mb-2">
                        Requirements
                      </label>
                      <textarea
                        required
                        rows={2}
                        className="w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder-cosmic-300 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                        placeholder="List your requirements"
                      />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setOpenNewBounty(false)}
                        className="px-4 py-2 text-cosmic-100 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/10"
                      >
                        Create Bounty
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </div>
            </Dialog>

            {/* New Listing Dialog */}
            <Dialog
              open={openNewListing}
              onClose={() => setOpenNewListing(false)}
              className="relative z-50"
            >
              <div className="fixed inset-0 bg-cosmic-900/80 backdrop-blur-sm" aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-cosmic-800/90 backdrop-blur-lg border border-white/10 p-6 shadow-2xl">
                  <Dialog.Title className="text-xl font-bold text-white mb-6 font-space-grotesk">
                    Create New Listing
                  </Dialog.Title>
                  <form onSubmit={handleCreateListing} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-cosmic-100 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder-cosmic-300 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="Enter listing title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cosmic-100 mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder-cosmic-300 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="Enter price"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cosmic-100 mb-2">
                        Description
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder-cosmic-300 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                        placeholder="Describe your item"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cosmic-100 mb-2">
                        Materials
                      </label>
                      <textarea
                        required
                        rows={2}
                        className="w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder-cosmic-300 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                        placeholder="List materials used"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cosmic-100 mb-2">
                        Size
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder-cosmic-300 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="e.g., S, M, L, etc."
                      />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setOpenNewListing(false)}
                        className="px-4 py-2 text-cosmic-100 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/10"
                      >
                        Create Listing
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </div>
            </Dialog>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Bazaar;
