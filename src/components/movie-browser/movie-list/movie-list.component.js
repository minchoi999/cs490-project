import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card.component';
//import LoaderComponent from '../../helpers/loader.component';

const styles = {
  movieColumn: {
    marginBottom: 20
  }
}
const MovieListComponent = ({movies}) => {
  const movieColumns = movies ? movies.map(movie => (
    <Col style={styles.movieColumn} key={movie.id} xs={12} sm={4} md={3} lg={3}>
      <MovieCard movie={movie} />
    </Col>
  )) : null;
  
  return (
   <Grid>
    <Row>
      {movieColumns}
    </Row>
    </Grid>
  );
}

export default MovieListComponent;
