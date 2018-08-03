const reviewStatus = {
  // Get status for all reviews by user
  userReviews(reviews, userId) {
    if (!reviews) return null;
    return (
      reviews.reduce(
        (result, review) => {
          if (!review.users) return result;
          let user = review.users.find(user => {
            return user._id === userId;
          });
          if (user) {
            return [...result, {
              reviewId: review._id,
              reviewTitle: review.title,
              status: user.status
            }];
          }
          else return result;
        },
        []
      )
    );
  },
  // Get status of a user for a certain review
  getStatusById(reviews, reviewId, userId) {
    if (!reviews) return null;
    const review = reviews.find(item => {
      return item._id === reviewId;
    });
    if (!review) {
      console.log('reviewStatus.getStatusById: Review not found')
      return null;
    }
    if (!review.users) return null;
    const found = review.users.find(user => {
      return user._id === userId
    });
    return found._id;
  },
  // Get owner ID for a review
  getOwner(review) {
    if (!review.users) return null;
    const found = review.users.find(user => {
      return (user.status === 'owner');
    });
    if (found) return found._id;
    else return null;
  },
  // Get all followers for a review
  getFollowers(review) {
    if (!review.users) return null;
    const followers = review.users.filter(user => {
      return (user.status === 'following');
    });
    return followers.map(item => {
      return item._id;
    });
  }
};

module.exports = reviewStatus;