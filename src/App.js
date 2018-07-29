import React, { Component } from 'react';
import MovieBrowser from './components/movie-browser/movie-browser.container';
//import MovieSearchBrowser from './components/movie-browser/movie-search-browser';

class App extends Component {
  render() {
    return (
 //     <MuiThemeProvider>
        // <MovieSearchBrowser />
        <MovieBrowser/>
//      </MuiThemeProvider>
    );
  }
}

export default App;
