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

const importJodit = () => import('jodit-react');

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(2),
    padding: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    minWidth: '95%',
    height: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  container: {
    height: '100%',
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type UpdateContentProps = {
  contentId: number;
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

export default function UpdateUser(props: UpdateContentProps) {
  const { contentId } = props;
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
      url: '',
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
  }, []);

  const eventDateChange = (date: Date | null) => {
    setEventDate(date);
  };

  const publishedDateChange = (date: Date | null) => {
    setPublishedDate(date);
  };

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit Content -ContentTitle-
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="title"
                  name="title"
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <JoditEditor
                  ref={editor}
                  value={content || ''}
                  config={config}
                  tabIndex={-2} // tabIndex of textarea
                  onBlur={(event) => {
                    setContent(event.originalTarget.innerHTML || '');
                    console.log(event.originalTarget.innerHTML);
                  }} // preferred to use only this option to update the content for performance reasons
                  // onChange={(newContent) => {
                  //   setContent(newContent || '')
                  //   console.log(newContent);
                  // }}
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Event Date"
                  value={eventDate}
                  onChange={eventDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Edit
            </Button>
          </form>
        </Paper>
      </div>
    </MuiPickersUtilsProvider>
  );
}
