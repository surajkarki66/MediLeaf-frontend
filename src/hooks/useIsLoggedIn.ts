import { useFetchLogInStatus } from './api';

export default function useIsLoggedIn() {
  const { data } = useFetchLogInStatus();
  if (data !== 'undefined' && data?.status === 'success') {
    return { isLoggedIn: true, data };
  }

  return { isLoggedIn: false };
}
