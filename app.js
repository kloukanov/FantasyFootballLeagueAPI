const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Import Routes
const userRoute = require('./routes/users');

// Midleware
app.use('/users', userRoute);


// home

app.get('/',  (req, res) => {
    res.send('home');
})

// connect to DB
mongoose.connect(process.env.DB_CONNECTION, ()=> console.log("contected to db"));


// start API
app.listen(3000);