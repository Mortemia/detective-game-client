import React from 'react';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { AppContext } from '../../../context/appContext';
import PaperList from '../../../components/PaperList';
import CreatorAPI from '../../../api/CreatorAPI';
import PersonEditor from './PersonEditor';

const creatorAPI = new CreatorAPI();

const People = _ => {
  const { appState } = React.useContext(AppContext);
  const [people, setPeople] = React.useState([]);
  const [editedPerson, setEditedPerson] = React.useState(null);

  const getComponentsFromAPI = _ => {
    creatorAPI.getNewDetectiveCase(appState.created_case_id).then(response => {
      setPeople(response.data.newDetectiveCase.people);
    });
  };

  React.useEffect(() => {
    creatorAPI.getNewDetectiveCase(appState.created_case_id).then(response => {
      getComponentsFromAPI();
    });
  }, [appState.created_case_id]);

  const handlePersonDelete = component => {
    const personPayload = {
      person: { case_id: appState.created_case_id, ...component },
    };

    creatorAPI.deletePerson(personPayload).then(() => getComponentsFromAPI());
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4}>
          <PaperList
            listName='Stworzone osoby'
            items={people}
            primary='fullname'
            addButton={() => setEditedPerson(null)}
            navigate={person => setEditedPerson(person)}
            action={handlePersonDelete}
            icon={DeleteIcon}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <PersonEditor person={editedPerson} update={getComponentsFromAPI} />
        </Grid>
      </Grid>
    </>
  );
};

export default People;
