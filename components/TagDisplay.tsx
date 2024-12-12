import React from 'react';
import { Card } from './ui/Card';
import type { Tag, TagTier } from '../types/tags';

interface TagDisplayProps {
  tag: Tag;
}

const getTierStyles = (tier: TagTier) => {
  switch (tier) {
    case 'Gold':
      return {
        icon: '🌟',
        bgColor: 'bg-amber-100',
        textColor: 'text-amber-800',
        borderColor: 'border-amber-200',
        progressColor: 'bg-amber-500',
        progressTrackColor: 'bg-amber-100'
      };
    case 'Diamond':
      return {
        icon: '💎',
        bgColor: 'bg-cyan-100',
        textColor: 'text-cyan-800',
        borderColor: 'border-cyan-200',
        progressColor: 'bg-cyan-500',
        progressTrackColor: 'bg-cyan-100'
      };
    case 'Cosmic':
      return {
        icon: '🌌',
        bgColor: 'bg-cosmic-100',
        textColor: 'text-cosmic-800',
        borderColor: 'border-cosmic-200',
        progressColor: 'bg-cosmic-500',
        progressTrackColor: 'bg-cosmic-100'
      };
    default:
      return {
        icon: '⭐',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-200',
        progressColor: 'bg-gray-500',
        progressTrackColor: 'bg-gray-100'
      };
  }
};

export const TagDisplay: React.FC<TagDisplayProps> = ({ tag }) => {
  const progress = (tag.projectsCompleted / tag.nextTierThreshold) * 100;
  const styles = getTierStyles(tag.tier);
  
  return (
    <Card className="p-4 mb-2 hover:shadow-md transition-shadow duration-200">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles.bgColor} ${styles.textColor} ${styles.borderColor} border`}>
            {styles.icon} {tag.tier}
          </div>
          <span className="text-sm text-cosmic-600">
            {tag.category}
          </span>
        </div>

        <h3 className="font-bold text-cosmic-900">
          {tag.value}
        </h3>

        <div className="relative group">
          <div className={`w-full h-2 ${styles.progressTrackColor} rounded-full overflow-hidden`}>
            <div
              className={`h-full ${styles.progressColor} transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-cosmic-900 text-cream-50 text-xs rounded py-1 px-2 whitespace-nowrap">
              {tag.projectsCompleted}/{tag.nextTierThreshold} projects completed
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-cosmic-900" />
          </div>
        </div>
      </div>
    </Card>
  );
};