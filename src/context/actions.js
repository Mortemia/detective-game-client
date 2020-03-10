const errorTravelSnackbar = {
  visible: true,
  severity: 'error',
  message: 'Niewystarczająca liczba punktów ruchu',
};

const successExamineSnackbar = {
  visible: true,
  severity: 'success',
  message: 'Przedmiot został zbadany',
};

const errorExamineSnackbar = {
  visible: true,
  severity: 'error',
  message: 'Przedmiot został zbadany już wcześniej',
};

export const travel = (dispatchers, game, destination) => {
  const { dispatch, appDispatch } = dispatchers;
  game.movement_points - destination.cost >= 0
    ? dispatch({ type: 'TRAVEL', destination })
    : appDispatch({
        type: 'OPEN_SNACKBAR',
        snackbar: errorTravelSnackbar,
      });
};

export const examineItem = (dispatchers, item) => {
  const { dispatch, appDispatch } = dispatchers;
  if (!item.examined) {
    dispatch({ type: 'EXAMINE', item });
    appDispatch({
      type: 'OPEN_SNACKBAR',
      snackbar: successExamineSnackbar,
    });
  } else
    appDispatch({
      type: 'OPEN_SNACKBAR',
      snackbar: errorExamineSnackbar,
    });
};
