/* eslint-disable @typescript-eslint/no-unused-vars */
import DashboardLayout, { styles } from '@components/DashboardLayout';
import UserProfile from '@components/UserProfile';
import Link from '@material-ui/core/Link';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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

export type PaperbaseProps = WithStyles<typeof styles>;

function ProfilePage(props: PaperbaseProps) {
  const { classes } = props;
  const [address, setAddress] = useState('Jl. Sungai Cakung');
  const [phone, setPhone] = useState('081231251051');
  const [avi, setAvi] = useState('@uploads/avatar/2020/11/avatar_2.jpeg');
  const [aviType, setAviType] = useState('');

  const Router = useRouter();
  const { id, user } = Router.query;

  const userId = id as unknown;
  const userName = user as unknown;

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      Router.push('/signin');
    }
  });

  return (
    <DashboardLayout>
      <UserProfile
        userId={userId as number}
        userName={userName as string}
        address={address}
        handphone={phone}
        avatar={avi}
        avatarType={aviType}
      />
    </DashboardLayout>
  );
}

export default withStyles(styles)(ProfilePage);
