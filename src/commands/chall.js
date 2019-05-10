const path = require('path')

module.exports = function chall(msg, args) {
	/*
		Displays detailed information about a challenge
	*/

	var challid = args[0]

	let { desc } = require(path.join(__dirname, '../challs/'+challid))

	desc(msg)
}