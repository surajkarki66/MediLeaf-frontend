import React from 'react';

import { useFormik } from 'formik';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

import AuthLayout from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { login } from '@/hooks/api';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import { loginSchema } from '@/schemas/index';

export default function Login() {
  const initialValues = {
    email: '',
    password: '',
  };
  const { toast } = useToast();
  const router = useRouter();

  const { mutate, isLoading } = useMutation(login);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (v, action) => {
        mutate(v, {
          onSuccess: (res) => {
            toast({
              title: `Successfully done!`,
              description: `${res.message}`,
              variant: 'default',
              duration: 3000,
            });
            action.setSubmitting(false);
            action.resetForm();
            router.push('/');
          },
          onError: (error: any) => {
            toast({
              title: `Something went wrong!`,
              description: `Error: ${error[0]}`,
              variant: 'destructive',
              duration: 3000,
            });
            action.setSubmitting(false);
          },
        });
      },
    });

  const { isLoggedIn } = useIsLoggedIn();
  if (isLoggedIn) {
    return router.push('/');
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
          <input
            type='email'
            placeholder='Email'
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
        <div className='mt-5'>
          <input
            type='password'
            placeholder='Password'
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
            disabled={isLoading}
            className='w-full bg-white border border-[#1E9C5D] py-2 text-center text-md text-[#1E9C5D] hover:bg-white'
            type='submit'
          >
            {isLoading ? (
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
            Create an account
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
