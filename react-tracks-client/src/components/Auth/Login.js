import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Lock from '@material-ui/icons/Lock';
import { LOGIN_MUTATION } from "../../gql/mutations";

const Login = ({classes, setNewUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e, tokenAuth, client) => {
    e.preventDefault(); // prevents page refreshing on submit to prevent excess server strain
    const res = await tokenAuth({
      variables: {
        username, // same as username: username,
        password,
      },
    });
    localStorage.setItem('authToken', res.data.tokenAuth.token);
    client.writeData({data: {isLoggedIn: true}}) // sets isLoggedIn (apollo provider state) to true
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Lock/>
        </Avatar>
        <Typography variant='title'>Login</Typography>
        {/* below mutation needs to be login mutation; no email */}
        <Mutation mutation={LOGIN_MUTATION}>
          {(tokenAuth, {loading, client}) => {
            return (
              <form
                className={classes.form}
                onSubmit={(e) => handleSubmit(e, tokenAuth, client)}>
                <FormControl required margin='normal' fullWidth>
                  <InputLabel htmlFor='username'>Username</InputLabel>
                  <Input
                    id='username'
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl required margin='normal' fullWidth>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <Input
                    id='password'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button
                  className={classes.submit}
                  disabled={loading || !username.trim() || !password.trim()}
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                <Button
                  onClick={() => setNewUser(true)}
                  color='secondary'
                  fullWidth
                  variant='outlined'>
                  Register
                </Button>
              </form>
            );
          }}
        </Mutation>
      </Paper>
    </div>
  );
};

const styles = (theme) => ({
  root: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.secondary.main,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(Login);
