import { NextApiRequest, NextApiResponse } from 'next';
import { getTagById } from '@/lib/config/tags';
import { searchImages } from '@/lib/pexels';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { tagId } = req.query;

  if (!tagId || typeof tagId !== 'string') {
    return res.status(400).json({ message: 'Tag ID is required' });
  }

  const tag = getTagById(tagId);
  if (!tag) {
    return res.status(404).json({ message: 'Tag not found' });
  }

  try {
    // Randomly select one of the search terms for variety
    const searchTerm = tag.searchTerms[Math.floor(Math.random() * tag.searchTerms.length)];
    const images = await searchImages(searchTerm, 10);
    
    return res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return res.status(500).json({ message: 'Error fetching images' });
  }
}