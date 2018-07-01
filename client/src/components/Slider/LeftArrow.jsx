import React, { Component } from 'react';
import '../../stylesheets/Slider/Arrow.css';

const LeftArrow = (props) => {
  return (
    <div onClick={props.previousSlide} className="backArrow">
      <i className="far fa-arrow-alt-circle-left" />
    </div>
  );
};
export default LeftArrow;
