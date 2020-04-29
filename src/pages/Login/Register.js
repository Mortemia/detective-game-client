import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import IconInput from '../../components/IconInput';
import { AppContext } from '../../context/appContext';
import UserAPI from '../../api/UserAPI';
import { snackbars } from '../../constants/snackbars';
import { validateOnBlur } from '../../utils/validators';

const API = new UserAPI();

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(2),
    margin: 2,
  },
  margin: {
    margin: 20,
  },
}));

const Register = () => {
  const { appDispatch } = useContext(AppContext);
  const history = useHistory();

  const createExpiringCookie = (name, value, seconds) => {
    const maxAge = '; max-age=' + seconds;
    document.cookie =
      encodeURI(name) +
      '=' +
      encodeURI(value) +
      maxAge +
      ';path=/;SameSite=Lax';
  };

  const getCookieValue = a => {
    let i, x, y;
    let ARRcookies = document.cookie.split(';');
    for (i = 0; i < ARRcookies.length; i++) {
      x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1);
      x = x.replace(/^\s+|\s+$/g, '');
      if (x == a) {
        return unescape(y);
      }
    }
  };

  const classes = useStyles();
  const [state, setState] = useState({
    name: getCookieValue('name') || '',
    username: getCookieValue('username') || '',
    email: getCookieValue('email') || '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleRegister = _ => {
    ['name', 'username', 'email'].forEach(field =>
      createExpiringCookie(field, state[field], 5)
    );

    const possibleErrors = Object.keys(state).map(key => {
      const validateValue = validateOnBlur(state[key]);
      const status = validateValue[key] && validateValue[key]();
      return status;
    });

    let isValid = true;
    possibleErrors.forEach(possibleError => {
      if (possibleError && possibleError.validateStatus === 'error')
        isValid = false;
    });

    isValid
      ? signUp()
      : appDispatch({
          type: 'OPEN_SNACKBAR',
          snackbar: snackbars.errorSignUpFieldsFilledCorrectly,
        });
  };

  const signUp = () => {
    API.signUp(state)
      .then(response => {
        const user = {
          usernameOrEmail: state.username,
        };
        appDispatch({ type: 'LOGIN', user });
        appDispatch({
          type: 'OPEN_SNACKBAR',
          snackbar: snackbars.successSignUp,
        });
        let path = '/dashboard';
        history.push(path);
      })
      .catch(errors => {
        console.log(errors.response);
        appDispatch({
          type: 'OPEN_SNACKBAR',
          snackbar: snackbars.errorSignUpUserAlreadyExists,
        });
      });
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
          type='name'
          label='Twoje imię'
          icon={AccountCircleIcon}
          change={handleChange('name')}
          value={state.name}
        />
      </Grid>
      <Grid item>
        <IconInput
          type='username'
          label='Nazwa użytkownika'
          icon={AccountCircleIcon}
          change={handleChange('username')}
          value={state.username}
        />
      </Grid>
      <Grid item>
        <IconInput
          type='email'
          label='Adres e-mail'
          icon={AccountCircleIcon}
          change={handleChange('email')}
          value={state.email}
        />
      </Grid>
      <Grid item>
        <IconInput
          type='password'
          label='Hasło'
          icon={LockIcon}
          change={handleChange('password')}
          value={state.password}
        />
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          color='primary'
          className={classes.margin}
          onClick={handleRegister}
        >
          Zarejestruj się
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;
