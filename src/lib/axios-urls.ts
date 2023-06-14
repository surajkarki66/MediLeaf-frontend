import axios from 'axios';

import { axiosKBBaseUrl, axiosAIBaseUrl } from '@/constant/env';

const axiosKBInstance = axios.create({
  baseURL: axiosKBBaseUrl,
});

const axiosAIInstance = axios.create({
  baseURL: axiosAIBaseUrl,
});

export { axiosKBInstance, axiosAIInstance };
