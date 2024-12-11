import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import {
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  StarIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

interface ActivityFeedProps {
  userType: 'designer' | 'consumer' | null;
}

interface Activity {
  id: string;
  type: 'completion' | 'message' | 'like' | 'review' | 'purchase';
  content: string;
  timestamp: string;
  user?: {
    name: string;
    avatar: string;
  };
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ userType }) => {
  const getActivities = (): Activity[] => {
    if (userType === 'designer') {
      return [
        {
          id: '1',
          type: 'completion',
          content: 'Completed sustainable denim jacket project',
          timestamp: '2 hours ago',
        },
        {
          id: '2',
          type: 'message',
          content: 'New message from client about wedding dress project',
          timestamp: '4 hours ago',
          user: {
            name: 'Sarah M.',
            avatar: '/avatars/sarah.jpg',
          },
        },
        {
          id: '3',
          type: 'review',
          content: 'Received 5-star review for linen summer dress',
          timestamp: '1 day ago',
          user: {
            name: 'Emma W.',
            avatar: '/avatars/emma.jpg',
          },
        },
      ];
    }

    return [
      {
        id: '1',
        type: 'purchase',
        content: 'Purchased eco-friendly cotton shirt',
        timestamp: '1 hour ago',
      },
      {
        id: '2',
        type: 'like',
        content: 'Liked sustainable denim collection',
        timestamp: '3 hours ago',
      },
      {
        id: '3',
        type: 'message',
        content: 'Connected with designer about custom dress',
        timestamp: '1 day ago',
        user: {
          name: 'Alex D.',
          avatar: '/avatars/alex.jpg',
        },
      },
    ];
  };

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'completion':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'message':
        return <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-500" />;
      case 'like':
        return <HeartIcon className="h-5 w-5 text-red-500" />;
      case 'review':
        return <StarIcon className="h-5 w-5 text-yellow-500" />;
      case 'purchase':
        return <ShoppingBagIcon className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const activities = getActivities();

  return (
    <Card variant="default">
      <div className="p-6">
        <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-6">
          Recent Activity
        </h2>

        <div className="space-y-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0">{getIcon(activity.type)}</div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  {activity.content}
                </p>
                <div className="mt-1 flex items-center space-x-2">
                  {activity.user && (
                    <>
                      <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <img
                          src={activity.user.avatar}
                          alt={activity.user.name}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.user.name}
                      </span>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                    </>
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
            View All Activity →
          </button>
        </div>
      </div>
    </Card>
  );
};