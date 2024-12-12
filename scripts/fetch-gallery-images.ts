const { createClient } = require('pexels');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const client = createClient('SGSwVbUEUb6bu4cUfAO6N3HGHfeLyDdIAF1bwnLBaA4vUbLRDsnMAQKD');

const categories = [
  {
    name: 'sustainable-fashion',
    query: 'sustainable fashion design model',
    count: 6,
    description: 'Sustainable and eco-friendly fashion designs'
  },
  {
    name: 'artisanal-fashion',
    query: 'artisanal fashion handmade',
    count: 6,
    description: 'Handcrafted and artisanal fashion pieces'
  },
  {
    name: 'eco-designs',
    query: 'eco friendly fashion sustainable',
    count: 6,
    description: 'Environmentally conscious fashion designs'
  },
  {
    name: 'upcycled-fashion',
    query: 'upcycled fashion design creative',
    count: 6,
    description: 'Creative upcycled fashion pieces'
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

async function main() {
  const baseDir = path.join(process.cwd(), 'public', 'images');
  const galleryDir = path.join(baseDir, 'gallery');

  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
  }

  const galleryData = [];

  for (const category of categories) {
    console.log(`Fetching images for ${category.name}...`);
    try {
      const response = await client.photos.search({
        query: category.query,
        per_page: category.count,
        size: 'large',
        orientation: 'portrait'
      });

      if ('photos' in response) {
        for (let i = 0; i < response.photos.length; i++) {
          const photo = response.photos[i];
          const filename = `${category.name}-${i + 1}.jpg`;
          const filepath = path.join(galleryDir, filename);
          
          await downloadImage(photo.src.large, filepath);
          
          galleryData.push({
            id: `${category.name}-${i + 1}`,
            category: category.name,
            image: `/images/gallery/${filename}`,
            title: `${category.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} ${i + 1}`,
            description: category.description,
            photographer: photo.photographer,
            photographer_url: photo.photographer_url
          });

          console.log(`Downloaded ${filename}`);
        }
      }
    } catch (error) {
      console.error(`Error fetching images for ${category.name}:`, error);
    }
  }

  fs.writeFileSync(
    path.join(baseDir, 'gallery-data.json'),
    JSON.stringify(galleryData, null, 2)
  );

  console.log('Gallery images fetching completed!');
}

main().catch(console.error);