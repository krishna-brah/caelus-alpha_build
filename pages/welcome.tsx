import { NextPage } from 'next';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const WelcomePage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Store email in session/local storage or state management
      localStorage.setItem('userEmail', email);
      router.push('/profile-sort');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-900 to-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          {/* Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="relative flex justify-center mb-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-primary-500 rounded-full animate-pulse-slow" />
                <Image
                  src="/images/logo.png"
                  alt="Caelus Logo"
                  fill
                  className="relative z-10"
                />
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-white mb-4">
              Welcome to Caelus
              <span className="text-primary-400">.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Join our sustainable fashion revolution. Connect with designers, discover eco-friendly fabrics, and make a positive impact on the fashion industry.
            </p>
          </motion.div>

          {/* Email Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <Card variant="glass" className="backdrop-blur-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Enter your email to get started
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white/10 backdrop-blur-lg text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="default"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
                      Processing...
                    </div>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <FeatureCard
              title="Sustainable Fashion"
              description="Discover eco-friendly fabrics and sustainable fashion practices."
              icon="🌱"
            />
            <FeatureCard
              title="Connect with Designers"
              description="Work directly with skilled designers who share your values."
              icon="👗"
            />
            <FeatureCard
              title="Make an Impact"
              description="Be part of the solution in creating a more sustainable fashion industry."
              icon="🌍"
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <Card variant="glass" className="backdrop-blur-lg">
    <div className="p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-display font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </Card>
);

export default WelcomePage;