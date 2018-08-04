import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import {
  URL_DETAIL,
  API_KEY,
  LANGUAGE_EN,
  UPCOMING,
  URL_IMG,
  IMG_BACKGROUND,
} from '../../const';
import axios from 'axios';
import '../../stylesheets/components/UpcomingCarousel.css';

class UpcomingCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      items: [],
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentWillMount() {
    // if (!this.props.user) {
    //   setTimeout(() => {
    //     this.props.history.push('/');
    //   }, 1000);
    // }
    axios
      // .get(`${URL_DETAIL}popular${API_KEY}&language=en-US&page=1`)
      .get(URL_DETAIL + UPCOMING + API_KEY + LANGUAGE_EN)
      .then((response) => {
        // ex. response.data.results has [movie1, movie2, ...]
        console.log('response');
        let firstSix = [];
        if (response.data.results && response.data.results.length > 0) {
          for (let i = 0; i < 6; i++) {
            firstSix[i] = response.data.results[i];
          }
        }
        let firstSixInfo = [];
        for (let i = 0; i < 6; i++) {
          firstSixInfo[i] = {
            src: `${URL_IMG}${'w300'}${response.data.results[i].backdrop_path}`,
            altText: '',
            caption: '',
          };
        }
        this.setState({ items: firstSixInfo });
      });
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
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.state.items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const { items } = this.state;
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption
            captionText={item.altText}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        className="carousel"
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
    );
  }
}

export default UpcomingCarousel;
