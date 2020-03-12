import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import IconInput from '../../components/IconInput';
import { AppContext } from '../../context/appContext';

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: 20,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { appDispatch } = useContext(AppContext);

  const handleChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const handleLogin = () => {
    const user = {
      username: state.username,
      email: state.email,
    };
    appDispatch({ type: 'LOGIN', user });
  };

  return (
    <Grid
      container
      spacing={3}
      justify='center'
      alignItems='center'
      direction='column'
    >
      <Grid item>
        <IconInput
          id='username'
          label='Użytkownik'
          icon={AccountCircleIcon}
          change={handleChange}
          type='username'
        />
      </Grid>
      <Grid item>
        <IconInput
          id='email'
          label='Adres e-mail'
          icon={AccountCircleIcon}
          change={handleChange}
          type='email'
        />
      </Grid>
      <Grid item>
        <IconInput
          id='password'
          label='Hasło'
          type='password'
          icon={LockIcon}
          change={handleChange}
        />
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          color='primary'
          className={classes.margin}
          onClick={handleLogin}
        >
          Zaloguj się
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
