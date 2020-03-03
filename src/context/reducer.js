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
    default:
      return state;
  }
};
