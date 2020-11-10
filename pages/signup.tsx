import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

import { globalTheme } from './base';

function Copyright(): JSX.Element {
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

const useStyles = makeStyles((themeStyles) => ({
  background: {
    position: 'fixed',
    top: 0,
    width: '100%',
    minHeight: '100vh',
  },
  paper: {
    marginTop: themeStyles.spacing(17),
    padding: themeStyles.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: themeStyles.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: themeStyles.spacing(1),
  },
  submit: {
    margin: themeStyles.spacing(3, 0, 2),
  },
}));

export default function SignIn(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  function usernameInput(event: React.FormEvent<HTMLInputElement>) {
    // eslint-disable-next-line
    console.log(event.target.value);
    setUsername(event.target.value);
  }

  function passInput(event: React.FormEvent<HTMLInputElement>) {
    // eslint-disable-next-line
    console.log(event.target.value);
    setPassword(event.target.value);
  }

  function submitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sessionStorage.setItem('token', 'faketoken');
  }

  return (
    <ThemeProvider theme={globalTheme}>
      <div className={classes.background}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar
              src="/images/logogram-telkom-warna.png"
              className={classes.avatar}
            />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>
              </Grid>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={usernameInput}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={passInput}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onSubmit={submitLogin}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    Don&apos;t have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Paper>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
