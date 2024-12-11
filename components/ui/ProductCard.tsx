import React from 'react';
import Image from 'next/image';
import { Button } from './Button';
import { Card } from './Card';
import { Heart, ShoppingCart } from '@heroicons/react/24/outline';

interface ProductCardProps {
  id: string;
  title: string;
  designer: string;
  price: number;
  imageSrc: string;
  rating: number;
  sustainable: boolean;
  likes: number;
  onLike?: () => void;
  onAddToCart?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  designer,
  price,
  imageSrc,
  rating,
  sustainable,
  likes,
  onLike,
  onAddToCart,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Card
      variant="glass"
      className="relative group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sustainability Badge */}
      {sustainable && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs rounded-full">
            Sustainable
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <Button
              variant="glass"
              size="sm"
              className="!px-3"
              onClick={onLike}
            >
              <Heart className="w-5 h-5" />
              <span>{likes}</span>
            </Button>
            <Button
              variant="neon"
              size="sm"
              className="!px-3"
              onClick={onAddToCart}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display font-medium text-lg leading-tight text-neutral-900 dark:text-neutral-100">
              {title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              by {designer}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {rating}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-lg font-display font-semibold text-primary-500">
            ${price.toFixed(2)}
          </p>
        </div>
      </div>
    </Card>
  );
};