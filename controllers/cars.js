const express = require('express');
const router = express.Router();
const startCars = require('../db/carSeedData.js')
const Car = require('../models/Cars.js')

// Post
router.post('/', async (req, res) => {
	console.log(req.body)
	req.body.salvaged = req.body.salvaged === 'on' ? true : false;
	const fruit = await Car.create(req.body);
	res.redirect('/cars');
});

// New
router.get('/new', (req, res) => {
 res.render("cars/new.ejs")
})

// Edit
router.get('/:id/edit', async (req, res) => {
	const car = await Car.findById(req.params.id);
	res.render("cars/edit.ejs", {car})
})

// Index...show all car listings
router.get('/', async (req, res) => {
	// wait or this to complete
	// Car.find() is a Promise
	// Promise is resolved or rejected
	const cars = await Car.find({});
	// then run the next line of code
	// res.send(fruits);
	res.render("cars/index.ejs", {cars});
});

// Seed
router.get('/seed', async (req, res) => {
	await Car.deleteMany({});
	await Car.create(startCars);
	res.redirect('/cars');
});

// Show...show one car lisitng
router.get('/:id', async (req, res) => {
	const car = await Car.findById(req.params.id);
	// res.send(car);
	res.render("cars/show.ejs", {car})
});

// Delete
router.delete('/:id', async (req, res) => {
	const car = await Car.findByIdAndDelete(req.params.id);
	res.redirect('/cars');
});

// Update
router.put('/:id', async (req, res) => {
	const id = req.params.id;
	req.body.salvaged = req.body.salvaged === 'on' ? true : false;
	const fruit = await Car.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	res.redirect('/cars');
});

module.exports = router;
