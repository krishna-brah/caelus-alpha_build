import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../ui/ProductCard';
import { Grid } from '../ui/Grid';

const FEATURED_PRODUCTS = [
  {
    id: '1',
    title: 'Sustainable Summer Dress',
    designer: 'EcoChic',
    price: 129.99,
    imageSrc: '/images/products/clothing/dress1.jpg',
    rating: 4.8,
    sustainable: true,
    likes: 234,
  },
  {
    id: '2',
    title: 'Organic Cotton Maxi',
    designer: 'GreenStyle',
    price: 159.99,
    imageSrc: '/images/products/clothing/dress2.jpg',
    rating: 4.9,
    sustainable: true,
    likes: 187,
  },
  {
    id: '3',
    title: 'Hemp Blend Jacket',
    designer: 'Conscious Couture',
    price: 199.99,
    imageSrc: '/images/products/clothing/sustainable1.jpg',
    rating: 4.7,
    sustainable: true,
    likes: 156,
  },
  {
    id: '4',
    title: 'Recycled Denim Collection',
    designer: 'EarthWear',
    price: 149.99,
    imageSrc: '/images/products/clothing/sustainable2.jpg',
    rating: 4.6,
    sustainable: true,
    likes: 198,
  },
];

export const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover our hand-picked selection of sustainable fashion pieces that combine style with environmental consciousness.
          </p>
        </motion.div>

        <Grid
          columns={{ default: 1, sm: 2, lg: 4 }}
          gap="6"
          className="items-start"
        >
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onLike={() => console.log('liked', product.id)}
              onAddToCart={() => console.log('added to cart', product.id)}
            />
          ))}
        </Grid>
      </div>
    </section>
  );
};