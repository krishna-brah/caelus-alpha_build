export interface Tag {
  id: string;
  value: string;
  category: 'FabricSpecialty' | 'ClothingType' | 'Style';
  searchTerms: string[]; // Terms to search for images
  description: string;
  baseThreshold: number; // Base number of projects needed for next tier
}

export const tagCategories = {
  FabricSpecialty: 'Fabric Specialties',
  ClothingType: 'Types of Clothes',
  Style: 'Styles'
} as const;

export const tags: Tag[] = [
  // Fabric Specialties
  {
    id: 'linen',
    value: 'Linen',
    category: 'FabricSpecialty',
    searchTerms: ['linen fabric', 'linen textile', 'natural linen'],
    description: 'Specializes in working with linen fabrics, known for their durability and sustainability.',
    baseThreshold: 5
  },
  {
    id: 'cotton',
    value: 'Cotton',
    category: 'FabricSpecialty',
    searchTerms: ['cotton fabric', 'organic cotton', 'cotton textile'],
    description: 'Expert in cotton materials, including organic and sustainable variants.',
    baseThreshold: 5
  },
  {
    id: 'silk',
    value: 'Silk',
    category: 'FabricSpecialty',
    searchTerms: ['silk fabric', 'silk textile', 'luxury silk'],
    description: 'Skilled in working with silk and similar luxury fabrics.',
    baseThreshold: 7
  },
  {
    id: 'wool',
    value: 'Wool',
    category: 'FabricSpecialty',
    searchTerms: ['wool fabric', 'merino wool', 'sustainable wool'],
    description: 'Specializes in wool and wool-blend materials.',
    baseThreshold: 6
  },
  {
    id: 'denim',
    value: 'Denim',
    category: 'FabricSpecialty',
    searchTerms: ['denim fabric', 'sustainable denim', 'recycled denim'],
    description: 'Expert in working with denim and creating sustainable denim pieces.',
    baseThreshold: 5
  },
  {
    id: 'cashmere',
    value: 'Cashmere',
    category: 'FabricSpecialty',
    searchTerms: ['cashmere fabric', 'luxury cashmere', 'sustainable cashmere'],
    description: 'Skilled in working with cashmere and luxury wool materials.',
    baseThreshold: 8
  },
  {
    id: 'tweed-hemp',
    value: 'Tweed/Hemp',
    category: 'FabricSpecialty',
    searchTerms: ['tweed fabric', 'hemp textile', 'sustainable hemp'],
    description: 'Specializes in traditional tweed and sustainable hemp materials.',
    baseThreshold: 6
  },
  {
    id: 'recycled',
    value: 'Recycled Materials',
    category: 'FabricSpecialty',
    searchTerms: ['recycled fabric', 'upcycled textile', 'sustainable materials'],
    description: 'Focuses on using recycled and upcycled materials in designs.',
    baseThreshold: 5
  },

  // Types of Clothes
  {
    id: 'shirts',
    value: 'Shirts',
    category: 'ClothingType',
    searchTerms: ['sustainable shirt', 'eco-friendly shirt', 'organic cotton shirt'],
    description: 'Creates sustainable and eco-friendly shirts and tops.',
    baseThreshold: 5
  },
  {
    id: 'pants',
    value: 'Pants',
    category: 'ClothingType',
    searchTerms: ['sustainable pants', 'eco-friendly trousers', 'organic pants'],
    description: 'Specializes in sustainable pants and trousers.',
    baseThreshold: 5
  },
  {
    id: 'dresses',
    value: 'Dresses',
    category: 'ClothingType',
    searchTerms: ['sustainable dress', 'eco-friendly dress', 'organic dress'],
    description: 'Creates sustainable and eco-conscious dresses.',
    baseThreshold: 6
  },
  {
    id: 'jackets',
    value: 'Jackets',
    category: 'ClothingType',
    searchTerms: ['sustainable jacket', 'eco-friendly coat', 'upcycled jacket'],
    description: 'Designs sustainable jackets and outerwear.',
    baseThreshold: 7
  },
  {
    id: 'wedding',
    value: 'Wedding Wear',
    category: 'ClothingType',
    searchTerms: ['sustainable wedding dress', 'eco-friendly wedding', 'organic wedding'],
    description: 'Specializes in sustainable wedding attire and formal wear.',
    baseThreshold: 8
  },
  {
    id: 'professional',
    value: 'Professional Wear',
    category: 'ClothingType',
    searchTerms: ['sustainable business wear', 'eco-friendly suit', 'sustainable office wear'],
    description: 'Creates sustainable professional and business attire.',
    baseThreshold: 6
  },
  {
    id: 'blouses',
    value: 'Blouses',
    category: 'ClothingType',
    searchTerms: ['sustainable blouse', 'eco-friendly top', 'organic blouse'],
    description: 'Designs sustainable blouses and feminine tops.',
    baseThreshold: 5
  },
  {
    id: 'jewelry',
    value: 'Jewelry',
    category: 'ClothingType',
    searchTerms: ['sustainable jewelry', 'eco-friendly accessories', 'recycled jewelry'],
    description: 'Creates sustainable and eco-friendly jewelry and accessories.',
    baseThreshold: 5
  },

  // Styles
  {
    id: 'formal',
    value: 'Formal',
    category: 'Style',
    searchTerms: ['formal fashion', 'sustainable formal wear', 'eco formal'],
    description: 'Specializes in sustainable formal and elegant wear.',
    baseThreshold: 7
  },
  {
    id: 'vintage',
    value: 'Vintage',
    category: 'Style',
    searchTerms: ['vintage fashion', 'retro style', 'vintage sustainable'],
    description: 'Creates vintage-inspired sustainable fashion.',
    baseThreshold: 6
  },
  {
    id: 'casual',
    value: 'Casual',
    category: 'Style',
    searchTerms: ['casual sustainable', 'everyday eco fashion', 'casual eco-friendly'],
    description: 'Designs sustainable casual and everyday wear.',
    baseThreshold: 5
  },
  {
    id: 'streetwear',
    value: 'Streetwear',
    category: 'Style',
    searchTerms: ['sustainable streetwear', 'eco street fashion', 'urban sustainable'],
    description: 'Creates sustainable and eco-conscious streetwear.',
    baseThreshold: 6
  },
  {
    id: 'artsy',
    value: 'Artsy/Experimental',
    category: 'Style',
    searchTerms: ['artistic fashion', 'experimental sustainable', 'creative eco fashion'],
    description: 'Focuses on artistic and experimental sustainable fashion.',
    baseThreshold: 7
  },
  {
    id: 'gothic',
    value: 'Gothic',
    category: 'Style',
    searchTerms: ['gothic fashion', 'dark sustainable', 'gothic eco fashion'],
    description: 'Specializes in gothic and dark sustainable fashion.',
    baseThreshold: 7
  },
  {
    id: 'avant-garde',
    value: 'Avant-Garde',
    category: 'Style',
    searchTerms: ['avant-garde fashion', 'innovative sustainable', 'forward eco fashion'],
    description: 'Creates avant-garde and innovative sustainable fashion.',
    baseThreshold: 8
  },
  {
    id: 'minimalist',
    value: 'Minimalist',
    category: 'Style',
    searchTerms: ['minimalist fashion', 'minimal sustainable', 'clean eco fashion'],
    description: 'Designs minimalist and timeless sustainable fashion.',
    baseThreshold: 6
  },
];

export const getTagsByCategory = (category: Tag['category']) => {
  return tags.filter(tag => tag.category === category);
};

export const getTagById = (id: string) => {
  return tags.find(tag => tag.id === id);
};

export const calculateNextTierThreshold = (currentProjects: number, baseThreshold: number) => {
  if (currentProjects < baseThreshold) return baseThreshold; // Baseline -> Gold
  if (currentProjects < baseThreshold * 2) return baseThreshold * 2; // Gold -> Diamond
  if (currentProjects < baseThreshold * 4) return baseThreshold * 4; // Diamond -> Cosmic
  return Infinity; // Already at Cosmic
};

export const getTierForProjects = (projects: number, baseThreshold: number) => {
  if (projects >= baseThreshold * 4) return 'Cosmic';
  if (projects >= baseThreshold * 2) return 'Diamond';
  if (projects >= baseThreshold) return 'Gold';
  return 'Baseline';
};