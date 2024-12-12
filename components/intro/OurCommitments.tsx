import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GlobeAltIcon, HeartIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

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

export const OurCommitments = () => {
  return (
    <div className="py-12 bg-cosmic-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 font-space-grotesk tracking-tight">
            Our Commitments
          </h2>
          <p className="text-xl text-white/80 font-sans">
            Building a sustainable future for fashion, together.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-cosmic-800/50 backdrop-blur-sm rounded-lg px-6 pb-8 h-full border border-white/5">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center bg-white/10 p-3 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-white font-space-grotesk tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-white/90 font-sans">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Branding */}
      <div className="mt-20 text-center">
        <Link href="/" className="inline-flex items-center group">
          <div className="relative w-12 h-12">
            <Image
              src="/images/logo.webp"
              alt="CÆLEUS Logo"
              width={48}
              height={48}
              className="object-contain brightness-110"
            />
          </div>
          <span className="ml-3 text-3xl font-bold text-white font-space-grotesk tracking-tight">
            CÆLEUS
          </span>
        </Link>
        <p className="mt-4 text-white/70 text-sm font-sans">
          Weaving sustainability into the fabric of fashion
        </p>
      </div>
    </div>
  );
};