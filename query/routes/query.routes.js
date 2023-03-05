const express = require('express');
const router = express.Router();
const amqp = require('amqplib');
const GenresModel = require('../models/genres.model');
const MovieModel = require('../models/movie.model');
const BookingModel = require('../models/booking.model');

var channel, connection;
// ==== RabbitMQ Connection
async function connectToRabbitMQ() {
    const amqpServer = process.env.AMQP_SERVER_PATH;
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("genres-queue");
    await channel.assertQueue("movie-queue");
    await channel.assertQueue("booking-queue");
    console.log(process.env.SERVICE, 'RabbitMQ connected !');
}
connectToRabbitMQ().then(() => {
    channel.consume('genres-queue', data => {
        const {genres} = JSON.parse(data.content);
        console.log("Received ", genres);
        const newGenes = new GenresModel({
            ...genres,
            movies: []
        });
        newGenes.save();
        channel.ack(data);
    });

    channel.consume('movie-queue', data => {
        const movie = JSON.parse(data.content);
        const {genres} = movie;
        // console.log("Received ", genres);
        genres.forEach(item => {
            (async () => {
                let genresItem = await GenresModel.findOne({ title: item });
                if (genresItem) {
                    await GenresModel.updateOne(
                        { title: item },
                        { $push: { movies: movie } },
                    );
                }
            })();
        });

        const newMovie = new MovieModel({
            movieid: movie._id,
            title: movie.title,
            imgUrl: movie.imgUrl
        });
        newMovie.save();

        channel.ack(data);
    });

    channel.consume('booking-queue', async data => {
        const {useremail, movieid, seats, paymentid, date, time} = JSON.parse(data.content);
        // const movie = await MovieModel.find({movieid}); // need to work on this
        const movie = {
            title: movieid
        }
        const booking = new BookingModel({useremail, seats, paymentid, date, time, movie});
        booking.save();
        channel.ack(data);
    });

});
// ====
router.get('/getcatalog/:title', async (req, res) => {
    try {
        const genres = await GenresModel.findOne({title: req.params.title});
        return res.status(200).json(genres);
    } catch (err) {
        return res.status(500).json({message: `Server error !`});
    }
});

router.get('/getcatalog', async (req, res) => {
    const catalog = await GenresModel.find({});
    if (catalog) return res.status(200).json(catalog);
    else return res.status(500).json({message: `Server error !`});
});

router.post('/getbooking', async (req, res) => {

    const {useremail} = req.body;
    const booking = await BookingModel.find({useremail});
    if (booking && useremail) return res.status(200).json(booking);
    else return res.status(500).json({message: `Server error !`});
});

module.exports = router;