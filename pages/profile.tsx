import React, { useState } from 'react';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import { Layout } from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { cn } from '../lib/utils/cn';
import ImageGenerator from '../components/ImageGenerator';
import AIStyleQuestionnaire from '../components/AIStyleQuestionnaire';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  if (value !== index) return null;

  return (
    <motion.div
      variants={fadeIn}
      role="tabpanel"
      id={`profile-tabpanel-${index}`}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
    >
      {children}
    </motion.div>
  );
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const ProfilePage: NextPageWithLayout = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openMeasurements, setOpenMeasurements] = useState(false);
  const [openAIQuestionnaire, setOpenAIQuestionnaire] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');

  const handleTabChange = (event: React.MouseEvent<HTMLButtonElement>, newValue: number) => {
    setTabValue(newValue);
  };

  // Dummy data - to be replaced with actual user data
  const userProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    type: 'Designer', // or 'Consumer'
    measurements: {
      chest: 40,
      waist: 34,
      hips: 42,
      inseam: 32,
    },
    favorites: [
      {
        id: 1,
        name: 'Organic Linen',
        image: '/images/fabrics/linen1.jpg',
      },
      // Add more favorites
    ],
    sketches: [
      {
        id: 1,
        title: 'Summer Collection 2025',
        image: '/images/sketches/sketch1.jpg',
        date: '2024-12-01',
      },
      // Add more sketches
    ],
  };

  return (
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
          <motion.div variants={fadeIn}>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4 text-center">
                  {/* Profile Image Placeholder */}
                  <div className="w-48 h-48 rounded-full bg-cosmic-800/50 mx-auto mb-4 border border-white/10" />
                  <button className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-cosmic-100 hover:bg-white/10 transition-colors duration-200">
                    Change Photo
                  </button>
                </div>
                <div className="md:col-span-8">
                  <h1 className="text-3xl font-bold text-white mb-2 font-space-grotesk">
                    {userProfile.name}
                  </h1>
                  <p className="text-cosmic-100 mb-2">
                    {userProfile.email}
                  </p>
                  <p className="text-cosmic-200 mb-4">
                    Account Type: <span className="text-cosmic-100">{userProfile.type}</span>
                  </p>
                  <button
                    onClick={() => setOpenMeasurements(true)}
                    className="px-4 py-2 bg-cosmic-500 hover:bg-cosmic-600 text-white rounded-lg transition-colors duration-200"
                  >
                    Update Measurements
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Measurements Dialog */}
      {openMeasurements && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setOpenMeasurements(false)} />
            <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-cosmic-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <h3 className="text-lg font-semibold text-cosmic-900 dark:text-cosmic-50 mb-4">
                  Update Measurements
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-cosmic-700 dark:text-cosmic-300 mb-1">
                      Chest (inches)
                    </label>
                    <input
                      type="number"
                      defaultValue={userProfile.measurements.chest}
                      className="w-full px-3 py-2 rounded-md border border-cosmic-200 dark:border-cosmic-700 
                        bg-white dark:bg-cosmic-800 text-cosmic-900 dark:text-cosmic-50
                        focus:outline-none focus:ring-2 focus:ring-cosmic-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cosmic-700 dark:text-cosmic-300 mb-1">
                      Waist (inches)
                    </label>
                    <input
                      type="number"
                      defaultValue={userProfile.measurements.waist}
                      className="w-full px-3 py-2 rounded-md border border-cosmic-200 dark:border-cosmic-700 
                        bg-white dark:bg-cosmic-800 text-cosmic-900 dark:text-cosmic-50
                        focus:outline-none focus:ring-2 focus:ring-cosmic-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cosmic-700 dark:text-cosmic-300 mb-1">
                      Hips (inches)
                    </label>
                    <input
                      type="number"
                      defaultValue={userProfile.measurements.hips}
                      className="w-full px-3 py-2 rounded-md border border-cosmic-200 dark:border-cosmic-700 
                        bg-white dark:bg-cosmic-800 text-cosmic-900 dark:text-cosmic-50
                        focus:outline-none focus:ring-2 focus:ring-cosmic-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cosmic-700 dark:text-cosmic-300 mb-1">
                      Inseam (inches)
                    </label>
                    <input
                      type="number"
                      defaultValue={userProfile.measurements.inseam}
                      className="w-full px-3 py-2 rounded-md border border-cosmic-200 dark:border-cosmic-700 
                        bg-white dark:bg-cosmic-800 text-cosmic-900 dark:text-cosmic-50
                        focus:outline-none focus:ring-2 focus:ring-cosmic-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setOpenMeasurements(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setOpenMeasurements(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Remove Layout wrapping from the page component itself
const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

ProfilePage.getLayout = getLayout;

export default ProfilePage;