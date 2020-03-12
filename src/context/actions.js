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

const errorDifferentActionLocation = {
  visible: true,
  severity: 'error',
  message: 'Musisz być w innej lokacji, aby wykonać akcję',
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

export const executeAction = (dispatchers, game, action) => {
  const { dispatch, appDispatch } = dispatchers;

  const components = [
    { s: 'location', m: 'locations' },
    { s: 'action', m: 'actions' },
    { s: 'item', m: 'items' },
    { s: 'person', m: 'people' },
  ];

  let updatedComponents = {};

  components
    .reduce(
      (result, component) =>
        result.concat([
          action.successors.filter(successor => successor.type === component.s),
        ]),
      []
    )
    .forEach((succesiveComponents, index) => {
      updatedComponents[components[index].m] = updateComponents(
        succesiveComponents,
        game[components[index].m]
      );
    });

  action.location === game.location || !action.location
    ? dispatch({
        type: 'EXECUTE_ACTION',
        action,
        updatedComponents,
      })
    : appDispatch({
        type: 'OPEN_SNACKBAR',
        snackbar: errorDifferentActionLocation,
      });
};

const updateComponents = (succesiveComponents, componentsList) => {
  const updatedComponents = succesiveComponents.reduce(
    (result, x) =>
      result.concat({
        ...componentsList.find(y => y.id === x.id),
        revealed: true,
      }),
    []
  );
  const updatedComponentsId = updatedComponents.map(x => x.id);
  return updatedComponents.concat(
    componentsList.filter(x => !updatedComponentsId.includes(x.id))
  );
};
