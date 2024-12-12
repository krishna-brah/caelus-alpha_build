import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/Button';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cream-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/patterns/wave.svg')] bg-repeat-x opacity-5 animate-float" />
        <div className="absolute inset-0 bg-[url('/patterns/stars.svg')] bg-repeat opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-900/5 to-cosmic-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            variants={fadeIn}
            className="mx-auto w-48 h-48 sm:w-56 sm:h-56 relative mb-8"
          >
            <Image
              src="/images/logo.webp"
              alt="Caelus Logo"
              width={240}
              height={240}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeIn}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-space-grotesk text-cosmic-900 mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-cosmic">
              CÆLUS
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeIn}
            className="text-xl sm:text-2xl md:text-3xl text-cosmic-600 mb-8 font-space-grotesk"
          >
            Woven into the Fabric of the Universe
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeIn}
            className="max-w-2xl mx-auto text-lg text-cosmic-700 mb-12"
          >
            Join our revolutionary platform where sustainable fashion meets cosmic inspiration. 
            Connect with talented designers, discover eco-friendly materials, and be part of 
            the future of conscious creation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/designer/signup">
              <Button 
                size="lg"
                className="w-full sm:w-auto"
              >
                Join as Designer
              </Button>
            </Link>
            <Link href="/explore">
              <Button 
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore Designs
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeIn}
            className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4"
          >
            {[
              { label: 'Sustainable Fabrics', value: '100+' },
              { label: 'Designers', value: '500+' },
              { label: 'Eco Projects', value: '1000+' },
              { label: 'Planet Impact', value: '💚' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <dt className="text-2xl font-bold text-cosmic-500">
                  {stat.value}
                </dt>
                <dd className="text-sm text-cosmic-600">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full text-cosmic-900/5"
          viewBox="0 0 1440 100"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </div>
  );
};