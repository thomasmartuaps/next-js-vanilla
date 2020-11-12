/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import {
  createStyles,
  fade,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import SearchIcon from '@material-ui/icons/Search';
import SmsIcon from '@material-ui/icons/Sms';
import clsx from 'clsx';
import React from 'react';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme: Theme) =>
  createStyles({
    secondaryBar: {
      zIndex: 1,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    menuButton: {
      marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
      padding: 4,
    },
    search: {
      position: 'relative',
      borderColor: '#272c34',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    barPad: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      width: '100vw',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      boxShadow: '0 -1px 0 #EBEFF5 inset',
      backgroundColor: '#FFFFFF',
    },
    barPadShift: {
      width: `calc(100vw - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    link: {
      textDecoration: 'none',
      color: lightColor,
      '&:hover': {
        color: theme.palette.common.white,
      },
    },
    button: {
      borderColor: lightColor,
    },
  });

const drawerWidth = 256;

interface HeaderProps extends WithStyles<typeof styles> {
  onDrawerToggle: () => void;
  opened: boolean;
}

function Header(props: HeaderProps): JSX.Element {
  const { classes, onDrawerToggle, opened } = props;

  return (
    <>
      <AppBar
        component="div"
        // color="default"
        className={clsx(classes.barPad, { [classes.barPadShift]: opened })}
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid item>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Admin DigiCorpu
              </Typography>
            </Grid>
            <Hidden xsDown>
              <Grid item>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
              </Grid>
            </Hidden>
            <Grid item>
              <Button
                className={classes.button}
                variant="outlined"
                color="inherit"
                size="medium"
              >
                <Badge badgeContent={4} color="primary">
                  <SmsIcon />
                </Badge>
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                variant="outlined"
                color="inherit"
                size="medium"
              >
                <Badge badgeContent={4} color="primary">
                  <NotificationsActiveIcon />
                </Badge>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <AppBar
          color="light"
          className={clsx(classes.barPad, { [classes.barPadShift]: opened })}
          position="static"
        >
          <Grid item xs={12} sm={6}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Grid>
        </AppBar>
      </Hidden>
    </>
  );
}

export default withStyles(styles)(Header);
