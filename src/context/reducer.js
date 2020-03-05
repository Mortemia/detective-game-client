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
    case 'ERROR':
      return {
        ...state,
        error: true,
        errorMsg: action.errorMsg,
      };
    case 'CLOSE_ERROR':
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
};
