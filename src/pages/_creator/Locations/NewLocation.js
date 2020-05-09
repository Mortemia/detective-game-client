import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Typography } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CreatorAPI from '../../../api/CreatorAPI';
import { AppContext } from '../../../context/appContext';

const creatorAPI = new CreatorAPI();

const useStyles = makeStyles(theme => ({
  paper: {
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: ' space-between',
    height: '200px',
  },
}));

const NewLocation = _ => {
  const classes = useStyles();
  const { appState } = React.useContext(AppContext);

  return (
    <Paper className={classes.paper}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Dodawanie nowego miejsca
      </Typography>
      <Formik
        initialValues={{
          name: '',
          description: '',
        }}
        onSubmit={({ name, description }, { setSubmitting }) => {
          const locationPayload = {
            id: appState.created_case_id,
            name,
            description,
          };
          //creatorAPI.createLocation(locationPayload);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <DialogContent className={classes.form}>
              <Field
                component={TextField}
                name='name'
                type='text'
                label='Nazwa miejsca'
                variant='outlined'
                className={classes.textfield}
              />
              <Field
                component={TextField}
                name='description'
                type='text'
                label='Opis'
                variant='outlined'
                fullWidth
                className={classes.textfield}
              />
              {isSubmitting && <LinearProgress />}
              <br />

              <Typography
                className={classes.typography}
                color='textSecondary'
              ></Typography>
            </DialogContent>
            <DialogActions>
              <Button
                color='primary'
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Zatwierdź
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default NewLocation;
