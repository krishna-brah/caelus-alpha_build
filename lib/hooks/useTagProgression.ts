import { useState, useCallback } from 'react';
import { Tag, TagTier } from '../../types/tags';
import { useApp } from '../contexts/AppContext';

interface TagProgressionMetrics {
  consumerRating: number;
  designerRating: number;
  engagement: number;
}

interface ProgressUpdate {
  tag: Tag;
  newTier?: TagTier;
  progress: number;
}

export function useTagProgression() {
  const { user, setUser } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateNextTier = (currentTier: TagTier): TagTier | null => {
    switch (currentTier) {
      case 'Baseline':
        return 'Gold';
      case 'Gold':
        return 'Diamond';
      case 'Diamond':
        return 'Cosmic';
      case 'Cosmic':
        return null;
    }
  };

  const calculateThreshold = (tier: TagTier): number => {
    switch (tier) {
      case 'Gold':
        return 10;
      case 'Diamond':
        return 25;
      case 'Cosmic':
        return 50;
      default:
        return 10;
    }
  };

  const updateTagProgress = useCallback(
    async (tagId: string, metrics: TagProgressionMetrics): Promise<ProgressUpdate | null> => {
      if (!user) {
        setError('User not authenticated');
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const tag = user.tags.find(t => t.id === tagId);
        if (!tag) {
          throw new Error('Tag not found');
        }

        // Check if project meets quality thresholds
        const meetsQualityThreshold =
          metrics.consumerRating >= 4.0 &&
          metrics.designerRating >= 4.0 &&
          metrics.engagement >= 100;

        if (!meetsQualityThreshold) {
          return {
            tag,
            progress: (tag.projectsCompleted / tag.nextTierThreshold) * 100,
          };
        }

        const updatedProjectsCompleted = tag.projectsCompleted + 1;
        const nextTier = calculateNextTier(tag.tier);
        const currentThreshold = tag.nextTierThreshold;

        // Update tag progression
        const updatedTag: Tag = {
          ...tag,
          projectsCompleted: updatedProjectsCompleted,
        };

        if (nextTier && updatedProjectsCompleted >= currentThreshold) {
          updatedTag.tier = nextTier;
          updatedTag.nextTierThreshold = calculateThreshold(nextTier);
        }

        // Update user context with new tag data
        const updatedTags = user.tags.map(t =>
          t.id === tagId ? updatedTag : t
        );

        setUser({
          ...user,
          tags: updatedTags,
        });

        return {
          tag: updatedTag,
          newTier: nextTier,
          progress: (updatedProjectsCompleted / updatedTag.nextTierThreshold) * 100,
        };
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update tag progression');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user, setUser]
  );

  return {
    updateTagProgress,
    loading,
    error,
  };
}