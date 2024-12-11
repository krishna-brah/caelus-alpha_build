import React from 'react';
import { motion } from 'framer-motion';

interface TagCategory {
  name: string;
  tags: string[];
}

const TAG_CATEGORIES: TagCategory[] = [
  {
    name: 'Fabric Specialties',
    tags: [
      'Linen',
      'Cotton',
      'Silk',
      'Wool',
      'Denim',
      'Cashmere',
      'Tweed/Hemp',
      'Recycled Materials',
    ],
  },
  {
    name: 'Types of Clothes',
    tags: [
      'Shirts',
      'Pants',
      'Dresses',
      'Jackets',
      'Wedding Wear',
      'Professional Wear',
      'Blouses',
      'Jewelry',
    ],
  },
  {
    name: 'Styles',
    tags: [
      'Formal',
      'Vintage',
      'Casual',
      'Streetwear',
      'Artsy/Experimental',
      'Gothic',
      'Avant-Garde',
      'Minimalist',
    ],
  },
];

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  onTagsChange,
}) => {
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-8">
      {TAG_CATEGORIES.map((category, categoryIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
        >
          <h3 className="text-lg font-display font-semibold text-white mb-4">
            {category.name}
          </h3>
          <div className="flex flex-wrap gap-3">
            {category.tags.map((tag, tagIndex) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: categoryIndex * 0.1 + tagIndex * 0.05,
                }}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <span className="ml-2">✓</span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Tag Progress */}
      <div className="mt-8 p-4 bg-white/5 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-300">
            Selected Tags ({selectedTags.length})
          </span>
          <span className="text-sm text-primary-400">
            Baseline Level
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium text-primary-400 bg-primary-500/10 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};