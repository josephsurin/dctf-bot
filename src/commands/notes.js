const path = require('path')
const { getBotConfig } = require(path.join(__dirname, '../util/util'))
const allChalls = require(path.join(__dirname, '../challs/index'))

const { themecolour } = getBotConfig()

module.exports = function notes(msg, args) {
	/*
        Displays notes for a given challenge
    */

	var challid = args[0]
	var challData = allChalls[challid]

	if (!challData) {
		msg.channel.send('Invalid challenge id!')
		return false
	}

	var { title, points, notes } = challData

	if (!notes) {
		msg.channel.send(`${challid} doesn't have any notes at the moment!`)
		return false
	}

	var embed = {
		title: `Notes/Resources/Hints for ${title} (${challid} [${points}])`,
		description: notes.join('\n'),
		timestamp: new Date().toISOString(),
		color: themecolour
	}

	msg.channel.send({ embed })
}
