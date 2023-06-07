import Link from 'next/link';

export default function Home() {
  return (
    <div className='w-full flex px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl py-32'>
        <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
          <div className='relative rounded-full bg-white bg-opacity-70 py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
            Give us a star ⭐️
            <a
              href='#'
              className='font-semibold text-[#1E9C5D]'
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
            A Plant&apos;s Medicinal Properties Identifier
          </h2>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Medileaf is an application whose motive is to help the individual to
            identify medicinal plant with their properties by just scanning the
            leaf of any plant which might result creating curiosity about plant
            that lead to the preservation of the valuable plants as well as
            source of income.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link
              href='/identification'
              className='rounded-md bg-[#1E9C5D] px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500'
            >
              Get started
            </Link>
            <Link
              href='/about-us'
              className='text-base font-semibold leading-7 text-gray-900'
            >
              Learn more <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
