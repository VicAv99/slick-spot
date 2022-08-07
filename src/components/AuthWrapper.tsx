import { signOut, useSession } from 'next-auth/react';
import React, { PropsWithChildren, useEffect } from 'react';

import { isAuthenticated } from '../utils';

export const AuthWrapper = ({ children }: PropsWithChildren<unknown>) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!isAuthenticated(session)) {
      signOut({ redirect: true });
    }
  }, [session]);

  return <>{children}</>;
};
