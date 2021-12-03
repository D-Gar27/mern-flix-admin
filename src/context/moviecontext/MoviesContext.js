import { createContext, useReducer } from 'react';
import { MoviesReducer } from './MoviesReducer.js';

const STATE = {
  movies: [],
  fetching: false,
  error: false,
};

export const MoviesContext = createContext(STATE);

export const MoviesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MoviesReducer, STATE);
  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        fetching: state.fetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
