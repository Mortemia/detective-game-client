import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { validateOnBlur } from '../utils/validators';

const IconInput = ({
  id,
  label,
  type,
  change,
  value,
  validation,
  ...props
}) => {
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState();

  const handleValidation = _ => {
    const validateValue = validateOnBlur(value);
    const status = validateValue[type] && validateValue[type]();
    setError(status ? status.validateStatus === 'error' : false);
    setHelperText(status && status.errorMsg);
  };

  return (
    <Grid container spacing={1} alignItems='flex-end'>
      <Grid item>
        <props.icon />
      </Grid>
      <Grid item>
        <TextField
          id={id}
          label={label}
          type={type}
          onChange={change}
          value={value}
          onBlur={handleValidation}
          error={error}
          helperText={helperText}
        />
      </Grid>
    </Grid>
  );
};

export default IconInput;
