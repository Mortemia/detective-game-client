import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreatorAPI from '../../api/CreatorAPI';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Typography } from '@material-ui/core';

const creatorAPI = new CreatorAPI();

const useStyles = makeStyles(theme => ({
  textfield: {
    marginBottom: theme.spacing(1),
  },
  typography: {
    marginTop: theme.spacing(3),
  },
}));

const NewCaseDialog = _ => {
  const classes = useStyles();

  const history = useHistory();

  const { appDispatch } = React.useContext(AppContext);

  return (
    <Dialog open={true} scroll='paper' disableBackdropClick>
      <DialogTitle>Nowa sprawa detektywistyczna</DialogTitle>
      <Formik
        initialValues={{
          name: '',
          description: '',
        }}
        onSubmit={({ name, description }, { setSubmitting }) => {
          const detectiveCaseInfoRequest = {
            name,
            description,
          };
          creatorAPI.createDetectiveCaseInfo(detectiveCaseInfoRequest);
          let path = '/creator';
          history.push(path);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <DialogContent dividers>
              <Field
                component={TextField}
                name='name'
                type='text'
                label='Nazwa sprawy'
                fullWidth
                className={classes.textfield}
              />
              <br />
              <Field
                component={TextField}
                name='description'
                type='text'
                label='Krótki opis'
                fullWidth
                className={classes.textfield}
              />
              {isSubmitting && <LinearProgress />}
              <br />

              <Typography className={classes.typography} color='testSecondary'>
                Nazwa sprawy i jej opis mogą zostać zmienione później.
              </Typography>
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
    </Dialog>
  );
};

export default NewCaseDialog;
