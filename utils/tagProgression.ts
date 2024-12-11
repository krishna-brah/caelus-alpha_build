import { Tag, TagTier } from '../types/tags';

const TIER_THRESHOLDS = {
  Baseline: 0,
  Gold: 10,
  Diamond: 25,
  Cosmic: 50,
} as const;

export const calculateNextTier = (currentTier: TagTier): TagTier | null => {
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

export const calculateNextThreshold = (currentTier: TagTier): number => {
  const nextTier = calculateNextTier(currentTier);
  return nextTier ? TIER_THRESHOLDS[nextTier] : TIER_THRESHOLDS.Cosmic;
};

export const updateTagProgression = (
  tag: Tag,
  qualityMetrics: {
    consumerRating: number;
    designerRating: number;
    engagement: number;
  }
): Tag => {
  // Only count the project if it meets quality thresholds
  const meetsQualityThreshold =
    qualityMetrics.consumerRating >= 4.0 &&
    qualityMetrics.designerRating >= 4.0 &&
    qualityMetrics.engagement >= 100;

  if (!meetsQualityThreshold) {
    return tag;
  }

  const updatedProjectsCompleted = tag.projectsCompleted + 1;
  const nextTier = calculateNextTier(tag.tier);

  // If we've reached the threshold for the next tier
  if (nextTier && updatedProjectsCompleted >= TIER_THRESHOLDS[nextTier]) {
    return {
      ...tag,
      tier: nextTier,
      projectsCompleted: updatedProjectsCompleted,
      nextTierThreshold: calculateNextThreshold(nextTier),
    };
  }

  // If we haven't reached the next tier yet
  return {
    ...tag,
    projectsCompleted: updatedProjectsCompleted,
  };
};

export const calculateProgressPercentage = (tag: Tag): number => {
  if (tag.tier === 'Cosmic') {
    return 100;
  }

  return (tag.projectsCompleted / tag.nextTierThreshold) * 100;
};