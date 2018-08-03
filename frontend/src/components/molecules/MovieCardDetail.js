import React, { Component } from "react";
// import { Glyphicon } from "reactstrap";
import { shape, string, number } from "prop-types";
import Modal from "./MovieModal";
import { URL_IMG, IMG_BACKGROUND, IMG_LARGE } from "../../const";
import TMDBlogo from "../../images/movie_logo.svg";

class DetailMovieCard extends Component {
  componentDidUpdate() {
    document.body.style.backgroundImage = `url(${URL_IMG}${IMG_BACKGROUND}${this.props.movie.backdrop_path})`;
  }

  render() {
    const {
      poster_path,
      original_title,
      vote_average,
      vote_count,
      tagline,
      overview,
      release_date,
      budget = 0,
      revenue = 0,
      runtime = 0
    } = this.props.movie;

    let modalID;
    if (typeof this.props.movie.id === "undefined") {
      modalID = <div>Loading!!!</div>;
    } else {
      modalID = <Modal modal={this.props.movie.id} />;
    }

    const formattedRevenue = `$${revenue
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    const formattedBudget = `$${budget
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    const formattedRuntime = `${runtime} minutes`;

    return (
      <div className="container my-container">
        <div className="row">
          <div className="col wrapper">
            <div className="row">
              <div className="col-xs-12 col-md-5 col-lg-5">
                <img
                  className="movie-card-detail-image"
                  src={
                    poster_path === "undefined"
                      ? TMDBlogo
                      : `${URL_IMG}${IMG_LARGE}${poster_path}`
                  }
                  alt={`Title is ${original_title}`}
                />
              </div>

              <div className="col-xs-12 col-md-7 col-lg-7">
                <div className="movie-title">{original_title}</div>
                <div className="row movie-item-list align-items-center">
                  <div className="col">
                    <i className="fas fa-star movie-icons" /> {vote_average}
                  </div>
                  <div className="col">
                    <i className="fas fa-heart movie-icons" /> {vote_count}
                  </div>
                  <div className="col">{modalID}</div>
                </div>
                <span className="movie-tagline">{tagline}</span>
                <p className="movie-overview">{overview}</p>
                <div className="movie-subdetails">
                  <div className="row">
                    <div className="col">
                      Release Date
                      <span className="movie-metadata">{release_date}</span>
                    </div>
                    <div className="col">
                      Running Time
                      <span className="movie-metadata">{formattedRuntime}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      Budget
                      <span className="movie-metadata">{formattedBudget}</span>
                    </div>
                    <div className="col">
                      Revenue
                      <span className="movie-metadata">{formattedRevenue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DetailMovieCard.propTypes = {
  movie: shape({
    poster_path: string,
    original_title: string,
    backdrop_path: string,
    vote_average: number,
    vote_count: number,
    tagline: string,
    overview: string,
    release_date: string,
    budget: number,
    revenue: number,
    runtime: number
  }).isRequired
};

export default DetailMovieCard;
