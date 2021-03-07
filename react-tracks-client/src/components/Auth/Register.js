import React, { useState } from 'react';
import { Mutation } from 'react-apollo'; // so we can execute mutations
import { gql } from 'apollo-boost';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Gavel from '@material-ui/icons/Gavel';
import VerifiedUserTwoTone from '@material-ui/icons/VerifiedUserTwoTone';

const Register = ({ classes, setNewUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false); // turns true when registered

  const handleSubmit = async (e, createUser) => {
    e.preventDefault(); // prevents page refreshing on submit to prevent excess server strain
    const res = await createUser({
      variables: {
        username, // same as username: username,
        email,
        password,
      },
    });
    console.log('res', res);
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Gavel />
        </Avatar>
        <Typography variant='headline'>Register</Typography>
        <Mutation mutation={REGISTER_MUTATION}>
          {(createUser, { loading, error }) => {
            return (
              <form
                className={classes.form}
                onSubmit={(e) => handleSubmit(e, createUser)}>
                <FormControl required margin='normal' fullWidth>
                  <InputLabel htmlFor='username'>Username</InputLabel>
                  <Input
                    id='username'
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl required margin='normal' fullWidth>
                  <InputLabel htmlFor='email'>Email</InputLabel>
                  <Input
                    id='email'
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
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
                  disabled={
                    loading ||
                    !username.trim() ||
                    !email.trim() ||
                    !password.trim()
                  }
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='secondary'>
                  {loading ? 'Registering...' : 'Register'}
                </Button>
                <Button
                  onClick={() => setNewUser(false)}
                  color='primary'
                  fullWidth
                  variant='outlined'>
                  Previous user? Log in here
                </Button>
                {error && <div>Error</div>}
              </form>
            );
          }}
        </Mutation>
      </Paper>

      <Dialog open={open} disableBackdropClick={true}>
        {/* only opens when open prop is true */}
        <DialogTitle>
          <VerifiedUserTwoTone className={classes.icon} />
          New Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>User created successfully</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color='primary'
            varient='contained'
            onClick={() => setNewUser(false)}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const REGISTER_MUTATION = gql`
  mutation createUser($email: String!, $password: String!, $username: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        username
        email
      }
    }
  }
`;

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
    color: theme.palette.openTitle,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  icon: {
    padding: '0px 2px 2px 0px',
    verticalAlign: 'middle',
    color: 'green',
  },
});

export default withStyles(styles)(Register);
