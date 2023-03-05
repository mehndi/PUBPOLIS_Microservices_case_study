const express = require('express');
const router = express.Router();
const amqp = require('amqplib');
const MovieModel = require('../models/movie.model');
const secretKey = 'OurSecretKey';
const tockenVerify = require('tokenverify_middleware')(secretKey);

var channel, connection;
// ==== RabbitMQ Connection
async function connectToRabbitMQ() {
    const amqpServer = process.env.AMQP_SERVER_PATH;
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("movie-queue");
    console.log(process.env.SERVICE, 'RabbitMQ connected !')
}
connectToRabbitMQ();
// ====

router.post('/movies/create', tockenVerify, (req, res) => {
    const {title, imgUrl, desc, genres, amount} = req.body;
    console.log('User', {title, imgUrl, desc, genres, amount})
    if (req.user.email != 'admin@admin.com') return res.json({message: 'Please login with admin@admin.com !'});
    const movie = new MovieModel({title, imgUrl, desc, genres, amount});
    movie.save((err, result) => {
        if (err) res.status(400).json(err);
        else {
            channel.sendToQueue(
                'movie-queue', 
                Buffer.from(JSON.stringify(movie))
            );
            console.log(`Sent ${process.env.SERVICE} Queue :`, movie);
            res.status(201).json(result);
        }
    });
});

router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await MovieModel.findOne({_id: req.params.id});
        return res.status(200).json(movie);
    } catch (err) {
        return res.status(500).json({message: `Server error !`});
    }
});

router.get('/movies', async (req, res) => {
    const movies = await MovieModel.find();
    if (movies) return res.status(200).json(movies);
    else return res.status(500).json({message: `Server error !`});
});

module.exports = router;