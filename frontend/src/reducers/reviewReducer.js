const defaultState = {
    reviews: []
};

function reviewReducer (state = defaultState, action) {
    switch (action.type) {
        case 'SET_REVIEWS':

            return {
                ...state,
                reviews: [...action.reviews]
            };

        default:
            return state;
    }
}

export default reviewReducer;