import { parsePhoneNumberFromString } from 'libphonenumber-js';
import * as Yup from 'yup';

import { getFromSessionStorage } from '@/lib/helper';

export const loginSchema = Yup.object({
  email: Yup.string().email().required('Please enter your email'),
  password: Yup.string().min(8).required('Please enter your password'),
});

export const registerSchema = Yup.object({
  first_name: Yup.string()
    .min(2)
    .max(64)
    .required('Please enter your first name'),
  last_name: Yup.string()
    .min(2)
    .max(64)
    .required('Please enter your last name'),
  email: Yup.string().email().required('Please enter your email'),
  country: Yup.string().required('Please enter your country'),
  contact: Yup.string()
    .matches(
      /^\+?[1-9][0-9]{7,14}$/,
      'The mobile number can have + sign in the beginning and max 15 digits without delimiters'
    )
    .test('phone-validation', 'Invalid phone number', (value) => {
      const phoneNumber = parsePhoneNumberFromString(
        value || '',
        getFromSessionStorage('countryCode') as any
      );
      return phoneNumber && phoneNumber.isValid();
    })
    .required('Please enter your mobile number'),
  password: Yup.string().min(8).required('Please enter your password'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});
