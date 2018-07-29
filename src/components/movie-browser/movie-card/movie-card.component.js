import React from 'react';
import {connect} from 'react-redux';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';
import {openMovieWindow} from '../movie-window/movie-window.actions';

class MovieCardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false
    };
  }
  
  render() {
    const {movie, openMovieWindow} = this.props;

    return (
      <Card>
        <CardImg src={movie.poster_path}/>
        <CardBody>
          <CardTitle> {movie.title} </CardTitle>
          <Button onClick={() => openMovieWindow(movie.id)}>Summary</Button>
        </CardBody>
      </Card>
    );
  }
}

export default connect(
  () => ({}),
  { openMovieWindow }
)(MovieCardComponent);
