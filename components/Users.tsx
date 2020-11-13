/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
      margin: 0,
      overflow: 'hidden',
      height: '100%',
    },
    searchBar: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
      fontSize: theme.typography.fontSize,
    },
    block: {
      display: 'block',
    },
    addUser: {
      marginRight: theme.spacing(1),
    },
    contentWrapper: {
      margin: '40px 16px',
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    skelZIndex: {
      zIndex: 3,
    },
  });

export type ContentProps = WithStyles<typeof styles>;

type UsersData = {
  id: number;
  username: string;
};

const dummyUsers: UsersData[] = [
  { id: 1, username: 'asdfa' },
  { id: 2, username: 'asdfa' },
  { id: 3, username: 'asdfa' },
];

const userContainer: UsersData[] = [];

function Users(props: ContentProps) {
  const { classes } = props;
  const [users, setUsers] = useState(userContainer);
  const [dummies, setDummies] = useState(userContainer);
  const [loading, setLoading] = useState(false);

  const Router = useRouter();

  useEffect(() => {
    setLoading(true);
    setDummies(dummyUsers);
    axios({
      method: 'GET',
      url: 'http://localhost:3000/api/userdata/user',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token'),
      },
    })
      .then((res) => {
        // eslint-disable-next-line
        console.log(res.data.data);
        setUsers(res.data.data);
        // eslint-disable-next-line
        setLoading(false);
        setDummies(userContainer);
      })
      .catch((e) => {
        // eslint-disable-next-line
        console.log(e.response);
      });
  }, []);

  const deleteUser = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    userId: number
  ) => {
    event.preventDefault();
    console.log(userId);
    axios({
      method: 'DELETE',
      url: 'http://localhost:3000/api/userdata/user',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token'),
      },
      data: {
        id: userId,
      },
    })
      .then((res) => {
        console.log(res.data);
        Router.push('/');
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const goToCreateUser = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    Router.push('/dashboard/users/create');
  };

  return (
    <>
      <Paper className={classes.paper}>
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Typography>Users Table</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.addUser}
                  onClick={(e) => goToCreateUser(e)}
                >
                  Add user
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">id</TableCell>
                <TableCell>Username (Email)</TableCell>
                <TableCell align="center">password</TableCell>
                <TableCell align="center">Profile</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <TableBody>
                {dummies.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="center">
                      <Skeleton>
                        <Typography>id</Typography>
                      </Skeleton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Skeleton>
                        <Typography>asdfasdf@Nutt.co.id</Typography>
                      </Skeleton>
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton>
                        <Typography>Nope</Typography>
                      </Skeleton>
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton>
                        <Typography>Profile</Typography>
                      </Skeleton>
                    </TableCell>
                    <TableCell align="center">
                      <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item>
                          <Skeleton>
                            <Button
                              color="secondary"
                              variant="contained"
                              disableElevation
                            >
                              Edit
                            </Button>
                          </Skeleton>
                        </Grid>
                        <Grid item>
                          <Skeleton>
                            <Button
                              color="secondary"
                              variant="contained"
                              disableElevation
                            >
                              Edit
                            </Button>
                          </Skeleton>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {user.username}
                    </TableCell>
                    <TableCell align="center">Nope</TableCell>
                    <TableCell align="center">
                      <Link
                        href={{
                          pathname: '/dashboard/users/profile/[id]',
                          query: { slug: user.id, user: user.username },
                        }}
                      >
                        Profile
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Grid
                        container
                        spacing={1}
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item>
                          <Button
                            color="secondary"
                            variant="contained"
                            disableElevation
                            onClick={(e) => {
                              e.preventDefault();
                              Router.push(
                                `/dashboard/users/update/${user.id}?user=${user.username}`
                              );
                            }}
                          >
                            Edit
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            color="primary"
                            variant="contained"
                            disableElevation
                            onClick={(e) => deleteUser(e, user.id)}
                          >
                            Delete
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </Paper>
    </>
  );
}

export default withStyles(styles)(Users);
