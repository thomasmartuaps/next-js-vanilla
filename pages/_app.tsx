import '@styles/globals.scss';

import { AppProps } from 'next/app';
// import DashboardLayout from '@components/DashboardLayout';
import React from 'react';

export default function App({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element {
  // const getLayout = Component.getLayout || (page => <DashboardLayout children={page} />)

  return <Component {...pageProps} />;
}
