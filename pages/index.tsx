import { ReactElement } from 'react'
import PublicLayout from '../lib/components/layouts/PublicLayout'

const Home = () => {
  return (
    <>
      Home page
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
