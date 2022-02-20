import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react';
import { useSigninCheck } from 'reactfire';

interface LoginGuardProps {
  children: ReactNode
}

const LoginGuard: NextPage<LoginGuardProps> = ({ children }) => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const router = useRouter();

  if (status === 'loading') return (<h1>Loading...</h1>)

  if (signInCheckResult.signedIn) {
    router.push('/cards');
  }

  return (<>{children}</>)
}

export default LoginGuard