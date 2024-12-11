import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const fabrics = await prisma.fabricScore.findMany({
          include: {
            ratedBy: {
              select: {
                name: true,
                tags: true,
              },
            },
          },
        });
        return res.status(200).json(fabrics);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch fabrics' });
      }

    case 'POST':
      try {
        const { name, qualityRating, sustainabilityScore, origin, supplier, certifications } = req.body;

        // Check if user is qualified to rate fabrics
        const user = await prisma.user.findUnique({
          where: { id: session.user.id },
          include: { tags: true },
        });

        const isQualified = user?.tags.some(
          tag => tag.tier === 'Diamond' || tag.tier === 'Cosmic'
        );

        if (!isQualified) {
          return res.status(403).json({ error: 'Not qualified to rate fabrics' });
        }

        const fabric = await prisma.fabricScore.create({
          data: {
            name,
            qualityRating,
            sustainabilityScore,
            origin,
            supplier,
            certifications,
            ratedBy: { connect: { id: session.user.id } },
          },
        });

        return res.status(201).json(fabric);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to create fabric rating' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}