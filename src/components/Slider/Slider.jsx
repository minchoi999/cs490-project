import React, { Component } from 'react';
import SlideOne from './SlideOne';
import SlideTwo from './SlideTwo';
import SlideThree from './SlideThree';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';
import '../../stylesheets/Slider/Slider.css';

// import AppActions from '../../Actions/AppActions.js';

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideCount: 1,
    };

    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
    // this.increaseSlideCount = this.increaseSlideCount.bind(this);
    // this.decreaseSlideCount = this.decreaseSlideCount.bind(this);
  }

  // decreaseSlideCount() {
  //   const { slideCount } = this.props;
  //   AppActions.setCounter(slideCount + 1);
  // }

  // increaseSlideCount() {
  //   const { slideCount } = this.props;
  //   AppActions.setCounter(slideCount - 1);
  // }

  render() {
    return (
      <div className="slider">
        <span className="title">Newest Releases</span>
        {Math.abs(this.state.slideCount) % 3 === 1 ? <SlideOne /> : null}
        {Math.abs(this.state.slideCount) % 3 === 2 ? <SlideTwo /> : null}
        {Math.abs(this.state.slideCount) % 3 === 0 ? <SlideThree /> : null}

        <RightArrow nextSlide={this.nextSlide} />
        <LeftArrow previousSlide={this.previousSlide} />
      </div>
    );
  }

  nextSlide() {
    this.setState({ slideCount: this.state.slideCount + 1 });
  }

  previousSlide() {
    this.setState({ slideCount: this.state.slideCount - 1 });
  }
}
