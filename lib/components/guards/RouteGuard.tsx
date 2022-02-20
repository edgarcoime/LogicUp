import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react';
import { useSigninCheck } from 'reactfire';

interface RouteGuard {
  children: ReactNode;
}

const RouteGuard: NextPage<RouteGuard> = ({ children }) => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const router = useRouter();

  if (status === 'loading') return (<h1>Loading...</h1>)

  if (!signInCheckResult.signedIn) {
    router.push('/');
  }

  return (<>{children}</>)
}

export default RouteGuard