export const MoviesReducer = (state, action) => {
  switch (action.type) {
    case 'MOVIES_START':
      return {
        movies: [],
        fetching: true,
        error: false,
      };
    case 'MOVIES_SUCCESS':
      return {
        movies: action.payload,
        fetching: false,
        error: false,
      };
    case 'MOVIES_FAIL':
      return {
        movies: [],
        fetching: false,
        error: true,
      };
    case 'DELETE_MOVIE':
      return {
        movies: state.movies.filter((movie) => movie._id !== action.payload),
        fetching: false,
        error: true,
      };

    default:
      return state;
  }
};
