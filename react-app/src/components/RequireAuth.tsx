import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '../lib/auth';

export default function RequireAuth({ children }) {
  const [auth] = useAuth();

  const Router = useRouter();
  useEffect(() => {
    if (auth.status !== 'done') {
      Router.push({
        pathname: '/login',
        query: { from: Router.route },
      });
    }
  }, [auth.status]);

  return <>{children}</>;
}
