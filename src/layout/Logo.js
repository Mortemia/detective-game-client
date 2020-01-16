import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  title: {
    textDecoration: 'none',
    color: 'white',
    outline: 'none',
  },
  container: {
    flexGrow: 1,
  },
}));

const Logo = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography
        variant='h6'
        className={classes.title}
        component={Link}
        to='/'
      >
        Gra detektywistyczna
      </Typography>
    </div>
  );
};

export default Logo;
