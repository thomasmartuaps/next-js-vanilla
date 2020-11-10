import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Landing(): any {
  const isServer = typeof window === 'undefined';
  const Router = useRouter();
  if (!isServer) {
    if (!sessionStorage.getItem('token')) {
      Router.push('/login');
    }
  }
  return (
    <>
      <h1>LANDING PAGE</h1>
    </>
  );
}
