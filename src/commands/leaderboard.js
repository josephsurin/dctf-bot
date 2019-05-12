const path = require('path')
const { getBotConfig, getLeaderboard, getTotalPoints, emojiRank } = require(path.join(__dirname, '../util/util'))

const { themecolour } = getBotConfig()

module.exports = async function leaderboard(msg, args) {
	/*
        Displays the global leaderboard
    */
    
    var leaderboard = await getLeaderboard()
    var display = (await Promise.all(leaderboard.map(async ({ playerid, solves }, i) => {
        var { user: { username } } = await msg.guild.fetchMember(playerid)
        var totalPoints = getTotalPoints(solves)
        var rank = i + 1
        return `${emojiRank(rank)}**#${rank}**  ${username}  (${totalPoints} points)`
    }))).join('\n')

    var embed = {
        title: 'Leaderboard',
        description: '\n\n' + display,
        timestamp: new Date().toISOString(),
        color: themecolour
    }

    msg.channel.send({ embed })
}
