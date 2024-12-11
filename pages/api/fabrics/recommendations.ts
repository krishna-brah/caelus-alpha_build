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
    const { fabricId, userPreferences } = req.body;

    if (!fabricId || !userPreferences) {
      return res.status(400).json({
        error: 'Missing required parameters',
      });
    }

    const recommendations = await AIService.suggestStyling(
      fabricId,
      userPreferences
    );

    res.status(200).json(recommendations);
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
}