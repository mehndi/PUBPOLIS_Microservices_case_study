const express = require('express');
const router = express.Router();
const amqp = require('amqplib');
const GenresModel = require('../models/genres.model');
const secretKey = 'OurSecretKey';
const tockenVerify = require('tokenverify_middleware')(secretKey);

var channel, connection;
// ==== RabbitMQ Connection
async function connectToRabbitMQ() {
    const amqpServer = process.env.AMQP_SERVER_PATH;
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("genres-queue");
    console.log(process.env.SERVICE, 'RabbitMQ connected !')
}
connectToRabbitMQ();
// ====

router.post('/genres/create', tockenVerify, (req, res) => {
    const {title, imgUrl} = req.body;
    console.log('User', req.user.email)
    if (req.user.email != 'admin@admin.com') return res.json({message: 'Please login with admin@admin.com !'});
    const genres = new GenresModel({title, imgUrl});
    genres.save((err, result) => {
        if (err) res.status(400).json(err);
        else {
            channel.sendToQueue(
                'genres-queue', 
                Buffer.from(JSON.stringify({genres}))
            );
            console.log(`Sent ${process.env.SERVICE} Queue :`, genres);
            res.status(201).json(result);
        }
    });
});

router.get('/genres/:title', async (req, res) => {
    try {
        const genres = await GenresModel.findOne({title: req.params.title});
        return res.status(200).json(genres);
    } catch (err) {
        return res.status(500).json({message: `Server error !`});
    }
});

router.get('/genres', async (req, res) => {
    const genresList = await GenresModel.find();
    if (genresList) return res.status(200).json(genresList);
    else return res.status(500).json({message: `Server error !`});
});

module.exports = router;