import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ImageGenerator from './ImageGenerator';

const AuthImageGenerator: React.FC = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-4 font-space-grotesk">
              AI Fashion Design Generator
            </h2>
            <p className="text-cosmic-100 mb-6">
              Sign in to access our AI-powered fashion design generator and create unique designs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/auth">
                <button className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-cosmic-500 to-cosmic-600 hover:from-cosmic-600 hover:to-cosmic-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cosmic-500/25">
                  Sign In
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-6 py-3 text-sm font-medium text-cosmic-100 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-200">
                  Create Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ImageGenerator />;
};

export default AuthImageGenerator;