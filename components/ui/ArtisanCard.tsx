import React from 'react';

interface ArtisanCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  tag?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const ArtisanCard: React.FC<ArtisanCardProps> = ({
  title,
  subtitle,
  description,
  image,
  tag,
  onClick,
  children,
}) => {
  return (
    <div 
      onClick={onClick} 
      className={`relative overflow-hidden rounded-xl bg-cream-50 dark:bg-cosmic-800 border border-cosmic-100 dark:border-cosmic-700 shadow-lg transition-all duration-300 hover:shadow-xl ${onClick ? 'cursor-pointer' : ''} group`}
    >
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cosmic-500/10 to-cosmic-600/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {image && (
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-60 object-cover"
          />
          {tag && (
            <span className="absolute top-2 right-2 px-2 py-1 text-sm rounded-full bg-cream-50/90 backdrop-blur-sm text-cosmic-900 shadow-sm">
              {tag}
            </span>
          )}
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold text-cosmic-900 dark:text-cosmic-50">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-cosmic-600 dark:text-cosmic-300">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-sm text-cosmic-500 dark:text-cosmic-400 mt-2">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};