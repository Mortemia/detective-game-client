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

const ItemEditor = ({ item, update }) => {
  const classes = useStyles();
  const { appState } = React.useContext(AppContext);
  const [revealedToggle, setRevealedToggle] = React.useState(false);

  const handleRevealedToggle = () => {
    revealedToggle ? setRevealedToggle(false) : setRevealedToggle(true);
  };

  React.useEffect(() => {
    setRevealedToggle(item?.revealed || false);
  }, [item]);

  return (
    <Paper className={classes.paper}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        {item ? 'Edycja przedmiotu' : 'Dodawanie nowego przedmiotu'}
      </Typography>
      <Formik
        enableReinitialize
        initialValues={{
          name: item?.name || '',
          description: item?.description || '',
          examineInfo: item?.examineInfo || '',
          exam_cost: item?.exam_cost || '',
        }}
        onSubmit={(
          { name, description, examineInfo, exam_cost },
          { setSubmitting }
        ) => {
          const itemPayload = {
            item: {
              case_id: appState.created_case_id,
              id: item?.id,
              name,
              description,
              examineInfo,
              exam_cost,
              revealed: revealedToggle,
            },
          };

          creatorAPI[item ? 'updateItem' : 'createItem'](itemPayload).then(
            response => {
              setSubmitting(false);
              update(response.data.item);
            }
          );
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <DialogContent className={classes.form}>
              <Field
                component={TextField}
                name='name'
                type='text'
                label='Nazwa przedmiotu'
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

              <Field
                component={TextField}
                name='examineInfo'
                type='text'
                label='Wynik zbadania przedmiotu'
                variant='outlined'
                fullWidth
                multiline
                rowsMax={6}
                className={classes.textfield}
                style={{
                  marginBottom: '24px',
                }}
              />

              <Field
                component={TextField}
                name='exam_cost'
                type='number'
                label='Koszt zbadania przedmiotu w PR'
                variant='outlined'
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
                label='Przedmiot dostępny od początku gry'
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

export default ItemEditor;
