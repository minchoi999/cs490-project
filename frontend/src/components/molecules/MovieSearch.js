import React, { Component } from 'react';
import _debounce from 'lodash/debounce';
import axios from 'axios';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';
import { Link } from 'react-router-dom';
import { Navbar } from 'reactstrap';
import TMDBlogo from "../../images/movie_logo.svg";
import { URL_IMG, URL_SEARCH, API_KEY_ALT, IMG_XSMALL } from '../../const';


class MovieSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestion: []
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        const url = URL_SEARCH + inputValue + API_KEY_ALT;

        return inputLength === 0
            ? []
            : axios
                .get(url)
                .then(response => {
                    this.setState({ suggestions: response.data.results })
                })
                .catch(error => { console.log(`Error Message ${error}`) });
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    }

    renderSuggestion = (suggestion) => {
        return (
            <Link to={`/movie/${suggestion.id}`}>
                <img className="searchResult-image" src={suggestion.poster_path === null ? TMDBlogo : URL_IMG + IMG_XSMALL + suggestion.poster_path} alt={`Poster Path ${suggestion.title}`} />
                <div className="searchResult-text">
                    <div className="searchResult-name">
                        {suggestion.title}
                    </div>
                    {suggestion.year}
                </div>
            </Link>
        );
    };

    getSuggestionValue = (suggestion) => {
        return suggestion.title;
    };

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Search Movie Title...',
            value,
            onChange: this.onChange
        };

        const onSuggestionsFetchRequested = _debounce((term) => { this.onSuggestionsFetchRequested(term) }, 1000);

        return (
            <div>
                {/* <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">
                            <Brand />
                            <Image alt="TMDB" src={TMDBlogo} />
                        </a>
                    </Navbar.Brand>
                </Navbar.Header> */}
                <Navbar.Form pullRight>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                    />
                </Navbar.Form>
            </div>
        );
    }
}

export default MovieSearch;