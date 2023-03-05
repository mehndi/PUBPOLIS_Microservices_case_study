const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieid: String,
    title: String,
    imgUrl: String
});

module.exports = mongoose.model('movies', movieSchema);