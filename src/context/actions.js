import Cookie from 'js-cookie';
import { snackbars } from '../constants/snackbars';
import { setAuthToken } from '../api/API';

export const login = (appDispatch, data) => {
  const user = data.user;
  localStorage.setItem('user', JSON.stringify(user));
  Cookie.set('token', data.accessToken);
  appDispatch({ type: 'LOGIN', user });
  appDispatch({
    type: 'OPEN_SNACKBAR',
    snackbar: snackbars.successSignUp,
  });
};

export const logout = (appDispatch, history) => {
  appDispatch({ type: 'LOGOUT' });
  let path = 'login';
  history.push(path);
  localStorage.removeItem('user');
  Cookie.remove('token');
};

export const actionByType = (dispatchers, game, component, type) => {
  switch (type) {
    case 'actions': {
      return executeAction(dispatchers, game, component);
    }
    case 'items': {
      return examineItem(dispatchers, game, component);
    }
    default: {
    }
  }
};

export const travel = (dispatchers, game, destination) => {
  const { dispatch, appDispatch } = dispatchers;
  game.movement_points - destination.cost >= 0
    ? dispatch({ type: 'TRAVEL', destination })
    : appDispatch({
        type: 'OPEN_SNACKBAR',
        snackbar: snackbars.errorTravel,
      });
};

export const examineItem = (dispatchers, game, item) => {
  const { dispatch, appDispatch } = dispatchers;
  let success = false;
  if (!item.examined) {
    success = true;
    dispatch({
      type: 'EXAMINE',
      item,
      updatedMovementPoints: game.movement_points - item.exam_cost,
    });
    appDispatch({
      type: 'OPEN_SNACKBAR',
      snackbar: snackbars.successExamine,
    });
  } else
    appDispatch({
      type: 'OPEN_SNACKBAR',
      snackbar: snackbars.errorExamine,
    });

  return success;
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
      updatedMovementPoints: game.movement_points - action.time,
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
