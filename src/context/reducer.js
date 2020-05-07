export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_GAME':
      return action.save;
    case 'LOGIN':
      return {
        ...state,
        user: action.user,
      };
    case 'FINISH_GAME':
      return {
        ...state,
        finished_game: true,
        score: action.score,
      };
    case 'NEXT_DAY':
      return {
        ...state,
        day: action.new_day,
        movement_points: action.movement_points,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
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
        movement_points: action.updatedMovementPoints,
      };
    case 'EXAMINE':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.item.id ? { ...item, examined: true } : item
        ),
        movement_points: action.updatedMovementPoints,
      };
    case 'ADD_STRESS_POINTS': {
      return {
        ...state,
        stress_points: state.stress_points + action.stress_points,
      };
    }
    default:
      return state;
  }
};
