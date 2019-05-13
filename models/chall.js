const mongoose = require('mongoose')

const challSchema = new mongoose.Schema({
	challid: { type: String, unique: true, required: true },
	solves: [{
		playerid: String,
		time: String
	}]
})

module.exports = mongoose.model('Chall', challSchema)