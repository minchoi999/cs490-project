export const keys = {
  'OPEN_MOVIE_WINDOW': 'OPEN_MOVIE_WINDOW',
  'CLOSE_MOVIE_WINDOW': 'CLOSE_MOVIE_WINDOW',
}

export const openMovieWindow = (movieId) => {
  return {
    type: keys.OPEN_MOVIE_WINDOW,
    movieId
  };
}

export const closeMovieWindow = () => {
  return {
    type: keys.CLOSE_MOVIE_WINDOW
  };
}
