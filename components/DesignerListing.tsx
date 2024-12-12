import React from 'react';
import Image from 'next/image';
import { Tag } from '../types/tags';
import { motion } from 'framer-motion';

interface ListingScore {
  designQuality: number;
  materialUse: number;
  sustainability: number;
  totalReviews: number;
}

interface DesignerListingProps {
  id: string;
  title: string;
  imageUrl: string;
  designer: {
    name: string;
    tags: Tag[];
  };
  score: ListingScore;
  materials: {
    name: string;
    quality: number;
    sustainability: number;
  }[];
  price: number;
  canReview: boolean;
  onReview: (listingId: string) => void;
}

export const DesignerListing: React.FC<DesignerListingProps> = ({
  id,
  title,
  imageUrl,
  designer,
  score,
  materials,
  price,
  canReview,
  onReview,
}) => {
  const getTierBadgeProps = (tier: string) => {
    switch (tier) {
      case 'Gold':
        return {
          bgColor: 'bg-gradient-to-r from-yellow-300 to-yellow-500',
          textColor: 'text-yellow-900',
          icon: '🌟'
        };
      case 'Diamond':
        return {
          bgColor: 'bg-gradient-to-r from-cyan-300 to-cyan-500',
          textColor: 'text-cyan-900',
          icon: '💎'
        };
      case 'Cosmic':
        return {
          bgColor: 'bg-gradient-to-r from-cosmic-400 to-cosmic-600',
          textColor: 'text-white',
          icon: '🌌'
        };
      default:
        return {
          bgColor: 'bg-gradient-to-r from-gray-300 to-gray-500',
          textColor: 'text-gray-900',
          icon: '⭐'
        };
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 group"
    >
      <div className="relative h-64">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900/80 to-transparent" />
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white font-space-grotesk">{title}</h3>
          <p className="text-cosmic-100">{designer.name}</p>
        </div>

        {/* Designer Tags */}
        <div>
          <h4 className="text-sm font-medium text-cosmic-100 mb-2">Designer Expertise</h4>
          <div className="flex flex-wrap gap-2">
            {designer.tags.map(tag => {
              const { bgColor, textColor, icon } = getTierBadgeProps(tag.tier);
              return (
                <div
                  key={tag.id}
                  className={`px-3 py-1 rounded-full ${bgColor} ${textColor} text-sm font-medium`}
                  title={`${tag.value} - ${tag.tier} Tier`}
                >
                  {icon} {tag.value}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-cosmic-100 mb-1">Design Quality</p>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-lg text-lg font-bold">
              {score.designQuality.toFixed(1)}
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-cosmic-100 mb-1">Material Use</p>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 rounded-lg text-lg font-bold">
              {score.materialUse.toFixed(1)}
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-cosmic-100 mb-1">Sustainability</p>
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-2 py-1 rounded-lg text-lg font-bold">
              {score.sustainability.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Materials Used */}
        <div>
          <h4 className="text-sm font-medium text-cosmic-100 mb-2">Materials Used</h4>
          <div className="space-y-2">
            {materials.map((material, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-cosmic-100">{material.name}</span>
                <div className="flex gap-2">
                  <span className="bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded text-sm">
                    Q: {material.quality}
                  </span>
                  <span className="bg-green-500/20 text-green-200 px-2 py-0.5 rounded text-sm">
                    S: {material.sustainability}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-2xl font-bold text-white">
            ${price.toFixed(2)}
          </span>
          {canReview && (
            <button
              onClick={() => onReview(id)}
              className="bg-gradient-to-r from-cosmic-500 to-cosmic-600 hover:from-cosmic-600 hover:to-cosmic-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Write Review
            </button>
          )}
        </div>

        <div className="text-sm text-cosmic-100 text-right">
          {score.totalReviews} reviews
        </div>
      </div>
    </motion.div>
  );
};