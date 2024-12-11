import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import {
  LeafIcon,
  RecycleIcon,
  HeartIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const SUSTAINABILITY_FEATURES = [
  {
    icon: LeafIcon,
    title: 'Eco-Friendly Materials',
    description: 'All our products use sustainable and organic materials.',
  },
  {
    icon: RecycleIcon,
    title: 'Zero Waste',
    description: 'Committed to minimal packaging and recyclable materials.',
  },
  {
    icon: HeartIcon,
    title: 'Ethical Production',
    description: 'Fair wages and safe working conditions for all workers.',
  },
  {
    icon: SparklesIcon,
    title: 'Quality Guarantee',
    description: 'Built to last, reducing the need for frequent replacements.',
  },
];

export const SustainabilitySection: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/banners/sustainable.jpg"
          alt="Sustainability"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-900/90 dark:bg-primary-900/95" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Our Commitment to Sustainability
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            We believe in fashion that doesn't compromise our planet's future.
            Every piece in our collection is crafted with environmental consciousness.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SUSTAINABILITY_FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-primary-100">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white/10"
          >
            Learn More About Our Impact
          </Button>
        </motion.div>
      </div>
    </section>
  );
};