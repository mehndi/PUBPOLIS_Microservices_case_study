const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    imgUrl: {type: String, required: true},
    desc: {type: String, required: true},
    amount: {type: String, required: true},
    genres: {
        type: [String],
        validate: v => Array.isArray(v) && v.length > 0,
    }
});

module.exports = mongoose.model('movies', movieSchema);