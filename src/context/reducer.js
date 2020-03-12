export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.user,
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
        snackbar: action.snackbar,
      };
    case 'CLOSE_SNACKBAR':
      return {
        ...state,
        snackbar: { ...state.snackbar, visible: false },
      };
    case 'EXECUTE_ACTION':
      return {
        ...state,
        actions: action.updatedComponents.actions.map(x =>
          x.id === action.action.id ? { ...x, done: true } : x
        ),
        locations: action.updatedComponents.locations,
        items: action.updatedComponents.items,
        people: action.updatedComponents.people,
      };
    case 'EXAMINE':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.item.id ? { ...item, examined: true } : item
        ),
      };
    default:
      return state;
  }
};
