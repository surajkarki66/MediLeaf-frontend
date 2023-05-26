import * as React from 'react';

import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='isolate bg-white'>
      <Header />
      <main>{children}</main>
    </div>
  );
}
