const express = require('express');
const router = express.Router();

const Review = require('../../model/reviews');
const reviewStatus = require("../../frontend/src/js/reviewStatus");
const setReviewObj = require('./reviewHelpers.js');

router.route('/')
// retrieve all reviews from the database
.get(function(req, res) {
  Review.find(function(err, reviews) {
    if (err) { res.send(err); }
    // responds with a json object of our database comments.
    res.json(reviews)
  });
})
// create new reviews on the database
.put(function(req, res) {
  console.log('New review', req.body);
  let review = setReviewObj(req.body, new Review());
  review.save(function(err) {
    if (err) {
      res.json( {
        message: 'New review save error', 
        error: err
      });
    }
  });
});


// Adding a route to a specific review based on the database ID
router.route('/:review_id')
// get review info by ID
.get(function(req, res) {
  Review.findById(req.params.review_id, function(err, review) {
    if (err) { res.send(err); }
    else { res.json(review); }
  });
})
// MERGING WORK CONTINUE HERE... (re-adding auth changes)
// The put updates review based on the ID passed to the route
.put(function(req, res) {
  console.log('Edit review', req.body);
  Review.findById(req.params.review_id, function(err, review) {
    if (err) { res.send(err); }

    if (review) {
      const ownerId = reviewStatus.getOwner(review);
      if (ownerId === req.user._id.toString()) {
        review = setReviewObj(req.body, review)
        //save review
        review.save(function(err) {
          if (err) { res.send(err); }
          res.json({ message: 'Review has been updated' });
        });
      } 
      else {
        // review is found but requester is not the owner
        console.log('Not the owner. Cannot proceed', ownerId, req.user._id);
        res.status(401).json({ message: 'Review update request by non-owner. Cannot proceed'});
      }
    } 
    else {
      console.log('Invalid Review ID');
      res.status(400).json({ message: "Invalid Review ID" });
    }
  });
})
// delete method for removing a review from our database
.delete(function(req, res) {
  // selects the review by its ID, then removes it.
  console.log('delete requested', req.params.review_id);
  Review.findById(req.params.review_id, function(err, review) {
    if (err) { res.send(err); }

    const ownerId = reviewStatus.getOwner(review);

    if (review) {
      if (ownerId === req.user._id.toString()) {
        // delete review
        Review.remove({ _id: req.params.review_id }, function(err) {
          if (err) { res.send(err); }
          res.json({ message: 'Review has been deleted' });
        });
      } 
      else {
        // review is found but requester is not the owner
        console.log('Not the owner. Cannot proceed', ownerId, req.user._id);
        res.status(401).json({ message: 'Review delete request by non-owner. Cannot proceed'});
      }
    } 
    else {
      console.log('Invalid Review ID');
      res.status(400).json({ message: "Invalid Review ID" });
    }
  });
});


module.exports = router;