import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';
import { Tag } from '@/lib/config/tags';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { tags } = req.body as { tags: Tag[] };
    
    // Get the designer's ID from their email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's tags
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        tags: {
          create: tags.map(tag => ({
            category: tag.category,
            value: tag.value,
            tier: 'Baseline',
            projectsCompleted: 0,
            nextTierThreshold: tag.baseThreshold,
          })),
        },
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error saving tags:', error);
    return res.status(500).json({ message: 'Error saving tags' });
  }
}