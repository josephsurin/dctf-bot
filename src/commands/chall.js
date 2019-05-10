const path = require('path')

module.exports = function chall(msg, args) {
	/*
		Displays detailed information about a challenge
	*/

	var challid = args[0]

	try {
		let { desc } = require(path.join(__dirname, '../challs/'+challid))
		desc(msg)
	} catch(e) {
		msg.channel.send(`An error occurred trying to get details for challenge ${challid}. Please check for any spelling errors and try again.`)
	}

}