import { ReactElement } from 'react'
import PublicLayout from '../lib/components/layouts/PublicLayout'

import Link from 'next/link';
import { Button } from '@mantine/core';

const Home = () => {
  return (
    <>
      <Link href="/hello" passHref>
        <Button component="a">Next link button</Button>
      </Link>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <PublicLayout>
      {page}
    </PublicLayout>
  )
}

export default Home
