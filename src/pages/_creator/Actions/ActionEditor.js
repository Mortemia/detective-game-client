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
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
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

const ActionEditor = ({ action, update }) => {
  const classes = useStyles();
  const { appState } = React.useContext(AppContext);
  const [revealedToggle, setRevealedToggle] = React.useState(false);
  const [successors, setSuccessors] = React.useState([]);
  const [data, setData] = React.useState(null);
  const [location, setLocation] = React.useState(action?.location || '');

  const getComponentsFromAPI = _ => {
    creatorAPI.getNewDetectiveCase(appState.created_case_id).then(response => {
      const detectiveCase = response.data.newDetectiveCase;
      console.log(detectiveCase);
      setData(detectiveCase);
    });
  };

  const handleSelect = event => {
    setLocation(event.target.value);
  };

  const handleSuccessorSelect = (event, currentId, type) => {
    let updatedSuccessors;
    if (currentId) {
      updatedSuccessors = successors.map(successor =>
        successor.id === currentId && successor.type === type
          ? { type, id: event.target.value }
          : successor
      );
    } else {
      updatedSuccessors = [...successors];
      const index = successors.findIndex(
        successor => !successor.id && successor.type === type
      );
      updatedSuccessors[index] = { type, id: event.target.value };
    }
    setSuccessors(updatedSuccessors);
  };

  const handleSuccessorDelete = (currentId, type) => {
    let updatedSuccessors;
    if (currentId) {
      updatedSuccessors = successors.filter(
        successor => !(successor.id === currentId && successor.type === type)
      );
    } else {
      updatedSuccessors = [...successors];
      const index = successors.findIndex(
        successor => !successor.id && successor.type === type
      );
      updatedSuccessors.splice(index, 1);
    }
    setSuccessors(updatedSuccessors);
  };

  const handleRevealedToggle = () => {
    revealedToggle ? setRevealedToggle(false) : setRevealedToggle(true);
  };

  const getComponentByTypeAndId = (type, id) =>
    data[type].find(component => component.id === id);

  React.useEffect(() => {
    getComponentsFromAPI();
    setLocation(action?.location || '');
    setRevealedToggle(action?.revealed || false);
    setSuccessors([]);
  }, [action]);

  React.useEffect(() => {
    if (action && data) {
      const mappedSuccessors = action.successors.map(({ type, id }) => {
        const component = getComponentByTypeAndId(type, id);
        return { type, id };
      });

      setSuccessors(mappedSuccessors);
    }
  }, [data]);

  const addSuccessor = type => {
    setSuccessors([...successors, { type, id: `` }]);
  };

  const translateType = type => {
    switch (type) {
      case 'actions':
        return 'Odkrywana akcja';
      case 'items':
        return 'Znaleziony przedmiot';
      case 'locations':
        return 'Odkrywane miejsce';
      case 'people':
        return 'Poznawana osoba';
      default:
        return;
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        {action ? 'Edycja akcji' : 'Dodawanie nowej akcji'}
      </Typography>
      <Formik
        enableReinitialize
        initialValues={{
          name: action?.name || '',
          description: action?.description || '',
          examineInfo: action?.examineInfo || '',
          time: action?.time ?? '',
        }}
        onSubmit={({ name, description, time }, { setSubmitting }) => {
          const actionPayload = {
            action: {
              caseId: appState.created_case_id,
              id: action?.id,
              name,
              description,
              time,
              revealed: revealedToggle,
              successors,
            },
          };
          creatorAPI[action ? 'updateAction' : 'createAction'](
            actionPayload
          ).then(response => {
            setSubmitting(false);
            update(response.data.action);
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
                label='Nazwa akcji'
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

              {data && (
                <FormControl
                  style={{
                    marginBottom: '24px',
                  }}
                >
                  <InputLabel
                    id='location'
                    style={{
                      marginLeft: '16px',
                    }}
                  >
                    Miejsce
                  </InputLabel>
                  <Select
                    id='location'
                    variant='outlined'
                    value={location}
                    disabled={isSubmitting}
                    onChange={handleSelect}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {data.locations.map((location, index) => (
                      <MenuItem value={location.name} key={index}>
                        {location.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <Field
                component={TextField}
                name='time'
                type='number'
                label='Koszt wykonania akcji w PR'
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
                label='Akcja dostępna od początku gry'
                style={{
                  marginBottom: '24px',
                }}
              />

              {successors &&
                successors.map(({ name, type, id }, index) => (
                  <FormControl
                    style={{
                      display: 'flex',
                      marginBottom: '24px',
                      flexDirection: 'row',
                    }}
                    key={index}
                  >
                    <InputLabel
                      id='location'
                      style={{
                        marginLeft: '16px',
                      }}
                    >
                      {translateType(type)}
                    </InputLabel>
                    <Select
                      id='location'
                      variant='outlined'
                      value={id}
                      fullWidth
                      disabled={isSubmitting}
                      onChange={event => handleSuccessorSelect(event, id, type)}
                    >
                      {data[type].map((component, index) => (
                        <MenuItem value={component.id} key={index}>
                          {component.name || component.fullname}
                        </MenuItem>
                      ))}
                    </Select>
                    <IconButton
                      edge='end'
                      onClick={() => handleSuccessorDelete(id, type)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </FormControl>
                ))}

              <Button
                color='primary'
                disabled={isSubmitting}
                onClick={() => addSuccessor('actions')}
              >
                Dodaj odkrywaną akcję
              </Button>
              <Button
                color='primary'
                disabled={isSubmitting}
                onClick={() => addSuccessor('locations')}
              >
                Dodaj odkrywane miejsce
              </Button>
              <Button
                color='primary'
                disabled={isSubmitting}
                onClick={() => addSuccessor('people')}
              >
                Dodaj odkrywaną osobę
              </Button>
              <Button
                color='primary'
                disabled={isSubmitting}
                onClick={() => addSuccessor('items')}
              >
                Dodaj odkrywany przedmiot
              </Button>

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

export default ActionEditor;
