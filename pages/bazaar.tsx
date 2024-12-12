import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { cn } from '../lib/utils/cn';
import { Dialog } from '@headlessui/react';

// Dummy data - to be replaced with actual data
const listings = [
  {
    id: 1,
    title: 'Handcrafted Linen Dress',
    designer: 'Jane Doe',
    price: 299,
    image: '/images/listings/dress1.jpg',
    description: 'Custom-made linen dress with natural dyes',
    materials: ['Organic Linen'],
    size: 'M',
  },
  // Add more listings
];

const bounties = [
  {
    id: 1,
    title: 'Sustainable Summer Dress',
    budget: '200-300',
    description: 'Looking for a custom summer dress made from organic linen',
    requirements: ['Linen', 'Natural dyes', 'Size S'],
    status: 'Open',
  },
  // Add more bounties
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