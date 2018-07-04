import React from "react";
// import "../stylesheets/Movies.css";

const SearchBar = ({ onSearch }) => {
  const handleChange = e => {
    onSearch(e.target.value);
  };
  return (
    <div className="input-group input-movie">
      <input
        onChange={handleChange}
        className="searchbar input-movie"
        type="search"
        placeholder="Search for a movie"
        id="example"
      />
    </div>
  );
};

export default SearchBar;
