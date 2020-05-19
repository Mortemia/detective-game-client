import React from 'react';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { AppContext } from '../../../context/appContext';
import PaperList from '../../../components/PaperList';
import CreatorAPI from '../../../api/CreatorAPI';
import QuestionEditor from './QuestionEditor';

const creatorAPI = new CreatorAPI();

const FinalTest = _ => {
  const { appState } = React.useContext(AppContext);
  const [questions, setQuestions] = React.useState([]);
  const [editedQuestion, setEditedQuestion] = React.useState(null);

  const getComponentsFromAPI = _ => {
    creatorAPI.getNewDetectiveCase(appState.created_case_id).then(response => {
      setQuestions(response.data.newDetectiveCase.test);
    });
  };

  React.useEffect(() => {
    creatorAPI.getNewDetectiveCase(appState.created_case_id).then(response => {
      getComponentsFromAPI();
    });
  }, [appState.created_case_id]);

  const handleItemDelete = component => {
    const questionPayload = {
      question: { case_id: appState.created_case_id, ...component },
    };
    creatorAPI
      .deleteQuestion(questionPayload)
      .then(() => getComponentsFromAPI());
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4}>
          <PaperList
            listName='Stworzone pytania'
            items={questions}
            primary='content'
            addButton={() => setEditedQuestion(null)}
            navigate={question => {
              setEditedQuestion(question);
            }}
            action={handleItemDelete}
            icon={DeleteIcon}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <QuestionEditor
            question={editedQuestion}
            update={newQuestion => {
              getComponentsFromAPI();
              setEditedQuestion(newQuestion);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default FinalTest;
