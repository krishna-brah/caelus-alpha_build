import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { Card } from '../ui/Card';

interface QuickActionsProps {
  userType: 'designer' | 'consumer' | null;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ userType }) => {
  const router = useRouter();

  const designerActions = [
    {
      name: 'Create Listing',
      description: 'Add a new product to the bazaar',
      icon: PlusIcon,
      href: '/bazaar/create',
      color: 'bg-green-500',
    },
    {
      name: 'View Projects',
      description: 'Check your ongoing projects',
      icon: SparklesIcon,
      href: '/profile/projects',
      color: 'bg-purple-500',
    },
    {
      name: 'Messages',
      description: 'Connect with clients',
      icon: ChatBubbleLeftRightIcon,
      href: '/messages',
      color: 'bg-blue-500',
    },
  ];

  const consumerActions = [
    {
      name: 'Explore Gallery',
      description: 'Discover sustainable fabrics',
      icon: MagnifyingGlassIcon,
      href: '/gallery',
      color: 'bg-primary-500',
    },
    {
      name: 'Browse Bazaar',
      description: 'Shop sustainable fashion',
      icon: ShoppingBagIcon,
      href: '/bazaar',
      color: 'bg-orange-500',
    },
    {
      name: 'Find Designers',
      description: 'Connect with talented creators',
      icon: UserGroupIcon,
      href: '/designers',
      color: 'bg-indigo-500',
    },
  ];

  const actions = userType === 'designer' ? designerActions : consumerActions;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <motion.div
          key={action.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4 }}
        >
          <Card
            variant="glass"
            className="cursor-pointer group"
            onClick={() => router.push(action.href)}
          >
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`${action.color} p-3 rounded-xl`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                    {action.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};