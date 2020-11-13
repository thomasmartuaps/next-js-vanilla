/* eslint-disable @typescript-eslint/no-unused-vars */
import DashboardLayout, { styles } from '@components/DashboardLayout';
import UpdateUser from '@components/UpdateUser';
import Link from '@material-ui/core/Link';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

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

function UpdatePage(props: PaperbaseProps) {
  const { classes } = props;

  const Router = useRouter();
  const { id, user } = Router.query;

  const userId = id as unknown;
  const userEdit = user as unknown;

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      Router.push('/signin');
    }
  });

  return (
    <DashboardLayout>
      <UpdateUser userId={userId as number} userEdit={user as string} />
    </DashboardLayout>
  );
}

export default withStyles(styles)(UpdatePage);
