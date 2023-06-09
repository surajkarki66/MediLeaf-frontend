import * as React from 'react';

import { useRouter } from 'next/router';

export default function Footer() {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  if (isHomePage) {
    return null;
  }

  return (
    <footer className='absolute b-0 w-[100%] text-center bg-red'>Footer</footer>
  );
}
