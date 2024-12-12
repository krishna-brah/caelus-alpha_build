import React from 'react';
import { Layout } from '../components/layout/Layout';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

interface SustainabilityMetric {
  title: string;
  value: string;
  description: string;
  icon: string;
}

interface ImpactArea {
  title: string;
  description: string;
  stats: { label: string; value: string }[];
}

export default function OurInitiative() {

  const sustainabilityMetrics: SustainabilityMetric[] = [
    {
      title: 'Water Saved',
      value: '2,700L',
      description: 'Average water saved per garment compared to fast fashion',
      icon: '💧',
    },
    {
      title: 'Carbon Reduction',
      value: '60%',
      description: 'Lower carbon footprint through local production',
      icon: '🌱',
    },
    {
      title: 'Waste Reduction',
      value: '90%',
      description: 'Less fabric waste through made-to-order production',
      icon: '♻️',
    },
    {
      title: 'Community Impact',
      value: '1,000+',
      description: 'Local designers supported worldwide',
      icon: '🌍',
    },
  ];

  const impactAreas: ImpactArea[] = [
    {
      title: 'Environmental Impact',
      description: 'Fast fashion is responsible for 10% of global carbon emissions and is the second-largest consumer of water worldwide.',
      stats: [
        { label: 'Annual Textile Waste', value: '92 million tons' },
        { label: 'Water Pollution', value: '20% of global wastewater' },
        { label: 'Microplastic Pollution', value: '35% of ocean microplastics' },
      ],
    },
    {
      title: 'Social Impact',
      description: 'The fashion industry employs over 75 million people worldwide, many of whom work in unsafe conditions with unfair wages.',
      stats: [
        { label: 'Workers Impacted', value: '75 million+' },
        { label: 'Fair Wage Gap', value: '45-65% below living wage' },
        { label: 'Child Labor', value: '1 in 10 workers' },
      ],
    },
  ];

  const initiatives = [
    {
      title: 'AI-Powered Design',
      description: 'Leveraging artificial intelligence to create innovative, sustainable fashion designs.',
      icon: '🧠',
    },
    {
      title: 'Community Collaboration',
      description: 'Building a network of designers and consumers committed to sustainable fashion.',
      icon: '👥',
    },
    {
      title: 'Sustainable Materials',
      description: 'Promoting the use of eco-friendly and recycled materials in fashion.',
      icon: '🌱',
    },
    {
      title: 'Circular Fashion',
      description: 'Supporting a circular economy in fashion through reuse and recycling.',
      icon: '♻️',
    },
    {
      title: 'Ethical Production',
      description: 'Ensuring fair labor practices and sustainable production methods.',
      icon: '🏭',
    },
    {
      title: 'Impact Tracking',
      description: 'Measuring and reporting the environmental impact of fashion choices.',
      icon: '📊',
    },
  ];

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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-16"
          >
            {/* Hero Section */}
            <motion.div variants={fadeIn} className="text-center space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-space-grotesk">
                Our Initiative
              </h1>
              <p className="text-xl md:text-2xl text-cosmic-100 max-w-3xl mx-auto">
                Revolutionizing the fashion industry through sustainable innovation
                and AI-powered design.
              </p>
            </motion.div>

            {/* Mission Statement */}
            <motion.div variants={fadeIn}>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-6 font-space-grotesk">
                  Our Mission
                </h2>
                <p className="text-lg text-cosmic-100 leading-relaxed">
                  At Caelus, we're committed to transforming the fashion industry
                  through sustainable practices, innovative technology, and
                  community collaboration. Our platform brings together designers,
                  consumers, and AI to create a more sustainable and ethical
                  fashion ecosystem.
                </p>
              </div>
            </motion.div>

            {/* Sustainability Metrics */}
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold text-white mb-8 font-space-grotesk">
                Our Impact in Numbers
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sustainabilityMetrics.map((metric) => (
                  <div
                    key={metric.title}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center group hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {metric.icon}
                    </div>
                    <div className="text-3xl font-bold text-white mb-2 font-space-grotesk">
                      {metric.value}
                    </div>
                    <div className="text-lg text-cosmic-100 mb-2">
                      {metric.title}
                    </div>
                    <div className="text-sm text-cosmic-200">
                      {metric.description}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Initiatives Grid */}
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold text-white mb-8 font-space-grotesk">
                Key Initiatives
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initiatives.map((initiative) => (
                  <div
                    key={initiative.title}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center mb-4">
                      <div className="text-cosmic-400 mr-3">
                        {initiative.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white font-space-grotesk">
                        {initiative.title}
                      </h3>
                    </div>
                    <p className="text-cosmic-100">
                      {initiative.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Impact Areas */}
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold text-white mb-8 font-space-grotesk">
                Industry Impact
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {impactAreas.map((area) => (
                  <div
                    key={area.title}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  >
                    <h3 className="text-2xl font-bold text-white mb-4 font-space-grotesk">
                      {area.title}
                    </h3>
                    <p className="text-cosmic-100 mb-6">
                      {area.description}
                    </p>
                    <div className="space-y-4">
                      {area.stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="text-sm text-cosmic-200 mb-1">
                            {stat.label}
                          </div>
                          <div className="text-xl font-bold text-cosmic-400">
                            {stat.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div variants={fadeIn} className="text-center py-8 space-y-6">
              <h2 className="text-4xl font-bold text-white mb-4 font-space-grotesk">
                Join Our Initiative
              </h2>
              <p className="text-xl text-cosmic-100 max-w-2xl mx-auto">
                Be part of the sustainable fashion revolution
              </p>
              <button className="bg-gradient-to-r from-cosmic-500 to-cosmic-600 hover:from-cosmic-600 hover:to-cosmic-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors duration-200 shadow-xl hover:shadow-cosmic-500/25">
                Get Started
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}