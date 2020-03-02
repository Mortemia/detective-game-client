import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { validate } from '../utils/validators';

const useStyles = makeStyles(theme => ({
  margin: {
    //  margin: theme.spacing(1),
  },
}));

const IconInput = ({ id, label, type, fieldName, change, ...props }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    value: '',
    error: false,
    helperText: '',
  });

  const handleChange = event => {
    const value = event.target.value;
    const validateValue = validate(value);
    const status = validateValue[type] && validateValue[type]();
    const error = status ? status.validateStatus === 'error' : false;

    setState(prevState => ({
      ...state,
      error,
      value: !error ? change(type || fieldName, value) : prevState.value,
      helperText: status && status.errorMsg,
    }));
  };

  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems='flex-end'>
        <Grid item>
          <props.icon />
        </Grid>
        <Grid item>
          <TextField
            id={id}
            label={label}
            type={type}
            onChange={handleChange}
            value={state.value}
            error={state.error}
            helperText={state.helperText}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default IconInput;
