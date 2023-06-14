import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { get } from 'lodash';
import { twMerge } from 'tailwind-merge';

import { axiosKBBaseUrl } from '@/constant/env';
import getFormData from '@/hooks/getFormData';

import { getFromLocalStorage } from './helper';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const axiosInstance = axios.create({
  baseURL: axiosKBBaseUrl,
});

export const getApi = async (url: string, config?: any) => {
  let controller: any;

  if (controller) controller.abort();
  controller = new AbortController();

  const { signal } = controller;
  try {
    const response = await axiosInstance.get(url, {
      signal,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...config,
    });
    const data = get(response, 'data');
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_BAD_REQUEST') throw error.response?.data.message;
      throw error.message;
    }
    throw error;
  }
};
export const postApi = async (
  url: string,
  payload?: any,
  config?: any,
  isFormData: boolean = true
) => {
  let formData;

  if (isFormData) {
    formData = getFormData(payload);
  } else {
    formData = payload;
  }
  console.log(payload);
  console.log(formData);

  let headers;

  if (isFormData) {
    headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  } else {
    headers = { 'Content-Type': 'application/json' };
  }
  const csrf = getFromLocalStorage('csrfToken');
  if (csrf) {
    headers = { ...headers, 'X-CSRFToken': csrf };
  }
  try {
    const response = await axiosInstance.post(url, formData, {
      headers,
      ...config,
    });
    const data = get(response, 'data');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_BAD_REQUEST') {
        const objectWrapper: any = Object.values(error.response?.data);

        if (Object.prototype.hasOwnProperty.call(objectWrapper[0], 'message')) {
          const messages = Object.values(objectWrapper);

          const allMessages = messages.map((message: any) => message.message);
          const errorMessages = Object.values(allMessages).map(
            (message) => message
          );

          const errors = Object.values(errorMessages);
          throw errors;
        } else {
          const errors = Object.values(error.response?.data);
          throw errors;
        }
      }
      throw error.message;
    }

    throw error;
  }
};
export const patchApi = async (url: string, payload?: any, config?: any) => {
  const formData = getFormData(payload);
  try {
    const csrf = getFromLocalStorage('csrfToken');
    const response = await axiosInstance.patch(url, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': csrf,
      },
      ...config,
    });
    const data = get(response, 'data');
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_BAD_REQUEST') {
        const errors = Object.values(error.response?.data);
        throw errors;
      }
      throw error.message;
    }

    throw error.message;
  }
};
export const deleteApi = async (url: string, config?: any) => {
  try {
    const response = await axiosInstance.delete(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...config,
    });
    const data = get(response, 'data');

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_BAD_REQUEST') throw error.response?.data.message;
      throw error.message;
    }
    throw error;
  }
};
