import React from 'react';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { AppContext } from '../../../context/appContext';
import PaperList from '../../../components/PaperList';
import CreatorAPI from '../../../api/CreatorAPI';
import ItemEditor from './ItemEditor';

const creatorAPI = new CreatorAPI();

const Items = _ => {
  const { appState } = React.useContext(AppContext);
  const [items, setItems] = React.useState([]);
  const [editedItem, setEditedItem] = React.useState(null);

  const getComponentsFromAPI = _ => {
    creatorAPI.getNewDetectiveCase(appState.created_case_id).then(response => {
      setItems(response.data.newDetectiveCase.items);
    });
  };

  React.useEffect(() => {
    creatorAPI.getNewDetectiveCase(appState.created_case_id).then(response => {
      getComponentsFromAPI();
    });
  }, [appState.created_case_id]);

  const handleItemDelete = component => {
    const itemPayload = {
      item: { case_id: appState.created_case_id, ...component },
    };

    creatorAPI.deleteItem(itemPayload).then(() => getComponentsFromAPI());
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4}>
          <PaperList
            listName='Stworzone przedmioty'
            items={items}
            primary='name'
            addButton={item => setEditedItem(null)}
            navigate={item => setEditedItem(item)}
            action={handleItemDelete}
            icon={DeleteIcon}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <ItemEditor item={editedItem} update={getComponentsFromAPI} />
        </Grid>
      </Grid>
    </>
  );
};

export default Items;
