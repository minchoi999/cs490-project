// Function for setting properties of a Review schema object
const setReviewObj = (input, review) => {
    review.title = input.title;
    review.categories = input.categories;
    review.description = input.description;
    review.rating = input.rating;
    review.tagline = input.tagline;
    review.tags = input.tags;
    review.status = input.status;
    review.poster = input.poster;
    review.tmdb = input.tmdb;
    review.users = input.users;

    return review;
};

module.exports = setReviewObj;