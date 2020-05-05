import React from 'react';
import { GameContext } from '../../context/gameContext';
import { AppContext } from '../../context/appContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getActionById } from '../../utils/gameUtils';
import { executeAction } from '../../context/actions';
import GameAPI from '../../api/GameAPI';

const gameAPI = new GameAPI();

const IntroductionDialog = _ => {
  const [open, setOpen] = React.useState(true);
  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const { game, dispatch } = React.useContext(GameContext);
  const { appDispatch } = React.useContext(AppContext);
  const dispatchers = {
    dispatch,
    appDispatch,
  };

  React.useEffect(() => {
    executeAction(dispatchers, game, getActionById(game, game.frst_action_id));
    appDispatch({ type: 'CLOSE_SNACKBAR', message: '' });
  }, [game.frst_action_id]);

  const handleClick = _ => {
    gameAPI.saveDetectiveCase(game);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      scroll='paper'
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
      disableBackdropClick
    >
      <DialogTitle id='scroll-dialog-title'>Wstęp</DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id='scroll-dialog-description'
          ref={descriptionElementRef}
          tabIndex={-1}
          color='textPrimary'
        >
          {getActionById(game, game.frst_action_id).description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleClick}>
          Rozwiąż zagadkę!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IntroductionDialog;
