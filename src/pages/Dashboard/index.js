import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PaperList from '../../components/PaperList';
import Banner from './Banner';
import { gamesInProgress, casesInProgress } from '../../fakedata';
import UserAPI from '../../api/UserAPI';
import GameAPI from '../../api/GameAPI';
import { AppContext } from '../../context/appContext';

const API = new UserAPI();
const gameAPI = new GameAPI();

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [activeCases, setActiveCases] = React.useState(null);
  const { appState } = React.useContext(AppContext);
  const loggedUser = appState.user;

  React.useEffect(() => {
    API.getActiveDetectiveCases(loggedUser.id).then(response => {
      setActiveCases(response.data.detectiveCaseList);
    });
  }, []);

  const handleCaseSelection = selectedCase => {
    const saveDetectiveCaseRequest = {
      caseId: selectedCase.id,
      userId: loggedUser.id,
    };
    gameAPI
      .getDetectiveCaseSave(saveDetectiveCaseRequest)
      .then(response => console.log(response));
  };

  return (
    <>
      <div className={classes.paper}>
        {console.log(loggedUser)}
        <Banner name={loggedUser && loggedUser.name} />
      </div>
      <div className={classes.paper}>
        <PaperList
          listName='Sprawy w toku'
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
