import React, { createContext, useState, ReactNode, useEffect } from 'react';

import { getCsrfToken } from '@/hooks/api';

interface AuthContextProps {
  csrf: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
  csrf: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [csrf, setCsrf] = useState<string | null>(null);

  useEffect(() => {
    async function get() {
      const { csrfToken } = await getCsrfToken();
      localStorage.setItem('csrfToken', csrfToken);
      setCsrf(csrfToken);
    }
    get();
  }, []);

  const memoedValue = React.useMemo(
    () => ({
      csrf,
      setCsrf,
    }),
    [csrf]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}
