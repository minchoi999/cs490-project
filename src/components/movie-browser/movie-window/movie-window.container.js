import React from 'react';
import {connect} from 'react-redux';
import {Modal} from 'reactstrap';
import _ from 'lodash';
import { closeMovieWindow } from './movie-window.actions';
import { getMovieDetails } from '../movie-browser.actions';
import * as movieHelpers from '../movie-browser.helpers';

class MovieWindowContainer extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.movieId && this.props.movieId !== nextProps.movieId) {
      nextProps.getMovieDetails(nextProps.movieId);
    }
  }

  render() {
    const {isOpen, closeMovieWindow} = this.props;
    const movie = movieHelpers.updateMoviePictureUrls(this.props.movie);
    const genres = (movie && movie.genres) ? movie.genres.map(genre => genre.name).join(', ') : '';

    return (
      <Modal
        autoScrollBodyContent={true}
        title={null}
        Window={false}
        open={isOpen}
        onRequestClose={closeMovieWindow}
      >
          <div>
            <h1>{movie.title}</h1>
            <h5>{movie.tagline}</h5>
            <h5>{genres}</h5>
            <p>{movie.overview}</p>
          </div>
    </Modal>
    );
  }
}

export default connect(
  (state) => ({
    isOpen: _.get(state, 'movieBrowser.movieWindow.isOpen', false),
    movieId: _.get(state, 'movieBrowser.movieWindow.movieId'),
    movie: _.get(state, 'movieBrowser.movieDetails.response', {}),
  }),
  { closeMovieWindow, getMovieDetails }
)(MovieWindowContainer);
