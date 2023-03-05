const mongoose = require('mongoose');

const ticketbookingSchema = new mongoose.Schema({
    useremail: String,
    seats: String,
    paymentid: String,
    date: String,
    time: String,
    movie: {
        title: String,
        // imgUrl: String,
    }
});

module.exports = mongoose.model('ticketbooking', ticketbookingSchema);