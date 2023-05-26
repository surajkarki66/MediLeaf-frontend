import * as React from 'react';

import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='isolate bg-white'>
      <header>
        <Header />
      </header>
      <main>{children}</main>
    </div>
  );
}
