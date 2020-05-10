import React from 'react';
import Grid from '@material-ui/core/Grid';
import TreeDiagram from './TreeDiagram';
import { AppContext } from '../../../context/appContext';
import CreatorAPI from '../../../api/CreatorAPI';

const creatorAPI = new CreatorAPI();

const Dashboard = _ => {
  const { appState } = React.useContext(AppContext);
  const [data, setData] = React.useState(null);
  const [tree, setTree] = React.useState(null);

  React.useEffect(() => {
    creatorAPI.getNewDetectiveCase(appState.created_case_id).then(response => {
      const detectiveCase = response.data.newDetectiveCase;
      setData(detectiveCase);
    });
  }, [appState.created_case_id]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} md={3}>
          Components list placeholder
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          {data && <TreeDiagram data={data} />}
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
