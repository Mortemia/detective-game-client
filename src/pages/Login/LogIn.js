import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import IconInput from '../../components/IconInput';

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: 20,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({ username: '', password: '' });

  const handleChange = name => value => {
    setState({ ...state, [name]: value });
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
          change={handleChange('username')}
        />
      </Grid>
      <Grid item>
        <IconInput
          id='password'
          label='Hasło'
          type='password'
          icon={LockIcon}
          value={state.password}
          change={handleChange('password')}
        />
      </Grid>
      <Grid item>
        <Button variant='contained' color='primary' className={classes.margin}>
          Zaloguj się
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
