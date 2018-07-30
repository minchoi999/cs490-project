import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { URL_IMG, URL_SEARCH, API_KEY_ALT, IMG_XSMALL } from '../../const';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TMDBlogo from '../../images/movie_logo.svg';

class MovieSearch extends Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: []
        };
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: (method === 'click' || method === 'enter') ? '' : newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        axios.get(URL_SEARCH + value + API_KEY_ALT).then((response) => {
            this.setState({
                // suggestions: response.data.results.map((result) => result.original_title)
                suggestions: response.data.results
            });
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    renderSuggestion = (suggestion) => {
        return (
            <Link to={`tmdb/movie/${suggestion.id}`}>
                <div>
                    <img className="searchResult-image" src={suggestion.poster_path == null ? TMDBlogo : `${URL_IMG}${IMG_XSMALL}${suggestion.poster_path}`} alt="searchLogo" />
                    <div className="searchResult-text">
                        <div className="searchResult-name">{suggestion.title}</div>
                        <div className="searchResult-date">{suggestion.release_date.slice(0, 4)}</div>
                    </div>
                </div>
            </Link>
        );
    };

    onSuggestionSelected = (event, { suggestion, method }) => {
        if (method === 'enter')
            event.preventDefault();
        // this.push('/movie/' + suggestion.id);
        this.setState({ value: '' });
    };

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: "Search a movie tittle...",
            value,
            onChange: this.onChange,
        };

        // Finally, render it!
        return (
            <form class="form-inline justify-content-center sticky-top">
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={(suggestion) => suggestion.title}
                    renderSuggestion={this.renderSuggestion}
                    onSuggestionSelected={this.onSuggestionSelected}
                    inputProps={inputProps}
                />
            </form>

        );
    }
}

export default MovieSearch;