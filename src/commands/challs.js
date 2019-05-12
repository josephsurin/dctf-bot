const path = require('path')
const { getBotConfig } = require(path.join(__dirname, '../util/util'))
const { Chall } = require(path.join(__dirname, '../../models/index'))

const { themecolour } = getBotConfig()

module.exports = function challs(msg, args) {
	/*
		Lists available challenges
	*/

	Chall.find().then(allChalls => {
		
		if(!allChalls) {
			msg.channel.send('No challenges found!')
			return false
		}
	
		var fields = processChallsDisplay(allChalls)
	
		var embed = {
			title: 'Challenges List',
			fields,
			timestamp: `${new Date().toISOString()}`,
			color: themecolour
		}

		msg.channel.send({ embed })

	})		
}

function processChallsDisplay(allChalls) {
	var categorySeparated = {}
	allChalls.forEach(chall => {
		if(!categorySeparated[chall.category]) {
			categorySeparated[chall.category] = [processChallDisplay(chall)]
		} else {
			categorySeparated[chall.category].push(processChallDisplay(chall))
		}
	})

	fields = []
	for(var cat in categorySeparated) {
		field = {
			name: `**__${cat}__**`,
			value: categorySeparated[cat].join('\n') + '\n',
			inline: true
		}
		fields.push(field)
	}

	return fields

	function processChallDisplay(chall) {
		let { challid, title, points, solves } = chall
		return `**${challid}**: ${title} [${points}] - ${solves.length} solves`
	}
}