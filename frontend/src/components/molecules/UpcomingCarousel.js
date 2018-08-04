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
  VIDEOS,
} from '../../const';
import axios from 'axios';
import ModalVideo from 'react-modal-video';
import '../../stylesheets/components/UpcomingCarousel.css';

class UpcomingCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeIndex: 0,
      items: [],
      ids: [],
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.openModal = this.openModal.bind(this);
    this.getVideoKey = this.getVideoKey.bind(this);
  }

  componentWillMount() {
    const itemsPromise = axios
      .get(URL_DETAIL + UPCOMING + API_KEY + LANGUAGE_EN)
      .then((response) => {
        // ex. response.data.results has [movie1, movie2, ...]
        let firstSix = [];
        if (response.data.results && response.data.results.length > 0) {
          for (let i = 0; i < 6; i++) {
            firstSix[i] = response.data.results[i];
          }
        }
        let firstSixInfo = [];
        for (let i = 0; i < 6; i++) {
          firstSixInfo[i] = {
            src: `${URL_IMG}${'w780'}${response.data.results[i].backdrop_path}`,
            altText: response.data.results[i].overview,
            caption: response.data.results[i].title,
            movieID: response.data.results[i].id,
          };
        }
        return firstSixInfo;
      })
      .then((items) => {
        items.forEach((item) => {
          this.getVideoKey(item).then((videoKey) => {
            item.videoKey = videoKey;
            console.log('test1');
          });
        });
        return items;
      });

    itemsPromise.then((items) => {
      this.setState({ items });
      console.log('test2');
    });
  }

  getVideoKey = (item) => {
    try {
      const videoKey = axios
        .get(`${URL_DETAIL}${item.movieID}${VIDEOS}${API_KEY}`)
        .then((response) => {
          if (
            response &&
            response.data &&
            response.data.results &&
            response.data.results.length > 0
          ) {
            return response.data.results[0].key;
          }
          return '';
        });
      return videoKey;
    } catch (error) {}
  };

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
      width: '780px',
    };
    const slides = items.map((item) => {
      return (
        <CarouselItem
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
          <ModalVideo
            channel="youtube"
            isOpen={this.state.isOpen}
            videoId={item.videoKey}
            onClose={() => this.setState({ isOpen: false })}
          />
          <CarouselCaption
            captionText={item.altText}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });

    return (
      <div className="UpcomingCarousel">
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          interval={false}
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
