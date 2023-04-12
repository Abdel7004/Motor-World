const { mongoose } = require('../db/connection');

const carsSchema = new mongoose.Schema({
    model: String,
    price: String,
    horsepower: String,
    image: String
})

const Car = mongoose.model('Car', carsSchema)

module.exports = Car