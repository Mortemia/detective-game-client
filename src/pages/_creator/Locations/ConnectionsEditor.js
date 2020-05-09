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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
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
    //height: '200px',
  },
}));

const ConnectionsEditor = ({ connection, update, locations }) => {
  const classes = useStyles();
  const { appState } = React.useContext(AppContext);

  const getIdByLocation = name =>
    name ? locations.find(location => location.name === name).id : '';

  const [firstLocation, setFirstLocation] = React.useState(
    getIdByLocation(connection?.location1) || ''
  );
  const [secondLocation, setSecondLocation] = React.useState(
    getIdByLocation(connection?.location2) || ''
  );

  const handleSelect = location => event => {
    location === 'first'
      ? setFirstLocation(event.target.value)
      : setSecondLocation(event.target.value);
  };

  React.useEffect(() => {
    setFirstLocation(getIdByLocation(connection?.location1) || '');
    setSecondLocation(getIdByLocation(connection?.location2) || '');
  }, [connection]);

  return (
    <Paper className={classes.paper}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        {connection ? 'Edycja połączenia' : 'Dodawanie nowego połączenia'}
      </Typography>
      <Formik
        enableReinitialize
        initialValues={{
          cost: connection?.cost || '',
        }}
        onSubmit={({ cost }, { setSubmitting }) => {
          const locationConnectionPayload = {
            locationConnection: {
              location1: firstLocation,
              location2: secondLocation,
              time: cost,
            },
          };
          creatorAPI[
            connection ? 'updateLocationConnection' : 'createLocationConnection'
          ](locationConnectionPayload).then(response => {
            setSubmitting(false);
            update(response.data.location);
          });
        }}
      >
        {({ submitForm, isSubmitting }) =>
          locations && (
            <Form>
              <DialogContent className={classes.form}>
                <FormControl
                  style={{
                    marginBottom: '24px',
                  }}
                >
                  <InputLabel
                    id='firstLocation'
                    style={{
                      marginLeft: '16px',
                    }}
                  >
                    Pierwsza lokalizacja
                  </InputLabel>
                  <Select
                    id='firstLocation'
                    variant='outlined'
                    value={firstLocation}
                    onChange={handleSelect('first')}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {locations.map((location, index) => (
                      <MenuItem value={location.id} key={index}>
                        {location.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
                  style={{
                    marginBottom: '24px',
                  }}
                >
                  <InputLabel
                    id='secondLocation'
                    style={{
                      marginLeft: '16px',
                    }}
                  >
                    Druga lokalizacja
                  </InputLabel>
                  <Select
                    id='secondLocation'
                    variant='outlined'
                    value={secondLocation}
                    onChange={handleSelect('second')}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {locations.map((location, index) => (
                      <MenuItem value={location.id} key={index}>
                        {location.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Field
                  component={TextField}
                  name='cost'
                  type='number'
                  label='Koszt połączenia w PR'
                  variant='outlined'
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
          )
        }
      </Formik>
    </Paper>
  );
};

export default ConnectionsEditor;
