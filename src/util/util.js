const fs = require('fs')
const path = require('path')
const { Chall } = require(path.join(__dirname, '../../models/index'))

function getBotConfig() {
	return JSON.parse(fs.readFileSync(path.join(__dirname, '../../botconfig.json')))
}

function ordinalSuffix(num) {
	var dig = num % 10
	var suffix = ''
	switch(dig) {
		case 1: suffix = 'st'; break
		case 2: suffix = 'nd'; break
		case 3: suffix = 'rd'; break
		default: suffix = 'th'
	}
	return num.toString() + suffix
}

async function getTotalPoints(solves) {
	return solves.reduce(async (acc, v) => {
		let { challid } = v
		let { points } = await Chall.findOne({ challid })
		return acc + points
	}, 0)
}

module.exports = {
	getBotConfig,
	ordinalSuffix,
	getTotalPoints
}