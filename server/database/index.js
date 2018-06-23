// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.Promise - global.Promise;

// My local database url
// 27017 is the default port for MongoDB
const uri = 'mongodb://localhost:27017/cs490-project';

mongoose.connect(uri).then(
    () => {
        // No error => ready to use
        // mongoose.connect() promise: resolves to undefined
        console.log('Connected to Mongo');
    },

    err => {
        // Handle initial db connection error
        console.log('Error connecting to MongoDB: ');
        console.log(err);
    }
);

module.exports = mongoose.connection;