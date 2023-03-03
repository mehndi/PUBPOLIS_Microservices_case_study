const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema({
    title: String,
    imgUrl: String,
    movies: []
});

module.exports = mongoose.model('genres', genresSchema);