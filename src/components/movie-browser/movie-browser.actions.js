import {createAsyncActionCreator} from '../helpers/redux.helpers';
import * as movieService from './movie-browser.service';

export const keys = {
  'GET_TOP_MOVIES': 'GET_TOP_MOVIES',
  'SEARCH_MOVIES': 'SEARCH_MOVIES',
  'GET_MOVIE_DETAILS': 'GET_MOVIE_DETAILS',
};

export const getTopMovies = (page) => createAsyncActionCreator(
  keys.GET_TOP_MOVIES,
  movieService.getTopMovies, 
  {page}
);

export const searchMovies = (page, query) => createAsyncActionCreator(
  keys.SEARCH_MOVIES,
  movieService.searchMovies, 
  {page, query}
);

export const getMovieDetails = (movieId) => createAsyncActionCreator(
  keys.GET_MOVIE_DETAILS,
  movieService.getMovieDetails, 
  {movieId}
);
