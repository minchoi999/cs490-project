import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row} from 'react-bootstrap';
import {Button, InputGroup, Input} from 'reactstrap';
import * as movieActions from './movie-browser.actions';
import * as movieHelpers from './movie-browser.helpers';
import MovieList from './movie-list/movie-list.component';
import * as scrollHelpers from '../helpers/scroll.helpers';
import MovieWindow from './movie-window/movie-window.container';

class MovieSearchBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    }
  }

  handleChange(query) {
    this.setState({search: query});

  }

  handleSearch() {
      if (!this.search == "")
        this.props.searchMovies(this.state.currentPage, this.search);
      //Object.assign(this.state.currentMovies, this.props.searchMovies(this.state.currentPage, query));
      //this.setState({currentMovies: this.props.searchMovies(this.state.currentPage, query)});
      //update currentMovies state?
}

  render() {
    const movies = movieHelpers.getMoviesList(this.props.response);

    return (
      <div>
        <Grid>
          <Row>
          <InputGroup>
                      <Input
                            id="search" 
                            placeholder = "Search for movies"
                            onChange = { event => {
                              console.log(event.target.value)
                              this.handleChange(event.target.value)
                              console.log(this.search)
                            }
                          }
                      />
                      <Button
                          onClick = { event => {
                            console.log("Search")
                            this.handleSearch()
                          }
                        }
                          >Search</Button>
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
