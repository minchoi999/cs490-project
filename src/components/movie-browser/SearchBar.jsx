// import React,{Component} from 'react';
// import {connect} from 'react-redux';
// import {searchMovies} from './movie-browser.actions';

// class SearchBar extends Component {

//   handleChange(event) {
//     event.target.select();
//   }

//   render() {
//     return (
//     	<div>
//             <form>
//                 <input onChange={this.handleChange} className="searchbar" type="search" placeholder="Search for a movie"/>
//               </form>
//       </div>
//     )
//   }
// }
// export default connect()(SearchBar);

import React from 'react';

const SearchBar = ({onSearch}) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  }
  return( 
    <div className="input-group ">
            <input onChange = {handleChange} className="searchbar" type="search" placeholder="Search for a movie"/>
        </div>
    )
}

export default SearchBar;