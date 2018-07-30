import React from 'react';
import { shape, string, number } from 'prop-types';
import { Link } from 'react-router-dom';
import { URL_IMG, IMG_LARGE } from '../../const';

const MovieCard = (props) => (
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <Link to={`tmdb/movie/${props.movie.id}`} className="popular-movie">
            <img className="col card-image" src={`${URL_IMG}${IMG_LARGE}${props.movie.poster_path}`} alt={`${props.movie.title} Movie Poster`} />
            <div className="col card-details">
                <h3 className="row">{props.movie.title}</h3>
                <p className="row text-ellipsis">{props.movie.overview}</p>
            </div>
        </Link>
    </div>
);

MovieCard.propTypes = {
    movie: shape({
        title: string.isRequired,
        poster_path: string.isRequired,
        overview: string.isRequired,
        id: number.isRequired
    }).isRequired
};


export default MovieCard;