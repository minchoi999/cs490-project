import React, {Component} from 'react';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import '../stylesheets/Movies.css';


const moviesMockAPI = 'http://www.mocky.io/v2/5b2dbc9f2f00007900ebd5d0'; ///
    
class Movie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchResult: [],
      movieList: []
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.returnMovieList = this.returnMovieList.bind(this);

  }

  handleSearch(searchText) {
   
    this.setState({searchResult: [], searchText: searchText});
    this.state.movieList.map(movie => {

      if(searchMovie(movie, searchText)) {
         this.setState( prevState => ({
           searchResult: [...prevState.searchResult, movie]
         }), () => console.log(this.state.searchResult))
      }
    })
  }

  componentWillMount() {
    let init = {
         method: 'GET',
         headers: new Headers(),
         mode: 'cors',
         cache: 'default' 
      };

    fetch(moviesMockAPI, init)
      .then( response => response.json())
      .then( 
        data => this.setState( 
          prevState => ({
          movieList: [...data.movies]
          }) 
        )
      )
    }

  returnMovieList() {
   return this.state.searchText ? this.state.searchResult :this.state.movieList
  }

  render() {
    return (
      <div id="movie-search" className="container-fluid">
        <span className="title">Movies</span>

        <SearchBar onSearch={this.handleSearch} />
        <br />
            <ol className="list-group" id="movie-list">
              { this.returnMovieList().map(
                  (movie) => 
                  <li key={movie.title} className="list-group-item"> 
                    <MovieCard movie = {movie}/>
                  </li>
                )}
            </ol>
      </div>
    );
  }
}

const searchMovie = (movie, searchText) => (
 movie.title.toLowerCase().search(searchText.toLowerCase()) !== -1 ||
 movie.year.toString().search(searchText) !== -1 ||
 movie.genre.toLowerCase().search(searchText.toLowerCase()) !== -1 ||
 movie.stars.toLowerCase().search(searchText.toLowerCase()) !== -1 ||
 movie.premise.toLowerCase().search(searchText.toLowerCase()) !== -1
)

export default Movie;
