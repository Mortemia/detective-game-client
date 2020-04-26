import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import IconInput from '../../components/IconInput';
import { AppContext } from '../../context/appContext';
import UserAPI from '../../api/UserAPI';
import { snackbars } from '../../constants/snackbars';

const API = new UserAPI();

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: 20,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const { appDispatch } = useContext(AppContext);
  const history = useHistory();

  const handleChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const handleLogin = () => {
    const user = {
      usernameOrEmail: state.usernameOrEmail,
    };

    API.signIn(state)
      .then((response) => {
        appDispatch({ type: 'LOGIN', user });
        appDispatch({
          type: 'OPEN_SNACKBAR',
          snackbar: snackbars.successLogin,
        });
        let path = '/dashboard';
        history.push(path);
      })
      .catch((error) => {
        appDispatch({
          type: 'OPEN_SNACKBAR',
          snackbar: snackbars.errorLogin,
        });
      });
    //;
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
          label='Login'
          icon={AccountCircleIcon}
          change={handleChange}
          type='usernameOrEmail'
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
