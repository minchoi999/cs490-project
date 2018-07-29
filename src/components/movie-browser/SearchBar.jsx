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
