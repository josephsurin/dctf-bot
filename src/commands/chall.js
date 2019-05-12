const allChalls = require('../challs/index')

module.exports = function chall(msg, args) {
	/*
		Displays detailed information about a challenge
	*/

	var challid = args[0]

	var challData = allChalls[challid]
	if(challData) {
		let { desc } = challData
		desc(msg)
	} else {
		msg.channel.send(`An error occurred trying to get details for challenge ${challid}. Please check for any spelling errors and try again.`)
	}
}