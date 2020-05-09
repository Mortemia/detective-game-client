import React from 'react';
import Grid from '@material-ui/core/Grid';
import PaperList from '../../../components/PaperList';
import LocationEditor from './LocationEditor';
import { AppContext } from '../../../context/appContext';
import CreatorAPI from '../../../api/CreatorAPI';
import DeleteIcon from '@material-ui/icons/Delete';
import ConnectionsEditor from './ConnectionsEditor';
import LocationGraph from './Graph';

const creatorAPI = new CreatorAPI();

const Locations = _ => {
  const handleAddComponent = type => _ => {
    setEditedComponent({ type, component: null });
  };
  const { appState } = React.useContext(AppContext);

  const [locations, setLocations] = React.useState([]);
  const [connections, setConnections] = React.useState([]);
  const [editedComponent, setEditedComponent] = React.useState(null);

  const getComponentsFromAPI = _ => {
    creatorAPI.getNewDetectiveCase(appState.created_case_id).then(response => {
      setLocations(response.data.newDetectiveCase.locations);
      setConnections(response.data.newDetectiveCase.paths);
    });
  };
  React.useEffect(() => {
    getComponentsFromAPI();
  }, [appState.created_case_id]);

  const getIdByLocation = name =>
    name && locations.find(location => location.name === name).id;

  const handleComponentEdit = type => component => {
    setEditedComponent({ type, component });
  };

  const handleComponentDelete = type => component => {
    const componentPayload = {
      [type]: {
        case_id: appState.created_case_id,
        id: component?.id,
        location1: getIdByLocation(component.location1),
        location2: getIdByLocation(component.location2),
        time: component?.time,
      },
    };
    if (type === 'location')
      creatorAPI
        .deleteLocation(componentPayload)
        .then(() => getComponentsFromAPI());
    else
      creatorAPI
        .deleteLocationConnection(componentPayload)
        .then(() => getComponentsFromAPI());
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4}>
          <PaperList
            listName='Stworzone miejsca'
            items={locations}
            primary='name'
            addButton={handleAddComponent('location')}
            navigate={handleComponentEdit('location')}
            action={handleComponentDelete('location')}
            icon={DeleteIcon}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          {editedComponent?.type === 'connection' ? (
            <ConnectionsEditor
              connection={editedComponent?.component}
              locations={locations}
            />
          ) : (
            <LocationEditor
              location={editedComponent?.component}
              update={location => {
                getComponentsFromAPI();
                setEditedComponent({ type: 'location', component: location });
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <PaperList
            listName='Stworzone połączenia'
            items={connections}
            primary='location1'
            secondary='location2'
            addButton={handleAddComponent('connection')}
            navigate={handleComponentEdit('connection')}
            action={handleComponentDelete('locationConnection')}
            icon={DeleteIcon}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          {locations.length >= 1 && (
            <LocationGraph locations={locations} connections={connections} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Locations;
