import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PaperList from '../../components/PaperList';
import Banner from './Banner';
import { gamesInProgress, casesInProgress } from '../../fakedata';
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
  const history = useHistory();

  const { appState } = React.useContext(AppContext);
  const { game, dispatch } = React.useContext(GameContext);

  const loggedUser = appState.user;
  React.useEffect(() => {
    API.getActiveDetectiveCases(loggedUser.id).then(response => {
      response && setActiveCases(response.data.detectiveCaseList);
    });
  }, [loggedUser.id]);

  const handleCaseSelection = selectedCase => {
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
          secondary='modified'
          items={activeCases || []}
          navigate={handleCaseSelection}
        />
      </div>
      <div className={classes.paper}>
        <PaperList
          listName='Własne sprawy'
          primary='primary'
          items={casesInProgress}
        />
      </div>
    </>
  );
};

export default Dashboard;
