import React from 'react';
import { Layout } from '../components/layout/Layout';
import AIStyleQuestionnaire from '../components/AIStyleQuestionnaire';
import ImageGenerator from '../components/ImageGenerator';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function MainHub() {
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Header */}
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4 font-space-grotesk">
                Welcome to Your Fashion Hub
              </h1>
              <p className="text-lg text-cosmic-100">
                Explore AI-powered design tools, connect with designers, and discover sustainable fashion.
              </p>
            </motion.div>

            {/* AI Tools Section */}
            <motion.div variants={fadeIn}>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6 font-space-grotesk">
                  AI Fashion Tools
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-3">Style Analysis</h3>
                    <p className="text-cosmic-100 mb-4">
                      Get personalized style recommendations powered by AI
                    </p>
                    <div className="mt-4">
                      <AIStyleQuestionnaire />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-3">Design Generator</h3>
                    <p className="text-cosmic-100 mb-4">
                      Create unique fashion designs with AI assistance
                    </p>
                    <div className="mt-4">
                      <ImageGenerator />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Featured Designers */}
              <motion.div variants={fadeIn} className="md:col-span-2">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 font-space-grotesk">
                    Featured Designers
                  </h2>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((designer) => (
                      <div
                        key={designer}
                        className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="aspect-square rounded-lg bg-cosmic-800/50 mb-4" />
                        <h3 className="text-lg font-bold text-white mb-2">Designer {designer}</h3>
                        <p className="text-cosmic-100">Sustainable fashion specialist</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Trending Styles */}
              <motion.div variants={fadeIn}>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6 font-space-grotesk">
                    Trending Styles
                  </h2>
                  <div className="space-y-4">
                    {['Sustainable Chic', 'Urban Minimalist', 'Eco Bohemian'].map((style) => (
                      <div
                        key={style}
                        className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <h3 className="text-lg font-bold text-white mb-2">{style}</h3>
                        <p className="text-cosmic-100">Trending in sustainable fashion</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}