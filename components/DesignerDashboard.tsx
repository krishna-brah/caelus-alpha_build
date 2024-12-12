import React from 'react';
import { Tag } from '../types/tags';
import { TagDisplay } from './TagDisplay';

interface DesignerDashboardProps {
  designerName: string;
  tags: Tag[];
  achievements: {
    totalProjects: number;
    highestTier: string;
    topRatedListings: number;
  };
}

export const DesignerDashboard: React.FC<DesignerDashboardProps> = ({
  designerName,
  tags,
  achievements,
}) => {
  const groupedTags = tags.reduce((acc, tag) => {
    const category = tag.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tag);
    return acc;
  }, {} as Record<string, Tag[]>);

  return (
    <div className="p-6">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">{designerName}'s Dashboard</h1>
          <p className="text-cosmic-600">Track your progress and achievements</p>
        </div>

        {/* Achievements Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-cream-50 dark:bg-cosmic-800 rounded-lg border border-cosmic-100 dark:border-cosmic-700">
            <div className="flex flex-col">
              <span className="text-cosmic-500 dark:text-cosmic-400">Total Projects</span>
              <span className="text-2xl font-bold">{achievements.totalProjects}</span>
            </div>
          </div>
          <div className="p-4 bg-cream-50 dark:bg-cosmic-800 rounded-lg border border-cosmic-100 dark:border-cosmic-700">
            <div className="flex flex-col">
              <span className="text-cosmic-500 dark:text-cosmic-400">Highest Tier</span>
              <span className="text-2xl font-bold">{achievements.highestTier}</span>
            </div>
          </div>
          <div className="p-4 bg-cream-50 dark:bg-cosmic-800 rounded-lg border border-cosmic-100 dark:border-cosmic-700">
            <div className="flex flex-col">
              <span className="text-cosmic-500 dark:text-cosmic-400">Top Rated Listings</span>
              <span className="text-2xl font-bold">{achievements.topRatedListings}</span>
            </div>
          </div>
        </div>

        {/* Tags Progress */}
        <div>
          <h2 className="text-xl font-bold mb-4">Tag Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedTags).map(([category, categoryTags]) => (
              <div key={category} className="p-4 bg-cream-50 dark:bg-cosmic-800 rounded-lg border border-cosmic-100 dark:border-cosmic-700">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{category}</h3>
                  {categoryTags.map(tag => (
                    <TagDisplay key={tag.id} tag={tag} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};