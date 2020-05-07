import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreatorAPI from '../../api/CreatorAPI';

const creatorAPI = new CreatorAPI();

const NewCaseDialog = _ => {
  const history = useHistory();
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

  const { appDispatch } = React.useContext(AppContext);

  const handleClick = _ => {
    const detectiveCaseInfoRequest = {
      description: 'proba',
      name: 'proba',
    };
    creatorAPI.createDetectiveCaseInfo(detectiveCaseInfoRequest);
    let path = '/creator';
    history.push(path);
  };

  return (
    <Dialog
      open={open}
      scroll='paper'
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
      disableBackdropClick
    >
      <DialogTitle id='scroll-dialog-title'>
        Nowa sprawa detektywistyczna
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id='scroll-dialog-description'
          ref={descriptionElementRef}
          tabIndex={-1}
          color='textPrimary'
        ></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleClick}>
          Zatwierdź
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCaseDialog;
