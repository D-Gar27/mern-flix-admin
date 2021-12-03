const AuthReducer = (actions, state) => {
  switch (actions.type) {
    case 'LOGIN_START':
      return {
        user: null,
        fetching: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: actions.payload,
        fetching: false,
        error: false,
      };
    case 'LOGIN_FAIL':
      return {
        user: null,
        fetching: false,
        error: true,
      };
    case 'LOG_OUT':
      return {
        user: null,
        fetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
