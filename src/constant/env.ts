export const isProd = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
export const isLocal = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

export const axiosKBBaseUrl = isLocal
  ? process.env.NEXT_PUBLIC_KB_DEV_BASE_URL
  : process.env.NEXT_PUBLIC_KB_PROD_BASE_URL;

export const axiosAIBaseUrl = isLocal
  ? process.env.NEXT_PUBLIC_AI_DEV_BASE_URL
  : process.env.NEXT_PUBLIC_AI_PROD_BASE_URL;
