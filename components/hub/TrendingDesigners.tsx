import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Designer {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  tier: 'Baseline' | 'Gold' | 'Diamond' | 'Cosmic';
  rating: number;
  projects: number;
}

const DESIGNERS: Designer[] = [
  {
    id: '1',
    name: 'Emma Chen',
    avatar: '/avatars/emma.jpg',
    specialties: ['Sustainable Denim', 'Upcycling'],
    tier: 'Diamond',
    rating: 4.9,
    projects: 47,
  },
  {
    id: '2',
    name: 'Marcus Rivera',
    avatar: '/avatars/marcus.jpg',
    specialties: ['Organic Cotton', 'Minimalist'],
    tier: 'Cosmic',
    rating: 5.0,
    projects: 89,
  },
  {
    id: '3',
    name: 'Sofia Patel',
    avatar: '/avatars/sofia.jpg',
    specialties: ['Hemp Fashion', 'Eco Prints'],
    tier: 'Gold',
    rating: 4.8,
    projects: 28,
  },
];

export const TrendingDesigners: React.FC = () => {
  const getTierColor = (tier: Designer['tier']) => {
    switch (tier) {
      case 'Cosmic':
        return 'bg-gradient-to-r from-purple-400 to-pink-400';
      case 'Diamond':
        return 'bg-gradient-to-r from-blue-400 to-cyan-400';
      case 'Gold':
        return 'bg-gradient-to-r from-yellow-400 to-orange-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <Card variant="default">
      <div className="p-6">
        <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-6">
          Trending Designers
        </h2>

        <div className="space-y-6">
          {DESIGNERS.map((designer, index) => (
            <motion.div
              key={designer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className="relative">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={designer.avatar}
                    alt={designer.name}
                    className="object-cover"
                  />
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${getTierColor(
                    designer.tier
                  )} ring-2 ring-white dark:ring-neutral-800 flex items-center justify-center`}
                >
                  <span className="text-[10px] font-bold text-white">
                    {designer.tier.charAt(0)}
                  </span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {designer.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-yellow-500">★</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {designer.rating} · {designer.projects} projects
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {designer.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <Button variant="ghost" size="sm">
                View
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="link">
            Discover More Designers →
          </Button>
        </div>
      </div>
    </Card>
  );
};