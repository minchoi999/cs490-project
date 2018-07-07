import React from 'react';
import {connect} from 'react-redux';
import {Card, CardTitle, CardMedia} from 'material-ui';
import {openMovieWindow} from '../movie-window/movie-window.actions';

const styles = {
  cardMedia: {
    maxHeight: 394,
    overflow: 'hidden'
  },
  card: {
    cursor: 'pointer',
    height: 400,
    overflow: 'hidden'
  },
  bgImage: {
    width: '100%'
  }
};

class MovieCardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false
    };
  }
  
  render() {
    const {movie, openMovieWindow} = this.props;
    const subtitle = this.state.isMouseOver ? movie.overview : null;

    return (
      <Card
        style={styles.card}
        onMouseOver={() => this.setState({isMouseOver: true})}
        onMouseLeave={() => this.setState({isMouseOver: false})}
        onClick= {() => openMovieWindow(movie.id)}
      >
        <CardMedia
          style={styles.cardMedia}
          overlay={
            <CardTitle
              title={movie.title} 
              subtitle={subtitle} 
            />
          }
        >
          <img style={styles.bgImage} src={movie.poster_path} />
        </CardMedia>
      </Card>
    );
  }
}

export default connect(
  () => ({}),
  { openMovieWindow }
)(MovieCardComponent);
