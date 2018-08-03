const express = require('express');
const router = express.Router();

const Review = require('../../model/reviews');

router.route("/:review_id").post(function (req, res) {

  const { _id: user_id } = req.user;
  const { review_id } = req.params;

  // Find existing review
  Review.findById(review_id, function (err, review) {
    if (err) return res.err(err);
    // Find status of user for this review
    let userStatus = review.users.id(user_id);
    if (userStatus) {
      console.log('User Found', userStatus.status);
      if (userStatus.status === 'following') {
        // User is already following. Unfollow.
        userStatus.remove();
        console.log('Unfollowed', review);
      }
    } else {
      // User not associated to review
      // Add user as a follower
      review.users.push({
        _id: user_id,
        status: 'following'
      });
      console.log('Followed', review);
    }
    review.save(function (err, update) {
      if (err) throw err;
      console.log('Update Successful', update);
      return res.json({ message: "Update Successful" });
    });
  });
});



module.exports = router;