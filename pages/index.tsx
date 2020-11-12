import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Home(): JSX.Element {
  const Router = useRouter();
  const [token, setToken] = useState('');
  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
    if (!token) {
      Router.push('/signin');
    } else {
      Router.push('/dashboard');
    }
  });
  return <> </>;
}
