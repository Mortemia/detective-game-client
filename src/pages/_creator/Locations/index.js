import React from 'react';
import Grid from '@material-ui/core/Grid';
import PaperList from '../../../components/PaperList';
import LocationEditor from './LocationEditor';
import { AppContext } from '../../../context/appContext';
import CreatorAPI from '../../../api/CreatorAPI';
import DeleteIcon from '@material-ui/icons/Delete';

const creatorAPI = new CreatorAPI();

const Locations = _ => {
  const handleAddLocation = _ => {
    setEditedComponent(null);
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

  const handleComponentEdit = type => component => {
    setEditedComponent({ type, component });
  };

  const handleComponentDelete = type => component => {
    const componentPayload = {
      [type]: {
        case_id: appState.created_case_id,
        id: component.id,
      },
    };
    if (type === 'location')
      creatorAPI
        .deleteLocation(componentPayload)
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
            addButton={handleAddLocation}
            navigate={handleComponentEdit('location')}
            action={handleComponentDelete('location')}
            icon={DeleteIcon}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <LocationEditor
            location={editedComponent?.component}
            update={location => {
              getComponentsFromAPI();
              setEditedComponent({ type: 'location', component: location });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <PaperList
            listName='Stworzone połączenia'
            items={connections}
            primary='location1'
            secondary='location2'
            navigate={handleComponentEdit('connection')}
            action={handleComponentDelete}
            icon={DeleteIcon}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          Graph placeholder
        </Grid>
      </Grid>
    </>
  );
};

export default Locations;
