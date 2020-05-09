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
    height: '400px',
  },
}));

const Settings = _ => {
  const classes = useStyles();
  const { appState } = React.useContext(AppContext);
  const [settings, setSettings] = React.useState(null);

  React.useEffect(() => {
    creatorAPI.getNewDetectiveCase(appState.created_case_id).then(response => {
      setSettings(response.data.newDetectiveCase);
    });
  }, [appState.created_case_id]);

  return (
    <Paper className={classes.paper}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Ustawienia scenariusza
      </Typography>
      <Formik
        enableReinitialize
        initialValues={{
          name: settings?.name || '',
          description: settings?.description || '',
          mp_per_day: settings?.mp_per_day || '',
          days: settings?.max_days || '',
        }}
        onSubmit={(
          { name, description, mp_per_day, days },
          { setSubmitting }
        ) => {
          const detectiveCaseInfoRequest = {
            id: appState.created_case_id,
            name,
            description,
            mp_per_day,
            days,
          };
          creatorAPI.updateDetectiveCaseInfo(detectiveCaseInfoRequest);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <DialogContent className={classes.form}>
              <Field
                component={TextField}
                name='name'
                type='text'
                label='Nazwa sprawy'
                variant='outlined'
                className={classes.textfield}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                component={TextField}
                name='description'
                type='text'
                label='Krótki opis'
                variant='outlined'
                fullWidth
                className={classes.textfield}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                component={TextField}
                name='mp_per_day'
                type='number'
                label='Punkty Ruchu na dzień'
                variant='outlined'
                className={classes.textfield}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={!settings}
              />
              <Field
                component={TextField}
                name='days'
                type='number'
                label='Maksymalna liczba dni'
                variant='outlined'
                className={classes.textfield}
                InputLabelProps={{
                  shrink: true,
                }}
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

export default Settings;
