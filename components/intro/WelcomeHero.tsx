import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/Button';
import EmailInput from './EmailInput';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const WelcomeHero = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Main Background */}
      <div className="absolute inset-0 bg-[#1a0b2e]" />
      
      {/* Background Logo */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none mix-blend-luminosity">
        <div className="relative w-full h-full">
          <img
            src="/images/logo.webp"
            alt=""
            className="absolute w-[200%] h-[200%] object-cover scale-[2] transform -rotate-[15deg]"
            style={{ 
              objectPosition: '50% 0%',
              top: '-50%',
              left: '-50%'
            }}
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-radial from-[#1a0b2e]/30 via-[#1a0b2e]/70 to-[#1a0b2e]/90" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/90 via-[#1a0b2e]/50 to-[#1a0b2e]/95" />

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center"
        >
          {/* Main Title */}
          <motion.h1
            variants={fadeIn}
            className="text-8xl sm:text-9xl md:text-[12rem] font-bold mb-12 font-space-grotesk tracking-tight relative [letter-spacing:-0.05em]"
          >
            <Link href="/welcome" className="cursor-pointer">
              <span className="text-white relative z-10 drop-shadow-lg hover:opacity-80 transition-opacity">
                CÆLEUS
              </span>
            </Link>
            <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-br from-purple-500 via-purple-400 to-purple-600 scale-110" />
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeIn}
            className="text-2xl sm:text-3xl md:text-4xl text-white mb-8 font-space-grotesk tracking-wide drop-shadow-md"
          >
            Where AI Meets Sustainable Fashion. <br /> Join our sustainable fashion revolution.
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeIn}
            className="max-w-2xl mx-auto text-xl text-purple-50 mb-12 font-inter leading-relaxed drop-shadow brightness-150"
          >
            Join our platform that blends AI with sustainable fashion. 
            Design eco-friendly creations, connect with like-minded designers, 
            explore sustainable fabrics, and shape the future of fashion. 
            Make a positive impact today!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeIn}
            className="flex flex-col gap-6 justify-center items-center"
          >
            <Link href="/our-initiative">
              <button className="w-full sm:w-auto px-8 py-3 mb-8 text-md font-semibold border-2 border-white/20 text-white rounded-xl hover:bg-white/5 transition-all duration-200">
                Learn More
              </button>
            </Link>
            <EmailInput />
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            variants={fadeIn}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'AI-Powered Design',
                description: 'Get intelligent suggestions and enhance your designs with our advanced AI assistant.',
                icon: '🤖',
                link: '/main-hub'
              },
              {
                title: 'Sustainable Focus',
                description: 'Access eco-friendly materials and sustainable practices for conscious creation.',
                icon: '🌱',
                link: '/fabric-gallery'
              },
              {
                title: 'Global Community',
                description: 'Connect with designers and creators who share your vision for sustainable fashion.',
                icon: '🌍',
                link: '/marketplace'
              }
            ].map((feature) => (
              <Link key={feature.title} href={feature.link}>
                <div className="p-8 rounded-2xl bg-purple-900/10 backdrop-blur-sm border border-purple-300/10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                  <div className="text-5xl mb-6 animate-float group-hover:scale-110 transition-transform duration-300 filter drop-shadow-glow">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-purple-100 mb-3 font-space-grotesk drop-shadow-md">
                    {feature.title}
                  </h3>
                  <p className="text-purple-200 font-inter drop-shadow">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
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