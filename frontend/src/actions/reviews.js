const REMOVE_REVIEW = 'REMOVE_REVIEW';
const SET_REVIEWS = 'SET_REVIEWS';

function removeReview (review) {
    return {
        type: REMOVE_REVIEW,
        review
    }
}

function setReviews (reviews) {
    return {
        type: SET_REVIEWS,
        reviews
    }
}

export {removeReview, setReviews};