const PEXELS_API_KEY = 'SGSwVbUEUb6bu4cUfAO6N3HGHfeLyDdIAF1bwnLBaA4vUbLRDsnMAQKD';

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

interface PexelsSearchResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page: string;
}

export async function searchPexelsPhotos(query: string, page: number = 1, perPage: number = 15): Promise<PexelsPhoto[]> {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.statusText}`);
    }

    const data: PexelsSearchResponse = await response.json();
    return data.photos;
  } catch (error) {
    console.error('Error fetching Pexels photos:', error);
    return [];
  }
}

export function getFabricImageUrl(photos: PexelsPhoto[], index: number, size: keyof PexelsPhoto['src'] = 'large'): string {
  // Default fallback images for different fabric types
  const fallbackImages = {
    cotton: '/images/fabrics/cotton-default.jpg',
    polyester: '/images/fabrics/polyester-default.jpg',
    hemp: '/images/fabrics/hemp-default.jpg',
    bamboo: '/images/fabrics/bamboo-default.jpg',
    default: '/images/fabrics/fabric-placeholder.jpg'
  };

  try {
    // If no photos available, return the default fabric placeholder
    if (!photos?.length) {
      return fallbackImages.default;
    }

    // Use modulo to cycle through available photos if index exceeds array length
    const photo = photos[index % photos.length];
    
    // Verify the photo object has the expected structure
    if (!photo?.src?.[size]) {
      return fallbackImages.default;
    }

    return photo.src[size];
  } catch (error) {
    console.error('Error getting fabric image URL:', error);
    return fallbackImages.default;
  }
}

export type { PexelsPhoto };