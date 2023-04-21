// Dependencies
const express = require('express');
const morgan = require('morgan'); 
const methodOverride = require('method-override');
const app = express();
require('dotenv').config();
const cors = require("cors")
const bodyParser = require("body-parser")

// Middleware
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())
app.get('/cars', (req, res) => {
    res.send('default route')
})

const carsController = require('./controllers/cars');
app.use('/cars', carsController);

// Listener
app.listen(3000, () =>
	console.log(`express is listening on port: 3000`)
);