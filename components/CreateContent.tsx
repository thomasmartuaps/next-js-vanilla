/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'moment';

import MomentUtils from '@date-io/moment';
import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { TitleRounded } from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useRef, useState } from 'react';

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
  container: {
    height: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const editor = useRef(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [eventDate, setEventDate] = React.useState<Date | null>(
    new Date(Date.now())
  );
  const [publishedDate, setPublishedDate] = React.useState<Date | null>(
    new Date(Date.now())
  );

  const titleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(event.target.value);
    // eslint-disable-next-line
    console.log(event.target.value);
  };

  const authorChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAuthor(event.target.value);
    // eslint-disable-next-line
    console.log(event.target.value);
  };
  const eventDateChange = (event: MaterialUiPickersDate) => {
    setEventDate(event.date);
    // eslint-disable-next-line
    console.log(event.date);
  };

  const publishedDateChange = (event: MaterialUiPickersDate) => {
    setPublishedDate(event.date);
    // eslint-disable-next-line
    console.log(event.date);
  };

  const submitContent = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log({
      title,
      description: content,
      author,
      eventDate,
      publishedDate,
    });
    // axios({
    //   method: 'POST',
    //   url:
    // })
  };

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className={classes.container}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add new content
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
                  onChange={(e) => titleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <JoditEditor
                  ref={editor}
                  value={content || ''}
                  config={config}
                  tabIndex={-2} // tabIndex of textarea
                  onBlur={(newContent) => {
                    setContent(newContent.originalTarget.innerHTML || '');
                    console.log(newContent.originalTarget.innerHTML);
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
                  onChange={(e) => eventDateChange(e)}
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
              onClick={(e) => submitContent(e)}
            >
              Add User
            </Button>
          </form>
        </Paper>
      </div>
    </MuiPickersUtilsProvider>
  );
}
