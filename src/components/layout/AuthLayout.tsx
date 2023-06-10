import Head from 'next/head';
import Link from 'next/link';

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
      <div className='py-40 '>
        <div className='container mx-auto'>
          <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden'>
            <div className='w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center '>
              <h1 className='text-black text-3xl mb-3'>Welcome</h1>
              <div>
                <p className='text-black'>
                  {type === 'Login'
                    ? 'Welcome to Medileaf! To access your account, please enter your unique username and password in the login form below. We are here to help you make the most of your Medileaf experience.'
                    : ''}
                  <Link
                    href='/about-us'
                    className='text-[#1E9C5D] font-semibold'
                  >
                    Learn more
                  </Link>
                </p>
              </div>
            </div>
            <div className='w-full lg:w-1/2 py-16 px-12'>
              <h2 className='text-3xl mb-4'>{type}</h2>
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
