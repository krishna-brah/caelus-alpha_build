import React from 'react';
import { useRouter } from 'next/router';

export default function UserType() {
  const router = useRouter();

  const handleUserTypeSelection = (type: 'consumer' | 'designer') => {
    if (type === 'designer') {
      router.push('/designer/tag-selection');
    } else {
      router.push('/marketplace');
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-cosmic-900 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-cosmic-900 dark:text-cosmic-50 mb-4">
              Welcome to Caelus
            </h1>
            <p className="text-lg text-cosmic-600 dark:text-cosmic-300">
              Please select how you'll be using our platform
            </p>
          </div>

          <div className="space-y-4">
            <div
              className="p-6 border border-cosmic-200 dark:border-cosmic-700 rounded-lg bg-cream-50 dark:bg-cosmic-800 w-full cursor-pointer transition-shadow duration-300 hover:shadow-lg"
              onClick={() => handleUserTypeSelection('designer')}
            >
              <div className="space-y-4 text-center">
                <h2 className="text-2xl font-semibold text-cosmic-900 dark:text-cosmic-50">
                  I'm a Designer
                </h2>
                <p className="text-cosmic-600 dark:text-cosmic-300">
                  Create and sell your designs, collaborate with other designers,
                  and build your reputation through our tagging system.
                </p>
                <button className="px-6 py-2 bg-cosmic-600 text-white rounded-lg font-medium hover:bg-cosmic-700 transition-colors duration-200">
                  Continue as Designer
                </button>
              </div>
            </div>

            <div
              className="p-6 border border-cosmic-200 dark:border-cosmic-700 rounded-lg bg-cream-50 dark:bg-cosmic-800 w-full cursor-pointer transition-shadow duration-300 hover:shadow-lg"
              onClick={() => handleUserTypeSelection('consumer')}
            >
              <div className="space-y-4 text-center">
                <h2 className="text-2xl font-semibold text-cosmic-900 dark:text-cosmic-50">
                  I'm a Consumer
                </h2>
                <p className="text-cosmic-600 dark:text-cosmic-300">
                  Discover unique designs, connect with talented designers,
                  and find exactly what you're looking for.
                </p>
                <button className="px-6 py-2 bg-cosmic-500 text-white rounded-lg font-medium hover:bg-cosmic-600 transition-colors duration-200">
                  Continue as Consumer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}