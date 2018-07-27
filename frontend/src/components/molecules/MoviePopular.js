import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row } from 'reactstrap';
import { URL_DETAIL, API_KEY, LANGUAGE_EN, POPULAR } from '../../const';
import Search from './MovieSearch';
import MovieCard from './MovieCard';


class PopularMovies extends Component {

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
            <div className="search">
                <Search />
                <Container fluid={false}>
                    <Row>
                        {movies}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default PopularMovies;