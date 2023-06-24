import React, { useState, useContext } from 'react';

import { useFormik } from 'formik';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { LoginType } from '@/@types';
import AuthLayout from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AuthContext } from '@/context/AuthContext';
import { login } from '@/hooks/api';
import { loginSchema } from '@/schemas/index';

export default function Login() {
  const initialValues: LoginType = {
    email: '',
    password: '',
  };
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { loginStatus, loading: Loading, getAuth } = useContext(AuthContext);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (v, action) => {
        setLoading(true);
        login(v)
          .then(async (res) => {
            await getAuth();
            setLoading(false);
            action.setSubmitting(false);
            action.resetForm();
            router.push('/');
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
      },
    });

  if (loginStatus?.isLoggedIn) {
    return router.push('/');
  }
  const getLoginForm = () => {
    if (Loading) {
      return null;
    }
    return (
      <AuthLayout type='Login'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div className='mt-5'>
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
                'Login'
              )}
            </Button>
          </div>
          <div className='flex'>
            <Link
              href='/register'
              className='text-[#1E9C5D] font-semibold font-semibold flex-grow '
            >
              Sign up
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

  return getLoginForm();
}
