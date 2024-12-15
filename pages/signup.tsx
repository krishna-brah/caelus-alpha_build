import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import Link from 'next/link';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { WalletIcon } from '@heroicons/react/24/outline';

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    walletAddress: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update form when wallet is connected
  useEffect(() => {
    if (isConnected && address) {
      setFormData(prev => ({ ...prev, walletAddress: address }));
    } else {
      setFormData(prev => ({ ...prev, walletAddress: '' }));
    }
  }, [isConnected, address]);

  const handleWalletConnect = async () => {
    if (isConnected) {
      disconnect();
    } else {
      // Connect using the first available connector (usually injected - MetaMask)
      const connector = connectors[0];
      if (connector) {
        try {
          await connect({ connector });
        } catch (err) {
          setError('Failed to connect wallet. Please try again.');
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Verify wallet connection
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      setIsLoading(false);
      return;
    }

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Here you would typically make an API call to create the user account
      // Include the wallet address in the signup process
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
        walletAddress: address,
      });

      if (result?.error) {
        setError('Failed to create account. Please try again.');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-900">
      <Navbar />
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-cosmic-800/50 border border-white/10 rounded-lg p-8 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Create Your Account
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Wallet Connection Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-white">Connect Wallet</h2>
              <span className={`text-sm ${isConnected ? 'text-green-500' : 'text-cosmic-100'}`}>
                {isConnected ? 'Connected' : 'Not Connected'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleWalletConnect}
              className={`w-full px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                isConnected
                  ? 'bg-cosmic-900/50 border-red-500/20 text-red-500 hover:bg-red-500/10'
                  : 'bg-cosmic-900/50 border-white/10 text-white hover:bg-white/5'
              }`}
            >
              <WalletIcon className="w-5 h-5" />
              <span>{isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}</span>
            </button>
            {address && (
              <p className="mt-2 text-sm text-cosmic-100 break-all">
                Address: {address}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-cosmic-100 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={!isConnected}
                className="w-full px-4 py-2 bg-cosmic-900/50 border border-white/10 rounded-lg text-white placeholder-cosmic-100/50 focus:outline-none focus:ring-2 focus:ring-cosmic-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cosmic-100 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={!isConnected}
                className="w-full px-4 py-2 bg-cosmic-900/50 border border-white/10 rounded-lg text-white placeholder-cosmic-100/50 focus:outline-none focus:ring-2 focus:ring-cosmic-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cosmic-100 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={!isConnected}
                className="w-full px-4 py-2 bg-cosmic-900/50 border border-white/10 rounded-lg text-white placeholder-cosmic-100/50 focus:outline-none focus:ring-2 focus:ring-cosmic-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-cosmic-100 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={!isConnected}
                className="w-full px-4 py-2 bg-cosmic-900/50 border border-white/10 rounded-lg text-white placeholder-cosmic-100/50 focus:outline-none focus:ring-2 focus:ring-cosmic-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !isConnected}
              className="w-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-cosmic-500 to-cosmic-600 hover:from-cosmic-600 hover:to-cosmic-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-cosmic-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-cosmic-100">
            Already have an account?{' '}
            <Link
              href="/auth"
              className="font-medium text-cosmic-500 hover:text-cosmic-400 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}