const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const AuthRouter = require('./routes/auth.routes');

const app = express();

// ==== DB Connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL, () => console.log(`${process.env.SERVICE} DB connected !`));

// ==== Middleware
app.use(express.json());
app.use(cors());

// ==== Routes
app.use('/', AuthRouter);

// ==== Run server
app.listen(process.env.PORT, () => console.log(`${process.env.SERVICE} service running at PORT: ${process.env.PORT} !`));