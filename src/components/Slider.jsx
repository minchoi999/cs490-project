import React, { Component } from 'react';
import request from 'superagent';
import '../stylesheets/Slider.css';
// import 'font-awesome/css/font-awesome.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      slideCount: 0,
    };
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
  }

  componentWillMount() {
    this.fetchPhotos();
  }

  fetchPhotos() {
    request
      .get(
        'https://api.instagram.com/v1/users/self/media/recent/?access_token=8156193075.1677ed0.814282123aaf490b9643a24e77c77ff2'
      )
      .then((res) => {
        this.setState({
          photos: res.body.data,
        });
      });
  }

  nextImage() {
    this.setState({ slideCount: this.state.slideCount + 1 });
  }

  previousImage() {
    this.setState({ slideCount: this.state.slideCount - 1 });
  }

  render() {
    const BackArrow = (props) => (
      <div
        onClick={props.previousImage}
        style={{ fontSize: '2em', marginRight: '12px' }}
      >
        <i className="fa fa-angle-left fa-2x" aria-hidden="true" />
      </div>
    );

    const NextArrow = (props) => (
      <div
        onClick={props.nextImage}
        style={{ fontSize: '2em', marginLeft: '12px' }}
      >
        <i className="fa fa-angle-right fa-2x" aria-hidden="true" />
      </div>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Upcoming Movies</h1>
        </header>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '30px',
          }}
        >
          {this.state.slideCount !== 0 ? (
            <BackArrow
              previousImage={this.previousImage}
              className="backArrow"
            />
          ) : (
            ''
          )}
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
          >
            {this.state.photos.map((photo, key) => {
              if (this.state.photos.indexOf(photo) === this.state.slideCount) {
                return (
                  <div key={photo.id} style={{ margin: '0 auto' }}>
                    <img src={photo.images.standard_resolution.url} alt="" />
                    <div
                      style={{
                        width: '600px',
                        margin: '24px auto',
                        fontStyle: 'italic',
                      }}
                    >
                      {photo.caption !== null ? photo.caption.text : ''}
                    </div>
                  </div>
                );
              }
              return '';
            })}
          </ReactCSSTransitionGroup>
          {this.state.slideCount !== this.state.photos.length - 1 ? (
            <NextArrow nextImage={this.nextImage} className="nextArrow" />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default Slider;
