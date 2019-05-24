const path = require('path')
const crypto = require('crypto')
const allChalls = require(path.join(__dirname, '../challs/index'))
const { ordinalSuffix, getTotalPoints, getBotConfig } = require(path.join(__dirname, '../util/util'))
const { cmdprefix } = getBotConfig()
const { Chall, Player } = require(path.join(__dirname, '../../models/index'))

module.exports = async function chall(msg, args) {
	/*
		Submits a flag for checking
	*/

	if(msg.guild) {
		msg.channel.send('This command should only be used in direct messages!')
		return false
	}

	var challid = args[0]
	var flagPlaintext = args[1]
	var userid = msg.author.id

	var player = await Player.findOne({ playerid: userid })

	if(player && player.solves.findIndex(s => s.challid == challid) != -1) {
		msg.channel.send('You\'ve already solved this challenge!')
		return false
	}

	if(!player) player = await Player.create({ playerid: userid, solves: [] })

	var challData = allChalls[challid]

	if(challData) {
		let { flag, points } = challData
		var userFlagHashed = crypto.createHash('sha256').update(flagPlaintext).digest('hex')

		if(userFlagHashed == flag) {
			var solveTime = new Date().toISOString()

			//Chall solves
			var { solves: challSolves } = await Chall.findOne({ challid })
			var newChallSolves = challSolves.concat([{ playerid: userid, time: solveTime }])

			//Player solves
			var { solves: playerSolves } = player
			var newPlayerSolves = playerSolves.concat([{ challid, time: solveTime }])
			var totalPoints = await getTotalPoints(newPlayerSolves)

			var embed = {
				title: 'Congratulations!',
				description: `You were the **${ordinalSuffix(newChallSolves.length)}** solver for ${challid}!
				You gained ${points} points and now have a total of **${totalPoints}** points.
				
				Please remember to vote on the difficulty of this challenge! You can do this by typing \`${cmdprefix}vote ${challid} <vote value>\` where \`<vote value>\` is an integer from (easy) 1 to 10 (hard).`,
				timestamp: solveTime,
				color: 0x62fc65
			}

			msg.channel.send({ embed })

			await Player.updateOne({ playerid: userid }, { solves: newPlayerSolves })
			await Chall.updateOne({ challid }, { solves: newChallSolves })
		} else {
			var embed = {
				title: 'Incorrect flag!',
				description: `The flag you provided for ${challid} was incorrect!`,
				color: 0xfc6265
			}

			msg.channel.send({ embed })
		}
	} else {
		msg.channel.send(`An error occurred trying to submit flag for challenge ${challid}. Please check for any spelling errors in the challenge id and try again.`)
	}
	

}