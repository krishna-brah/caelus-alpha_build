import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../lib/contexts/ThemeContext';
import { AppProvider } from '../lib/contexts/AppContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Caelus - Sustainable Fashion Platform</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }

          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .gradient-bg {
            background: linear-gradient(-45deg, #9C27B0, #6A1B9A, #4A148C, #7B1FA2);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
          }

          .glass-effect {
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
        `}</style>
      </Head>
      <ThemeProvider>
        <CssBaseline />
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;