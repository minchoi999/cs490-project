import React from 'react';
import { shape, string, number } from 'prop-types';
// import styled from 'styled-components';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { URL_IMG, IMG_LARGE } from '../../const';

const MovieCard = (props) => (
    <Col xs={12} sm={12} md={6} lg={6} >
        <Link to={`/movie/${props.movie.id}`}>
            <img className="card-image" alt={`${props.movie.title} Movie Poster`} src={URL_IMG + IMG_LARGE + props.movie.poster_path} />
            <div className="card-details">
                <h3>{props.movie.title}</h3>
                <p className="text-ellipsis">{props.movie.overview}</p>
            </div>
        </Link>
    </Col>
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