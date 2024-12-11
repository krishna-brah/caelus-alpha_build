export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  requirement: {
    type: 'projects' | 'ratings' | 'sustainability' | 'community';
    threshold: number;
  };
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  type: 'fabric' | 'discount' | 'feature' | 'badge';
  value: number | string;
}

export const achievements: Achievement[] = [
  {
    id: 'first_design',
    title: 'First Creation',
    description: 'Upload your first design to the platform',
    icon: '🎨',
    points: 100,
    requirement: { type: 'projects', threshold: 1 },
  },
  {
    id: 'sustainable_master',
    title: 'Sustainability Champion',
    description: 'Complete 10 projects with high sustainability ratings',
    icon: '🌱',
    points: 500,
    requirement: { type: 'sustainability', threshold: 10 },
  },
  {
    id: 'community_favorite',
    title: 'Community Favorite',
    description: 'Receive 50 positive ratings from the community',
    icon: '⭐',
    points: 1000,
    requirement: { type: 'ratings', threshold: 50 },
  },
  {
    id: 'eco_innovator',
    title: 'Eco Innovator',
    description: 'Use recycled materials in 20 designs',
    icon: '♻️',
    points: 750,
    requirement: { type: 'sustainability', threshold: 20 },
  },
];

export const rewards: Reward[] = [
  {
    id: 'free_fabric',
    title: 'Free Fabric Sample',
    description: 'Get a free sample of any fabric from our gallery',
    cost: 500,
    type: 'fabric',
    value: 1,
  },
  {
    id: 'featured_designer',
    title: 'Featured Designer Spot',
    description: 'Get featured on the homepage for a week',
    cost: 2000,
    type: 'feature',
    value: '7days',
  },
  {
    id: 'discount_coupon',
    title: 'Fabric Discount',
    description: '20% off your next fabric purchase',
    cost: 1000,
    type: 'discount',
    value: 20,
  },
];

export function calculateLevel(points: number): number {
  return Math.floor(Math.sqrt(points / 100)) + 1;
}

export function getNextLevelThreshold(currentPoints: number): number {
  const currentLevel = calculateLevel(currentPoints);
  return Math.pow(currentLevel, 2) * 100;
}

export function checkAchievementProgress(
  achievement: Achievement,
  userStats: {
    projects: number;
    ratings: number;
    sustainabilityScore: number;
    communityContributions: number;
  }
): number {
  switch (achievement.requirement.type) {
    case 'projects':
      return (userStats.projects / achievement.requirement.threshold) * 100;
    case 'ratings':
      return (userStats.ratings / achievement.requirement.threshold) * 100;
    case 'sustainability':
      return (userStats.sustainabilityScore / achievement.requirement.threshold) * 100;
    case 'community':
      return (userStats.communityContributions / achievement.requirement.threshold) * 100;
    default:
      return 0;
  }
}

export function canRedeemReward(userPoints: number, reward: Reward): boolean {
  return userPoints >= reward.cost;
}