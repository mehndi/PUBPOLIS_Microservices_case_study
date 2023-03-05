const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    useremail: String,
    movieid: String,
    seats: String,
    paymentid: String,
    date: String,
    time: String
});

module.exports = mongoose.model('booking', bookingSchema);