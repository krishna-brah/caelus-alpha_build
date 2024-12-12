const { createClient } = require('pexels');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const client = createClient('SGSwVbUEUb6bu4cUfAO6N3HGHfeLyDdIAF1bwnLBaA4vUbLRDsnMAQKD');

const fabricTypes = [
  {
    name: 'linen',
    query: 'linen fabric texture natural',
    count: 5,
    description: [
      'Premium organic linen from European flax',
      'Sustainable Belgian linen fabric',
      'Natural flax linen textile',
      'Eco-friendly raw linen material',
      'Artisanal woven linen fabric'
    ]
  },
  {
    name: 'cotton',
    query: 'organic cotton fabric textile',
    count: 5,
    description: [
      'GOTS certified organic cotton',
      'Sustainable Indian cotton fabric',
      'Fair-trade organic cotton textile',
      'Natural cotton weave material',
      'Premium organic cotton fabric'
    ]
  },
  {
    name: 'wool',
    query: 'natural wool fabric textile',
    count: 5,
    description: [
      'Merino wool from ethical farms',
      'Sustainable New Zealand wool fabric',
      'Organic wool textile material',
      'Natural sheep wool fabric',
      'Premium eco-wool textile'
    ]
  },
  {
    name: 'denim',
    query: 'sustainable denim fabric textile',
    count: 5,
    description: [
      'Organic cotton denim fabric',
      'Sustainable indigo denim material',
      'Eco-friendly recycled denim',
      'Water-saving denim textile',
      'Natural indigo denim fabric'
    ]
  },
  {
    name: 'silk',
    query: 'natural silk fabric sustainable',
    count: 5,
    description: [
      'Peace silk from ethical sources',
      'Organic mulberry silk fabric',
      'Sustainable wild silk textile',
      'Natural ahimsa silk material',
      'Eco-conscious silk fabric'
    ]
  }
];

const downloadImage = async (url: string, filepath: string): Promise<void> => {
  const response = await axios({
    url,
    responseType: 'stream',
  });

  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on('finish', () => resolve())
      .on('error', (e: any) => reject(e));
  });
};

interface FabricData {
  id: number;
  name: string;
  type: string;
  image: string;
  description: string;
  sustainability: string;
  origin: string;
  bestFor: string[];
}

type FabricType = 'linen' | 'cotton' | 'wool' | 'denim' | 'silk';

const sustainabilityInfo: Record<FabricType, string> = {
  linen: 'Uses 88% less water than conventional cotton',
  cotton: 'GOTS certified, reducing water usage by 71%',
  wool: 'Biodegradable and from certified ethical farms',
  denim: 'Made with recycled materials and natural dyes',
  silk: 'Cruelty-free production with minimal environmental impact'
};

const origins: Record<FabricType, string[]> = {
  linen: ['Belgium', 'France', 'Netherlands'],
  cotton: ['India', 'Turkey', 'Egypt'],
  wool: ['New Zealand', 'Australia', 'Scotland'],
  denim: ['Japan', 'Italy', 'USA'],
  silk: ['India', 'China', 'Thailand']
};

const useCases: Record<FabricType, string[]> = {
  linen: ['Summer wear', 'Dresses', 'Shirts', 'Home textiles'],
  cotton: ['Everyday wear', 'Childrenswear', 'Bedding', 'Undergarments'],
  wool: ['Winter wear', 'Suits', 'Coats', 'Knitwear'],
  denim: ['Jeans', 'Jackets', 'Accessories', 'Workwear'],
  silk: ['Evening wear', 'Luxury garments', 'Scarves', 'Special occasions']
};

async function main() {
  // Ensure the directories exist
  const baseDir = path.join(process.cwd(), 'public', 'images');
  const fabricsDir = path.join(baseDir, 'fabrics');

  [baseDir, fabricsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const fabricsData: FabricData[] = [];
  let globalId = 1;

  for (const fabricType of fabricTypes) {
    console.log(`Fetching images for ${fabricType.name}...`);
    try {
      const response = await client.photos.search({
        query: fabricType.query,
        per_page: fabricType.count,
        size: 'large',
        orientation: 'landscape'
      });

      if ('photos' in response) {
        for (let i = 0; i < response.photos.length; i++) {
          const photo = response.photos[i];
          const filename = `${fabricType.name}${i + 1}.jpg`;
          const filepath = path.join(fabricsDir, filename);
          
          // Download the image
          await downloadImage(photo.src.large, filepath);
          
          // Create fabric data entry
          const fabricName = fabricType.name as FabricType;
          fabricsData.push({
            id: globalId++,
            name: `${fabricType.description[i]}`,
            type: fabricType.name.charAt(0).toUpperCase() + fabricType.name.slice(1),
            image: `/images/fabrics/${filename}`,
            description: fabricType.description[i],
            sustainability: sustainabilityInfo[fabricName],
            origin: origins[fabricName][Math.floor(Math.random() * origins[fabricName].length)],
            bestFor: useCases[fabricName].sort(() => 0.5 - Math.random()).slice(0, 3)
          });

          console.log(`Downloaded ${filename}`);
        }
      }
    } catch (error) {
      console.error(`Error fetching images for ${fabricType.name}:`, error);
    }
  }

  // Save the fabrics data
  fs.writeFileSync(
    path.join(baseDir, 'fabrics-data.json'),
    JSON.stringify(fabricsData, null, 2)
  );

  console.log('Image fetching completed!');
}

main().catch(console.error);