import axios from 'axios';

// Loads environment variables with dotenv
require('dotenv').load();

const apiUrl = process.env.REACT_APP_APPURL || '';
console.log('apiUrl', apiUrl);

const apiCall = {
  // Retrieve all reviews from server
  getAllReviews(next) {
    // get reviews from api
    axios.get(apiUrl + '/api/reviews')
    .then(res => {
      next({data: res.data});
    })
    .catch(err => {
      if (err) {
        next({error: err});
        throw err;
      }
    });  
  },
  // Retrieve one review by ID
  getReviewById(reviews, reviewId, next) {
    // In case reviews data already exists
    if (reviews) {
      const review = reviews.find(item => {
        return item._id === reviewId;
      });
      if (review) {
        next({data: review});
      } else {
        next({error: 'review not found!'});
      }
    } else {
      axios.get(apiUrl + '/api/reviews/' + reviewId)
      .then(res => {
        next({data: res.data});
      })
      // and handle errors
      .catch(err => {
        if (err) {
          next({error: err});
          throw err;
        }
      });
    }
  },
  // Get logged in user data from api and assign it to state
  getCurrentUser(next) {
    console.log('api call getCurrentUser');
    axios.get(apiUrl + '/auth')
    .then(res => {
      console.log('getCurrentUser Response', res);
      let data = (res.data !== '') ? res.data : null;
      next({data: data});
    })
    .catch(err => {
      if (err) {
        next({error: err});
        throw err;
      }
    })
  },
  // get user data from api
  getUserById(id, next) {
    axios.get(apiUrl + '/api/users/' + id)
    .then(res => {
      next({data: res.data});
    })
    .catch(err => {
      if (err) {
        next({error: err});
        throw err;
      }
    });
  },

  // Updates user data 
  postUser(data, next) {
    axios.put(apiUrl + '/api/users/' + data._id, data)
    .then(res => {
      next({data: res.data});
    })
    .catch(err => {
      next({error: err});
      throw err;
    });
  },

  // creates new review or updates a review
  postReview(data, next) {
    const id = data._id || '';
    console.log('api call update review id', id, 'data', data);
    axios.put(apiUrl + '/api/reviews/' + id, data)
    .then(res => {
      console.log('api call update review success', res.data);
      next({data: res.data});
    })
    .catch(err => {
      console.log(err);
      next({error: err});
      throw err;
    });
  },

  // delete review
  deleteReview(data, next) {
    axios.delete(apiUrl + '/api/reviews/' + data._id)
    .then(res => {
      next({data: res.data});
    })
    .catch(err => {
      next({error: err});
      throw err;
    });
  }
};

export default apiCall;