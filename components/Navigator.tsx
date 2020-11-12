import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import { Omit } from '@material-ui/types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';

const categories = [
  {
    id: '',
    children: [
      { id: 'Users', icon: <PeopleIcon />, active: true },
      { id: 'Content', icon: <DnsRoundedIcon /> },
      // { id: 'Banner', icon: <PermMediaOutlinedIcon /> },
      // { id: 'Event', icon: <PublicIcon /> },
    ],
  },
  // {
  //   id: 'Quality',
  //   children: [
  //     { id: 'Analytics', icon: <SettingsIcon /> },
  //     { id: 'Performance', icon: <TimerIcon /> },
  //     { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
  //   ],
  // },
];

const styles = (theme: Theme) =>
  createStyles({
    categoryHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
      // color: theme.palette.common.white,
    },
    paper: {
      background: '#ffffff',
      color: '#707a89',
    },
    logoTelkom: {
      height: theme.spacing(8),
      width: 'auto',
    },
    item: {
      paddingTop: 1,
      paddingBottom: 1,
      '&:hover,&:focus': {
        backgroundColor: '#DEE3ED',
      },
    },
    itemNoHover: {
      paddingTop: 1,
      paddingBottom: 1,
    },
    itemCategory: {
      backgroundColor: '#FFFFFF',
      boxShadow: '0 -1px 0 #EBEFF5 inset',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      color: '#707A89',
    },
    itemLogo: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 -1px 0 #EBEFF5 inset',
      paddingTop: 4,
      paddingBottom: 4,
      color: '#707A89',
    },
    firebase: {
      fontSize: 24,
      color: theme.palette.common.white,
    },
    itemActiveItem: {
      color: '#de1b1b',
    },
    itemPrimary: {
      fontSize: 'inherit',
    },
    itemIcon: {
      minWidth: 'auto',
      marginRight: theme.spacing(2),
    },
    divider: {
      marginTop: theme.spacing(2),
      backgroundColor: '#EBEFF5',
    },
  });

export interface NavigatorProps
  extends Omit<DrawerProps, 'classes'>,
    WithStyles<typeof styles> {
  onPageButtonClick: (currentPage: string) => void;
}

function Navigator(props: NavigatorProps) {
  const { classes, onPageButtonClick, ...other } = props;
  const Router = useRouter();

  const logOut = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    sessionStorage.clear();
    if (!sessionStorage.getItem('token')) {
      Router.push('/');
    }
  };

  const goToPage = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    pageName: string
  ) => {
    event.preventDefault();
    Router.push(`/dashboard/${pageName}`);
  };

  return (
    <Drawer
      variant="persistent"
      {...other}
      classes={{
        paper: classes.paper,
      }}
    >
      <List disablePadding>
        <ListItem
          className={clsx(
            classes.firebase,
            classes.itemNoHover,
            classes.itemCategory,
            classes.itemLogo
          )}
        >
          {/* <ListItemAvatar> */}
          <img
            className={classes.logoTelkom}
            src="/images/logo-telkom-warna.png"
            alt="M"
          />
          {/* </ListItemAvatar> */}
        </ListItem>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          <ListItemAvatar>
            <Avatar alt="M" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography style={{ color: '#444B55' }}>
                Admin@Nutt.co.id
              </Typography>
            }
            secondary={
              <Typography
                style={{
                  color: '#707A89',
                  fontSize: 14,
                }}
              >
                System Manager
              </Typography>
            }
          />
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Project Overview
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem
                key={childId}
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
                onClick={(e) => goToPage(e, childId.toLowerCase())}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
      <ListItem
        className={clsx(classes.item, classes.itemCategory)}
        button
        onClick={(e) => logOut(e)}
      >
        <ListItemIcon className={classes.itemIcon}>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classes.itemPrimary,
          }}
        >
          Logout
        </ListItemText>
      </ListItem>
    </Drawer>
  );
}

export default withStyles(styles)(Navigator);
