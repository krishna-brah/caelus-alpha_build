import React, { useState } from 'react';
import { useRouter } from 'next/router';

const EmailInput: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Store email in session/local storage or state management
      localStorage.setItem('userEmail', email);
      router.push('/main-hub'); // Redirect to the start creating page
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-lg rounded-2xl px-20 py-10 border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-cosmic-100 mb-3 font-space-grotesk"
            >
              Enter your email to get started
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                text-white placeholder-cosmic-300 focus:outline-none focus:ring-2 focus:ring-cosmic-500
                font-inter"
              placeholder="your@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 text-lg font-semibold bg-gradient-to-r from-cosmic-500 to-cosmic-600 
              hover:from-cosmic-600 hover:to-cosmic-700 text-white rounded-xl transition-all duration-200 
              shadow-xl hover:shadow-cosmic-500/25 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100
              font-space-grotesk"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
                Processing...
              </div>
            ) : (
              'Start Creating'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailInput;
