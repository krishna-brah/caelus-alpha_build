import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  HomeIcon, 
  PhotoIcon, 
  ShoppingBagIcon, 
  UserIcon, 
  LightBulbIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { text: 'Main Hub', href: '/main-hub', icon: HomeIcon },
    { text: 'Gallery', href: '/gallery', icon: PhotoIcon },
    { text: 'Bazaar', href: '/bazaar', icon: ShoppingBagIcon },
    { text: 'Profile', href: '/profile', icon: UserIcon },
    { text: 'Our Initiative', href: '/our-initiative', icon: LightBulbIcon },
  ];

  // Don't show navigation on intro and profile-sort pages
  if (router.pathname === '/intro' || router.pathname === '/profile-sort') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-cosmic-900 text-cream-50 shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="flex sm:hidden">
              <button
                type="button"
                className="text-cream-50 hover:text-cream-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/main-hub" className="flex items-center">
                <img src="/logo.webp" alt="Caelus" className="h-8 w-auto" />
                <span className="ml-2 text-xl font-space-grotesk">CÆLUS</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar - Desktop */}
      <div className="hidden sm:fixed sm:inset-y-0 sm:flex sm:w-64 sm:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-cosmic-900">
          <div className="flex flex-1 flex-col overflow-y-auto pt-20 pb-4">
            <nav className="flex-1 space-y-1 px-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.text}
                    href={item.href}
                    className={`group flex items-center rounded-lg px-2 py-2 text-sm font-medium ${
                      router.pathname === item.href
                        ? 'bg-cosmic-800 text-cream-50'
                        : 'text-cream-200 hover:bg-cosmic-800 hover:text-cream-50'
                    }`}
                  >
                    <Icon className="mr-3 h-6 w-6 flex-shrink-0" />
                    {item.text}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-cosmic-900 bg-opacity-75" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-cosmic-900">
            <div className="flex flex-1 flex-col overflow-y-auto pt-20 pb-4">
              <nav className="flex-1 space-y-1 px-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.text}
                      href={item.href}
                      className={`group flex items-center rounded-lg px-2 py-2 text-sm font-medium ${
                        router.pathname === item.href
                          ? 'bg-cosmic-800 text-cream-50'
                          : 'text-cream-200 hover:bg-cosmic-800 hover:text-cream-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="mr-3 h-6 w-6 flex-shrink-0" />
                      {item.text}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col sm:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export type { LayoutProps };
export default Layout;