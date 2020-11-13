/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'moment';

import MomentUtils from '@date-io/moment';
import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    minWidth: '95%',
  },
  formControl: {
    margin: theme.spacing(1),
    // backgroundColor: '#FFFFFF',
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type UserProfileProps = {
  userId: number;
  userName: string;
  address: string;
  handphone: string;
  avatar: string;
  avatarType: string;
};

type ContentData = {
  id: number;
  title: string;
  description: string;
  author: string;
  eventDate: any;
  publishDate: any;
  contentVideo: string;
};

export default function AdminProfile(props: UserProfileProps) {
  const { userId, userName, address, handphone, avatar, avatarType } = props;
  const classes = useStyles();
  const [user, setUser] = useState();
  const [role, setRole] = useState('');
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [eventDate, setEventDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );
  const [publishedDate, setPublishedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );

  useEffect(() => {
    Axios({
      method: 'GET',
      url: 'http://localhost:3000/userdata/profile',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token'),
      },
    })
      .then((res) => {
        // eslint-disable-next-line
        console.log(res.data.content);
      })
      .catch((e) => {
        // eslint-disable-next-line
        console.log(e);
      });
  }, []);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Container component="main">
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Welcome Back, {userName}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid
              container
              spacing={2}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <img src="localhost:3000/api/userdata/avatar/" alt="avatar" />
              </Grid>
              <Grid item xs={12}>
                <Typography component="h3">
                  Phone Number : {handphone}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="h3">Address : {address}</Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save Profile
            </Button>
          </form>
        </Paper>
      </Container>
    </MuiPickersUtilsProvider>
  );
}
