import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import IconInput from '../../components/IconInput';

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
  const classes = useStyles();
  const [state, setState] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (name, value) => {
    setState({ ...state, [name]: value });
    return value;
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
        <IconInput
          id='confirmPassword'
          label='Powtórz hasło'
          type='password'
          icon={LockIcon}
          change={handleChange}
          fieldName='confirmPassword'
        />
      </Grid>
      <Grid item>
        <Button variant='contained' color='primary' className={classes.margin}>
          Zarejestruj się
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;
