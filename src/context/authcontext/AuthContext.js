import AuthReducer from './AuthReducer';
import { createContext, useEffect, useReducer } from 'react';

const STATE = {
  user: JSON.parse(localStorage.getItem('av')) || null,
  fetching: false,
  error: false,
};

const AuthContext = createContext(STATE);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, STATE);
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('av', JSON.stringify(state.user));
    } else {
      localStorage.clear();
    }
  }, [state.user]);
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
