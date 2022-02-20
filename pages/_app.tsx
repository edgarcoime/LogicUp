import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import React, { ReactElement, ReactNode } from 'react'
import GlobalLayout from '../lib/components/layouts/GlobalLayout'
import "styles/globals.css"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (
    // If page doesn't have a layout
    (page) =>
      <GlobalLayout>
        {page}
      </GlobalLayout>
  )
  return getLayout(<Component {...pageProps} />)
}

export default MyApp
