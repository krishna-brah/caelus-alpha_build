import type { NextApiRequest, NextApiResponse } from 'next';
import { AIService } from '../../../lib/services/ai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const {
      fabricId,
      recommendationType,
      userPreferences,
      sustainabilityDetails,
      stylePreferences,
    } = req.body;

    let response;

    switch (recommendationType) {
      case 'general':
        response = await AIService.generateFabricRecommendation(userPreferences);
        break;
      
      case 'sustainability':
        response = await AIService.analyzeSustainability(sustainabilityDetails);
        break;
      
      case 'styling':
        response = await AIService.suggestStyling(fabricId, stylePreferences);
        break;
      
      default:
        throw new Error('Invalid recommendation type');
    }

    res.status(200).json({
      success: true,
      data: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Advanced Recommendation Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate advanced recommendations',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}