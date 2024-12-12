const { createClient } = require('pexels');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const client = createClient('SGSwVbUEUb6bu4cUfAO6N3HGHfeLyDdIAF1bwnLBaA4vUbLRDsnMAQKD');

const categories = [
  {
    name: 'sustainable-dresses',
    query: 'sustainable fashion dress elegant',
    count: 3
  },
  {
    name: 'eco-friendly-tops',
    query: 'organic cotton shirt fashion model',
    count: 3
  },
  {
    name: 'sustainable-outerwear',
    query: 'sustainable coat jacket fashion',
    count: 3
  },
  {
    name: 'ethical-accessories',
    query: 'handmade fashion accessories ethical',
    count: 3
  },
  {
    name: 'upcycled-fashion',
    query: 'upcycled clothing fashion design',
    count: 3
  },
  {
    name: 'sustainable-fabrics',
    query: 'sustainable textile fabric natural',
    count: 3
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
  // Ensure the directories exist
  const baseDir = path.join(process.cwd(), 'public', 'images');
  const categoriesDir = path.join(baseDir, 'categories');
  const listingsDir = path.join(baseDir, 'listings');

  [baseDir, categoriesDir, listingsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Create a catalog file to store image metadata
  const imageCatalog: Record<string, any> = {};

  for (const category of categories) {
    console.log(`Fetching images for ${category.name}...`);
    try {
      const response = await client.photos.search({
        query: category.query,
        per_page: category.count,
        size: 'large',
        orientation: 'landscape'
      });

      if ('photos' in response) {
        imageCatalog[category.name] = [];
        
        for (let i = 0; i < response.photos.length; i++) {
          const photo = response.photos[i];
          const filename = `${category.name}-${i + 1}.jpg`;
          const filepath = path.join(listingsDir, filename);
          
          // Download the image
          await downloadImage(photo.src.large, filepath);
          
          // Store metadata
          imageCatalog[category.name].push({
            filename,
            originalUrl: photo.src.large,
            alt: photo.alt || category.query,
            photographer: photo.photographer,
            photographer_url: photo.photographer_url,
            width: photo.width,
            height: photo.height
          });

          console.log(`Downloaded ${filename}`);
        }
      }
    } catch (error) {
      console.error(`Error fetching images for ${category.name}:`, error);
    }
  }

  // Save the image catalog
  fs.writeFileSync(
    path.join(baseDir, 'image-catalog.json'),
    JSON.stringify(imageCatalog, null, 2)
  );

  console.log('Image fetching completed!');
}

main().catch(console.error);