'use strict';
//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// A nested document which contains users and their relationship to the review
// Allowed status: "owner", "following", "contributor"
const ReviewUserSchema = new Schema({
    _id: String,
    status: String
});

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
const ReviewSchema = new Schema({
    id: String, 
    title: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    description: String, //review description
    rating: String,      //rating out of ten
    tagline: String,     //review title
    tags: [String],      //movie tags
    status: String,      //review status/premise
    poster: String,      //movie poster
    tmdb: String,        //hosted TMDB url
    users: [ReviewUserSchema]
});

//export our module to use in server.js
module.exports = mongoose.model('Review', ReviewSchema);