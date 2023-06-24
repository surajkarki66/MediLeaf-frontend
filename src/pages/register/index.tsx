import React, { useState, useContext } from 'react';

import { useFormik } from 'formik';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CountryDropdown } from 'react-country-region-selector';

import { RegisterType } from '@/@types';
import AuthLayout from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AuthContext } from '@/context/AuthContext';
import { signup } from '@/hooks/api';
import { registerSchema } from '@/schemas/index';

export default function Register() {
  const initialValues: RegisterType = {
    first_name: '',
    last_name: '',
    email: '',
    country: undefined,
    contact: '',
    password: '',
    confirm_password: '',
  };
  const router = useRouter();
  const { loginStatus, loading: Loading } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsAcceptedError, setTermsAcceptedError] = useState('');
  const { toast } = useToast();
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: registerSchema,
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (v, action) => {
        if (termsAccepted) {
          setLoading(true);
          const payload = {
            ...v,
            contact: parsePhoneNumberFromString(v.contact, v.country)?.number,
          };
          signup(payload)
            .then((res) => {
              setLoading(false);
              action.setSubmitting(false);
              action.resetForm();
              router.push('/login');
              toast({
                title: `Successfully done!`,
                description: `${res.message}`,
                variant: 'default',
                duration: 3000,
              });
            })
            .catch((error) => {
              setLoading(false);
              action.setSubmitting(false);
              toast({
                title: `Something went wrong!`,
                description: `Error: ${error[0]}`,
                variant: 'destructive',
                duration: 3000,
              });
            });
        }
      },
    });
  if (loginStatus?.isLoggedIn) {
    return router.push('/');
  }

  const getRegistrationForm = () => {
    if (Loading) {
      return null;
    }
    return (
      <AuthLayout type='Register'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!termsAccepted) {
              setTermsAcceptedError('You must accept the terms and conditions');
            }
            handleSubmit(e);
          }}
        >
          <div className='mt-4'>
            <label htmlFor='first_name'>First Name</label>
            <input
              type='text'
              placeholder='Enter the first name'
              className='border border-gray-400 py-1 px-2 w-full'
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              name='first_name'
            />
            {touched.first_name && errors.first_name ? (
              <p className='text-1.4 text-red-600'>{errors.first_name}</p>
            ) : null}
          </div>
          <div className='mt-2'>
            <label htmlFor='last_name'>Last Name</label>
            <input
              type='text'
              placeholder='Enter the last name'
              className='border border-gray-400 py-1 px-2 w-full'
              value={values.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              name='last_name'
            />
            {touched.last_name && errors.last_name ? (
              <p className='text-1.4 text-red-600'>{errors.last_name}</p>
            ) : null}
          </div>
          <div className='mt-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Enter an email address'
              className='border border-gray-400 py-1 px-2 w-full'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name='email'
            />
            {touched.email && errors.email ? (
              <p className='text-1.4 text-red-600'>{errors.email}</p>
            ) : null}
          </div>
          <div className='mt-2'>
            <label htmlFor='country'>Country</label>
            <CountryDropdown
              classes='country-dropdown'
              value={values.country ? values.country : ''}
              onChange={(val, e) => {
                sessionStorage.setItem('countryCode', val);
                handleChange(e);
              }}
              onBlur={handleBlur}
              name='country'
              showDefaultOption
              valueType='short'
            />
            {touched.country && errors.country ? (
              <p className='text-1.4 text-red-600'>{errors.country}</p>
            ) : null}
          </div>
          <div className='mt-2'>
            <label htmlFor='contact'>Mobile No.</label>
            <input
              type='tel'
              disabled={values.country === undefined && true}
              placeholder='Enter a mobile number'
              className='border border-gray-400 py-1 px-2 w-full'
              value={values.contact}
              onChange={(event) => {
                const input = event.target.value;
                const numericValue = input.replace(/[^0-9+*#]/g, '');
                if (numericValue === input) {
                  handleChange(event);
                }
              }}
              onBlur={handleBlur}
              name='contact'
            />
            {touched.contact && errors.contact ? (
              <p className='text-1.4 text-red-600'>{errors.contact}</p>
            ) : null}
          </div>
          <div className='mt-2'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='Enter a password'
              className='border border-gray-400 py-1 px-2 w-full'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name='password'
            />
            {errors.password && touched.password ? (
              <p className='text-1.4 text-red-600'>{errors.password}</p>
            ) : null}
          </div>
          <div className='mt-2'>
            <label htmlFor='confirm_password'>Confirm Password</label>
            <input
              type='password'
              placeholder='Enter confirm password'
              className='border border-gray-400 py-1 px-2 w-full'
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
              name='confirm_password'
            />
            {errors.confirm_password && touched.confirm_password ? (
              <p className='text-1.4 text-red-600'>{errors.confirm_password}</p>
            ) : null}
          </div>
          <div className='mt-5'>
            <input
              type='checkbox'
              className='border border-gray-400'
              checked={termsAccepted}
              onChange={(e) => {
                if (!termsAccepted && termsAcceptedError !== '') {
                  setTermsAcceptedError('');
                }
                if (termsAccepted && termsAcceptedError !== '') {
                  setTermsAcceptedError('');
                }
                setTermsAccepted(e.target.checked);
              }}
              name='termsAccepted'
            />
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
            <p className='text-1.4 text-red-600'>{termsAcceptedError}</p>
          </div>
          <div className='mt-5 mb-5'>
            <Button
              variant='default'
              disabled={loading}
              className='w-full bg-white border border-[#1E9C5D] py-2 text-center text-md text-[#1E9C5D] hover:text-white hover:bg-[#1E9C5D]'
              type='submit'
            >
              {loading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please wait
                </>
              ) : (
                'Register Now'
              )}
            </Button>
          </div>
          <div className='flex'>
            <Link
              href='/login'
              className='text-[#1E9C5D] font-semibold font-semibold flex-grow '
            >
              Log in
            </Link>
            <Link
              href='/forgot-password'
              className='text-[#1E9C5D] font-semibold font-semibold '
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </AuthLayout>
    );
  };
  return getRegistrationForm();
}
