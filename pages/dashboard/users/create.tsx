/* eslint-disable @typescript-eslint/no-unused-vars */
import CreateUser from '@components/CreateUser';
import DashboardLayout, { styles } from '@components/DashboardLayout';
import Link from '@material-ui/core/Link';
import {
  createMuiTheme,
  createStyles,
  ThemeProvider,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export type PaperbaseProps = WithStyles<typeof styles>;

function UsersPage(props: PaperbaseProps) {
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
      <CreateUser />
    </DashboardLayout>
  );
}

export default withStyles(styles)(UsersPage);
