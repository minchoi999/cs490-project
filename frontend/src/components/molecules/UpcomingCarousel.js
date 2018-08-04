import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";
import {
  URL_DETAIL,
  API_KEY,
  LANGUAGE_EN,
  UPCOMING,
  URL_IMG,
  IMG_BACKGROUND
} from "../../const";
import axios from "axios";
import { Link } from "react-router-dom";

class UpcomingCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeIndex: 0,
      items: [],
      ids: []
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentWillMount() {
    axios.get(URL_DETAIL + UPCOMING + API_KEY + LANGUAGE_EN).then(response => {
      // ex. response.data.results has [movie1, movie2, ...]
      console.log("response");
      let firstSix = [];
      if (response.data.results && response.data.results.length > 0) {
        for (let i = 0; i < 6; i++) {
          firstSix[i] = response.data.results[i];
        }
      }
      let firstSixInfo = [];
      for (let i = 0; i < 6; i++) {
        firstSixInfo[i] = {
          src: `${URL_IMG}${IMG_BACKGROUND}${
            response.data.results[i].backdrop_path
          }`,
          movieID: response.data.results[i].id,
          title: response.data.results[i].title,
          overview: response.data.results[i].overview,
          altText: `Image of ${response.data.results[i].title}`,
        };
      }

      this.setState({ items: firstSixInfo });
    });
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.state.items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex, isOpen: false });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.state.items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex, isOpen: false });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex, isOpen: false });
  }

  render() {
    const { activeIndex } = this.state;
    const { items } = this.state;
    const imageStyle = {
      width: "100%"
    };
    const slides = items.map(item => {
      return (
        <CarouselItem
          className="container"
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img
            src={item.src}
            alt={item.altText}
            style={imageStyle}
            onClick={this.openModal}
          />
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-5 col-md-8 col-sm-12 caption-info">
              <h2 className="caption-title">{item.title}</h2>
              <p className="caption-overview">
                {`${item.overview.substr(0, 150)}...`}
              </p>
              <Link to={`/tmdb/movie/${item.movieID}`} className="caption-link">Read More</Link>
            </div>
          </div>
        </CarouselItem>
      );
    });

    return (
      <div className="UpcomingCarousel">
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            items={this.state.items}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
      </div>
    );
  }
}

export default UpcomingCarousel;
