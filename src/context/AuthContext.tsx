import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';

import { getCsrfToken, getLoginStatus } from '@/hooks/api';

type AuthContextType = {
  csrf: string | null;
  setCsrf: React.Dispatch<React.SetStateAction<string | null>>;
  loginStatus: LoginStatusType | undefined;
  setLoginStatus: React.Dispatch<
    React.SetStateAction<LoginStatusType | undefined>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getAuth: () => Promise<void>;
};

type LoginStatusType = {
  isLoggedIn: boolean;
  data?: { status: string; fullName: string; avatar: string };
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [csrf, setCsrf] = useState<string | null>(null);
  const [loginStatus, setLoginStatus] = useState<LoginStatusType>();
  const [loading, setLoading] = useState<boolean>(true);

  const getAuth = useCallback(async () => {
    try {
      const { csrfToken } = await getCsrfToken();
      localStorage.setItem('csrfToken', csrfToken);
      setCsrf(csrfToken);

      const data = await getLoginStatus();
      if (data !== 'undefined' && data?.status === 'success') {
        setLoginStatus({ isLoggedIn: true, data });
      } else {
        setLoginStatus({ isLoggedIn: false });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setCsrf(null);
      setLoginStatus(undefined);
    }
  }, []);

  useEffect(() => {
    getAuth();
  }, [getAuth]);

  const memoedValue = React.useMemo(
    () => ({
      csrf,
      setCsrf,
      loginStatus,
      setLoginStatus,
      loading,
      setLoading,
      getAuth,
    }),
    [csrf, loading, loginStatus, getAuth]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}
