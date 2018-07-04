import React from 'react';
import Movie from './Movie.jsx';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="section">
        <div className="container">

          <h1 className="title is-1">
            Home Page
          </h1>

          <Movie />

        </div>
      </div>
    </div>
  );
}
