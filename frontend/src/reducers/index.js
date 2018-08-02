import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import reviewReducer from './reviewReducer.js';

export default combineReducers({
    userReducer,
    reviewReducer
});
