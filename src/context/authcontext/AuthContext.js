import AuthReducer from './AuthReducer';
import { createContext, useReducer } from 'react';

const STATE = {
  user: localStorage.getItem('av') || null,
  fetching: false,
  error: false,
};

const AuthContext = createContext(STATE);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        fetching: state.fetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
