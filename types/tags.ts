export type TagTier = 'Baseline' | 'Gold' | 'Diamond' | 'Cosmic';

export type FabricSpecialty = 
  | 'Linen'
  | 'Cotton'
  | 'Silk'
  | 'Wool'
  | 'Denim'
  | 'Cashmere'
  | 'Tweed/Hemp'
  | 'Recycled Materials';

export type ClothingType = 
  | 'Shirts'
  | 'Pants'
  | 'Dresses'
  | 'Jackets'
  | 'Wedding Wear'
  | 'Professional Wear'
  | 'Blouses'
  | 'Jewelry';

export type StyleTag = 
  | 'Formal'
  | 'Vintage'
  | 'Casual'
  | 'Streetwear'
  | 'Artsy/Experimental'
  | 'Gothic'
  | 'Avant-Garde'
  | 'Minimalist';

export interface Tag {
  id: string;
  category: 'FabricSpecialty' | 'ClothingType' | 'Style';
  value: FabricSpecialty | ClothingType | StyleTag;
  tier: TagTier;
  projectsCompleted: number;
  nextTierThreshold: number;
}

export interface TagProgress {
  currentCount: number;
  nextThreshold: number;
  currentTier: TagTier;
  percentage: number;
}

export interface FabricScore {
  qualityRating: number;
  sustainabilityScore: number;
  origin: string;
  supplier: string;
  certifications: string[];
  ratedByDesigners: number;
}