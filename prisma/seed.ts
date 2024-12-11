import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sustainableFabrics = [
  {
    name: 'Organic Cotton',
    description: 'Naturally grown cotton without harmful pesticides or chemicals. Perfect for everyday wear.',
    imageUrl: '/images/products/fabrics/organic-cotton.jpg',
    sustainabilityScore: 85,
    carbonFootprint: 2.5,
    waterUsage: 2000,
    biodegradable: true,
    recycled: false,
    organic: true,
    properties: {
      breathability: 9,
      durability: 8,
      comfort: 9,
      care: 'Machine washable',
    },
    careInstructions: [
      'Machine wash cold',
      'Tumble dry low',
      'Do not bleach',
    ],
    certifications: [
      'GOTS Certified',
      'Fair Trade',
    ],
  },
  {
    name: 'Recycled Polyester',
    description: 'Made from post-consumer plastic bottles. Durable and perfect for activewear.',
    imageUrl: '/images/products/fabrics/recycled-polyester.jpg',
    sustainabilityScore: 75,
    carbonFootprint: 3.1,
    waterUsage: 50,
    biodegradable: false,
    recycled: true,
    organic: false,
    properties: {
      breathability: 7,
      durability: 9,
      comfort: 8,
      care: 'Machine washable',
    },
    careInstructions: [
      'Machine wash cold',
      'Hang dry',
      'Do not iron',
    ],
    certifications: [
      'GRS Certified',
      'Bluesign Approved',
    ],
  },
  {
    name: 'Hemp Fabric',
    description: 'Naturally antimicrobial and gets softer with each wash. Excellent for sustainable fashion.',
    imageUrl: '/images/products/fabrics/hemp.jpg',
    sustainabilityScore: 95,
    carbonFootprint: 0.5,
    waterUsage: 300,
    biodegradable: true,
    recycled: false,
    organic: true,
    properties: {
      breathability: 9,
      durability: 9,
      comfort: 7,
      care: 'Machine washable',
    },
    careInstructions: [
      'Machine wash cold',
      'Line dry',
      'Iron on medium heat',
    ],
    certifications: [
      'USDA Organic',
      'Fair Trade',
    ],
  },
  {
    name: 'Tencel Lyocell',
    description: 'Made from wood pulp in a closed-loop process. Silky smooth and eco-friendly.',
    imageUrl: '/images/products/fabrics/tencel.jpg',
    sustainabilityScore: 90,
    carbonFootprint: 1.5,
    waterUsage: 200,
    biodegradable: true,
    recycled: false,
    organic: true,
    properties: {
      breathability: 9,
      durability: 7,
      comfort: 10,
      care: 'Gentle wash',
    },
    careInstructions: [
      'Machine wash cold gentle',
      'Line dry',
      'Iron on low heat',
    ],
    certifications: [
      'EU Ecolabel',
      'OEKO-TEX',
    ],
  },
  {
    name: 'Cork Fabric',
    description: 'Sustainable alternative to leather. Water-resistant and durable.',
    imageUrl: '/images/products/fabrics/cork.jpg',
    sustainabilityScore: 88,
    carbonFootprint: 0.8,
    waterUsage: 0,
    biodegradable: true,
    recycled: false,
    organic: true,
    properties: {
      breathability: 6,
      durability: 8,
      comfort: 7,
      care: 'Wipe clean',
    },
    careInstructions: [
      'Wipe with damp cloth',
      'Air dry',
      'Do not wash',
    ],
    certifications: [
      'FSC Certified',
      'Vegan Approved',
    ],
  },
];

async function main() {
  console.log('Start seeding...');
  
  for (const fabric of sustainableFabrics) {
    const result = await prisma.sustainableFabric.create({
      data: fabric,
    });
    console.log(`Created fabric: ${result.name}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });