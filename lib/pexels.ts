import { createClient } from 'pexels';

// NOTE: Replace with your actual Pexels API key in .env
const client = createClient(process.env.PEXELS_API_KEY || '');

export interface PexelsImage {
  id: number;
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

export async function searchImages(query: string, perPage: number = 15, page: number = 1) {
  try {
    const response = await client.photos.search({
      query,
      per_page: perPage,
      page: page
    });
    return response.photos;
  } catch (error) {
    console.error('Error fetching images from Pexels:', error);
    return [];
  }
}

export async function getImageById(id: number) {
  try {
    const photo = await client.photos.show({ id });
    return photo;
  } catch (error) {
    console.error('Error fetching image from Pexels:', error);
    return null;
  }
}