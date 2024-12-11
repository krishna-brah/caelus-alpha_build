import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/hub/DashboardLayout';
import { QuickActions } from '../../components/hub/QuickActions';
import { FeaturedSection } from '../../components/hub/FeaturedSection';
import { ActivityFeed } from '../../components/hub/ActivityFeed';
import { TrendingDesigners } from '../../components/hub/TrendingDesigners';
import { SustainabilityMetrics } from '../../components/hub/SustainabilityMetrics';

const HubPage: NextPage = () => {
  const [userType, setUserType] = useState<'designer' | 'consumer' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user type from local storage or API
    const storedType = localStorage.getItem('userType') as 'designer' | 'consumer';
    setUserType(storedType);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            Welcome back
            <span className="text-primary-500">.</span>
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {userType === 'designer'
              ? 'Check your latest projects and connect with potential clients.'
              : 'Discover sustainable fashion and connect with talented designers.'}
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <QuickActions userType={userType} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FeaturedSection userType={userType} />
            </motion.div>

            {/* Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ActivityFeed userType={userType} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending Designers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TrendingDesigners />
            </motion.div>

            {/* Sustainability Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <SustainabilityMetrics userType={userType} />
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HubPage;