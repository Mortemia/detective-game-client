export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        username: action.user.username,
        email: action.user.email,
      };
    default:
      return state;
  }
};
