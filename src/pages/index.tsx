import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <>
      <Layout>
        <section className='relative px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl py-32'>
            <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
              <div className='relative rounded-full bg-white bg-opacity-70 py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
                Give us a star ⭐️
                <a
                  href='#'
                  className='font-semibold text-indigo-600'
                  target='_blank'
                  rel='noreferrer'
                >
                  <span className='absolute inset-0' aria-hidden='true' />
                  GitHub <span aria-hidden='true'>&rarr;</span>
                </a>
              </div>
            </div>
            <div className='text-center'>
              <h2 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                MediLeaf: Plant&apos;s Medicinal Properties Identifier
              </h2>
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                Coming Soon !
              </p>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <a
                  href='#'
                  className='rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Get started
                </a>
                <a
                  href='#'
                  className='text-base font-semibold leading-7 text-gray-900'
                >
                  Learn more <span aria-hidden='true'>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
