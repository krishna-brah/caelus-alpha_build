import React from 'react';
import { motion } from 'framer-motion';

interface GridProps {
  children: React.ReactNode;
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = '2rem',
  className = '',
}) => {
  const getGridColumns = () => {
    return `
      grid-cols-${columns.default}
      ${columns.sm ? `sm:grid-cols-${columns.sm}` : ''}
      ${columns.md ? `md:grid-cols-${columns.md}` : ''}
      ${columns.lg ? `lg:grid-cols-${columns.lg}` : ''}
      ${columns.xl ? `xl:grid-cols-${columns.xl}` : ''}
    `;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`grid ${getGridColumns()} gap-${gap} ${className}`}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};