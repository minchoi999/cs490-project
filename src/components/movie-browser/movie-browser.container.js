import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import * as movieActions from './movie-browser.actions';
import * as movieHelpers from './movie-browser.helpers';
import MovieList from './movie-list/movie-list.component';
import * as scrollHelpers from '../helpers/scroll.helpers';
import MovieWindow from './movie-window/movie-window.container';
import SearchBar from './SearchBar';

class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      currentMovies: []
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.props.getTopMovies(this.state.currentPage);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const {topMovies} = this.props;
    if (!topMovies.isLoading) {
      let percentageScrolled = scrollHelpers.getPercentageScrolledDown(window);
      if (percentageScrolled > .9) {
        const nextPage = this.state.currentPage + 1;
        this.props.getTopMovies(nextPage);
        this.setState({currentPage: nextPage});
      }
    }
  }

  render() {
    const {topMovies} = this.props;
    const movies = movieHelpers.getMoviesList(topMovies.response);

    return (
      <div>
        <Grid>
          <Row>
            <input type="text" placeholder= "Search for movies"/>
          </Row>
          <Row>
            <MovieList movies={movies} isLoading={topMovies.isLoading}/>
          </Row>
        </Grid>
        <MovieWindow />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    topMovies: state.movieBrowser.topMovies
  }),
  { ...movieActions }
)(MovieBrowser);
