import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface FeaturedSectionProps {
  userType: 'designer' | 'consumer' | null;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ userType }) => {
  const getContent = () => {
    if (userType === 'designer') {
      return {
        title: 'Featured Opportunities',
        items: [
          {
            title: 'Custom Wedding Dress',
            description: 'Sustainable silk dress with vintage inspiration',
            budget: '$2,000 - $3,000',
            deadline: '3 weeks',
            tags: ['Wedding', 'Vintage', 'Silk'],
            image: '/images/projects/wedding-dress.jpg',
          },
          {
            title: 'Summer Collection',
            description: 'Eco-friendly resort wear collection',
            budget: '$5,000 - $8,000',
            deadline: '2 months',
            tags: ['Resort Wear', 'Sustainable', 'Collection'],
            image: '/images/projects/summer-collection.jpg',
          },
        ],
      };
    }

    return {
      title: 'Featured Designs',
      items: [
        {
          title: 'Minimalist Linen Set',
          description: 'Sustainable everyday wear',
          designer: 'EcoStyle Studio',
          price: '$180',
          tags: ['Linen', 'Minimalist', 'Sustainable'],
          image: '/images/designs/linen-set.jpg',
        },
        {
          title: 'Upcycled Denim Jacket',
          description: 'One-of-a-kind sustainable piece',
          designer: 'GreenThread',
          price: '$250',
          tags: ['Denim', 'Upcycled', 'Streetwear'],
          image: '/images/designs/denim-jacket.jpg',
        },
      ],
    };
  };

  const content = getContent();

  return (
    <Card variant="default" className="overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-6">
          {content.title}
        </h2>

        <div className="space-y-6">
          {content.items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {'designer' in item ? (
                    <>
                      <span className="text-sm text-primary-600 dark:text-primary-400">
                        {item.designer}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.price}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-primary-600 dark:text-primary-400">
                        {item.budget}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Deadline: {item.deadline}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Button variant="outline" size="sm">
                {userType === 'designer' ? 'View Details' : 'Learn More'}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-right">
          <Button variant="link">
            View All {userType === 'designer' ? 'Opportunities' : 'Designs'} →
          </Button>
        </div>
      </div>
    </Card>
  );
};