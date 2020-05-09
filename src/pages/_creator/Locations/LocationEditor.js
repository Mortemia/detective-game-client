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
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const creatorAPI = new CreatorAPI();

const useStyles = makeStyles(theme => ({
  paper: {
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: ' space-between',
    //height: '200px',
  },
}));

const NewLocation = ({ location, update }) => {
  const classes = useStyles();
  const { appState } = React.useContext(AppContext);
  const [revealedToggle, setRevealedToggle] = React.useState(false);
  const [startToggle, setStartToggle] = React.useState(false);

  const handleRevealedToggle = () => {
    revealedToggle ? setRevealedToggle(false) : setRevealedToggle(true);
  };

  const handleStartToggle = () => {
    startToggle ? setStartToggle(false) : setStartToggle(true);
  };

  React.useEffect(() => {
    setRevealedToggle(location?.revealed || false);
    setStartToggle(location?.start || false);
  }, [location]);

  return (
    <Paper className={classes.paper}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        {location ? 'Edycja miejsca' : 'Dodawanie nowego miejsca'}
      </Typography>
      <Formik
        enableReinitialize
        initialValues={{
          name: location?.name || '',
          description: location?.description || '',
        }}
        onSubmit={({ name, description }, { setSubmitting }) => {
          const locationPayload = {
            location: {
              case_id: appState.created_case_id,
              id: location?.id,
              name,
              description,
              revealed: revealedToggle,
              start: startToggle,
            },
          };

          creatorAPI[location ? 'updateLocation' : 'createLocation'](
            locationPayload
          ).then(response => {
            setSubmitting(false);
            update(response.data.location);
          });
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
                style={{
                  marginBottom: '24px',
                }}
              />
              <Field
                component={TextField}
                name='description'
                type='text'
                label='Opis'
                variant='outlined'
                fullWidth
                multiline
                rowsMax={6}
                className={classes.textfield}
                style={{
                  marginBottom: '24px',
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={revealedToggle}
                    onChange={handleRevealedToggle}
                    name='revealed'
                    disabled={isSubmitting}
                  />
                }
                label='Miejsce znane od początku gry'
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={startToggle}
                    onChange={handleStartToggle}
                    name='start'
                    disabled={isSubmitting}
                  />
                }
                label='Miejsce startowe'
              />

              {/* <Field
                component={Switch}
                name='revealed'
                label='Czy odkryty'
                onChange={handleToggle}
                checked={toggle}
                style={{
                  marginBottom: '24px',
                }}
              /> */}
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
