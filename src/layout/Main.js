import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SimpleBar from '../layout/SimpleBar';
import MainRouter from '../routers/MainRouter';
import CustomizedSnackbars from '../components/Snackbar';
import { AppContext } from '../context/appContext';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    //display: 'flex'
  },
}));

const Main = () => {
  const classes = useStyles();
  const { appState, appDispatch } = useContext(AppContext);
  const snackbar = appState.snackbar;

  return (
    <>
      <SimpleBar />
      <div className={classes.root}>
        <MainRouter />
        <CustomizedSnackbars
          open={snackbar && snackbar.visible}
          message={snackbar && snackbar.message}
          severity={snackbar && snackbar.severity}
          onClick={() => appDispatch({ type: 'CLOSE_SNACKBAR', message: '' })}
        />
      </div>
    </>
  );
};

export default Main;
