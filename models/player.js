const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
	playerid: { type: String, unique: true },
	solves: [{
		challid: String,
		time: String
	}]
})

module.exports = mongoose.model('Player', playerSchema)