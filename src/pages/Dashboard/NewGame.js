import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PaperList from '../../components/PaperList';
import GameAPI from '../../api/GameAPI';
import { AppContext } from '../../context/appContext';

const gameAPI = new GameAPI();

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(4),
  },
}));

const NewGame = _ => {
  const classes = useStyles();

  const { appState } = React.useContext(AppContext);
  const [allCases, setAllCases] = React.useState([]);

  const loggedUser = appState.user;

  const handleCaseSelection = selectedCase => {
    const caseId = selectedCase.id;
    gameAPI.getNewDetectiveCase(caseId).then(response => console.log(response));
  };

  React.useEffect(() => {
    gameAPI
      .getAllCases()
      .then(response => setAllCases(response.data.detectiveCaseList));
  }, [loggedUser]);

  return (
    <div className={classes.paper}>
      <PaperList
        listName='Wybierz scenariusz do zagrania'
        primary='name'
        secondary='description'
        items={allCases}
        navigate={handleCaseSelection}
      />
    </div>
  );
};

export default NewGame;
