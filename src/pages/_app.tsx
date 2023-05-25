import type { AppProps } from 'next/app';

// eslint-disable-next-line import/extensions
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
