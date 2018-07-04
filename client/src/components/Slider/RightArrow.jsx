import React, { Component } from 'react';
// import '../../stylesheets/Slider/Arrow.css';

const RightArrow = (props) => {
  return (
    <div onClick={props.nextSlide} className="nextArrow">
      <i className="far fa-arrow-alt-circle-right" />
    </div>
  );
};

export default RightArrow;
