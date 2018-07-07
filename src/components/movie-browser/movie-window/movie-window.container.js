import React from 'react';
import {connect} from 'react-redux';
import { Dialog } from 'material-ui';
import _ from 'lodash';
import { closeMovieWindow } from './movie-window.actions';
import { getMovieDetails } from '../movie-browser.actions';
import * as movieHelpers from '../movie-browser.helpers';
import Loader from '../../helpers/loader.component';

const styles = {
  dialogContent: (backgroundUrl) => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    height: '100%',
    minHeight: 400,
    color: 'white',
    padding: 10
  }),
  summary: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    right: 30
  }
}

class MovieWindowContainer extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.movieId && this.props.movieId !== nextProps.movieId) {
      nextProps.getMovieDetails(nextProps.movieId);
    }
  }

  render() {
    const {isOpen, closeMovieWindow, isLoading} = this.props;
    const loadingStatus = isLoading ? 'loading' : 'hide';
    const movie = movieHelpers.updateMoviePictureUrls(this.props.movie);
    const genres = (movie && movie.genres) ? movie.genres.map(genre => genre.name).join(', ') : '';

    return (
      <Dialog
        autoScrollBodyContent={true}
        title={null}
        Window={false}
        open={isOpen}
        onRequestClose={closeMovieWindow}
      >
        <Loader isLoading={isLoading}>
          <div style={styles.dialogContent(movie.backdrop_path)}>
            <h1>{movie.title}</h1>
            <h5>{movie.tagline}</h5>
            <h5>{genres}</h5>
            <div style={styles.summary}>
            <p>{movie.overview}</p>
            </div>
          </div>
        </Loader>
    </Dialog>
    );
  }
}

export default connect(
  (state) => ({
    isOpen: _.get(state, 'movieBrowser.movieWindow.isOpen', false),
    movieId: _.get(state, 'movieBrowser.movieWindow.movieId'),
    movie: _.get(state, 'movieBrowser.movieDetails.response', {}),
    isLoading: _.get(state, 'movieBrowser.movieDetails.isLoading', false),
  }),
  { closeMovieWindow, getMovieDetails }
)(MovieWindowContainer);
