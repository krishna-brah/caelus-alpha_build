import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

export const Header: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Designers', href: '/designers' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <span className="relative flex h-10 w-10">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-20"></span>
                <span className="relative inline-flex rounded-full h-10 w-10 bg-primary-500"></span>
              </span>
              <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
                Caelus
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                  router.pathname === item.href
                    ? 'text-primary-500'
                    : 'text-neutral-600 dark:text-neutral-300'
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <HeartIcon className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingBagIcon className="w-5 h-5" />
            </Button>
            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700" />
            <Button variant="default">Sign In</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingBagIcon className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="px-4 pt-2 pb-3 space-y-1 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
              {navigationItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    router.pathname === item.href
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/10'
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  }`}>
                    {item.name}
                  </span>
                </Link>
              ))}
              <div className="pt-4">
                <Button className="w-full" variant="default">
                  Sign In
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};