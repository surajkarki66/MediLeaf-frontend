import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import NProgress from 'nprogress';

import '@/styles/globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';

const Layout = dynamic(() => import('@/components/layout/Layout'));

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }: AppProps) {
  Router.events.on('routeChangeStart', (_url) => {
    NProgress.start();
  });
  Router.events.on('routeChangeComplete', (_url) => {
    NProgress.done();
  });
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </AuthProvider>
  );
}
