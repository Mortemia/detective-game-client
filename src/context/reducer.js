import { items } from '../fakedata';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        username: action.user.username,
        email: action.user.email,
      };
    case 'TRAVEL':
      return {
        ...state,
        location: action.destination.name,
        movement_points: state.movement_points - action.destination.cost,
      };
    case 'OPEN_SNACKBAR':
      return {
        ...state,
        visible: true,
        severity: action.severity,
        message: action.message,
      };
    case 'CLOSE_SNACKBAR':
      return {
        ...state,
        visible: false,
      };
    case 'EXAMINE':
      return {
        ...state,
        items: state.items.map(item =>
          item.id == action.item.id ? { ...item, examined: true } : item
        ),
      };
    default:
      return state;
  }
};
