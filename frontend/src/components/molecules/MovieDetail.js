import React, { Component } from 'react';
import axios from 'axios';
import { URL_DETAIL, API_KEY, LANGUAGE_EN } from '../../const';
import MovieCardDetail from './MovieCardDetail';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieData: {}
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        axios
            .get(`${URL_DETAIL}${id}${API_KEY}${LANGUAGE_EN}`)
            .then(response => {
                this.setState({ movieData: response.data });
            });
    }

    render() {
        let movieData;

        if (
            typeof this.state.movieData !== 'undefined'
            || !this.state.movieData.isEmpty()
        ) { movieData = <MovieCardDetail movie={this.state.movieData} />; }
        else { movieData = <div>Loading!!!</div>; }

        return (
            <div className="movie-container">{movieData}</div>
        );
    }
}

export default MovieDetail;