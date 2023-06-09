import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import '@/styles/globals.css';

import { Toaster } from '@/components/ui/toaster';

const Layout = dynamic(() => import('@/components/layout/Layout'));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}
