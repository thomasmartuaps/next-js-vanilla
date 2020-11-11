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
import React, { useEffect, useState } from 'react';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 936,
      margin: 'auto',
      marginTop: theme.spacing(8),
      overflow: 'hidden',
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

type ContentData = {
  id: number;
  title: string;
  description: string;
  author: string;
  eventDate: any;
  publishDate: any;
  contentVideo: string;
};

const contentContainer: ContentData[] = [];

const dummyContent: ContentData[] = [
  {
    id: 1,
    title: 'asdfa',
    description: 'asdfasfagagaag',
    author: 'asd',
    eventDate: '20-12-2021',
    publishDate: '11-11-2021',
    contentVideo: 'youtube.com',
  },
  {
    id: 2,
    title: 'absdaga',
    description: 'asdfasfagagaag',
    author: 'asd',
    eventDate: '20-12-2021',
    publishDate: '11-11-2021',
    contentVideo: 'youtube.com',
  },
  {
    id: 3,
    title: 'asxzcv',
    description: 'asdfasfagagaag',
    author: 'asd',
    eventDate: '20-12-2021',
    publishDate: '11-11-2021',
    contentVideo: 'youtube.com',
  },
];

const userContainer: UsersData[] = [];

function Users(props: ContentProps) {
  const { classes } = props;
  const [contents, setContents] = useState(userContainer);
  const [dummies, setDummies] = useState(contentContainer);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setDummies(dummyContent);
    axios({
      method: 'GET',
      url: 'http://localhost:3000/api/getuser',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setContents(res.data.data);
        // eslint-disable-next-line
        console.log(contents);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
              <Grid item>
                <SearchIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by email address, phone number, or user UID"
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.addUser}
                >
                  Add user
                </Button>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Event Date</TableCell>
                <TableCell align="right">Published Date</TableCell>
                <TableCell align="right">Video Link</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummies.map((content) => (
                <TableRow key={content.id}>
                  <TableCell component="th" scope="row">
                    {content.id}
                  </TableCell>
                  <TableCell align="right">{content.title}</TableCell>
                  <TableCell align="right">{content.description}</TableCell>
                  <TableCell align="right">{content.author}</TableCell>
                  <TableCell align="right">{content.eventDate}</TableCell>
                  <TableCell align="right">{content.publishDate}</TableCell>
                  <TableCell align="right">{content.contentVideo}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="secondary"
                      variant="contained"
                      disableElevation
                    >
                      Edit
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      disableElevation
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </>
  );
}

export default withStyles(styles)(Users);
