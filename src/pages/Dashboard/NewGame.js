import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PaperList from '../../components/PaperList';
import GameAPI from '../../api/GameAPI';
import { AppContext } from '../../context/appContext';
import { GameContext } from '../../context/gameContext';

const gameAPI = new GameAPI();

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(4),
  },
}));

const NewGame = _ => {
  const classes = useStyles();
  const history = useHistory();

  const { appState } = React.useContext(AppContext);
  const { game, dispatch } = React.useContext(GameContext);

  const [allCases, setAllCases] = React.useState([]);

  const loggedUser = appState.user;

  const handleCaseSelection = selectedCase => {
    const caseId = selectedCase.id;

    gameAPI.getNewDetectiveCase(caseId).then(response => {
      const save = {
        ...response.data.newDetectiveCase,
        player_id: loggedUser.id,
        case_id: caseId,
        score: -1,
      };
      dispatch({
        type: 'LOAD_GAME',
        save: save,
      });
      let path = '/play/intro';
      history.push(path);
    });
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
