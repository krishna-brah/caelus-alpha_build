import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { 
  useConnect, 
  useAccount, 
  useDisconnect,
  useNetwork,
  useSignMessage
} from 'wagmi';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/Layout';

export default function SignIn() {
  console.log("SignIn page loaded");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  const { connect, connectors, isLoading: isConnecting, pendingConnector } = useConnect({
    onError(error) {
      setError(error.message);
    },
  });

  const { address, isConnected, connector: activeConnector } = useAccount({
    onConnect({ address }) {
      handleWalletLogin(address);
    },
  });

  const { chain } = useNetwork();
  const { signMessage } = useSignMessage({
    onSuccess(data, variables) {
      const signature = data;
      handleWalletLogin(variables.message);
    },
  });

  // Handle wallet login
  const handleWalletLogin = async (walletAddress: string) => {
    try {
      // Sign in with wallet address
      const result = await signIn('ethereum', {
        address: walletAddress,
        redirect: false,
        // Add a challenge that should be signed for additional security
        callbackUrl: '/',
      });

      if (result?.ok) {
        router.push(result.url || '/');
      } else {
        setError(result?.error || 'Failed to sign in with wallet');
      }
    } catch (error) {
      console.error('Wallet login error:', error);
      setError('Failed to sign in with wallet');
    }
  };

  const { disconnect } = useDisconnect();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/');
      }
    } catch (error) {
      setError('An error occurred during sign in');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-cosmic-900 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 bg-cosmic-800/50 p-8 rounded-2xl border border-cosmic-700">
          <div>
            <h2 className="text-3xl font-bold text-white text-center">
              Sign In
            </h2>
          </div>

          {/* Wallet Connection */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Connect Wallet
            </h3>
            {isConnected ? (
              <div className="space-y-4">
                <p className="text-cosmic-100 break-all">
                  Connected: {address}
                </p>
                <button
                  onClick={() => disconnect()}
                  className="w-full px-4 py-3 text-sm font-medium text-white bg-cosmic-600 hover:bg-cosmic-700 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {connectors.map((connector) => {
                  const isConnectorLoading = isConnecting && connector.id === pendingConnector?.id;
                  return (
                    <button
                      key={connector.id}
                      onClick={async () => {
                        try {
                          await connect({ connector });
                        } catch (error) {
                          console.error('Connection error:', error);
                          setError('Failed to connect: ' + error.message);
                        }
                      }}
                      disabled={!connector.ready || isConnecting}
                      className={`w-full px-4 py-3 text-sm font-medium text-white rounded-lg transition-all duration-200 flex items-center justify-center space-x-2
                        ${isConnectorLoading 
                          ? 'bg-cosmic-700 cursor-wait' 
                          : 'bg-cosmic-600 hover:bg-cosmic-700'} 
                        ${!connector.ready ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isConnectorLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Connecting...</span>
                        </>
                      ) : (
                        <>
                          {connector.name === 'MetaMask' && (
                            <svg className="w-5 h-5" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M32.96 1l-13.14 9.72 2.45-5.73L32.96 1z" fill="#E17726" stroke="#E17726" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M2.66 1l13.02 9.8-2.32-5.81L2.66 1zM28.14 23.79l-3.57 5.43 7.64 2.1 2.19-7.41-6.26-.12zM1.24 23.91l2.18 7.41 7.64-2.1-3.57-5.43-6.25.12z" fill="#E27625" stroke="#E27625" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                          {connector.name === 'WalletConnect' && (
                            <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.58439 11.5C14.5844 6.5 22.5844 6.5 27.5844 11.5L28.3344 12.25C28.7094 12.625 28.7094 13.275 28.3344 13.65L26.0844 15.9C25.8969 16.0875 25.5844 16.0875 25.3969 15.9L24.3344 14.8375C20.8344 11.3375 15.3344 11.3375 11.8344 14.8375L10.6969 15.975C10.5094 16.1625 10.1969 16.1625 10.0094 15.975L7.75939 13.725C7.38439 13.35 7.38439 12.7 7.75939 12.325L9.58439 11.5ZM31.5844 15.5L33.5844 17.5C33.9594 17.875 33.9594 18.525 33.5844 18.9L24.8344 27.65C24.4594 28.025 23.8344 28.025 23.4594 27.65L17.3344 21.525C17.2406 21.4313 17.0844 21.4313 16.9906 21.525L10.8656 27.65C10.4906 28.025 9.86564 28.025 9.49064 27.65L0.740645 18.9C0.365645 18.525 0.365645 17.875 0.740645 17.5L2.74064 15.5C3.11564 15.125 3.74064 15.125 4.11564 15.5L10.2406 21.625C10.3344 21.7188 10.4906 21.7188 10.5844 21.625L16.7094 15.5C17.0844 15.125 17.7094 15.125 18.0844 15.5L24.2094 21.625C24.3031 21.7188 24.4594 21.7188 24.5531 21.625L30.6781 15.5C31.0594 15.125 31.6844 15.125 32.0594 15.5H31.5844Z" fill="#ffffff"/>
                            </svg>
                          )}
                          <span>{connector.name}</span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cosmic-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-cosmic-800/50 text-cosmic-100">OR</span>
            </div>
          </div>

          {/* Email Sign In */}
          <form onSubmit={handleEmailSignIn} className="space-y-6">
            <h3 className="text-xl font-semibold text-white">
              Email Sign In
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-cosmic-100">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-cosmic-900/50 border border-cosmic-700 rounded-lg text-white placeholder-cosmic-400 focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-cosmic-100">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-cosmic-900/50 border border-cosmic-700 rounded-lg text-white placeholder-cosmic-400 focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-cosmic-500 to-cosmic-600 hover:from-cosmic-600 hover:to-cosmic-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cosmic-500/25"
            >
              Sign In with Email
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}