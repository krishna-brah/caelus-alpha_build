import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { LayoutDashboard } from 'lucide-react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to auth page if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-cosmic-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="flex items-center justify-center min-h-[calc(100vh-6rem)]">
            <div className="text-cosmic-100">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cosmic-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex items-center mb-8">
          <LayoutDashboard className="w-8 h-8 text-cosmic-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions Card */}
          <div className="bg-cosmic-800/50 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button
                onClick={() => router.push('/profile')}
                className="w-full px-4 py-2 text-sm font-medium text-cosmic-100 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                View Profile
              </button>
              <button
                onClick={() => router.push('/marketplace')}
                className="w-full px-4 py-2 text-sm font-medium text-cosmic-100 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                Browse Marketplace
              </button>
              <button
                onClick={() => router.push('/gallery')}
                className="w-full px-4 py-2 text-sm font-medium text-cosmic-100 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                View Gallery
              </button>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-cosmic-800/50 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="text-sm text-cosmic-100">
                No recent activity to display.
              </div>
            </div>
          </div>

          {/* User Info Card */}
          <div className="bg-cosmic-800/50 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">User Information</h2>
            <div className="space-y-2">
              <p className="text-sm text-cosmic-100">
                <span className="font-medium text-white">Email:</span>{' '}
                {session.user?.email}
              </p>
              <p className="text-sm text-cosmic-100">
                <span className="font-medium text-white">Name:</span>{' '}
                {session.user?.name || 'Not provided'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}