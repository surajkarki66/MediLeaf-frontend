import Head from 'next/head';
import Image from 'next/image';

import AuthImage from '@/assets/images/plant.jpg';

export default function AuthLayout({
  children,
  type,
}: {
  children: React.ReactNode;
  type: string;
}) {
  return (
    <>
      <Head>
        <title>{type}</title>
      </Head>
      <div className='py-40'>
        <div className='container mx-auto'>
          <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden'>
            <div className='w-full lg:w-1/2 flex flex-col items-center justify-center p-0 bg-no-repeat bg-cover bg-center '>
              <Image
                src={AuthImage}
                alt='Background Image'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='w-full lg:w-1/2 py-16 px-12'>
              <h2 className='text-3xl mb-4 text-center'>
                {type.toUpperCase()}
              </h2>
              <p className='mb-4'>
                {type === 'Register'
                  ? ' Create your account. It’s free and only take a minute'
                  : 'If you have an account just login.'}
              </p>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
