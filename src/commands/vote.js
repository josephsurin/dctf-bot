const path = require('path')
const { getBotConfig, hasSolved } = require(path.join(__dirname, '../util/util'))
const allChalls = require(path.join(__dirname, '../challs/index'))
const { Chall } = require(path.join(__dirname, '../../models/index'))

const { themecolour } = getBotConfig()

module.exports = async function vote(msg, args) {
	/*
		Vote for the difficulty of a challenge (easy) 1 - 10 (hard)
    */
    
    var challid = args[0]
    var voteval = parseInt(args[1])

    if(!allChalls[challid]) {
        msg.channel.send('Invalid challenge id.')
        return false
    }
    if(isNaN(voteval) || voteval < 1 || voteval > 10) {
        msg.channel.send('Invalid vote score. Please specify a value from (easy) 1 to 10 (hard) inclusive.')
        return false
    }

    var userid = msg.author.id

    if(! await hasSolved(userid, challid)) {
        msg.channel.send('You can only vote for challenges you have solved!')
        return false
    } 

    var chall = await Chall.findOne({ challid })
    var { votes } = chall
    var playerVoteIndex = votes.findIndex(v => v.playerid == userid)
    if(playerVoteIndex != -1) {
        msg.channel.send('You can only vote for a challenge once!')
        return false
    }
    votes.push({ playerid: userid, vote: voteval })
    await Chall.updateOne({ challid }, { votes })

    var embed = {
        title: `Vote recorded!`,
        description: `You voted **${voteval}** for challenge **${challid}**`,
        color: themecolour
    }

    msg.channel.send({ embed })
}