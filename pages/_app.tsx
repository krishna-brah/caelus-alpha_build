import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '../lib/contexts/ThemeContext';
import { AppProvider } from '../lib/contexts/AppContext';
import { ToastProvider } from '../components/ui/toast';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  return (
    <>
      <Head>
        <title>Caelus - Sustainable Fashion Platform</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider>
          <ToastProvider>
            <AppProvider>
              {Component.getLayout ? (
                Component.getLayout(<Component {...pageProps} />)
              ) : (
                <Component {...pageProps} />
              )}
            </AppProvider>
          </ToastProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;