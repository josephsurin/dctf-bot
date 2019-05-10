const mongoose = require('mongoose')

const challSchema = new mongoose.Schema({
	challid: { type: String, unique: true },
	title: { type: String, required: true, unique: true },
	category: { type: String, required: true },
	points: { type: Number, required: true },
	author: { type: String, required: true },
	solves: [{
		playerid: String,
		time: String
	}]
})

module.exports = mongoose.model('Chall', challSchema)