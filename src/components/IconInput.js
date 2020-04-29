import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const IconInput = ({ id, label, type, fieldName, change, value, ...props }) => {
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
        />
      </Grid>
    </Grid>
  );
};

export default IconInput;
