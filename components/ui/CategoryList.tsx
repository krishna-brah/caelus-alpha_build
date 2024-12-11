import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelect: (categoryId: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  // Handle horizontal scroll with mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 pb-4 pt-2 snap-x snap-mandatory"
    >
      <div className="flex space-x-2">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="snap-start"
          >
            <Button
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="lg"
              className={`whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'shadow-lg'
                  : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
              onClick={() => onSelect(category.id)}
            >
              {category.icon && (
                <span className="mr-2">{category.icon}</span>
              )}
              {category.name}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Gradient fades */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white dark:from-neutral-900" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white dark:from-neutral-900" />
    </div>
  );
};

// Hide scrollbar utility classes
const styles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;