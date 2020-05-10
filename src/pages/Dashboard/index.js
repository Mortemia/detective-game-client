import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PaperList from '../../components/PaperList';
import Banner from './Banner';
import { casesInProgress } from '../../fakedata';
import UserAPI from '../../api/UserAPI';
import GameAPI from '../../api/GameAPI';
import { AppContext } from '../../context/appContext';
import { GameContext } from '../../context/gameContext';

const API = new UserAPI();
const gameAPI = new GameAPI();

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [activeCases, setActiveCases] = React.useState([]);
  const [createdCases, setCreatedCases] = React.useState([]);
  const history = useHistory();

  const { appState, appDispatch } = React.useContext(AppContext);
  const { game, dispatch } = React.useContext(GameContext);

  const loggedUser = appState.user;
  React.useEffect(() => {
    API.getActiveDetectiveCases(loggedUser.id).then(response => {
      response && setActiveCases(response.data.detectiveCaseList);
    });
    API.getCreatedeDetectiveCases(loggedUser.id).then(response => {
      response && setCreatedCases(response.data.detectiveCaseList);
    });
  }, [loggedUser.id]);

  const handleActiveCaseSelection = selectedCase => {
    const saveDetectiveCaseRequest = {
      caseId: selectedCase.id,
      userId: loggedUser.id,
    };
    gameAPI.getDetectiveCaseSave(saveDetectiveCaseRequest).then(response => {
      const save = JSON.parse(response.data.jsonSave);
      dispatch({
        type: 'LOAD_GAME',
        save: save,
      });
      let path = '/play';
      history.push(path);
    });
  };

  const handleCreatedCaseSelection = selectedCase => {
    localStorage.setItem('created_case_id', selectedCase.id);
    appDispatch({
      type: 'SET_CREATED_CASE',
      created_case_id: selectedCase.id,
    });
    let path = '/creator';
    history.push(path);
  };

  return (
    <>
      <div className={classes.paper}>
        <Banner name={loggedUser && loggedUser.name} />
      </div>
      <div className={classes.paper}>
        <PaperList
          listName={
            !activeCases.length
              ? 'Nie masz żadnych spraw w toku'
              : 'Sprawy w toku'
          }
          primary='name'
          secondary=''
          items={activeCases || []}
          navigate={handleActiveCaseSelection}
        />
      </div>
      <div className={classes.paper}>
        <PaperList
          listName='Własne sprawy'
          primary='name'
          items={createdCases || []}
          navigate={handleCreatedCaseSelection}
        />
      </div>
    </>
  );
};

export default Dashboard;
