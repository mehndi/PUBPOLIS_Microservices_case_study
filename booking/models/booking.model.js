const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userid: String,
    movieid: String
});

module.exports = mongoose.model('booking', bookingSchema);