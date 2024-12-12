import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  hideFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  hideNav = false,
  hideFooter = false,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNav && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`flex-grow ${!hideNav ? 'pt-16' : ''}`}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {!hideFooter && <Footer />}
    </div>
  );
};