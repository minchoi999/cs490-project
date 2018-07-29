import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row} from 'react-bootstrap';
import {FormGroup, Button, InputGroupAddon, InputGroup, Input} from 'reactstrap';
import * as movieActions from './movie-browser.actions';
import * as movieHelpers from './movie-browser.helpers';
import MovieList from './movie-list/movie-list.component';
import * as scrollHelpers from '../helpers/scroll.helpers';
import MovieWindow from './movie-window/movie-window.container';

class MovieSearchBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMovies: []
    }
  }

  handleSearch(query) {
      this.props.searchMovies(this.state.currentPage, query);
      //Object.assign(this.state.currentMovies, this.props.searchMovies(this.state.currentPage, query));
      //this.setState({currentMovies: this.props.searchMovies(this.state.currentPage, query)});
      //update currentMovies state?
}

  render() {
    const {topMovies} = this.props;
    const movies = movieHelpers.getMoviesList(topMovies.response);

    return (
      <div>
        <Grid>
          <Row>
          <InputGroup>
                      <Input
                            id="search" 
                            placeholder = "Search for movies"
                            onKeyPress = { event => {
                              console.log(event.target.value)
                              if (event.charCode === 13) {
                                this.handleSearch(event.target.value)
                              }
                            }
                          }
                      />
          </InputGroup>
          </Row>
          <Row>
            <MovieList movies={movies}/>
          </Row>
        </Grid>
        <MovieWindow />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    topMovies: state.movieBrowser.movieSearch,
  }),
  { ...movieActions }
)(MovieSearchBrowser);
