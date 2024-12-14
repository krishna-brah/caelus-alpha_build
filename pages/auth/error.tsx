import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const AuthError = () => {
  const router = useRouter();
  const { error } = router.query;

  useEffect(() => {
    if (!error) {
      router.push('/auth/signin');
    }
  }, [error, router]);

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'You do not have permission to access this resource.';
      case 'Verification':
        return 'The verification link may have expired or has already been used.';
      case 'OAuthSignin':
        return 'Error in the OAuth signin process.';
      case 'OAuthCallback':
        return 'Error in the OAuth callback process.';
      case 'OAuthCreateAccount':
        return 'Could not create OAuth provider account.';
      case 'EmailCreateAccount':
        return 'Could not create email provider account.';
      case 'Callback':
        return 'Error in the OAuth callback handler.';
      case 'WalletConnect':
        return 'Error connecting to wallet. Please try again.';
      case 'MetaMask':
        return 'Error connecting to MetaMask. Please make sure MetaMask is installed and unlocked.';
      case 'OAuthAccountNotLinked':
        return 'To confirm your identity, sign in with the same account you used originally.';
      case 'EmailSignin':
        return 'The e-mail could not be sent.';
      case 'CredentialsSignin':
        return 'Sign in failed. Check the details you provided are correct.';
      case 'SessionRequired':
        return 'Please sign in to access this page.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  };

  if (!error) return null;

  return (
    <>
      <Head>
        <title>Authentication Error - Caelus Platform</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="p-8 bg-white shadow-xl rounded-lg max-w-md w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Authentication Error
            </h1>
            <p className="text-gray-600 mb-6">
              {getErrorMessage(error as string)}
            </p>
            <button
              onClick={() => router.push('/auth/signin')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthError;