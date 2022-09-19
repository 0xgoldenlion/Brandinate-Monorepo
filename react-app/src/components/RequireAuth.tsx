// import { Navigate, useLocation } from 'react-router-dom'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '../lib/auth';

export default function RequireAuth({ children }) {
  const [auth] = useAuth();

  const Router = useRouter();
  const { route } = Router;
  // const location = useLocation()
  useEffect(() => {
    console.log('auth REQUIRE:', auth);
    if (auth.status !== 'done') {
      Router.push({
        pathname: '/login',
        query: { from: route },
      });
    }
  }, []);

  return <>{children}</>;
}
