const path = require('path')
const crypto = require('crypto')
const { ordinalSuffix, getTotalPoints } = require(path.join(__dirname, '../util/util'))
const { Chall, Player } = require(path.join(__dirname, '../../models/index'))

module.exports = async function chall(msg, args) {
	/*
		Submits a flag for checking
	*/

	var challid = args[0]
	var flagPlaintext = args[1]
	var userid = msg.author.id

	var player = await Player.findOne({ playerid: userid })

	if(player && player.solves.findIndex(s => s.challid == challid) != -1) {
		msg.channel.send('You\'ve already solved this challenge!')
		return false
	}

	if(!player) player = await Player.create({ playerid: userid, solves: [] })

	try {

		let { flag, points } = require(path.join(__dirname, '../challs/'+challid))
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
				You gained ${points} points and now have a total of **${totalPoints}** points.`,
				timestamp: solveTime,
				color: 0x62fc65
			}

			msg.channel.send({ embed })

			await Player.findOneAndUpdate({ playerid: userid }, { solves: newPlayerSolves })
			await Chall.findOneAndUpdate({ challid }, { solves: newChallSolves })
		} else {
			var embed = {
				title: 'Incorrect flag!',
				description: `The flag you provided for ${challid} was incorrect!`,
				color: 0xfc6265
			}

			msg.channel.send({ embed })
		}
	} catch(e) {
		console.log(e)
		msg.channel.send(`An error occurred trying to submit flag for challenge ${challid}. Please check for any spelling errors in the challenge id and try again.`)
	}
	

}