const express = require('express');
const router = express.Router();
const amqp = require('amqplib');
const secretKey = 'OurSecretKey';
const tockenVerify = require('tokenverify_middleware')(secretKey);


var channel, connection;
// ==== RabbitMQ Connection
async function connectToRabbitMQ() {
    const amqpServer = process.env.AMQP_SERVER_PATH;
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("booking-notification-queue");
    console.log(process.env.SERVICE, 'RabbitMQ connected !');
}
connectToRabbitMQ().then(() => {
    channel.consume('booking-notification-queue', data => {
        const {useremail, message} = JSON.parse(data.content);
        console.log("Sent a notification to user: ", useremail);
        console.log("Notification message: ", message);
        channel.ack(data);
    });
});
// ====

module.exports = router;