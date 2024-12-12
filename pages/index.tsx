import { NextPage } from 'next';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '../components/layout/Layout';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const features = [
  {
    icon: '🌱',
    title: 'Sustainable Fashion',
    description: 'Discover eco-friendly fabrics and sustainable fashion practices.',
    link: '/fabric-gallery'
  },
  {
    icon: '👗',
    title: 'Connect with Designers',
    description: 'Work directly with skilled designers who share your values.',
    link: '/marketplace'
  },
  {
    icon: '🌍',
    title: 'Make an Impact',
    description: 'Be part of the solution in creating a more sustainable fashion industry.',
    link: '/our-initiative'
  }
];

// Reusable section divider component
const SectionDivider = () => (
  <motion.div 
    variants={fadeIn}
    className="py-8"
  >
    <div className="w-full h-px bg-gradient-to-r from-transparent via-cosmic-100/10 to-transparent" />
  </motion.div>
);

const IndexPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      localStorage.setItem('userEmail', email);
      router.push('/intro');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout hideNav hideFooter>
      <div className="min-h-screen bg-gradient-to-b from-cosmic-900 to-cosmic-800">
        {/* Background Logo */}
        <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
          <img
            src="/images/logo.webp"
            alt=""
            className="w-full h-full object-cover scale-150 rotate-12"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-16"
          >
            {/* Header */}
            <motion.div variants={fadeIn} className="text-center mb-12">
              <div className="relative inline-block mb-4">
                <h1 className="relative text-4xl font-bold text-white font-space-grotesk">
                  Welcome to <Link href="/intro" className="relative group inline-block">
                    <span className="text-white group-hover:text-cosmic-400 transition-colors duration-200 cursor-pointer">CÆLEUS</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cosmic-400 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </h1>
              </div>
              <p className="text-lg text-cosmic-100">
                Join our sustainable fashion revolution. Connect with designers, discover eco-friendly fabrics, 
                and make a positive impact on the fashion industry.
              </p>
            </motion.div>

              {/* Email Form */}
              <motion.div variants={fadeIn} className="max-w-md mx-auto">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-cosmic-100 mb-2"
                      >
                        Enter your email to get started
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                          text-white placeholder-cosmic-300 focus:outline-none focus:ring-2 focus:ring-cosmic-500"
                        placeholder="your@email.com"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-3 bg-cosmic-500 hover:bg-cosmic-600 text-white rounded-lg 
                        transition-colors duration-200 font-medium disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
                          Processing...
                        </div>
                      ) : (
                        'Continue'
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

            <SectionDivider />

            {/* Features Section */}
            <motion.div variants={fadeIn}>
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={fadeIn}
                    className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 overflow-hidden group"
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
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;