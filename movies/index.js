const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const MovieRouter = require('./routes/movie.routes');

const app = express();

// ==== DB Connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL, () => console.log(`${process.env.SERVICE} DB connected !`));

// ==== Middleware
app.use(express.json());
app.use(cors());

// ==== Routes
app.use('/', MovieRouter);

// ==== Run server
app.listen(process.env.PORT, () => console.log(`${process.env.SERVICE} service running at PORT: ${process.env.PORT} !`));