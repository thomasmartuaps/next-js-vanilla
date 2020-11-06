/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Login(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const Router = useRouter();
  const inputPassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const inputUsername = (event: React.FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };
  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line
    console.log(username, password);
    fetch('/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((result): any => {
        const data = result.json();
        // eslint-disable-next-line
        return data;
      })
      .then((data): any => {
        // eslint-disable-next-line
        sessionStorage.setItem('token', data.token);
      })
      .finally(() => {
        Router.push('/landing');
      });
  };

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <form onSubmit={signIn}>
        <h1>Login</h1>
        Username:
        <br />
        <input type="text" onChange={inputUsername} />
        <br />
        Password
        <br />
        <input type="password" onChange={inputPassword} />
        <input type="submit" />
      </form>
    </>
  );
}
