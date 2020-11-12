/* eslint-disable @typescript-eslint/no-unused-vars */
import Content from '@components/Content';
import Contents from '@components/Contents';
import DashboardLayout, { styles } from '@components/DashboardLayout';
import {
  createMuiTheme,
  createStyles,
  ThemeProvider,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export type PaperbaseProps = WithStyles<typeof styles>;

function ContentsPage(props: PaperbaseProps) {
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
      <Contents />
    </DashboardLayout>
  );
}

export default withStyles(styles)(ContentsPage);
