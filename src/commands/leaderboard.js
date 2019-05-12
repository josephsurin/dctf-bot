const path = require('path')
const { getBotConfig, getTotalPoints, getRank } = require(path.join(__dirname, '../util/util'))
const { Player } = require(path.join(__dirname, '../../models/index'))

const { themecolour } = getBotConfig()

module.exports = async function leaderboard(msg, args) {
	/*
        Displays the global leaderboard
    */
    
    var players = await Player.find()
    var display = (await Promise.all(players.map(async player => {
        var { playerid, solves } = player
        var { user: { username } } = await msg.guild.fetchMember(playerid)
        var totalPoints = getTotalPoints(solves)
        var rank = await getRank(player)
        return `**#${rank}**  ${username}  (${totalPoints} points)\n`
    }))).join('\n')

    var embed = {
        title: 'Leaderboard',
        description: display,
        color: themecolour
    }

    msg.channel.send({ embed })
}
