import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  margin: {
    //  margin: theme.spacing(1),
  },
}));

const IconInput = props => {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems='flex-end'>
        <Grid item>
          <props.icon />
        </Grid>
        <Grid item>
          <TextField id={props.id} label={props.label} type={props.type} />
        </Grid>
      </Grid>
    </div>
  );
};

export default IconInput;
