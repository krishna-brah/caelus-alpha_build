import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const userId = session.user.id;

  switch (req.method) {
    case 'GET':
      try {
        const tags = await prisma.tag.findMany({
          where: { userId },
        });
        return res.status(200).json(tags);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch tags' });
      }

    case 'POST':
      try {
        const { category, value } = req.body;
        
        // Check if tag already exists
        const existingTag = await prisma.tag.findFirst({
          where: { userId, category, value },
        });

        if (existingTag) {
          return res.status(400).json({ error: 'Tag already exists' });
        }

        const tag = await prisma.tag.create({
          data: {
            category,
            value,
            tier: 'Baseline',
            projectsCompleted: 0,
            nextTierThreshold: 10,
            userId,
          },
        });

        return res.status(201).json(tag);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to create tag' });
      }

    case 'PUT':
      try {
        const { tagId, projectMetrics } = req.body;

        const tag = await prisma.tag.findFirst({
          where: { id: tagId, userId },
        });

        if (!tag) {
          return res.status(404).json({ error: 'Tag not found' });
        }

        // Update tag progression based on metrics
        const updatedTag = await prisma.tag.update({
          where: { id: tagId },
          data: {
            projectsCompleted: tag.projectsCompleted + 1,
            // Add logic for tier progression
          },
        });

        return res.status(200).json(updatedTag);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to update tag' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}