const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema({
    title: {type: String, required: true},
    imgUrl: {type: String, required: true}
});

module.exports = mongoose.model('genres', genresSchema);