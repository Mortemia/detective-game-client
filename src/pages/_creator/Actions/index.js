import React from 'react';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { AppContext } from '../../../context/appContext';
import PaperList from '../../../components/PaperList';
import CreatorAPI from '../../../api/CreatorAPI';
import ActionEditor from './ActionEditor';

const creatorAPI = new CreatorAPI();

const Actions = _ => {
  const { appState } = React.useContext(AppContext);
  const [actions, setActions] = React.useState([]);
  const [editedAction, setEditedAction] = React.useState(null);

  const getComponentsFromAPI = _ => {
    creatorAPI.getNewDetectiveCase(appState.created_case_id).then(response => {
      setActions(response.data.newDetectiveCase.actions);
    });
  };

  React.useEffect(() => {
    creatorAPI.getNewDetectiveCase(appState.created_case_id).then(response => {
      getComponentsFromAPI();
    });
  }, [appState.created_case_id]);

  const handleActionDelete = component => {
    const actionPayload = {
      action: { case_id: appState.created_case_id, ...component },
    };

    creatorAPI.deleteAction(actionPayload).then(() => getComponentsFromAPI());
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4}>
          <PaperList
            listName='Stworzone akcje'
            items={actions}
            primary='name'
            addButton={() => setEditedAction(null)}
            navigate={action => setEditedAction(action)}
            action={handleActionDelete}
            icon={DeleteIcon}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <ActionEditor action={editedAction} update={getComponentsFromAPI} />
        </Grid>
      </Grid>
    </>
  );
};

export default Actions;
