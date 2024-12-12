import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { cn } from '../lib/utils/cn';
import { Dialog } from '@headlessui/react';

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
      <div className="py-16">
        <h1 className="text-4xl font-bold text-center text-cosmic-900 dark:text-cosmic-50 mb-8">
          Caelus Bazaar
        </h1>

        <div className="border-b border-cosmic-200 dark:border-cosmic-700 mb-8">
          <div className="flex justify-center">
            <button
              className={cn(
                "px-6 py-2 font-medium border-b-2 transition-colors duration-200",
                tabValue === 0
                  ? "border-cosmic-500 text-cosmic-900 dark:text-cosmic-50"
                  : "border-transparent text-cosmic-600 dark:text-cosmic-400 hover:text-cosmic-900 dark:hover:text-cosmic-50"
              )}
              onClick={(e) => handleTabChange(e, 0)}
            >
              Marketplace
            </button>
            <button
              className={cn(
                "px-6 py-2 font-medium border-b-2 transition-colors duration-200",
                tabValue === 1
                  ? "border-cosmic-500 text-cosmic-900 dark:text-cosmic-50"
                  : "border-transparent text-cosmic-600 dark:text-cosmic-400 hover:text-cosmic-900 dark:hover:text-cosmic-50"
              )}
              onClick={(e) => handleTabChange(e, 1)}
            >
              Bounties
            </button>
          </div>
        </div>

        {/* Marketplace Panel */}
        <div className={tabValue === 0 ? "block" : "hidden"}>
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setOpenNewListing(true)}
              className="px-4 py-2 bg-cosmic-500 text-white rounded-lg hover:bg-cosmic-600 transition-colors duration-200"
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
                className="bg-cream-50 dark:bg-cosmic-800 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-cosmic-900 dark:text-cosmic-50 mb-1">
                    {listing.title}
                  </h3>
                  <p className="text-sm text-cosmic-600 dark:text-cosmic-400">
                    By {listing.designer}
                  </p>
                  <p className="text-2xl font-bold text-cosmic-500 my-2">
                    ${listing.price}
                  </p>
                  <p className="text-cosmic-700 dark:text-cosmic-300 mb-4">
                    {listing.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {listing.materials.map((material) => (
                      <span
                        key={material}
                        className="px-2 py-1 text-sm bg-cosmic-100 dark:bg-cosmic-700 text-cosmic-800 dark:text-cosmic-200 rounded-full"
                      >
                        {material}
                      </span>
                    ))}
                    <span className="px-2 py-1 text-sm bg-cosmic-100 dark:bg-cosmic-700 text-cosmic-800 dark:text-cosmic-200 rounded-full">
                      Size {listing.size}
                    </span>
                  </div>
                  <button className="w-full px-4 py-2 bg-cosmic-500 text-white rounded-lg hover:bg-cosmic-600 transition-colors duration-200">
                    Purchase
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bounties Panel */}
        <div className={tabValue === 1 ? "block" : "hidden"}>
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setOpenNewBounty(true)}
              className="px-4 py-2 bg-cosmic-500 text-white rounded-lg hover:bg-cosmic-600 transition-colors duration-200"
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
                className="bg-cream-50 dark:bg-cosmic-800 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-cosmic-900 dark:text-cosmic-50 mb-2">
                  {bounty.title}
                </h3>
                <p className="text-lg font-medium text-cosmic-500">
                  Budget: ${bounty.budget}
                </p>
                <p className="text-cosmic-700 dark:text-cosmic-300 my-4">
                  {bounty.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {bounty.requirements.map((req) => (
                    <span
                      key={req}
                      className="px-2 py-1 text-sm bg-cosmic-100 dark:bg-cosmic-700 text-cosmic-800 dark:text-cosmic-200 rounded-full"
                    >
                      {req}
                    </span>
                  ))}
                </div>
                <button
                  className={cn(
                    "w-full px-4 py-2 rounded-lg transition-colors duration-200",
                    bounty.status === "Open"
                      ? "bg-cosmic-500 text-white hover:bg-cosmic-600"
                      : "bg-cosmic-200 text-cosmic-700 cursor-not-allowed"
                  )}
                  disabled={bounty.status !== "Open"}
                >
                  Accept Bounty
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* New Bounty Dialog */}
        <Dialog
          open={openNewBounty}
          onClose={() => setOpenNewBounty(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-cream-50 dark:bg-cosmic-800 p-6">
              <Dialog.Title className="text-xl font-semibold text-cosmic-900 dark:text-cosmic-50 mb-4">
                Create New Bounty
              </Dialog.Title>
              <form onSubmit={handleCreateBounty} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cosmic-700 dark:text-cosmic-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-cosmic-200 dark:border-cosmic-700 bg-white dark:bg-cosmic-900 text-cosmic-900 dark:text-cosmic-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cosmic-700 dark:text-cosmic-300 mb-1">
                    Budget Range
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-cosmic-200 dark:border-cosmic-700 bg-white dark:bg-cosmic-900 text-cosmic-900 dark:text-cosmic-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cosmic-700 dark:text-cosmic-300 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-cosmic-200 dark:border-cosmic-700 bg-white dark:bg-cosmic-900 text-cosmic-900 dark:text-cosmic-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cosmic-700 dark:text-cosmic-300 mb-1">
                    Requirements
                  </label>
                  <textarea
                    required
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-cosmic-200 dark:border-cosmic-700 bg-white dark:bg-cosmic-900 text-cosmic-900 dark:text-cosmic-50"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setOpenNewBounty(false)}
                    className="px-4 py-2 text-cosmic-600 dark:text-cosmic-400 hover:text-cosmic-900 dark:hover:text-cosmic-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cosmic-500 text-white rounded-lg hover:bg-cosmic-600 transition-colors duration-200"
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
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-cream-50 dark:bg-cosmic-800 p-6">
              <Dialog.Title className="text-xl font-semibold text-cosmic-900 dark:text-cosmic-50 mb-4">
                Create New Listing
              </Dialog.Title>
              <form onSubmit={handleCreateListing} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cosmic-700 dark:text-cosmic-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-cosmic-200 dark:border-cosmic-700 bg-white dark:bg-cosmic-900 text-cosmic-900 dark:text-cosmic-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cosmic-700 dark:text-cosmic-300 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-cosmic-200 dark:border-cosmic-700 bg-white dark:bg-cosmic-900 text-cosmic-900 dark:text-cosmic-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cosmic-700 dark:text-cosmic-300 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-cosmic-200 dark:border-cosmic-700 bg-white dark:bg-cosmic-900 text-cosmic-900 dark:text-cosmic-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cosmic-700 dark:text-cosmic-300 mb-1">
                    Size
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 rounded-lg border border-cosmic-200 dark:border-cosmic-700 bg-white dark:bg-cosmic-900 text-cosmic-900 dark:text-cosmic-50"
                  >
                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Add image upload functionality */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setOpenNewListing(false)}
                    className="px-4 py-2 text-cosmic-600 dark:text-cosmic-400 hover:text-cosmic-900 dark:hover:text-cosmic-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cosmic-500 text-white rounded-lg hover:bg-cosmic-600 transition-colors duration-200"
                  >
                    Create Listing
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Bazaar;