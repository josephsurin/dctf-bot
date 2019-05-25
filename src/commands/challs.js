const path = require('path')
const { getBotConfig } = require(path.join(__dirname, '../util/util'))
const allChalls = require(path.join(__dirname, '../challs/index'))
const { Chall } = require(path.join(__dirname, '../../models/index'))

const { themecolour, flagformat } = getBotConfig()

module.exports = function challs(msg, args) {
	/*
		Lists available challenges
	*/

	Chall.find().sort('challid').then(dbChalls => {
		
		if(!dbChalls) {
			msg.channel.send('No challenges found!')
			return false
		}
	
		var fields = processChallsDisplay(dbChalls)
	
		var embed = {
			title: 'Challenges List',
			description: `
			The flag format is \`${flagformat}\` unless otherwise specified.`,
			fields,
			timestamp: `${new Date().toISOString()}`,
			color: themecolour
		}

		msg.channel.send({ embed })

	})		
}

function processChallsDisplay(dbChalls) {
	var categorySeparated = {}
	dbChalls.forEach(({ challid, solves }) => {
		var chall = Object.assign({ solves }, allChalls[challid])
		if(!categorySeparated[chall.category]) {
			categorySeparated[chall.category] = [processChallDisplay(chall)]
		} else {
			categorySeparated[chall.category].push(processChallDisplay(chall))
		}
	})

	fields = []
	// for natural sorting
	var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
	for(var cat in categorySeparated) {
		field = {
			name: `**__${cat}__**`,
			value: categorySeparated[cat].sort(collator.compare).join('\n'),
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