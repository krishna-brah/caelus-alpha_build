import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { SearchBar } from '../ui/SearchBar';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/banners/hero.jpg"
          alt="Fashion Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Discover Sustainable Fashion
              <span className="text-primary-400">.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Connect with independent designers and shop unique, eco-friendly fashion pieces.
            </p>

            <div className="space-y-6">
              <SearchBar
                onSearch={(query) => console.log(query)}
                placeholder="Search sustainable fashion..."
                className="max-w-md"
              />

              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="default">
                  Explore Collection
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Meet Our Designers
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-10 left-4 right-4 sm:right-6 lg:right-8"
          >
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-display font-bold text-white">500+</p>
                <p className="text-sm text-gray-300">Designers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-display font-bold text-white">10k+</p>
                <p className="text-sm text-gray-300">Products</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-display font-bold text-white">95%</p>
                <p className="text-sm text-gray-300">Sustainable</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};