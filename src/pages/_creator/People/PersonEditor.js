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

const PersonEditor = ({ person, update }) => {
  const classes = useStyles();
  const { appState } = React.useContext(AppContext);
  const [revealedToggle, setRevealedToggle] = React.useState(false);

  const handleRevealedToggle = () => {
    revealedToggle ? setRevealedToggle(false) : setRevealedToggle(true);
  };

  React.useEffect(() => {
    setRevealedToggle(person?.revealed || false);
  }, [person]);

  return (
    <Paper className={classes.paper}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        {person ? 'Edycja osoby' : 'Dodawanie nowej osoby'}
      </Typography>
      <Formik
        enableReinitialize
        initialValues={{
          fullname: person?.fullname || '',
          description: person?.description || '',
          examineInfo: person?.examineInfo || '',
          exam_cost: person?.exam_cost || '',
        }}
        onSubmit={({ fullname, description }, { setSubmitting }) => {
          const personPayload = {
            person: {
              case_id: appState.created_case_id,
              id: person?.id,
              fullname,
              description,
              revealed: revealedToggle,
            },
          };

          creatorAPI[person ? 'updatePerson' : 'createPerson'](
            personPayload
          ).then(response => {
            setSubmitting(false);
            update(response.data.person);
          });
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <DialogContent className={classes.form}>
              <Field
                component={TextField}
                name='fullname'
                type='text'
                label='Imię i nazwisko / pseudonim'
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
                label='Opis osoby'
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
                label='Osoba znana od początku gry'
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

export default PersonEditor;
