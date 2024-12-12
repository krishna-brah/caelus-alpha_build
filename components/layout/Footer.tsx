import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  GlobeAltIcon,
  HeartIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Terms', href: '/terms' },
    { name: 'Privacy', href: '/privacy' },
  ],
  social: [
    {
      name: 'Twitter',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

const features = [
  {
    name: 'Sustainable Fashion',
    description: 'Making conscious choices for our planet',
    icon: GlobeAltIcon,
  },
  {
    name: 'Ethical Production',
    description: 'Fair wages and safe working conditions',
    icon: HeartIcon,
  },
  {
    name: 'Quality Assurance',
    description: 'Verified designers and materials',
    icon: ShieldCheckIcon,
  },
];

export const Footer = () => {
  return (
    <footer className="relative bg-[#060208]/80 backdrop-blur-sm">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060208]/90 to-[#060208]/100" />
      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/intro" className="flex items-center group">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.webp"
                  alt="CÆLEUS Logo"
                  width={40}
                  height={40}
                  className="object-contain brightness-150"
                />
              </div>
              <span className="ml-3 text-2xl font-bold font-space-grotesk tracking-tight text-white group-hover:text-cream-100 transition-colors">
                CÆLEUS
              </span>
            </Link>
            <p className="text-white brightness-125 text-lg font-medium font-sans leading-relaxed tracking-wide">
              Weaving sustainability into the fabric of fashion, one thread at a time.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white brightness-125 hover:text-cream-100 transition-colors duration-200"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 gap-8 xl:mt-0 xl:col-span-2">
            <div>
              <h3 className="text-base font-bold font-space-grotesk text-white tracking-widest uppercase mb-6 brightness-125">
                Our Commitments
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="flow-root">
                    <div className="relative">
                      <feature.icon
                        className="h-8 w-8 text-white brightness-125"
                        aria-hidden="true"
                      />
                      <h4 className="mt-2 text-base font-medium font-space-grotesk text-white brightness-125">
                        {feature.name}
                      </h4>
                      <p className="mt-1 text-sm text-white brightness-125 font-medium font-sans leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-12 border-t border-cosmic-700 pt-8">
          <nav className="flex flex-wrap justify-center gap-6">
            {navigation.main.map((item) => (
              <div key={item.name} className="pb-6">
                <Link
                  href={item.href}
                  className="text-sm text-white brightness-125 hover:text-cream-100 transition-colors duration-200 font-sans font-medium"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
          <p className="mt-8 text-center text-sm text-white brightness-125 font-medium font-sans">
            &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};