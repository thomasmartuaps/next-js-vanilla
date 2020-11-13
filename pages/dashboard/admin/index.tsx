/* eslint-disable @typescript-eslint/no-unused-vars */
import AdminProfile from '@components/AdminProfile';
import DashboardLayout, { styles } from '@components/DashboardLayout';
import Link from '@material-ui/core/Link';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import * as fs from 'fs-extra';
import { verify } from 'jsonwebtoken';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

function Admin({
  prKey,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const Router = useRouter();
  const [adminId, setAdminId] = useState(1);
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('Jl. Sungai Cakung');
  const [phone, setPhone] = useState('081231251051');
  const [avi, setAvi] = useState('@uploads/avatar/2020/11/avatar_2.jpeg');
  const [aviType, setAviType] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const algorithms: any = 'HS256';
    const prKeyBuffer: Buffer = JSON.parse(prKey);
    // const prKey = fse.readFileSync('configJWT/public.pem');
    console.log('decoding');
    console.log(JSON.parse(prKey));
    if (!token) {
      Router.push('/signin');
    } else {
      console.log(token, 'this is token');
      decode(token, algorithms, prKeyBuffer);
    }
  }, []);

  const decode = async (token: string, algorithms: any, prKe: Buffer) => {
    await verify(
      token || '',
      prKe,
      { algorithms },
      (err: any, decoded: any) => {
        console.log(decoded, 'this is your profile');
      }
    );
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/userdata/profile',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token'),
      },
    })
      .then((res) => {
        console.log(res.data.content);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [adminId]);

  return (
    <DashboardLayout>
      <AdminProfile
        userId={adminId}
        userName={username}
        address={address}
        handphone={phone}
        avatar={avi}
        avatarType={aviType}
      />
    </DashboardLayout>
  );
}

export const getServerSideProps = async () => {
  const prKeyObj = fs.readFileSync('configJWT/public.pem');
  const prKey = JSON.stringify(prKeyObj);
  return {
    props: {
      prKey,
    },
  };
};

// export async function getStaticProps() {
//   const algorithms: any = 'HS256';
//   const token = sessionStorage.getItem('token');
//   const prKey = fs.readFileSync('configJWT/public.pem');
//   let adminId: string;
//   if (token) {
//     await verify(token, prKey, { algorithms }, (err: any, decoded: any) => {
//       adminId = decoded.id
//     })
//     return {
//       props: {
//         adminId,
//       },
//     }
//   }
//   else {
//     Router.push('/signin')
//   }
//   return {
//     props: {
//       adminId,
//     },
//   }
// }

export default withStyles(styles)(Admin);
