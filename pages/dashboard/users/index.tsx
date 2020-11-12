/* eslint-disable @typescript-eslint/no-unused-vars */
import Content from '@components/Content';
import DashboardLayout, { styles } from '@components/DashboardLayout';
import Header from '@components/Header';
import Navigator from '@components/Navigator';
import Users from '@components/Users';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import {
  createMuiTheme,
  createStyles,
  ThemeProvider,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
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

const drawerWidth = 256;

export type PaperbaseProps = WithStyles<typeof styles>;

function CreateUserPage(props: PaperbaseProps) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [pageNow, setPageNow] = React.useState('Users');

  const Router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavButton = (currentPage: string) => {
    setPageNow(currentPage);
  };

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      Router.push('/signin');
    }
  });

  return (
    <DashboardLayout>
      <Users />
    </DashboardLayout>
  );
}

export default withStyles(styles)(CreateUserPage);
