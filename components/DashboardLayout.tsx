/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Content from '@components/Content';
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
import { AppProps } from 'next/app';
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

let baseTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#de1b1b',
      main: '#ba0d0d',
      dark: '#661414',
    },
    secondary: {
      light: '#3BA064',
      main: '#20693E',
      dark: '#112C1C',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

baseTheme = {
  ...baseTheme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: baseTheme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: baseTheme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [baseTheme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: baseTheme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: baseTheme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

export const theme = baseTheme;

const drawerWidth = 256;

export const styles = createStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    paddingLeft: drawerWidth,
  },
  main: {
    flex: 1,
    padding: theme.spacing(2, 2),
    marginTop: theme.spacing(8),
    background: '#eaeff1',
    // background: '#FFFFFF',
  },
  header: {
    position: 'fixed',
    zIndex: 100,
  },
  appShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  barPad: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: '100vw',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
});

export type PaperbaseProps = WithStyles<typeof styles>;

type LayoutProps = {
  children: React.ReactNode;
  classes: typeof styles;
};

function DashboardLayout(props: LayoutProps) {
  const { classes, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(true);
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
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <div>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              onPageButtonClick={handleNavButton}
            />
          </Hidden>
          <Hidden xsDown implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="persistent"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              onPageButtonClick={handleNavButton}
            />
          </Hidden>
        </div>
        <div
          className={clsx(classes.app, {
            [classes.appShift]: mobileOpen,
          })}
        >
          <div className={classes.header}>
            <Header opened={mobileOpen} onDrawerToggle={handleDrawerToggle} />
          </div>
          <main className={classes.main}>{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default withStyles(styles)(DashboardLayout);
