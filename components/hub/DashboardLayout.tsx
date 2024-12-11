import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  PhotoIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  InformationCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Hub', href: '/hub', icon: HomeIcon },
  { name: 'Gallery', href: '/gallery', icon: PhotoIcon },
  { name: 'Bazaar', href: '/bazaar', icon: ShoppingBagIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  { name: 'Initiative', href: '/initiative', icon: InformationCircleIcon },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white dark:bg-neutral-800 shadow-xl">
          <div className="flex flex-1 flex-col overflow-y-auto">
            <div className="flex h-16 flex-shrink-0 items-center px-4">
              <Link href="/hub" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary-500" />
                <span className="text-xl font-display font-bold text-gray-900 dark:text-white">
                  Caelus
                </span>
              </Link>
            </div>
            <nav className="mt-8 flex-1 space-y-2 px-2">
              {navigation.map((item) => {
                const isActive = router.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="fixed inset-0 z-40 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isSidebarOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 bg-gray-600 bg-opacity-75 ${
              isSidebarOpen ? 'block' : 'hidden'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: isSidebarOpen ? 0 : '-100%' }}
            transition={{ duration: 0.2 }}
            className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-neutral-800"
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <Link href="/hub" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary-500" />
                  <span className="text-xl font-display font-bold text-gray-900 dark:text-white">
                    Caelus
                  </span>
                </Link>
              </div>
              <nav className="mt-8 space-y-2 px-2">
                {navigation.map((item) => {
                  const isActive = router.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700'
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${
                          isActive
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
                        }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="sticky top-0 z-10 md:hidden bg-white dark:bg-neutral-800 shadow">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/hub" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary-500" />
            <span className="text-xl font-display font-bold text-gray-900 dark:text-white">
              Caelus
            </span>
          </Link>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64">
        <main>{children}</main>
      </div>
    </div>
  );
};