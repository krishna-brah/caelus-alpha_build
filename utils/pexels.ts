import { createClient } from 'pexels';

const PEXELS_API_KEY = 'SGSwVbUEUb6bu4cUfAO6N3HGHfeLyDdIAF1bwnLBaA4vUbLRDsnMAQKD';

const client = createClient(PEXELS_API_KEY);

export interface PexelsImage {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large: string;
    medium: string;
    small: string;
    tiny: string;
  };
}

const getFabricSearchTerm = (category: string): string => {
  const terms = {
    'Cotton': 'cotton fabric material texture detail',
    'Linen': 'linen fabric material texture detail',
    'Silk': 'silk fabric material texture detail',
    'Wool': 'wool fabric material texture detail',
    'Denim': 'denim jean fabric texture detail',
    'Velvet': 'velvet fabric texture material detail',
    'Recycled Polyester': 'recycled textile material detail',
    'Organic Hemp': 'organic hemp fabric texture detail',
    'Bamboo': 'bamboo fabric material texture detail'
  };
  return terms[category as keyof typeof terms] || 'fabric texture close up';
};

export const searchFashionImages = async (query: string = 'fabric textile material', perPage: number = 20) => {
  try {
    const fullQuery = `${query} texture details macro closeup`;
    const response = await client.photos.search({
      query: fullQuery,
      per_page: perPage * 2, // Get more images to filter from
      size: 'medium',
      orientation: 'square'
    });
    return response.photos;
  } catch (error) {
    console.error('Error fetching images from Pexels:', error);
    return [];
  }
};