import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Layout } from '../components/layout/Layout';
import { searchFashionImages, type PexelsImage } from '../utils/pexels';
import Reviews from '../components/Reviews';
import ReviewModal from '../components/ReviewModal';
import { ReviewsProvider } from '../contexts/ReviewsContext';
import { motion } from 'framer-motion';
import FabricFilters from '../components/FabricFilters';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

interface Product {
  id: number;
  name: string;
  price: number;
  image: PexelsImage;
  category: string;
  subCategory: string;
  fabricType: string;
}

const generatePrice = () => {
  return Math.floor(Math.random() * (200 - 20 + 1) + 20);
};

const fabricCategories = {
  Cotton: [
    'Natural White Cotton',
    'Black Cotton',
    'Navy Cotton',
    'Grey Cotton',
    'Ecru Cotton',
    'Organic Cotton',
  ],
  Linen: [
    'Natural Linen',
    'White Linen',
    'Charcoal Linen',
    'Oatmeal Linen',
    'Sand Linen',
  ],
  Silk: [
    'Natural White Silk',
    'Black Silk',
    'Ivory Silk',
    'Pearl Silk',
    'Champagne Silk',
  ],
  Wool: [
    'Natural Wool',
    'Charcoal Wool',
    'Navy Wool',
    'Grey Wool',
    'Camel Wool',
  ],
  Denim: [
    'Indigo Denim',
    'Light Wash Denim',
    'Dark Wash Denim',
    'Black Denim',
    'Raw Denim',
  ],
  Velvet: [
    'Black Velvet',
    'Royal Blue Velvet',
    'Emerald Velvet',
    'Burgundy Velvet',
    'Navy Velvet',
  ],
  'Recycled Polyester': [
    'Black Recycled Poly',
    'Navy Recycled Poly',
    'Grey Recycled Poly',
    'White Recycled Poly',
    'Charcoal Recycled Poly',
  ],
  'Organic Hemp': [
    'Natural Hemp',
    'White Hemp',
    'Grey Hemp',
    'Brown Hemp',
    'Black Hemp',
  ],
  'Bamboo': [
    'Natural Bamboo',
    'White Bamboo',
    'Ivory Bamboo',
    'Grey Bamboo',
    'Black Bamboo',
  ],
};

export default function Marketplace() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    fabricCategory: '',
    fabricVariant: '',
    pattern: '',
  });

  const [availableVariants, setAvailableVariants] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Get images for each fabric category
        const allProducts = await Promise.all(
          Object.keys(fabricCategories).map(async (category) => {
            const images = await searchFashionImages(`${category.toLowerCase()} fabric texture close up`, 3);
            const variants = fabricCategories[category as keyof typeof fabricCategories];
            
            // Create products for each image in this category
            return images.map((image: PexelsImage) => {
              const variant = variants[Math.floor(Math.random() * variants.length)];
              return {
                id: image.id,
                name: variant,
                price: generatePrice(),
                image,
                category: category,
                subCategory: variant,
                fabricType: category
              };
            });
          })
        );

        // Flatten the array of arrays into a single array of products
        const flattenedProducts = allProducts.flat();
        setProducts(flattenedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    if (field === 'fabricCategory') {
      setAvailableVariants(value ? fabricCategories[value as keyof typeof fabricCategories] : []);
      setFilters(prev => ({
        ...prev,
        [field]: value,
        fabricVariant: '', // Reset variant when category changes
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-cosmic-900 to-cosmic-800">
        {/* Background Logo */}
        <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
          <img
            src="/images/logo.webp"
            alt=""
            className="w-full h-full object-cover scale-150 rotate-12"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Header */}
            <motion.div variants={fadeIn} className="space-y-8">
              <div className="text-center relative z-30">
                <h1 className="text-4xl font-bold text-white mb-4 font-space-grotesk">
                  Fabric Marketplace
                </h1>
                <p className="text-lg text-cosmic-100">
                  Discover sustainable and high-quality fabrics for your designs
                </p>
              </div>

              {/* Filters */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl relative z-40">
                <FabricFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  fabricCategories={fabricCategories}
                  availableVariants={availableVariants}
                />
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div variants={fadeIn}>
              {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <div className="text-cosmic-100">Loading products...</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.filter(product => {
                    const searchTerms = filters.search.toLowerCase().split(' ').filter(term => term.length > 0);
                    const searchMatch = !filters.search || searchTerms.every(term => {
                      const productText = `${product.name} ${product.category} ${product.subCategory} ${product.fabricType}`.toLowerCase();
                      return productText.includes(term);
                    });
                    
                    const categoryMatch = !filters.fabricCategory || 
                      product.category === filters.fabricCategory;
                    
                    const variantMatch = !filters.fabricVariant || 
                      product.subCategory === filters.fabricVariant;
                    
                    const patternMatch = !filters.pattern || 
                      product.subCategory.toLowerCase().includes(filters.pattern.toLowerCase());
                    
                    return searchMatch && categoryMatch && variantMatch && patternMatch;
                  }).map((product) => (
                    <div
                      key={product.id}
                      className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-cosmic-500/50 hover:shadow-lg hover:shadow-cosmic-500/10 transition-all duration-300"
                    >
                      {/* Product Image */}
                      <div className="aspect-square relative overflow-hidden group rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0" />
                        <img
                          src={product.image.src.large}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900/80 via-cosmic-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <div className="text-sm font-medium">Click to view details</div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-cosmic-900/80 via-cosmic-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold text-white">{product.name}</h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-cosmic-500/20 text-cosmic-500 border border-cosmic-500/20">
                                  {product.category}
                                </span>
                                {product.subCategory !== product.name && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-cosmic-400/20 text-cosmic-400 border border-cosmic-400/20">
                                    {product.subCategory}
                                  </span>
                                )}
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-white/10 text-white/90 border border-white/20">
                                  ${product.price} per meter
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-4">
                            {/* Pattern Details */}
                            <p className="text-sm text-white/90">
                              Premium {product.name.toLowerCase()}, crafted with sustainable materials and perfect for high-quality fashion projects.
                            </p>

                            {/* Credits */}
                            <div className="text-xs text-white/70">
                              Photo by{' '}
                              <a
                                href={product.image.photographer_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors duration-200"
                              >
                                {product.image.photographer}
                              </a>
                            </div>

                            {/* Reviews Section */}
                            <div className="space-y-4">
                              <Reviews productId={product.id} />
                              
                              {session ? (
                                <button
                                  onClick={() => {
                                    setSelectedProduct(product.id);
                                    setShowReviewModal(true);
                                  }}
                                  className="w-full px-4 py-2 text-sm font-medium text-white bg-cosmic-500/20 border border-cosmic-500/30 rounded-lg hover:bg-cosmic-500/30 transition-all duration-200"
                                >
                                  Write a Review
                                </button>
                              ) : (
                                <Link href="/auth?callbackUrl=/marketplace">
                                  <button className="w-full px-4 py-2 text-sm font-medium text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200">
                                    Sign in to Review
                                  </button>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Review Modal */}
      {selectedProduct !== null && (
        <ReviewModal
          productId={selectedProduct}
          isOpen={showReviewModal}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </Layout>
  );
}