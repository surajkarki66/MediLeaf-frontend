import * as React from 'react';

import Footer from '@/components/footer/footer';

import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='isolate bg-white'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
