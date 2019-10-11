const path = require('path')
const { getBotConfig, getLeaderboard, getMaxPoints, getTotalPoints, emojiRank } = require(path.join(__dirname, '../util/util'))

const { themecolour } = getBotConfig()

module.exports = async function leaderboard(msg, args) {
	/*
        Displays the global leaderboard
    */
    
    var leaderboard = await getLeaderboard()
    var display = (await Promise.all(leaderboard.map(async ({ playerid, solves }, i) => {
        var { username } = await global.djsclient.fetchUser(playerid)
        var totalPoints = getTotalPoints(solves)
        var rank = i + 1
        return `${emojiRank(rank)}**#${rank}**  ${username}  (${totalPoints} points)`
    }))).join('\n')

    var maxPoints = getMaxPoints()
    var embed = {
        title: `Leaderboard (max points: ${maxPoints})`,
        description: '\n\n' + display,
        timestamp: new Date().toISOString(),
        color: themecolour
    }

    msg.channel.send({ embed })
}
