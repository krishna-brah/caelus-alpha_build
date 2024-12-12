import type { NextPage } from 'next';
import { WelcomeHero } from '../components/intro/WelcomeHero';
import { Layout } from '../components/layout/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Design',
    description: 'Get intelligent suggestions and enhance your designs with our advanced AI assistant.',
    link: '/main-hub'
  },
  {
    icon: '🌱',
    title: 'Sustainable Focus',
    description: 'Access eco-friendly materials and sustainable practices for conscious creation.',
    link: '/fabric-gallery'
  },
  {
    icon: '🌍',
    title: 'Global Community',
    description: 'Connect with designers and creators who share your vision for sustainable fashion.',
    link: '/marketplace'
  }
];

const Home: NextPage = () => {
  return (
    <Layout hideNav>
      <div className="min-h-screen bg-cosmic-900">
        {/* Hero Section */}
        <WelcomeHero />

        {/* Features Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        >
          <motion.div
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6 font-space-grotesk">
              Explore Our Platform
            </h2>
            <p className="text-xl text-cosmic-100 max-w-3xl mx-auto">
              Discover how we're revolutionizing sustainable fashion through AI-powered design
              and community collaboration.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.link}>
                <motion.div
                  variants={fadeIn}
                  className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 overflow-hidden group cursor-pointer"
                  whileHover={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 font-space-grotesk">
                      {feature.title}
                    </h3>
                    <p className="text-cosmic-100 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Home;