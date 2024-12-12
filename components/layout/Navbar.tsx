import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '../ui/Button';
import { useSession, signOut } from 'next-auth/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Main Hub', href: '/main-hub' },
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Fabric Gallery', href: '/fabric-gallery' },
  { name: 'Our Initiative', href: '/our-initiative' },
  { name: 'Profile', href: '/profile' },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cosmic-900/80 border-b border-white/10" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/intro" className="flex items-center group">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.webp"
                  alt="Caelus Logo"
                  width={40}
                  height={40}
                  className="object-contain group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <span className="ml-3 text-2xl font-bold text-white font-space-grotesk tracking-tight">
                CÆLEUS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    router.pathname === item.href
                      ? 'text-white bg-white/10'
                      : 'text-cosmic-100 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {session ? (
                <>
                  <Link href="/dashboard">
                    <button className="px-4 py-2 text-sm font-medium text-cosmic-100 hover:text-white transition-colors duration-200">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 text-sm font-medium text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/signin">
                    <button className="px-4 py-2 text-sm font-medium text-cosmic-100 hover:text-white transition-colors duration-200">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/signup">
                    <button className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-cosmic-500 to-cosmic-600 hover:from-cosmic-600 hover:to-cosmic-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-cosmic-500/25">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-cosmic-100 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div 
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-cosmic-900/80"
          style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Menu panel */}
        <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-cosmic-900 border-l border-white/10 shadow-2xl px-6 py-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/intro" className="flex items-center group">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.webp"
                  alt="Caelus Logo"
                  width={40}
                  height={40}
                  className="object-contain group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <span className="ml-3 text-2xl font-bold text-white font-space-grotesk tracking-tight">
                CÆLEUS
              </span>
            </Link>
            <button
              className="p-2 text-cosmic-100 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                  router.pathname === item.href
                    ? 'text-white bg-white/10'
                    : 'text-cosmic-100 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-6 space-y-4">
              {session ? (
                <>
                  <Link 
                    href="/dashboard"
                    className="block w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="w-full px-4 py-3 text-base font-medium text-cosmic-100 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    className="w-full px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-cosmic-500 to-cosmic-600 hover:from-cosmic-600 hover:to-cosmic-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cosmic-500/25"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/signin"
                    className="block w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="w-full px-4 py-3 text-base font-medium text-cosmic-100 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
                      Sign In
                    </button>
                  </Link>
                  <Link 
                    href="/signup"
                    className="block w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="w-full px-4 py-3 text-base font-medium bg-gradient-to-r from-cosmic-500 to-cosmic-600 hover:from-cosmic-600 hover:to-cosmic-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-cosmic-500/25">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};