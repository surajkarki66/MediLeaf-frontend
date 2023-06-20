import { CountryCode } from 'libphonenumber-js';

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  first_name: string;
  last_name: string;
  email: string;
  country: CountryCode | undefined;
  contact: string;
  password: string;
  confirm_password: string;
};
