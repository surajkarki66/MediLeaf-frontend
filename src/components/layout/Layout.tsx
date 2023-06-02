import * as React from 'react';

import dynamic from 'next/dynamic';

import Header from './Header';

const Footer = dynamic(() => import('../footer/Footer'));

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='isolate bg-white'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
