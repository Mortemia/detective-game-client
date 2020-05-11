import React from 'react';
import Grid from '@material-ui/core/Grid';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import TreeDiagram from './TreeDiagram';
import { AppContext } from '../../../context/appContext';
import CreatorAPI from '../../../api/CreatorAPI';
import ComponentsList from './ComponentsList';
import ItemEditor from '../Items/ItemEditor';
import LocationEditor from '../Locations/LocationEditor';
import ConnectionsEditor from '../Locations/ConnectionsEditor';
import PersonEditor from '../People/PersonEditor';

const creatorAPI = new CreatorAPI();

const Dashboard = _ => {
  const { appState } = React.useContext(AppContext);
  const [data, setData] = React.useState(null);
  const [editedComponent, setEditedComponent] = React.useState({
    drawer: false,
    component: null,
  });

  const handleOpenDrawer = component => {
    console.log(component);
    setEditedComponent({ drawer: true, component });
  };

  const handleCloseDrawer = () =>
    setEditedComponent({ drawer: false, component: null });

  const getComponentsFromAPI = _ => {
    creatorAPI.getNewDetectiveCase(appState.created_case_id).then(response => {
      const detectiveCase = response.data.newDetectiveCase;
      setData(detectiveCase);
    });
  };

  React.useEffect(() => {
    getComponentsFromAPI();
  }, [appState.created_case_id]);

  const componentEditor = () => {
    console.log(editedComponent);
    const component = {
      ...editedComponent.component,
      id: editedComponent.component.componentId,
    };
    const update = () => {
      getComponentsFromAPI();
      handleCloseDrawer();
    };
    switch (editedComponent.component.type) {
      case 'items':
        return <ItemEditor item={component} update={update} />;
      case 'locations':
        return (
          <>
            <LocationEditor location={component} update={update} />
            <ConnectionsEditor locations={data.locations} />
          </>
        );
      case 'people':
        return <PersonEditor person={component} update={update} />;
      default:
        return;
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} md={3}>
          <ComponentsList data={data} />
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          {data && (
            <TreeDiagram
              data={data}
              componentDrawer={component => handleOpenDrawer(component)}
            />
          )}
        </Grid>
      </Grid>
      <SwipeableDrawer
        anchor='right'
        open={editedComponent.drawer}
        onClose={handleCloseDrawer}
        onOpen={() => setEditedComponent({ ...editedComponent, drawer: true })}
      >
        {editedComponent.component && componentEditor()}
      </SwipeableDrawer>
    </>
  );
};

export default Dashboard;
