import React, { Component } from 'react';
import axios from 'axios';
import { URL_DETAIL, API_KEY, LANGUAGE_EN, POPULAR } from '../../const';
import MovieSearch from './MovieSearch';
import MovieCard from './MovieCard';


class MoviePopular extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: []
        };

    }

    componentDidMount() {
        axios
            // .get(`${URL_DETAIL}popular${API_KEY}&language=en-US&page=1`)
            .get(URL_DETAIL + POPULAR + API_KEY + LANGUAGE_EN)
            .then((response) => {
                this.setState({ results: response.data.results });
            });
        document.body.style.backgroundImage = `url()`;
    }

    render() {
        const movies = this.state.results.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
        ));
        return (
            <div className="popular-background">
                <MovieSearch />
                <div className="container">
                    <div className="row">{movies}</div>
                </div>
            </div>
        );
    }
}

export default MoviePopular;