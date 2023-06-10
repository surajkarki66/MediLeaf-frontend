import React from 'react';

import Link from 'next/link';

import AuthLayout from '@/components/layout/AuthLayout';

export default function Register() {
  return (
    <AuthLayout type='Register'>
      <form>
        <div className='mt-4'>
          <input
            type='text'
            placeholder='First Name'
            className='border border-gray-400 py-1 px-2 w-full'
          />
        </div>
        <div className='mt-4'>
          <input
            type='text'
            placeholder='Last Name'
            className='border border-gray-400 py-1 px-2 w-full'
          />
        </div>
        <div className='mt-4'>
          <input
            type='email'
            placeholder='Email'
            className='border border-gray-400 py-1 px-2 w-full'
          />
        </div>
        <div className='mt-4'>
          <input
            type='text'
            placeholder='Country'
            className='border border-gray-400 py-1 px-2 w-full'
          />
        </div>
        <div className='mt-4'>
          <input
            type='text'
            placeholder='Contact number'
            className='border border-gray-400 py-1 px-2 w-full'
          />
        </div>
        <div className='mt-4'>
          <input
            type='password'
            placeholder='Password'
            className='border border-gray-400 py-1 px-2 w-full'
          />
        </div>
        <div className='mt-4'>
          <input
            type='password'
            placeholder='Confirm Password'
            className='border border-gray-400 py-1 px-2 w-full'
          />
        </div>
        <div className='mt-5'>
          <input type='checkbox' className='border border-gray-400' />
          &nbsp;
          <span>
            I accept the{' '}
            <Link href='#' className='text-[#1E9C5D] font-semibold'>
              Terms of Use
            </Link>{' '}
            &{' '}
            <Link
              href='#'
              className='text-[#1E9C5D] font-semibold font-semibold'
            >
              Privacy Policy
            </Link>
          </span>
        </div>
        <div className='mt-5 mb-4'>
          <button className='w-full bg-white border border-[#1E9C5D] py-2 text-center text-[#1E9C5D]'>
            Register Now
          </button>
        </div>
        <div className='flex'>
          <Link
            href='/login'
            className='text-[#1E9C5D] font-semibold font-semibold flex-grow '
          >
            Login
          </Link>
          <Link
            href='/forgot-password'
            className='text-[#1E9C5D] font-semibold font-semibold '
          >
            Forgot Password ?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
