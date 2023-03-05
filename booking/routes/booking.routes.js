const express = require('express');
const router = express.Router();
const amqp = require('amqplib');
const BookingModel = require('../models/booking.model');
const secretKey = 'OurSecretKey';
const tockenVerify = require('tokenverify_middleware')(secretKey);

var channel, connection;
// ==== RabbitMQ Connection
async function connectToRabbitMQ() {
    const amqpServer = process.env.AMQP_SERVER_PATH;
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("payment-queue");
    console.log(process.env.SERVICE, 'RabbitMQ connected !');
}
connectToRabbitMQ();

// ====
router.post('/booking/create', tockenVerify, (req, res) => {
    const {useremail, movieid, seats, paymentid, date, time} = req.body;
    const booking = new BookingModel({useremail, movieid, seats, paymentid, date, time});
    booking.save((err, result) => {
        if (err) res.status(400).json(err);
        else {
            channel.sendToQueue(
                'booking-queue', 
                Buffer.from(JSON.stringify(booking))
            );
            channel.sendToQueue(
                'booking-notification-queue', 
                Buffer.from(JSON.stringify({
                    useremail,
                    message: 'Booking is done !'
                }))
            );
            res.status(201).json(result);
        }
    });
});

router.get('/booking/:userid', async (req, res) => {
    try {
        const booking = await BookingModel.findOne({userid: req.params.userid});
        return res.status(200).json(booking);
    } catch (err) {
        return res.status(500).json({message: `Server error !`});
    }
});

router.get('/booking', async (req, res) => {
    const booking = await BookingModel.find({});
    if (booking) return res.status(200).json(booking);
    else return res.status(500).json({message: `Server error !`});
});

module.exports = router;