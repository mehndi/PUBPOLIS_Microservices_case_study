const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: String
});

module.exports = mongoose.model('payment', paymentSchema);