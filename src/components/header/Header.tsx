import * as React from 'react';

import { Dialog } from '@headlessui/react';
import {
  Bars3Icon,
  Bars4Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/assets/images/logo.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import LanguageSwitcher from '../language_switcher/LanguageSwitcher';

const navigation = [
  {
    name: <span className='ml-1 text-[0.95rem]'>Identify</span>,
    icon: <MagnifyingGlassIcon className='w-5 h-5' />,
    href: '/identification',
  },
  {
    name: <span className='ml-1 text-[0.95rem]'>Explore</span>,
    icon: <Bars4Icon className='w-5 h-5' />,
    href: '/explore',
  },
  {
    name: <span className='ml-1 text-[0.95rem]'>About us</span>,
    icon: <IdentificationIcon className='w-5 h-5' />,
    href: '/about-us',
  },
  {
    name: <span className='ml-1 text-[0.95rem]'>Contact us</span>,
    icon: <UserGroupIcon className='w-5 h-5' />,
    href: '/contact-us',
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { isLoggedIn, data } = useIsLoggedIn();

  return (
    <>
      <Head>
        <title>MediLeaf</title>
        <meta
          name='description'
          content={`Medileaf is an application whose motive is to help the individual to identify medicinal plant with their properties by just scanning the leaf of any plant which might result creating curiosity about plant that lead to the preservation of the valuable plants as well as source of income.`}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/css/flag-icon.min.css'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='./favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='./favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='./favicon/favicon-16x16.png'
        />
        <link rel='manifest' href='./favicon/site.webmanifest' />
        <link
          rel='mask-icon'
          href='./favicon/safari-pinned-tab.svg'
          color='#5bbad5'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
          integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'>
        <svg
          className='relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
          viewBox='0 0 1155 678'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)'
            fillOpacity='.3'
            d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
          />
          <defs>
            <linearGradient
              id='45de2b6b-92d5-4d68-a6a0-9b9b2abad533'
              x1='1155.49'
              x2='-78.208'
              y1='.177'
              y2='474.645'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#9089FC' />
              <stop offset={1} stopColor='#FF80B5' />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className='px-6 pt-6 lg:px-8'>
        <nav className='flex items-center justify-between' aria-label='Global'>
          <div className='flex lg:flex-1 items-center'>
            <Link href='/' className='-m-1.5 p-1.5 flex items-center'>
              <Image
                src={Logo}
                width={50}
                height={50}
                alt='Medileaf-Logo'
                quality={100}
                priority={true}
              />
              <h1 className='text-xl font-semibold ml-0 text-[#1E9C5D]'>
                MediLeaf
              </h1>
            </Link>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='hidden lg:flex lg:gap-x-12'>
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10'
              >
                <div className='flex items-center'>
                  {item.icon}
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
          <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
            {!isLoggedIn ? (
              <Link
                href='/login'
                className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10 mr-1'
              >
                <span aria-hidden='true'>&rarr;</span> Log in
              </Link>
            ) : (
              <TooltipProvider delayDuration={50}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href='/profile'>
                      <Avatar>
                        <AvatarImage
                          src={
                            data?.avatar
                              ? data?.avatar
                              : 'https://github.com/shadcn.png'
                          }
                        />
                        <AvatarFallback>
                          {data?.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{data?.fullName}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <LanguageSwitcher small={false} />
          </div>
        </nav>
        <Dialog as='div' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel className='fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden'>
            <div className='flex items-center justify-between'>
              <Link href='/' className='-m-1.5 p-1.5'>
                <h1 className='text-xl font-semibold text-[#1E9C5D]'>
                  MediLeaf
                </h1>
              </Link>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-700'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10'>
                <div className='space-y-2 py-6'>
                  {navigation.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10'
                    >
                      <div className='flex items-center'>
                        {item.icon}
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className='py-6'>
                  {!isLoggedIn ? (
                    <Link
                      href='/login'
                      className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10 mr-1'
                    >
                      <span aria-hidden='true'>&rarr;</span> Log in
                    </Link>
                  ) : (
                    <TooltipProvider delayDuration={50}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href='/profile'>
                            <Avatar>
                              <AvatarImage
                                src={
                                  data?.avatar
                                    ? data?.avatar
                                    : 'https://github.com/shadcn.png'
                                }
                              />
                              <AvatarFallback>
                                {data?.fullName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{data?.fullName}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <div className='-mx-6 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900'>
                    <LanguageSwitcher small={true} />
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </>
  );
}
