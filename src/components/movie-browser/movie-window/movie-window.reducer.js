import { keys } from './movie-window.actions';
import { createReducer } from '../../helpers/redux.helpers';

const movieWindowReducer = createReducer({ isOpen: false, movieId: undefined }, {
  [keys.OPEN_MOVIE_WINDOW]: (state, action) => ({
    isOpen: true,
    movieId: action.movieId
  }),
  [keys.CLOSE_MOVIE_WINDOW]: (state, action) => ({
    ...state,
    isOpen: false
  })
});

export default movieWindowReducer;
