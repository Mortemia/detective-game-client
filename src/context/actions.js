import { snackbars } from '../constants/snackbars';

export const travel = (dispatchers, game, destination) => {
  const { dispatch, appDispatch } = dispatchers;
  game.movement_points - destination.cost >= 0
    ? dispatch({ type: 'TRAVEL', destination })
    : appDispatch({
        type: 'OPEN_SNACKBAR',
        snackbar: snackbars.errorTravel,
      });
};

export const examineItem = (dispatchers, item) => {
  const { dispatch, appDispatch } = dispatchers;
  if (!item.examined) {
    dispatch({ type: 'EXAMINE', item });
    appDispatch({
      type: 'OPEN_SNACKBAR',
      snackbar: snackbars.successExamine,
    });
  } else
    appDispatch({
      type: 'OPEN_SNACKBAR',
      snackbar: snackbars.errorExamine,
    });
};

export const executeAction = (dispatchers, game, action) => {
  const { dispatch, appDispatch } = dispatchers;

  const components = [
    { s: 'locations', m: 'locations' },
    { s: 'actions', m: 'actions' },
    { s: 'items', m: 'items' },
    { s: 'people', m: 'people' },
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

  if (action.location === game.location || !action.location) {
    dispatch({
      type: 'EXECUTE_ACTION',
      action,
      updatedComponents,
    });
    appDispatch({
      type: 'OPEN_SNACKBAR',
      snackbar: snackbars.successActionExecution,
    });
  } else
    appDispatch({
      type: 'OPEN_SNACKBAR',
      snackbar: snackbars.errorDifferentActionLocation,
    });

  return action.location === game.location || !action.location;
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
