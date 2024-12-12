import React from 'react';
import { motion } from 'framer-motion';

const tiers = [
  {
    name: 'Baseline',
    icon: '⭐',
    description: 'Begin your sustainable fashion journey',
    features: [
      'Access to AI design assistant',
      'Basic material recommendations',
      'Community support',
      'Project showcase'
    ]
  },
  {
    name: 'Gold',
    icon: '🌟',
    description: 'Establish your sustainable brand',
    features: [
      'Advanced AI capabilities',
      'Priority material sourcing',
      'Collaboration opportunities',
      'Featured designer status'
    ]
  },
  {
    name: 'Diamond',
    icon: '💎',
    description: 'Lead in sustainable innovation',
    features: [
      'Custom AI model training',
      'Exclusive supplier network',
      'Mentorship program',
      'Industry recognition'
    ]
  },
  {
    name: 'Cosmic',
    icon: '🌌',
    description: 'Shape the future of fashion',
    features: [
      'Beta feature access',
      'Industry partnerships',
      'Speaking opportunities',
      'Sustainable fashion council'
    ]
  }
];

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0
    }
  }
};

const item = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0
    }
  }
};

export const ProgressionPath = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#1a0b2e] via-[#1a0b2e] to-transparent">
      <div className="relative">
        {/* Background with logo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a1b3e]/50 via-[#1a0b2e] to-transparent" />
        
        {/* Logo watermark */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-luminosity overflow-hidden">
          <div className="absolute inset-0 scale-150">
            <img
              src="/images/logo.webp"
              alt=""
              className="w-full h-full object-cover transform rotate-[75deg]"
              style={{ objectPosition: 'center' }}
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#1a0b2e]/60 to-[#1a0b2e]/90" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0 }}
            >
              <h2 className="text-5xl font-bold text-purple-100 mb-4 font-space-grotesk tracking-tight drop-shadow-md">
                Your Journey to Mastery
              </h2>
              <p className="text-xl text-purple-200 font-sans drop-shadow">
                Progress through tiers as you create sustainable designs and make an impact
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                variants={item}
                className="relative"
              >
                {/* Connection Line */}
                {index < tiers.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/10" />
                )}

                <div className="group relative p-6 bg-gradient-to-br from-purple-900/30 via-[#1a0b2e]/40 to-purple-800/20 backdrop-blur-md rounded-xl border border-purple-500/20 hover:scale-[1.02] transition-all duration-300 shadow-lg">
                  {/* Glow effects */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/10 via-transparent to-purple-300/10" />
                  <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-purple-400/30 via-purple-500/20 to-purple-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/5 to-transparent" />
                  {/* Tier Icon */}
                  <div className="text-4xl mb-4 filter drop-shadow-glow">
                    {tier.icon}
                  </div>

                  {/* Tier Name */}
                  <h3 className="text-2xl font-bold text-purple-100 mb-2 font-space-grotesk tracking-tight drop-shadow-md">
                    {tier.name}
                  </h3>

                  {/* Description */}
                  <p className="text-purple-200 mb-6 drop-shadow">
                    {tier.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start text-sm group"
                      >
                        <svg
                          className="h-5 w-5 text-purple-400 mt-0.5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-purple-100 group-hover:text-white transition-colors duration-200">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Progress Indicator */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="text-sm text-white brightness-125">
                      Required Projects:
                      <span className="ml-1 font-medium text-white brightness-125">
                        {index * 5 + 5}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* Gradient fade-out to bottom */}
          <div className="h-24 bg-gradient-to-b from-[#1a0b2e] to-transparent" />
        </div>
      </div>
    </section>
  );
};