import React from 'react';
// import '../stylesheets/Movies.css';

const MovieCard = ({movie}) => {
  
  return(

      <div>
          <div>
          
              <img className= "moviePoster" src={movie.photo} alt={movie.title}/>
            
          </div>
              <span className="movieTitle">{movie.title}</span> <span className= "movieYear"> ({movie.year})</span><br/>

              <span className="inline"> <span className="info">{movie.genre}</span><br/></span>

              <span className="inline"> <span className="info">{movie.stars}</span><br/></span>

              <span className="inline"> <span className="info">{movie.premise}</span><br/></span>

              <br/>
        </div>
        
    )
}

export default MovieCard;